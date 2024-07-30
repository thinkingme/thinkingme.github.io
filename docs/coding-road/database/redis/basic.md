# redis基础

## 官方介绍

[官网](http://redis.cn/)

Redis 是一个开源（BSD许可）的，内存中的数据结构存储系统，它可以用作数据库、缓存和消息中间件。 它支持多种类型的数据结构，如 [字符串（strings）](http://redis.cn/topics/data-types-intro.html#strings)， [散列（hashes）](http://redis.cn/topics/data-types-intro.html#hashes)， [列表（lists）](http://redis.cn/topics/data-types-intro.html#lists)， [集合（sets）](http://redis.cn/topics/data-types-intro.html#sets)， [有序集合（sorted sets）](http://redis.cn/topics/data-types-intro.html#sorted-sets) 与范围查询， [bitmaps](http://redis.cn/topics/data-types-intro.html#bitmaps)， [hyperloglogs](http://redis.cn/topics/data-types-intro.html#hyperloglogs) 和 [地理空间（geospatial）](http://redis.cn/commands/geoadd.html) 索引半径查询。 Redis 内置了 [复制（replication）](http://redis.cn/topics/replication.html)，[LUA脚本（Lua scripting）](http://redis.cn/commands/eval.html)， [LRU驱动事件（LRU eviction）](http://redis.cn/topics/lru-cache.html)，[事务（transactions）](http://redis.cn/topics/transactions.html) 和不同级别的 [磁盘持久化（persistence）](http://redis.cn/topics/persistence.html)， 并通过 [Redis哨兵（Sentinel）](http://redis.cn/topics/sentinel.html)和自动 [分区（Cluster）](http://redis.cn/topics/cluster-tutorial.html)提供高可用性（high availability）

## redis和memcached的区别

![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\basic\2023-02-27-16-19-38-image.png)

# 数据结构

## string

字符串操作（append、strlen）

数值操作（incr 数字增加）

## bitmaps

### 操作命令

#### setbit

#### bitcount

计算二进制位1的数量

#### bitops

#### bitop

### 应用

统计用户登录次数

使用setbit设置哪天登录就设置第几位为1，这样只要364位一年。然后在用bitcount来计算一年登录了几天。

或者说反过来setbit 20220301 1 1，以日期为key，设置对应用户id的位数为1来表明登录了。

## list

栈、队列、数组、阻塞队列（FIFO）

## hash

set key val、get key val

hset key field val、

## set

* 无序、去重

* 集合操作（交并差）

* sRandNumber（随机取数）

```redis
sRandNumber key count
```

count为正时，为负时

应用：抽奖

## sort_set

* 有序、去重

* 集合操作（交并差）

* 跳表

zrange、zrevrange、zscore、zrank

跳表看跳表与b+树对别那篇

# 消息订阅

# pipeline

# 事务

# 布隆过滤器

作用：

如果是采用先取缓存在取数据库形式的话。

将已有的数据采用多个hash函数映射到bitmap上，当查询的时也进行同样的映射。可以概率减少放行的请求

![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\basic\2023-04-27-14-00-44-image.png)

# 持久化

## RDB

* sava

直接sava是阻塞方式持久化的

* bgsave

采用linux fork原理

fork的注意点

* linux使用管道的时候会创建子进程

验证

```shell
echo $$
echo $BASHID | more
## $$命令比管道的优先级高，所以用$BASHID获取bash的进程id
```

* 写时复制，linux父子进程对同一个数据的安全策略采用的是写时复制策略，

写入时，会创建一个新的空间保存新的内容并把指针移过去，而fork出来的子进程，拷贝的是父进程的里面的指针，指向的还是原有的数据，相当于快照机制。RDB只会记录下fork时候的指针记录以及对应的数据。

![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\basic\2023-04-19-15-04-03-image.png)

## AOF

append only file

类似binlog

优点：数据比较完整

缺点：4.0以前运行时间越长，越大

4.0后使用RDB记录快照，AOF记录增量，配置如下

```
aof-use-rdb-premble yes
```

# 集群

## 复制

### 访问的两个方式：

数据库来说一般用主从复制

* 主从复制（读写分离）

* 主备。

### 数据同步的三个方案：

* 强一致性

redis主备，主机在处理数据的时候，同步备机采用同步阻塞的方式，一个失败则返回失败。换言之破坏了可用性。因为那台可能掉线了。 

![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\basic\2023-05-05-17-12-00-image.png)

* 弱一致性

上面的同步备机采用异步的方式，主机成功就返回成功。

![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\basic\2023-05-05-17-15-06-image.png)

* 最终一致性

![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\basic\2023-05-05-17-14-56-image.png)

但是都有个主机，衍生出了新的问题。当主机挂了后，选举策略。

### 主机宕机的处理方式

* 强一致性：

所有从机都说主机挂了，开始重新选举。但是问题是如果有台是网络故障。误差过大。

* 过半选举：

大于一半的从机觉得主机挂了，开始重新选举。也就是投票数超过一半就执行决策

* 使用Sentinel

### redis实现

利用RDB的来进行全量复制或者增量复制。

## Sentinel（哨兵）

哨兵的出现主要是解决了主从复制出现故障时需要人为干预的问题。

客户端可以将 Sentinel 看作是一个只提供了订阅功能的 Redis 服务器

## cluster集群

复制和哨兵机制实现了高可用。

cluster是为了解决单机Redis容量有限的问题，将数据按一定的规则分配到多台机器。

### 数据分配实现方法

在客户端里代码实现或者在代理层（比如推特的[GitHub - twitter/twemproxy: A fast, light-weight proxy for memcached and redis](https://github.com/twitter/twemproxy)）实现（降低连接数）

* 业务拆分

* 随机

* 哈希+取模（扩展性不好）
  
  ![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\basic\2023-05-08-15-50-28-image.png)

* 一致性hash算法（可扩展，但是增加节点后会有一部分数据无法命中）
  
  ![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\basic\2023-05-08-15-51-04-image.png)

### redis实现

redis没有采用一致性hash，而是采用哈希槽，固定多少个槽位，分配给不同的节点。具体可以看官网。
