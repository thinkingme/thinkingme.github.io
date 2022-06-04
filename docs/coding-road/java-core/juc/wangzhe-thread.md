---
category:
  - Java核心
  - 并发编程
tag:
  - Java
---

# 室友打了一把王者就学会了创建 Java 线程的 3 种方式

对于 Java 初学者来说，多线程的很多概念听起来就很难理解。比方说：

- 进程，是对运行时程序的封装，是系统进行资源调度和分配的基本单位，实现了操作系统的并发。
- 线程，是进程的子任务，是 CPU 调度和分派的基本单位，实现了进程内部的并发。

很抽象，对不对？打个比喻，你在打一把王者（其实我不会玩哈 doge）：

- 进程可以比作是你开的这一把游戏
- 线程可以比作是你所选的英雄或者是游戏中的水晶野怪等之类的。

带着这个比喻来理解进程和线程的一些关系，一个进程可以有多个线程就叫多线程。是不是感觉非常好理解了？

**❤1、线程在进程下进行**

(单独的英雄角色、野怪、小兵肯定不能运行)

**❤2、进程之间不会相互影响，主线程结束将会导致整个进程结束**

(两把游戏之间不会有联系和影响。你的水晶被推掉，你这把游戏就结束了)

**❤3、不同的进程数据很难共享**

(两把游戏之间很难有联系，有联系的情况比如上把的敌人这把又匹配到了)

**❤4、同进程下的不同线程之间数据很容易共享**

(你开的那一把游戏，你可以看到每个玩家的状态——生死，也可以看到每个玩家的出装等等）

**❤5、进程使用内存地址可以限定使用量**

(开的房间模式，决定了你可以设置有多少人进，当房间满了后，其他人就进不去了，除非有人退出房间，其他人才能进)

搞清楚上面这些概念之后，我们来看一下多线程创建的两种方式：

♠①：创建一个类继承 Thread 类，并重写 run 方法。

```java
public class MyThread extends Thread {
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            System.out.println(getName() + ":打了" + i + "个小兵");
        }
    }
}
```

我们来写个测试方法验证下：

```java
//创建MyThread对象
MyThread t1=new  MyThread();
MyThread t2=new  MyThread();
MyThread t3=new  MyThread();
//设置线程的名字
t1.setName("鲁班");
t2.setName("刘备");
t3.setName("亚瑟");
//启动线程
t1.start();
t2.start();
t3.start();
```

来看一下执行后的结果：

![](https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/thread/wangzhe-thread-01.png)

♠②：创建一个类实现 Runnable 接口，并重写 run 方法。

```java
public class MyRunnable implements Runnable {
    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            try {//sleep会发生异常要显示处理
                Thread.sleep(20);//暂停20毫秒
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println(Thread.currentThread().getName() + "打了:" + i + "个小兵");
        }
    }
}
```

我们来写个测试方法验证下：

```java
//创建MyRunnable类
MyRunnable mr = new MyRunnable();
//创建Thread类的有参构造,并设置线程名
Thread t1 = new Thread(mr, "张飞");
Thread t2 = new Thread(mr, "貂蝉");
Thread t3 = new Thread(mr, "吕布");
//启动线程
t1.start();
t2.start();
t3.start();
```

来看一下执行后的结果：

![](https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/thread/wangzhe-thread-02.png)

**❤1、为什么要重写 run 方法？**

因为 run 方法是用来封装被线程执行的代码。

**❤2、`run()`方法和`start()`方法有什么区别？**

- `run()`：封装线程执行的代码，直接调用相当于调用普通方法。
- `start()`：启动线程，然后由 JVM 调用此线程的 `run()` 方法。

**❤3、通过继承 Thread 的方法和实现 Runnable 接口的方式创建多线程，哪个好？**

实现 Runable 接口好，原因有两个：

- ♠①、避免了 Java 单继承的局限性
- ♠②、适合多个相同的程序代码去处理同一资源的情况，把线程、代码和数据有效的分离，更符合面向对象的设计思想。

针对线程控制，大家还会遇到 3 个常见的方法，我们来一一介绍下。

1）`sleep()`：使当前正在执行的线程暂停指定的毫秒数，也就是进入休眠的状态。

需要注意的是，sleep 的时候要对异常进行处理。

```java
try {//sleep会发生异常要显示处理
    Thread.sleep(20);//暂停20毫秒
} catch (InterruptedException e) {
    e.printStackTrace();
}
```

2）`join()`：等待这个线程执行完才会轮到后续线程得到 cpu 的执行权，使用这个也要抛出异常。

```java
//创建MyRunnable类
MyRunnable mr = new MyRunnable();
//创建Thread类的有参构造,并设置线程名
Thread t1 = new Thread(mr, "张飞");
Thread t2 = new Thread(mr, "貂蝉");
Thread t3 = new Thread(mr, "吕布");
//启动线程
t1.start();
try {
    t1.join(); //等待t1执行完才会轮到t2，t3抢
} catch (InterruptedException e) {
    e.printStackTrace();
}
t2.start();
t3.start();
```

来看一下执行后的结果：

![](https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/thread/wangzhe-thread-03.png)

3）`setDaemon()`：将此线程标记为守护线程，准确来说，就是服务其他的线程，像 Java 中的垃圾回收线程，就是典型的守护线程。

```java
//创建MyRunnable类
MyRunnable mr = new MyRunnable();
//创建Thread类的有参构造,并设置线程名
Thread t1 = new Thread(mr, "张飞");
Thread t2 = new Thread(mr, "貂蝉");
Thread t3 = new Thread(mr, "吕布");

t1.setDaemon(true);
t2.setDaemon(true);

//启动线程
t1.start();
t2.start();
t3.start();
```

如果其他线程都执行完毕，main 方法（主线程）也执行完毕，JVM 就会退出，也就是停止运行。如果 JVM 都停止运行了，守护线程自然也就停止了。

最后再来看一下线程的生命周期吧，一图胜千言。

![](https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/thread/wangzhe-thread-04.png)

<img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/xingbiaogongzhonghao.png">
