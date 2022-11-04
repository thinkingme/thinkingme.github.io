# LockSupport的 park 方法是怎么响应中断的？

本文章将要介绍的内容有以下几点，读者朋友也可先自行思考一下相关问题：

1. 线程中断 interrupt 方法怎么理解，意思就是线程中断了吗？那当前线程还能继续执行吗？
2. 判断线程是否中断的方法有几个，它们之间有什么区别？
3. LockSupport的 park/unpark 和 wait/notify 有什么区别？
4. sleep 方法是怎么响应中断的？
5. park 方法又是怎么响应中断的？

## **线程中断相关方法**

线程中和中断相关的方法有三个，分别介绍如下：

1） interrupt

我们一般都说这个方法是用来中断线程的，那么这个中断应该怎么理解呢？就是说把当前正在执行的线程中断掉，不让它继续往下执行吗？

其实，不然。此处，说的中断仅仅是给线程设置一个中断的标识（设置为true），线程还是会继续往下执行的。而线程怎么停止，则需要由我们自己去处理。一会儿会用代码来说明这个。

2） isInterrupted

判断当前线程的中断状态，即判断线程的中断标识是true还是false。注意，这个方法不会对线程原本的中断状态产生任何影响。

3） interrupted

也是判断线程的中断状态的。但是，需要注意的是，这个方法和 isInterrupted 有很大的不同。我们看下它们的源码：

```javascript
public boolean isInterrupted() {  
    return isInterrupted(false);  
}

public static boolean interrupted() {  
    return currentThread().isInterrupted(true);  
}
//调用同一个方法，只是传参不同
private native boolean isInterrupted(boolean ClearInterrupted);
```

复制

首先 isInterrupted 方法是线程对象的方法，而 interrupted 是Thread类的静态方法。

![img](https://ask.qcloudimg.com/http-save/7256485/cb8hlqk7jr.png)

其次，它们都调用了同一个本地方法 isInterrupted，不同的只是传参的值，这个参数代表的是，是否要把线程的中断状态清除（清除即不论之前的中断状态是什么值，最终都会设置为false）。

因此，interrupted 静态方法会把原本线程的中断状态清除，而 isInterrupted 则不会。所以，如果你调用两次 interrupted 方法，第二次就一定会返回false，除非中间又被中断了一次。

下面证明一下 interrupt 方法只是设置一个中断状态，而不是使当前线程中断运行:

```javascript
public class TestFlag {
    static volatile boolean flag = true;

    public static void main(String[] args) throws InterruptedException {

        Thread t = new Thread(new Runnable(){
            @Override
            public void run() {
                System.out.println("线程中断标志:"+Thread.currentThread().isInterrupted());
                while (flag){

                }
                System.out.println("标志flag为:" + flag);
                System.out.println("线程中断标志:"+Thread.currentThread().isInterrupted());
                System.out.println("我还在继续执行");
            }
        });

        t.start();
        Thread.sleep(100);
        flag = false;
        t.interrupt();
    }
}
```

复制

运行结果：

```javascript
线程中断标志:false
标志flag为:false
线程中断标志:true
我还在继续执行
```

复制

当线程启动，还没调用中断方法时，中断状态为false，然后调用中断方法，并把flag设置为false。此时，run方法跳出while死循环。我们会发现线程的中断状态为true，但是线程还是会继续往下执行，直到执行结束。

## **sleep 响应中断**

线程中常用的阻塞方法，如sleep，join和wait 都会响应中断，然后抛出一个中断异常 InterruptedException。但是，注意此时，线程的中断状态会被清除。所以，当我们捕获到中断异常之后，应该保留中断信息，以便让上层代码知道当前线程中断了。通常有两种方法可以做到。

一种是，捕获异常之后，再重新抛出异常，让上层代码知道。另一种是，在捕获异常时，通过 interrupt 方法把中断状态重新设置为true。

下面，就以sleep方法为例，捕获中断异常，然后重新设置中断状态：

```javascript
public class TestInterrupt {
    public static void main(String[] args) throws InterruptedException {

        Thread t = new Thread(new Runnable() {
            private int count = 0;
            @Override
            public void run() {
                try {
                    count = new Random().nextInt(1000);
                    count = count * count;
                    System.out.println("count:"+count);
                    Thread.sleep(5000);
                } catch (Exception e) {
                    System.out.println(Thread.currentThread().getName()+"线程第一次中断标志："+Thread.currentThread().isInterrupted());
                    //重新把线程中断状态设置为true，以便上层代码判断
                    Thread.currentThread().interrupt();
                    System.out.println(Thread.currentThread().getName()+"线程第二次中断标志："+Thread.currentThread().isInterrupted());
                }
            }
        });

        t.start();

        Thread.sleep(100);
        t.interrupt();
    }
}
```

复制

结果：

```javascript
count:208849
Thread-0线程第一次中断标志：false
Thread-0线程第二次中断标志：true
```

复制

## **LockSupport方法介绍**

LockSupport 方法中重要的两个方法就是park 和 unpark 。

**park和interrupt中断**

park方法可以阻塞当前线程，如果调用unpark方法或者中断当前线程，则会从park方法中返回。

park方法对中断方法的响应和 sleep 有一些不太一样。它不会抛出中断异常，而是从park方法直接返回，不影响线程的继续执行。我们看下代码：

```javascript
public class LockSupportTest {
    public static void main(String[] args) throws InterruptedException {
        Thread t = new Thread(new ParkThread());
        t.start();
        Thread.sleep(100); //①
        System.out.println(Thread.currentThread().getName()+"开始唤醒阻塞线程");
        t.interrupt();
        System.out.println(Thread.currentThread().getName()+"结束唤醒");

    }
}

class ParkThread implements Runnable{

    @Override
    public void run() {
        System.out.println(Thread.currentThread().getName()+"开始阻塞");
        LockSupport.park();
        System.out.println(Thread.currentThread().getName()+"第一次结束阻塞");
        LockSupport.park();
        System.out.println("第二次结束阻塞");
    }
}
```

复制

打印结果如下：

```javascript
Thread-0开始阻塞
main开始唤醒阻塞线程
main结束唤醒
Thread-0第一次结束阻塞
第二次结束阻塞
```

复制

当调用interrupt方法时，会把中断状态设置为true，然后park方法会去判断中断状态，如果为true，就直接返回，然后往下继续执行，并不会抛出异常。注意，这里并不会清除中断标志。

**unpark**

unpark会唤醒被park的指定线程。但是，这里要说明的是，unpark 并不是简单的直接去唤醒被park的线程。看下JDK的解释：

![img](https://ask.qcloudimg.com/http-save/7256485/txb4au8ntj.png)

unpark只是给当前线程设置一个许可证。如果当前线程已经被阻塞了（即调用了park），则会转为不阻塞的状态。如若不然，下次调用park方法的时候也会保证不阻塞。这句话的意思，其实是指，park和unpark的调用顺序无所谓，只要unpark设置了这个许可证，park方法就可以在任意时刻消费许可证，从而不会阻塞方法。

还需要注意的是，许可证最多只有一个，也就是说，就算unpark方法调用多次，也不会增加许可证。我们可以通过代码验证，只需要把上边代码修改一行即可：

```javascript
//LockSupportTest类
//原代码
t.interrupt();
//修改为
LockSupport.unpark(t);
LockSupport.unpark(t);
```

复制

就会发现，只有第一次阻塞会被唤醒，但是第二次依然会继续阻塞。结果如下：

```javascript
Thread-0开始阻塞
main开始唤醒阻塞线程
main结束唤醒
Thread-0第一次结束阻塞
```

复制

另外，在此基础上，把主线程的sleep方法去掉（代码中①处），让主线程先运行，也就是有可能先调用unpark方法，然后子线程才开始调用park方法阻塞。我们会发现，出现以下结果，证明了上边我说的park方法和unpark不分先后顺序，park方法可以随时消费许可证。

```javascript
main开始唤醒阻塞线程
main结束唤醒
Thread-0开始阻塞
Thread-0第一次结束阻塞
```

复制

## **park/unpark和 wait/notify区别**

了解了 park/unpark的用法之后，想必你也能分析出来它们和 wait、notify有什么不同之处了。

\1) wait和notify方法必须和同步锁 synchronized一块儿使用。而park/unpark使用就比较灵活了，没有这个限制，可以在任何地方使用。

\2) park/unpark 使用时没有先后顺序，都可以使线程不阻塞（前面代码已验证）。而wait必须在notify前先使用，如果先notify，再wait，则线程会一直等待。

\3) notify只能随机释放一个线程，并不能指定某个特定线程，notifyAll是释放锁对象中的所有线程。而unpark方法可以唤醒指定的线程。

\4)  调用wait方法会使当前线程释放锁资源，但使用的前提是必须已经获得了锁。而park不会释放锁资源。（以下代码验证）

```javascript
public class LockSyncTest {
    private static Object lock = new Object();
    //保存调用park的线程，以便后续唤醒
    private static Thread parkedThread;

    public static void main(String[] args) throws InterruptedException {

        Thread t1 = new Thread(()->{
             synchronized (lock){
                 System.out.println("unpark前");
                 LockSupport.unpark(parkedThread);
                 System.out.println("unpark后");
             }
        });

        Thread t2 = new Thread(new Runnable() {
            @Override
            public void run() {
                //和t1线程用同一把锁时，park不会释放锁资源，若换成this锁，则会释放锁
                synchronized (lock){
                    System.out.println("park前");
                    parkedThread = Thread.currentThread();
                    LockSupport.park();
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    System.out.println("park后");
                }
            }
        });

        t2.start();
        Thread.sleep(100);
        t1.start();

    }
}
//打印结果
//park前
```

复制

以上代码，会一直卡在t2线程，因为park不会释放锁，因此t1也无法执行。

如果把t2的锁换成this锁，即只要和t1不是同一把锁，则t1就会正常执行，然后把t2线程唤醒。打印结果如下：

```javascript
park前
unpark前
unpark后
park后
```