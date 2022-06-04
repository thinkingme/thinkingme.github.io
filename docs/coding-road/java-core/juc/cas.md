---
category:
  - Java核心
  - 并发编程
tag:
  - Java
---

# Java 实现 CAS 的原理

在并发编程中我们都知道`i++`操作是非线程安全的，这是因为 `i++`操作不是原子操作。

如何保证原子性呢？常用的方法就是`加锁`。在 Java 语言中可以使用 `synchronized`和`CAS`实现加锁效果。

`synchronized`是悲观锁，线程开始执行第一步就是获取锁，一旦获得锁，其他的线程进入后就会阻塞等待锁。如果不好理解，举个生活中的例子：一个人进入厕所后首先把门锁上（获取锁），然后开始上厕所，这个时候有其他人来了只能在外面等（阻塞），就算再急也没用。上完厕所完事后把门打开（解锁），其他人就可以进入了。

![](https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/thread/cas-973e8804-c713-43f6-9a63-4b9f2be54f10.png)

`CAS`是乐观锁，线程执行的时候不会加锁，假设没有冲突去完成某项操作，如果因为冲突失败了就重试，最后直到成功为止。

## 乐观锁与悲观锁的概念

锁可以从不同的角度分类。其中，乐观锁和悲观锁是一种分类方式。

**悲观锁：**

悲观锁就是我们常说的锁。对于悲观锁来说，它总是认为每次访问共享资源时会发生冲突，所以必须对每次数据操作加上锁，以保证临界区的程序同一时间只能有一个线程在执行。

**乐观锁：**

乐观锁又称为“无锁”，顾名思义，它是乐观派。乐观锁总是假设对共享资源的访问没有冲突，线程可以不停地执行，无需加锁也无需等待。而一旦多个线程发生冲突，乐观锁通常是使用一种称为 CAS 的技术来保证线程执行的安全性。

由于无锁操作中没有锁的存在，因此不可能出现死锁的情况，也就是说**乐观锁天生免疫死锁**。

乐观锁多用于“读多写少“的环境，避免频繁加锁影响性能；而悲观锁多用于”写多读少“的环境，避免频繁失败和重试影响性能。

## CAS 的概念

CAS 的全称是：比较并交换（Compare And Swap）。在 CAS 中，有这样三个值：

- V：要更新的变量(var)
- E：预期值(expected)
- N：新值(new)

比较并交换的过程如下：

判断 V 是否等于 E，如果等于，将 V 的值设置为 N；如果不等，说明已经有其它线程更新了 V，则当前线程放弃更新，什么都不做。

所以这里的**预期值 E 本质上指的是“旧值”**。

我们以一个简单的例子来解释这个过程：

1. 如果有一个多个线程共享的变量`i`原本等于 5，我现在在线程 A 中，想把它设置为新的值 6;
2. 我们使用 CAS 来做这个事情；
3. 首先我们用 i 去与 5 对比，发现它等于 5，说明没有被其它线程改过，那我就把它设置为新的值 6，此次 CAS 成功，`i`的值被设置成了 6；
4. 如果不等于 5，说明`i`被其它线程改过了（比如现在`i`的值为 2），那么我就什么也不做，此次 CAS 失败，`i`的值仍然为 2。

在这个例子中，`i`就是 V，5 就是 E，6 就是 N。

那有没有可能我在判断了`i`为 5 之后，正准备更新它的新值的时候，被其它线程更改了`i`的值呢？

不会的。因为 CAS 是一种原子操作，它是一种系统原语，是一条 CPU 的原子指令，从 CPU 层面保证它的原子性

**当多个线程同时使用 CAS 操作一个变量时，只有一个会胜出，并成功更新，其余均会失败，但失败的线程并不会被挂起，仅是被告知失败，并且允许再次尝试，当然也允许失败的线程放弃操作。**

## Java 实现 CAS 的原理 - Unsafe 类

前面提到，CAS 是一种原子操作。那么 Java 是怎样来使用 CAS 的呢？我们知道，在 Java 中，如果一个方法是 native 的，那 Java 就不负责具体实现它，而是交给底层的 JVM 使用 c 或者 c++去实现。

在 Java 中，有一个`Unsafe`类，它在`sun.misc`包中。它里面是一些`native`方法，其中就有几个关于 CAS 的：

```java
boolean compareAndSwapObject(Object o, long offset,Object expected, Object x);
boolean compareAndSwapInt(Object o, long offset,int expected,int x);
boolean compareAndSwapLong(Object o, long offset,long expected,long x);
```

当然，他们都是`public native`的。

Unsafe 中对 CAS 的实现是 C++写的，它的具体实现和操作系统、CPU 都有关系。

Linux 的 X86 下主要是通过`cmpxchgl`这个指令在 CPU 级完成 CAS 操作的，但在多处理器情况下必须使用`lock`指令加锁来完成。当然不同的操作系统和处理器的实现会有所不同，大家可以自行了解。

当然，Unsafe 类里面还有其它方法用于不同的用途。比如支持线程挂起和恢复的`park`和`unpark`， LockSupport 类底层就是调用了这两个方法。还有支持反射操作的`allocateInstance()`方法。

## 原子操作-AtomicInteger 类源码简析

上面介绍了 Unsafe 类的几个支持 CAS 的方法。那 Java 具体是如何使用这几个方法来实现原子操作的呢？

JDK 提供了一些用于原子操作的类，在`java.util.concurrent.atomic`包下面。在 JDK 11 中，有如下 17 个类：

![原子类](https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/thread/cas-f6a2281a-d322-4022-8c07-162ccc9dcede.jpg)

从名字就可以看得出来这些类大概的用途：

- 原子更新基本类型
- 原子更新数组
- 原子更新引用
- 原子更新字段（属性）

这里我们以`AtomicInteger`类的`getAndAdd(int delta)`方法为例，来看看 Java 是如何实现原子操作的。

先看看这个方法的源码：

```java
public final int getAndAdd(int delta) {
    return U.getAndAddInt(this, VALUE, delta);
}
```

这里的 U 其实就是一个`Unsafe`对象：

```java
private static final jdk.internal.misc.Unsafe U = jdk.internal.misc.Unsafe.getUnsafe();
```

所以其实`AtomicInteger`类的`getAndAdd(int delta)`方法是调用`Unsafe`类的方法来实现的：

```java
@HotSpotIntrinsicCandidate
public final int getAndAddInt(Object o, long offset, int delta) {
    int v;
    do {
        v = getIntVolatile(o, offset);
    } while (!weakCompareAndSetInt(o, offset, v, v + delta));
    return v;
}
```

> 注：这个方法是在 JDK 1.8 才新增的。在 JDK1.8 之前，`AtomicInteger`源码实现有所不同，是基于 for 死循环的，有兴趣的读者可以自行了解一下。

我们来一步步解析这段源码。首先，对象`o`是`this`，也就是一个`AtomicInteger`对象。然后`offset`是一个常量`VALUE`。这个常量是在`AtomicInteger`类中声明的：

```java
private static final long VALUE = U.objectFieldOffset(AtomicInteger.class, "value");
```

同样是调用的`Unsafe`的方法。从方法名字上来看，是得到了一个对象字段偏移量。

> 用于获取某个字段相对 Java 对象的“起始地址”的偏移量。
>
> 一个 java 对象可以看成是一段内存，各个字段都得按照一定的顺序放在这段内存里，同时考虑到对齐要求，可能这些字段不是连续放置的，
>
> 用这个方法能准确地告诉你某个字段相对于对象的起始内存地址的字节偏移量，因为是相对偏移量，所以它其实跟某个具体对象又没什么太大关系，跟 class 的定义和虚拟机的内存模型的实现细节更相关。

继续看源码。前面我们讲到，CAS 是“无锁”的基础，它允许更新失败。所以经常会与 while 循环搭配，在失败后不断去重试。

这里声明了一个 v，也就是要返回的值。从`getAndAddInt`来看，它返回的应该是原来的值，而新的值的`v + delta`。

这里使用的是**do-while 循环**。这种循环不多见，它的目的是**保证循环体内的语句至少会被执行一遍**。这样才能保证 return 的值`v`是我们期望的值。

循环体的条件是一个 CAS 方法：

```java
public final boolean weakCompareAndSetInt(Object o, long offset,
                                          int expected,
                                          int x) {
    return compareAndSetInt(o, offset, expected, x);
}

public final native boolean compareAndSetInt(Object o, long offset,
                                             int expected,
                                             int x);
```

可以看到，最终其实是调用的我们之前说到了 CAS `native`方法。那为什么要经过一层`weakCompareAndSetInt`呢？从 JDK 源码上看不出来什么。在 JDK 8 及之前的版本，这两个方法是一样的。

> 而在 JDK 9 开始，这两个方法上面增加了@HotSpotIntrinsicCandidate 注解。这个注解允许 HotSpot VM 自己来写汇编或 IR 编译器来实现该方法以提供性能。也就是说虽然外面看到的在 JDK9 中 weakCompareAndSet 和 compareAndSet 底层依旧是调用了一样的代码，但是不排除 HotSpot VM 会手动来实现 weakCompareAndSet 真正含义的功能的可能性。

根据本文第一篇参考文章（文末链接），它跟`volatile`有关。

简单来说，`weakCompareAndSet`操作仅保留了`volatile`自身变量的特性，而除去了 happens-before 规则带来的内存语义。也就是说，`weakCompareAndSet`**无法保证处理操作目标的 volatile 变量外的其他变量的执行顺序( 编译器和处理器为了优化程序性能而对指令序列进行重新排序 )，同时也无法保证这些变量的可见性。**这在一定程度上可以提高性能。

再回到循环条件上来，可以看到它是在不断尝试去用 CAS 更新。如果更新失败，就继续重试。那为什么要把获取“旧值”v 的操作放到循环体内呢？其实这也很好理解。前面我们说了，CAS 如果旧值 V 不等于预期值 E，它就会更新失败。说明旧的值发生了变化。那我们当然需要返回的是被其他线程改变之后的旧值了，因此放在了 do 循环体内。

## CAS 实现原子操作的三大问题

这里介绍一下 CAS 实现原子操作的三大问题及其解决方案。

### ABA 问题

所谓 ABA 问题，就是一个值原来是 A，变成了 B，又变回了 A。这个时候使用 CAS 是检查不出变化的，但实际上却被更新了两次。

ABA 问题的解决思路是在变量前面追加上**版本号或者时间戳**。从 JDK 1.5 开始，JDK 的 atomic 包里提供了一个类`AtomicStampedReference`类来解决 ABA 问题。

这个类的`compareAndSet`方法的作用是首先检查当前引用是否等于预期引用，并且检查当前标志是否等于预期标志，如果二者都相等，才使用 CAS 设置为新的值和标志。

```java
public boolean compareAndSet(V   expectedReference,
                             V   newReference,
                             int expectedStamp,
                             int newStamp) {
    Pair<V> current = pair;
    return
        expectedReference == current.reference &&
        expectedStamp == current.stamp &&
        ((newReference == current.reference &&
          newStamp == current.stamp) ||
         casPair(current, Pair.of(newReference, newStamp)));
}
```

### 循环时间长开销大

CAS 多与自旋结合。如果自旋 CAS 长时间不成功，会占用大量的 CPU 资源。

解决思路是让 JVM 支持处理器提供的**pause 指令**。

pause 指令能让自旋失败时 cpu 睡眠一小段时间再继续自旋，从而使得读操作的频率低很多,为解决内存顺序冲突而导致的 CPU 流水线重排的代价也会小很多。

### 只能保证一个共享变量的原子操作

这个问题你可能已经知道怎么解决了。有两种解决方案：

1. 使用 JDK 1.5 开始就提供的`AtomicReference`类保证对象之间的原子性，把多个变量放到一个对象里面进行 CAS 操作；
2. 使用锁。锁内的临界区代码可以保证只有当前线程能操作。

---

> 编辑：沉默王二，内容大部分来源以下三个开源仓库：
>
> - [深入浅出 Java 多线程](http://concurrent.redspider.group/)
> - [并发编程知识总结](https://github.com/CL0610/Java-concurrency)
> - [Java 八股文](https://github.com/CoderLeixiaoshuai/java-eight-part)

<img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/xingbiaogongzhonghao.png">
