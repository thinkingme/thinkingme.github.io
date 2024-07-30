# java中多路复用reactor模型实现

具体代码可以看[train/SocketMultiplexingThreadsV2.java at master · thinkingme/train · GitHub](https://github.com/thinkingme/train/blob/master/bjmashbing-sysio/src/main/java/com/bjmashibing/system/io/SocketMultiplexingThreadsV2.java)

首先是reactor模型

![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\SocketMultiplexing\2023-03-06-11-01-41-image.png)

先讲一下java的api

```java
//创建一个文件描述符
ServerSocketChannel server = ServerSocketChannel.open();
//设置为非阻塞模式
server.configureBlocking(false);
//绑定端口
server.bind(new InetSocketAddress(port));
//注册selector在linux中就是epoll，还有注册事件是读还是写等等，还有一个对象用于回调
server.register(eventloop.selector, SelectionKey.OP_ACCEPT, sAcceptr);
```

然后就是reactor模型，分为boss组和worker组，boss主要负责接收连接（accrptor)，而worker是干活的，负责去读取。然后可以传入参数设定创建多少个。

```java
EventLoopGroup boss = new EventLoopGroup(1);
EventLoopGroup worker = new EventLoopGroup(3);
ServerBootStrap b = new ServerBootStrap();
b.group(boss, worker).bind(9090);
```








