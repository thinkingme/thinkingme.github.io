# Java 中的观察者，监听器，发布订阅模式

## 一、基础：类的四大基本关系

a.关联关系：如 A 类调用 B 类。

b.继承关系：如 A 类是 B 类的父类。

c.聚合关系：如装橘子的箱子，箱子是否存在与里面装没装橘子没有任何关系，也就是说橘子不会影响箱子的存在。

d.组合关系：如一个小组，小组是否存在与小组中是否有组员是息息相关的，如果没有组员，小组就不存在了。

## 二、概念解析

### 监听器模式：

事件源经过事件的封装传给监听器，当事件源触发事件后，监听器接收到事件对象可以回调事件的方法

### 观察者模式：

观察者(Observer)相当于事件监听者，被观察者(Observable)相当于事件源和事件，执行逻辑时通知 observer 即可触发 oberver 的 update,同时可传被观察者和参数

### 观察者和发布订阅模式的区别

大多数的回答都是：Publishers + Subscribers = Observer Pattern，24 种基本的设计模式并没有发布-订阅模式，发布订阅模式属于并发型模式；像典型的 Mq；这两种相似单并不可以划等号。
我们来重新来回顾一下这两种模式：
**Observer Pattern**
    观察者模式定义了对象之间的一对多依赖，这样一来，当一个对象改变状态时，它的所有依赖者都会收到通知并自动更新。而观察者模式属于行为型模式，行为型模式关注的是对象之间的通讯，观察者模式就是观察者和被观察者之间的通讯。
    观察者模式有一个别名叫“订阅—发布模式”。报纸大家都订过吧，当你订阅了一份报纸，每天都会有一份最新的报纸送到你手上，有多少人订阅报纸，报社就会发多少份报纸，这是典型的订阅—发布模式，报社和订报纸的客户就是上面文章开头所说的“一对多”的依赖关系。

![image-20220530095543437](D:\workspace\coding-road\docs\coding-road\design-patterns\observe.assets\image-20220530095543437.png)

**Pub-Sub Pattern**
    在“发布者-订阅者”模式中，称为发布者的消息发送者不会将消息编程为直接发送给称为订阅者的特定接收者。这意味着发布者和订阅者不知道彼此的存在。存在第三个组件，称为代理或消息代理或事件总线，它由发布者和订阅者都知道，它过滤所有传入的消息并相应地分发它们。换句话说，pub-sub 是用于在不同系统组件之间传递消息的模式，而这些组件不知道关于彼此身份的任何信息。经纪人如何过滤所有消息？实际上，有几个消息过滤过程。最常用的方法有：基于主题和基于内容的。

![image-20220530095601089](D:\workspace\coding-road\docs\coding-road\design-patterns\observe.assets\image-20220530095601089.png)

简而言之，这两种模式之间的主要区别可以如下所示：

![image-20220530095609730](D:\workspace\coding-road\docs\coding-road\design-patterns\observe.assets\image-20220530095609730.png)

观察者模式和发布订阅模式最大的区别就是发布订阅模式有个**事件调度中心**。

![image-20220530095638802](D:\workspace\coding-road\docs\coding-road\design-patterns\observe.assets\image-20220530095638802.png)

从图中可以看出，观察者模式中观察者和目标直接进行交互，而发布订阅模式中统一由调度中心进行处理，订阅者和发布者互不干扰。这样一方面实现了解耦，还有就是可以实现更细粒度的一些控制。比如发布者发布了很多消息，但是不想所有的订阅者都接收到，就可以在调度中心做一些处理，类似于权限控制之类的。还可以做一些节流操作。

### 观察者和监听器模式区别

监听器监听自己感兴趣的事件，一旦该事件被触发或改变，立即得到通知，做出响应，监听器一般是接口，用来约定调用的方式。当事件源对象上发生操作时，它会将调用事件监听器的一个方法，并在调用该方法时传递事件对象过去。事件监听器实现类通常是由开发人员编写，开发人员通过事件对象拿到事件源，从而对事件源上的操作进行处理。
 **总结**： 当事件源对象上发生操作时，将会调用事件监听器的一个方法，并在调用该方法时把事件对象传递过去。
 ![image-20220530095729566](D:\workspace\coding-road\docs\coding-road\design-patterns\observe.assets\image-20220530095729566.png)

![image-20220530095752334](D:\workspace\coding-road\docs\coding-road\design-patterns\observe.assets\image-20220530095752334.png)

观察者模式原理和监听器一样的，使用的关键在搞清楚什么是观察者、什么是被观察者。观察者(Observer)相当于事件监听器。被观察者(Observable)相当于事件源和事件，执行事件源通知逻辑时，将会回调 Observer 的回调方法 update，只是在观察者模式中常用的是反射，而在监听器模式中使用的是 callback。

图解两者区别：

![image-20220530095809635](D:\workspace\coding-road\docs\coding-road\design-patterns\observe.assets\image-20220530095809635.png)

### 类图解析

1. **事件-监听机制**

事件源经过事件的封装传给监听器，当事件源触发事件后，监听器接收到事件对象可以回调事件的方法。

![image-20220530100607110](D:\workspace\coding-road\docs\coding-road\design-patterns\observe.assets\image-20220530100607110.png)

2. **观察者模式**
   观察者(Observer)相当于事件监听者（监听器），被观察者(Observable)相当于事件源和事件，执行逻辑时通知 observer 即可触发 oberver 的 update,同时可传被观察者和参数。简化了事件-监听模式的实现。

![image-20220530100633169](D:\workspace\coding-road\docs\coding-road\design-patterns\observe.assets\image-20220530100633169.png)

3. **对比**

（1） 从 uml 图上也可以看出，Observer 的实现相对简单，event-listener 需要实现三个角色，observer-observable 需要实现两个角色。

（2）Observable 的 api 已经把对观察者的注册，删除等定义好了，而且是线程安全的。而 event-listener 需要使用者自己实现。

（3）两者都需要自己定义并实现触发事件的通知。但 Observable 需要注意要在通知 Observer 之前调用 jdk 提供的 setChanged()。

（4）event-listener 是传统的 c/s 界面事件模型，分事件源和事件（状态）角色，事件源要经过事件的包装、成为事件的属性之一再传递给事件监听/处理者，这个事件监听者就相当于观察者。Observer 更简洁一些。两者在思想上是统一的，很多框架仍然使用了 event-listener 模式，比如 spring 框架的 ApplicationEvent,ApplicationListener。
其他：

观察者模式存在目标对象和观察者两个概念，做到解耦，但通知却依赖了抽象的观察者，假如观察者无法抽象就无法通知更新。
观察者模式所有的观察者的动作都一样。如果不一样就不能实现
事件监听模式 就可以解决以上的问题，不需要观察者的抽象。通过相应的 listener 代替观察者，类似观察者模式却解耦目标和观察。一般把事件对象作为业务接口的参数，再根据相应的条件触发

## 三、代码解析

### 监听器模式

事件监听器就是自己监听的事件一旦被触发或改变，立即得到通知，做出响应。

Java 的事件监听机制可概括为 3 点：

Java 的事件监听机制涉及到事件源，事件监听器，事件对象三个组件,监听器一般是接口，用来约定调用方式
当事件源对象上发生操作时，它将调用事件监听器的一个方法，并将事件对象传递过去
事件监听器实现类，通常是由开发人员编写，开发人员通过事件对象拿到事件源，从而对事件源上的操作进行处理
这里为了方便，直接用了 jdk，EventListener 监听器

- 监听器接口

```java
public interface EventListener extends java.util.EventListener {
    /**
     * 事件处理
     */
    void handleEvent(EventObject eventObject);
}
```

- 事件对象
  
  public class EventObject extends java.util.EventObject {
  public EventObject(Object source) {
  super(source);
  }
  
        public void doEvent() {
            System.out.println("通知一个事件源 source:" + this.getSource());
        }
  
  }

- 事件源

```java
public class EventSource {
    // 监听器列表，监听器的注册 加入此列表
    private List<EventListener> listeners = new ArrayList<>();

    public void addListener(EventListener eventListener) {
        listeners.add(eventListener);
    }

    public void removeListener(EventListener eventListener) {
        listeners.remove(eventListener);
    }

    public void notifyListenerEvent(EventObject eventObject) {
        for (EventListener eventListener : listeners) {
            eventListener.handleEvent(eventObject);
        }
    }
}
```

测试执行

```java
public class EventDemo {
    public static void main(String[] args) {
        EventSource eventSource = new EventSource(); // 事件源
        eventSource.addListener(new EventListener() { // 事件源 调用监听器的一个方法，并传递事件对象
            @Override
            public void handleEvent(EventObject eventObject) {
                eventObject.doEvent();

                if (eventObject.getSource().equals("closeWindow")) {
                    System.out.println("doClose"); // 回调
                }
            }
        });

        EventObject eventObject = new EventObject("closeWindow"); // 事件对象

        eventSource.notifyListenerEvent(eventObject); // 触发事件
    }
}
```

控制台输出

```java
通知一个事件源 source:closeWindow
doClose
```

到这里我们了解了什么是监听器模式了。EventListener 是一个回调接口类，handleEvent 是一个回调函数接口，通过回调模型，EventSource 事件源便可回调具体监听器动作。

### 观察者模式

观察者模式的原理其实和监听器一样，使用的关键在于搞清楚什么是观察者、什么是被观察者

观察者相当于事件监听
被观察者相当于事件源和事件
为了方便，同样直接使用 jdk 自带的 Observer

- 观察者
  
  public class Watcher implements Observer {
  @Override
  public void update(Observable o, Object arg) {
  if (arg.toString().equals("openWindow")) {
  System.out.println("打开窗口");
  }
  }
  }

- 被观察者
  
      public class Watched extends Observable {
          public void notifyObservers(Object arg) {
              /**
               * 为了避免并发冲突，设置了 changed 标志位 changed=true，则当前线程可以通知所有观察者，内部同步块会设置为false；
               * 通知过程中，正在新注册的和撤销的无法通知到
               */
              super.setChanged();
      
              /**
               * 事件触发，通知所有感兴趣的观察者
               */
              super.notifyObservers(arg);
          }
      }
  
  测试执行

```java
public class WatcherDemo {
    public static void main(String[] args) {
        Watched watched = new Watched();
        Watcher watcher = new Watcher();
        watched.addObserver(watcher);
        watched.addObserver(new Observer() {
        @Override
        public void update(Observable o, Object arg) {
                if (arg.toString().equals("closeWindow")) {
                    System.out.println("关闭窗口");
                }
            }
        });

        watched.notifyObservers("openWindow");
        watched.notifyObservers("closeWindow");
    }
}
```

控制台输出

```java
打开窗口
关闭窗口
```

## 总结

从实现和调用过程来看，观察者和监听器模式基本一样。基本上都是这个逻辑当事件源对象上发生操作时，它将调用事件监听器的一个方法，并将事件对象传递过去，套用到观察者模式上面就是，当被观察者发生操作时，观察者将根据被观察者所做出的操作 进行对应的操作。

## 应用

netty 中监听连接
guava 中的 ListenableFuture，采用监听器模型解决了原生 JDK 中 future.get() 一直阻塞结果的问题。

在 spirng 中 ServletContextListener 接口通过 web 中的 listener 就可以在 web 启动时初始化 spirng 也是事件的一种应用。

### Eureka 中的监听模式

ureka 中提供了五种监听可供使用，分别是：

EurekaInstanceCanceledEvent 服务下线事件
EurekaInstanceRegisteredEvent 服务注册事件
EurekaInstanceRenewedEvent 服务续约事件
EurekaRegistryAvailableEvent Eureka 注册中心启动事件
EurekaServerStartedEvent Eureka Server 启动事件

都是继承 spring 的 ApplicationEvent

![image-20220530111430305](D:\workspace\coding-road\docs\coding-road\design-patterns\observe.assets\image-20220530111430305.png)

（1)在 Eureka 的服务端：可以在监听到各种事件后将其存储到数据库中：

```java
package com.googosoft.register.listener;

import com.googosoft.register.info.ListenerType;
import com.googosoft.register.pojo.InstanceLog;
import com.googosoft.register.pojo.ServerLog;
import com.googosoft.register.service.InstanceLogService;
import com.googosoft.register.service.ServerLogService;
import com.netflix.appinfo.InstanceInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.netflix.eureka.server.event.EurekaInstanceCanceledEvent;
import org.springframework.cloud.netflix.eureka.server.event.EurekaInstanceRegisteredEvent;
import org.springframework.cloud.netflix.eureka.server.event.EurekaInstanceRenewedEvent;
import org.springframework.cloud.netflix.eureka.server.event.EurekaRegistryAvailableEvent;
import org.springframework.cloud.netflix.eureka.server.event.EurekaServerStartedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

/**
 * @author songyan
 * @version 2020年1月9日 下午3:20:39
 * @desc
 */
@Component
public class EurekaStateChangeListener {

    @Autowired
    private ServerLogService serverLogService;
    @Autowired
    private InstanceLogService instanceLogService;

    protected final Logger logger = LoggerFactory.getLogger(getClass());

    /**
     *    监听：服务下线事件
     * @param eurekaInstanceCanceledEvent
     */
    @EventListener
    public void listen(EurekaInstanceCanceledEvent eurekaInstanceCanceledEvent) {
        try {
            logger.info("*************服务下线********");
            String appName = eurekaInstanceCanceledEvent.getAppName();
            String serverId = eurekaInstanceCanceledEvent.getServerId();
            ServerLog log = new ServerLog(appName,serverId,ListenerType.Listener_Canceled);
            serverLogService.addLog(log);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     *    监听：服务注册事件
     * @param eurekaInstanceCanceledEvent
     */
    @EventListener(condition = "#event.replication==false")
    public void listen(EurekaInstanceRegisteredEvent event) {
        try {
            logger.info("*************服务注册事件********");
            InstanceInfo instanceInfo = event.getInstanceInfo();
            String appName = instanceInfo.getAppName();
            String instanceId = instanceInfo.getInstanceId();
            InstanceLog log = new InstanceLog(appName,instanceId,ListenerType.Listener_Registered);
            instanceLogService.addLog(log);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    /**
     *    监听：服务续约事件
     * @param eurekaInstanceCanceledEvent
     */
    @EventListener(condition = "#event.replication==false")
    public void listen(EurekaInstanceRenewedEvent event) {
        try {
            logger.info("*************服务续约事件********");
            String appName = event.getAppName();
            String serverId = event.getServerId();
            //ServerLog log = new ServerLog(appName,serverId,ListenerType.Listener_Renewed);
            //serverLogService.addLog(log);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     *    监听：注册中心启动事件
     * @param eurekaInstanceCanceledEvent
     */
    @EventListener
    public void listen(EurekaRegistryAvailableEvent event) {
        logger.info("*************注册中心启动事件********");
        try {
            ServerLog log = new ServerLog("服务注册中心","",ListenerType.Listener_RegistryAvailable);
            serverLogService.addLog(log);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    /**
     *    监听：Eureka Server启动事件
     * @param eurekaInstanceCanceledEvent
     */
    @EventListener
    public void listen(EurekaServerStartedEvent event) {
        logger.info("*************Eureka Server启动事件********");
        try {
            ServerLog log = new ServerLog("Eureka Server","",ListenerType.Listener_ServerStarted);
            serverLogService.addLog(log);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](<javascript:void(0);>)

（2）在客户端：直接读取数据库中日志展现即可

![img](https://img2018.cnblogs.com/i-beta/1157942/202001/1157942-20200119153422513-1976490487.png)

参考文章：
https://www.cnblogs.com/viaiu/p/9939301.html
https://www.cnblogs.com/lebo0425/p/9911913.html
https://www.cnblogs.com/jackson-yqj/p/7784694.html
https://www.jianshu.com/p/6020dffeceed
https://www.jianshu.com/p/594f018b68e7
https://blog.csdn.net/m0_37797991/article/details/86686835
https://blog.csdn.net/rajayu/article/details/85240134
————————————————
原文链接：https://blog.csdn.net/belongtocode/article/details/103963480
