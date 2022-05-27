---
category:
  - Java企业级开发
tag:
  - 消息队列
---

# RabbitMQ入门教程（概念、应用场景、安装、使用）

人一辈子最值得炫耀的不应该是你的财富有多少（虽然这话说得有点违心，呵呵），而是你的学习能力。技术更新迭代的速度非常快，那作为程序员，我们就应该拥有一颗拥抱变化的心，积极地跟进。

在 RabbitMQ 入门之前，我已经入门了 [Redis](https://mp.weixin.qq.com/s/NPJkMy5RppyFk9QhzHxhrw)、[Elasticsearch](https://mp.weixin.qq.com/s/ZjsZxle7m_dfmVwVkq2ayg) 和 [MongoDB](https://mp.weixin.qq.com/s/qz0sNOFeS0GTW-H9cdnbJg)，这让我感觉自己富有极客精神，非常良好。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mq/rabbitmq-rumen-d416cab5-69bd-46a6-b65c-8cf3b6667136.jpg)

小伙伴们在继续阅读之前，我必须要声明一点，我对 RabbitMQ 并没有进行很深入的研究，仅仅是因为要用，就学一下。但作为一名负责任的技术博主，我是动了心的，这篇入门教程，小伙伴们读完后绝对会感到满意，忍不住无情地点赞，以及赤裸裸地转发。

当然了，小伙伴们遇到文章中有错误的地方，不要手下留情，可以组团过来捶我，但要保证一点，不要打脸，我怕毁容。


### 01、RabbitMQ 是什么

首先，我知道，Rabbit 是一只兔子（哎呀妈呀，忍不住秀了一波自己的英语功底），可爱的形象已经跃然于我的脑海中了。那 MQ 又是什么呢？是 Message Queue 的首字母缩写，也就是说 RabbitMQ 是一款开源的消息队列系统。

RabbitMQ 的主要特点在于健壮性好、易于使用、高性能、高并发、集群易扩展，以及强大的开源社区支持。反正就是很牛逼的样子。

九年前我做大宗期货交易的时候，也需要消息推送，那时候还不知道去找这种现成的中间件，就用自定义的队列实现，结果搞了不少 bug，有些到现在还没有解决，真的是不堪回首的往事啊。

下图是 RabbitMQ 的消息模型图（来源于网络，侵删），小伙伴们来感受下。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mq/rabbitmq-rumen-0e8d83f8-fdf0-4755-9131-1f5c775ca010.jpg)

1）P 是 Producer，代表生产者，也就是消息的发送者，可以将消息发送到 X

2）X 是 Exchange（为啥不是 E，我也很好奇），代表交换机，可以接受生产者发送的消息，并根据路由将消息发送给指定的队列

3）Q 是 Queue，也就是队列，存放交换机发送来的消息

4）C 是 Consumer，代表消费者，也就是消息的接受者，从队列中获取消息

听我这样一解释，是不是对 RabbitMQ 的印象就很具象化了？小伙伴们，学起来吧！

### 02、安装 Erlang

咦，怎么不是安装 RabbitMQ 啊？先来看看官方的解释。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mq/rabbitmq-rumen-9012f7d7-01bf-437a-ac98-f6a71390105e.jpg)

英文看不太懂，没关系，我来补充两句人话。RabbitMQ 服务器是用 Erlang 语言编写的，它的安装包里并没有集成 Erlang 的环境，因此需要先安装 Erlang。小伙伴们不要担心，Erlang 安装起来没有任何难度。

Erlang 下载地址如下：

[https://erlang.org/download/otp_versions_tree.html](https://erlang.org/download/otp_versions_tree.html)


最新的版本是 23.0.1，我选择的是 64 位的版本，104M 左右。下载完就可以双击运行安装，傻瓜式的。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mq/rabbitmq-rumen-644fafa4-a4bc-45a2-831a-12deda958122.jpg)

需要注意的是，我安装的过程中，电脑重启了一次，好像要安装一个什么库，重启之前忘记保存图片了（sorry）。重启后，重新双击运行 otp_win64_23.0.1.exe 文件完成 Erlang 安装。

### 03、安装 RabbitMQ

Erlang 安装成功后，就可以安装 RabbitMQ 了。下载地址如下所示：

[https://www.rabbitmq.com/install-windows.html](https://www.rabbitmq.com/install-windows.html)

找到下图中的位置，选择红色框中的文件进行下载。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mq/rabbitmq-rumen-43268557-1240-4ed4-9883-de93668f1f04.jpg)

安装包只有 16.5M 大小，还是非常轻量级的。下载完后直接双击运行 exe 文件就可以傻瓜式地安装了。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mq/rabbitmq-rumen-b3343075-f9a8-441f-b266-0750df82a1c6.jpg)

安装成功后，就可以将 RabbitMQ 作为 Windows 服务启动，可以从“开始”菜单管理 RabbitMQ Windows 服务。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mq/rabbitmq-rumen-6f185cbd-b3ab-432a-85df-be3a93450533.jpg)

点击「RabbitMQ Command Prompt (sbin dir)」，进入命令行，输入 `rabbitmqctl.bat status` 可确认 RabbitMQ 的启动状态。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mq/rabbitmq-rumen-d9407f52-3585-4c3c-af2f-7b7c4ec45461.jpg)

可以看到 RabbitMQ 一些状态信息：

- 进程 ID，也就是 PID 为 2816
- 操作系统为 Windows
- 当前的版本号为 3.8.4
- Erlang 的配置信息

命令行界面看起来不够优雅，因此我们可以输入以下命令来启用客户端管理 UI 插件：

```
rabbitmq-plugins enable rabbitmq_management
```

看到以下信息就可以确认插件启用成功了。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mq/rabbitmq-rumen-3479f2b1-5089-4d73-a6fa-f673989766b7.jpg)

在浏览器地址栏输入 [http://localhost:15672/](http://localhost:15672/) 可以进入管理端界面，如下图所示：

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mq/rabbitmq-rumen-cbad5128-e675-4da7-a5dd-fe9bb303f5f0.jpg)

### 04、在 Java 中使用 RabbitMQ

有些小伙伴可能会问，“二哥，我是一名 Java 程序员，我该如何在 Java 中使用 RabbitMQ 呢？”这个问题问得好，这就来，这就来。


第一步，在项目中添加 RabbitMQ 客户端依赖：

```
<dependency>
    <groupId>com.rabbitmq</groupId>
    <artifactId>amqp-client</artifactId>
    <version>5.9.0</version>
</dependency>
```

第二步，我们来模拟一个最简单的场景，一个生产者发送消息到队列中，一个消费者从队列中读取消息并打印。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mq/rabbitmq-rumen-3ce8cf20-76f0-4192-88d4-f40d9a23233e.jpg)

官方对 RabbitMQ 有一个很好的解释，我就“拿来主义”的用一下。在我上高中的年代，同学们之间最流行的交流方式不是 QQ、微信，甚至短信这些，而是书信。因为那时候还没有智能手机，况且上学期间学校也是命令禁用手机的，所以书信是情感表达的最好方式。好怀念啊。

假如我向女朋友小巷写了一封情书，内容如下所示：

>致小巷
你好呀，小巷。
你走了以后我每天都感到很闷，就像堂吉诃德一样，每天想念托波索的达辛妮亚。我现在已经养成了一种习惯，就是每两三天就要找你说几句不想对别人说的话。
。。。。。。
王二，5月20日

那这封情书要寄给小巷，我就需要跑到邮局，买上邮票，投递到邮箱当中。女朋友要收到这封情书，就需要邮递员尽心尽力，不要弄丢了。

RabbitMQ 就像邮局一样，只不过处理的不是邮件，而是消息。之前解释过了，P 就是生产者，C 就是消费者。

新建生产者类 Wanger ：

```java
public class Wanger {
    private final static String QUEUE_NAME = "love";
    public static void main(String[] args) throws IOException, TimeoutException {
        ConnectionFactory factory = new ConnectionFactory();

        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {
            channel.queueDeclare(QUEUE_NAME, false, false, false, null);
            String message = "小巷，我喜欢你。";
            channel.basicPublish("", QUEUE_NAME, null, message.getBytes(StandardCharsets.UTF_8));
            System.out.println(" [王二] 发送 '" + message + "'");
        }
    }
}
```

1）QUEUE_NAME 为队列名，也就是说，生产者发送的消息会放到 love 队列中。

2）通过以下方式创建服务器连接：

```java
ConnectionFactory factory = new ConnectionFactory();
try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {
```

ConnectionFactory 是一个非常方便的工厂类，可用来创建到 RabbitMQ 的默认连接（主机名为“localhost”）。然后，创建一个通道（ Channel）来发送消息。

Connection 和 Channel 类都实现了 Closeable 接口，所以可以使用 try-with-resource 语句，如果有小伙伴对 try-with-resource 语句不太熟悉，可以查看我之前写的[我去](https://mp.weixin.qq.com/s/fbTzH5B7mSr5v0tQ8mV2wA)文章。

3）在发送消息的时候，必须设置队列名称，通过 `queueDeclare()` 方法设置。

4）`basicPublish()` 方法用于发布消息：

- 第一个参数为交换机（exchange），当前场景不需要，因此设置为空字符串；
- 第二个参数为路由关键字（routingKey），暂时使用队列名填充；
- 第三个参数为消息的其他参数（BasicProperties），暂时不配置；
- 第四个参数为消息的主体，这里为 UTF-8 格式的字节数组，可以有效地杜绝中文乱码。

生产者类有了，接下来新建消费者类 XiaoXiang：

```java
public class XiaoXiang {
    private final static String QUEUE_NAME = "love";
    public static void main(String[] args) throws IOException, TimeoutException {
        ConnectionFactory factory = new ConnectionFactory();
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();

        channel.queueDeclare(QUEUE_NAME, false, false, false, null);
        System.out.println("等待接收消息");

        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), "UTF-8");
            System.out.println(" [小巷] 接收到的消息 '" + message + "'");
        };
        channel.basicConsume(QUEUE_NAME, true, deliverCallback, consumerTag -> { });
    }
}
```

1）创建通道的代码和生产者差不多，只不过没有使用 try-with-resource 语句来自动关闭连接和通道，因为我们希望消费者能够一直保持连接，直到我们强制关闭它。

2）在接收消息的时候，必须设置队列名称，通过 queueDeclare() 方法设置。

3）由于 RabbitMQ 将会通过异步的方式向我们推送消息，因此我们需要提供了一个回调，该回调将对消息进行缓冲，直到我们做好准备接收它们为止。

```java
DeliverCallback deliverCallback = (consumerTag, delivery) -> {
    String message = new String(delivery.getBody(), "UTF-8");
    System.out.println(" [小巷] 接收到的消息 '" + message + "'");
};
```

`basicConsume()` 方法用于接收消息：

- 第一个参数为队列名（queue），和生产者相匹配（love）。

- 第二个参数为 autoAck，如果为 true 的话，表明服务器要一次性交付消息。怎么理解这个概念呢？小伙伴们可以在运行消费者类 XiaoXiang 类之前，先多次运行生产者类 Wanger，向队列中发送多个消息，等到消费者类启动后，你就会看到多条消息一次性接收到了，就像下面这样。

```
等待接收消息
 [小巷] 接收到的消息 '小巷，我喜欢你。'
 [小巷] 接收到的消息 '小巷，我喜欢你。'
 [小巷] 接收到的消息 '小巷，我喜欢你。'
```

- 第三个参数为 DeliverCallback，也就是消息的回调函数。

- 第四个参数为 CancelCallback，我暂时没搞清楚是干嘛的。

在消息发送的过程中，也可以使用 RabbitMQ 的管理面板查看到消息的走势图，如下所示。


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mq/rabbitmq-rumen-0dcb67b3-521f-4d91-9e46-590e93631b35.jpg)

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png)
