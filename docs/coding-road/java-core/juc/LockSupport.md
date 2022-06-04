---
category:
  - Java核心
  - 并发编程
tag:
  - Java
---

# 深入理解 Java 并发线程阻塞唤醒类 LockSupport

LockSupport 位于 java.util.concurrent.locks 包下，有兴趣的可以直接去看源码，该类的方法并不是很多。LockSupprot 是线程的阻塞原语，用来阻塞线程和唤醒线程。每个使用 LockSupport 的线程都会与一个许可关联，如果该许可可用，并且可在线程中使用，则调用 park()将会立即返回，否则可能阻塞。如果许可尚不可用，则可以调用 unpark 使其可用。但是注意许可**不可重入**，也就是说只能调用一次 park()方法，否则会一直阻塞。

LockSupport 中的方法不多，这里将这些方法做一个总结：

## **阻塞线程**

1. `void park()`：阻塞当前线程，如果调用 unpark 方法或者当前线程被中断，从能从 park()方法中返回
2. `void park(Object blocker)`：功能同方法 1，入参增加一个 Object 对象，用来记录导致线程阻塞的阻塞对象，方便进行问题排查；
3. `void parkNanos(long nanos)`：阻塞当前线程，最长不超过 nanos 纳秒，增加了超时返回的特性；
4. `void parkNanos(Object blocker, long nanos)`：功能同方法 3，入参增加一个 Object 对象，用来记录导致线程阻塞的阻塞对象，方便进行问题排查；
5. `void parkUntil(long deadline)`：阻塞当前线程，知道 deadline；
6. `void parkUntil(Object blocker, long deadline)`：功能同方法 5，入参增加一个 Object 对象，用来记录导致线程阻塞的阻塞对象，方便进行问题排查；

## **唤醒线程**

`void unpark(Thread thread)`:唤醒处于阻塞状态的指定线程

实际上 LockSupport 阻塞和唤醒线程的功能是依赖于 sun.misc.Unsafe，这是一个很底层的类，有兴趣的可以去查阅资料，比如 park()方法的功能实现则是靠 unsafe.park()方法。

另外在阻塞线程这一系列方法中还有一个很有意思的现象就是，每个方法都会新增一个带有 Object 的阻塞对象的重载方法。那么增加了一个 Object 对象的入参会有什么不同的地方了？示例代码很简单就不说了，直接看 dump 线程的信息。

**调用 park()方法 dump 线程**：

```java
"main" #1 prio=5 os_prio=0 tid=0x02cdcc00 nid=0x2b48 waiting on condition [0x00d6f000]
   java.lang.Thread.State: WAITING (parking)
        at sun.misc.Unsafe.park(Native Method)
        at java.util.concurrent.locks.LockSupport.park(LockSupport.java:304)
        at learn.LockSupportDemo.main(LockSupportDemo.java:7)
```

**调用 park(Object blocker)方法 dump 线程**

```
"main" #1 prio=5 os_prio=0 tid=0x0069cc00 nid=0x6c0 waiting on condition [0x00dcf000]
   java.lang.Thread.State: WAITING (parking)
        at sun.misc.Unsafe.park(Native Method)
        - parking to wait for  <0x048c2d18> (a java.lang.String)
        at java.util.concurrent.locks.LockSupport.park(LockSupport.java:175)
        at learn.LockSupportDemo.main(LockSupportDemo.java:7)
```

通过分别调用这两个方法然后 dump 线程信息可以看出，带 Object 的 park 方法相较于无参的 park 方法会增加 `parking to wait for <0x048c2d18> (a java.lang.String）`的信息，这种信息就类似于记录“案发现场”，有助于工程人员能够迅速发现问题解决问题。

有个有意思的事情是，我们都知道如果使用 synchronzed 阻塞了线程 dump 线程时都会有阻塞对象的描述，在 java 5 推出 LockSupport 时遗漏了这一点，在 java 6 时进行了补充。

还有一点需要需要的是：**synchronzed 致使线程阻塞，线程会进入到 BLOCKED 状态，而调用 LockSupprt 方法阻塞线程会致使线程进入到 WAITING 状态。**

用一个很简单的例子说说这些方法怎么用。

```java
public class LockSupportDemo {
    public static void main(String[] args) {
        Thread thread = new Thread(() -> {
            LockSupport.park();
            System.out.println(Thread.currentThread().getName() + "被唤醒");
        });
        thread.start();
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        LockSupport.unpark(thread);
    }
}
```

thread 线程调用 LockSupport.park()致使 thread 阻塞，当 mian 线程睡眠 3 秒结束后通过 LockSupport.unpark(thread)方法唤醒 thread 线程,thread 线程被唤醒执行后续操作。另外，还有一点值得关注的是，**`LockSupport.unpark(thread)`可以指定线程对象唤醒指定的线程**。

---

> 编辑：沉默王二，内容大部分来源以下三个开源仓库：
>
> - [深入浅出 Java 多线程](http://concurrent.redspider.group/)
> - [并发编程知识总结](https://github.com/CL0610/Java-concurrency)
> - [Java 八股文](https://github.com/CoderLeixiaoshuai/java-eight-part)

<img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png">
