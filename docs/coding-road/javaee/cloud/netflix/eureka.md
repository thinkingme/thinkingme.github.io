# Eureka 原理

# 一、服务注册发现简要流程

首先通过以下一幅图简单看下 eureka 的服务注册发现流程是什么样的：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b449c75cfeaa4d1c8fe7987171fa7d33~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp?)

1、服务提供者提供应用服务，注册到 eureka server 中。

2、服务消费者每 30 秒去去注册中心拉取服务的 ip，端口，接口地址等信息。

3、服务消费者拉取到服务提供者的应用信息后，可以直接去调用服务提供者的接口。

# 二、服务发现注册的整体流程

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e42bd810ea96421197f4a3fd1db51fa5~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp?)

# 三、主要概念及原理

## 服务注册

服务注册的原理主要涉及到 eureka server 的存储结构，采用一个三层缓存的结构。具体内部的实现逻辑参考二中的图。

| 层级  | 名称                    | 实现方式                 | 更新方式         | 数据变更                   |
| --- | --------------------- | -------------------- | ------------ | ---------------------- |
| 第一层 | readOnlyCacheMap（只读）  | ConcurrentHashMap    | 定时更新（默认 30s） | 定时拉取 readWriteCacheMap |
| 第二层 | readWriteCacheMap（读写） | guava                | 实时更新         | guava 的 load 机制        |
| 第三层 | register（注册表）         | 双层 ConcurrentHashMap | 实时更新         | 客户端的注册、续约、下线           |

## 服务续约

当服务提供者完成服务信息注册后，会维持一个心跳，定时向 eureka server 发送 rest 请求，告诉其还活着。默认心跳间隔 30s。

## 服务获取

eureka client 会定期（默认 30s）向 eureka server 获取获取注册的服务信息，这个获取分为`全量获取`和`增量获取`。

默认配置下，当客户端首次启动后，会向服务端发起一次全量获取并缓存本地信息，之后每隔 30s 发起一次增量获取，更新本地缓存。

### 缓存未命中

缓存未命中会调用 guava 的 loal 机制执行方法。

- 服务端

代码：

```java
private Value generatePayload(Key key) {
    //全量获取
    if (ALL_APPS.equals(key.getName())) {
            payload = getPayLoad(key, registry.getApplicationsFromMultipleRegions(key.getRegions()));
    }
    //增量获取
    else if (ALL_APPS_DELTA.equals(key.getName())) {
            payload = getPayLoad(key,registry.getApplicationDeltasFromMultipleRegions(key.getRegions()));
    }
}
```

区别：

1. 增量获取是从 recentlyChangedQueue 这样一个队列中获取的。这个队列在进行注册时会往其中加入数据。这个队列只会保留最近注册的服务信息。

```JAVA
//recentlyChangedQueue定时过期代码，使用java.util.TimerTask
private TimerTask getDeltaRetentionTask() {
    return new TimerTask() {
        @Override
        public void run() {
            Iterator<RecentlyChangedItem> it = recentlyChangedQueue.iterator();
            while (it.hasNext()) {
                if (it.next().getLastUpdateTime() <
                    System.currentTimeMillis() - serverConfig.getRetentionTimeInMSInDeltaQueue()) {
                    it.remove();
                } else {
                    break;
                }
            }
        }

    };
}
```

2. 全量获取是直接从 register（注册表）中获取全部信息

## 服务调用

通常服务间调用使用组件 feign，发起 rest 请求；

其内集成了 ribbon，ribbon 默认使用了轮询的负载策略，会将 eureka client 拉取的注册信息拉取到自己这，实现负载。

## 服务下线

表示要从注册中心删除该服务的注册信息，使该服务不能被调用。

服务下线的方式：

| 方式           | 实现                                                                                                   | 效果                                     |
| ------------ | ---------------------------------------------------------------------------------------------------- | -------------------------------------- |
| 直接停服务        | 直接 kill 服务                                                                                           | 90s 内注册中心检测到服务无续约，才删除，无法立即下线           |
| 通过注册中心接口强制下线 | 向 eureka 注册中心发送 delete                                                                               | 默认 30s 的心跳机制，如果在这段时间没有停掉服务，那么会让该服务再次上线 |
| 客户端主动下线      | @GetMapping("/offline") public void offline(){ DiscoveryManager.getInstance().shutdownComponent(); } | 优雅的下线服务                                |

## 失效剔除

在 eureka server 中有一个定时任务 Evict，该任务默认每 60s 执行一次，其作用域在 readWriteCacheMap 和 register 上。

当有服务提供者在默认 90s 时间内，没有进行服务续约，当 Evict 执行时，会对这样失效的注册信息进行剔除。通常是宕机的服务或者强制 kill 的服务。

## 自我保护

**官方定义**：自我保护模式正是一种针对网络异常波动的安全保护措施，使用自我保护模式能使 Eureka 集群更加的健壮、稳定的运行。

Eureka Server 在运行期间会统计心跳失败的比例在 15 分钟内是否低于 85%，如果出现低于的情况，Eureka Server 会将当前的实例注册信息保护起来，不会让它们立刻过期。

此配置在默认环境下开启。

**自我保护存在的问题**：在保护期间，服务挂掉，导致服务无法下线，造成调用接口失败。

优化方案：数量少的话不开自我保护，多的话再开

## eureka 宕机后，服务之间仍然可以通信。

因为 eureka client 本地缓存注册表信息，当 eureka server 宕机后服务间仍然可以访问，但是服务提供端和服务消费端又分为以下情况：

- 当服务消费端重启后，本地缓存失效，与服务提供端的映射不存在了，无法进行服务调用。
- 当服务提供端重启后，在服务调用端的本地缓存中，仍然保存有在 eureka 宕机前的缓存信息，可以正常调用服务。

## 集群注册信息同步

- eureka 采用的同步方式是`peer to peer（对等复制）`，副本间不分主从，任何副本都可以接收写操作，然后每个副本间互相进行数据更新。

- Eureka Server 本身依赖了 Eureka Client，也就是每个 Eureka Server 是作为其他 Eureka Server 的 Client。

- Eureka Server 启动后，会通过 Eureka Client 请求其他 Eureka Server 节点中的一个节点，获取注册的服务信息，然后复制到其他 peer 节点。

- Eureka Server 每当自己的信息变更后，例如 Client 向自己发起注册、续约、注销请求， 就会把自己的最新信息通知给其他 Eureka Server，保持数据同步。

- 存在的问题：
  
  - （1）每个节点都可以进行写操作，会导致数据冲突。
  - （2）如果自己的信息变更是另一个 Eureka Server 同步过来的，这是再同步回去的话就出现数据同步死循环了。

- 问题（1）解决方案：
  
  Eureka 是通过 lastDirtyTimestamp 这个类似版本号的属性来解决该问题。 lastDirtyTimestamp 是注册中心里面服务实例的一个属性，表示此服务实例最近一次变更时间。

- 问题（2）解决方案：
  
  Eureka Server 在执行复制操作的时候，使用 HEADER_REPLICATION，参数名 isReplication， （eureka-core-1.10.17：ApplicationResource 类下 addInstance 方法）这个 http header 来区分普通应用实例的正常请求，说明这是一个复制请求，这样其他 peer 节点收到请求时，就不会再对其进行复制操作，从而避免死循环。

## 地区

eureka有区域概念，可以设置多个生产者区域，优先使用哪个区域的，其他区域作为容错。防止网络故障。



## eureka 保证 CAP 中的 AP

因为eureka的服务同步采用的是读写map分离的机制，类似数据库读写库分离，来保证高**可用**性.

所以eureka 并没有保证数据的强一致性，只保证了数据的**最终一致性**，通过集群模式保证了**分区容错**。

# 四、springboot配置

### server端：

```yml
eureka:
  server:
    ## 关闭自我保护，要是节点不多的时候，最好还是关闭防止请求失败
    enable-self-preservation: false
    ## 自我保护阈值
    renewal-percent-threshold: 0.85
    ## 剔除服务时间间隔
    eviction-interval-timer-in-ms: 1000
    ## 关闭从只读注册表中读取注册信息
    use-read-only-response-cache: false
    ## read-write和read-only同步时间间隔
    response-cache-update-interval-ms: 1000
    #1.优化目的：减少服务上下限延迟
    #2.自我保护是否开启
    #3.服务更新:先停止，再发送下线请求（因为如果直接发送下线请求，如果这时候发生了续约，就等于白发送了）vation: false
```

# 五、服务测算

20个服务，每个部署5个，也就200个客户端。

30秒一次心跳，一分钟也就200次，一天就28万次请求。
