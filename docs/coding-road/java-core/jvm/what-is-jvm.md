---
category:
  - Java核心
  - JVM
tag:
  - Java
---

# JVM 到底是什么？

“二哥，之前的文章里提到 JVM，说实在的， 我还不知道它到底是干嘛的，你能给我普及一下吗？”三妹咪了一口麦香可可奶茶后对我说。

“三妹，不要担心，这篇文章来带你认识一下什么是 JVM，这也是 Java 中非常重要的一块知识，每个程序员都应该了解的。”说完最后这句话，我脸上忍不住泛起了一阵羞涩的红晕。

看过《[Java 发展简史](https://mp.weixin.qq.com/s/Ctouw652iC0qtrmjen9aEw)》的小伙伴应该知道，Sun 在 1991 年成立了一个由詹姆斯·高斯林（James Gosling）领导的，名为“Green”的项目组，目的是开发一种能够在各种消费性电子产品上运行的程序架构。

一开始，项目组打算使用 C++，但 C++ 无法达到跨平台的要求，比如在 Windows 系统下编译的 Hello.exe 无法直接拿到 Linux 环境下执行。

![](https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/overview/seven-01.png)

在当时，C++ 已经非常流行了，但无法跨平台，只能忍痛割爱了。

怎么办呢？

三妹不知道有没有听过直译器（解释器）这玩意？（估计你没听过）就是每跑一行代码就生成机器码，然后执行，比如说 Python 和 Ruby 用的就是直译器。在每个操作系统上装一个直译器就好了，跨平台的目的就达到了。

![](https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/overview/seven-02.png)

但直译器有个缺点，就是没法像编译器那样对一些热点代码进行优化，从而让机器码跑得更快一些。

怎么办呢？

来个结合体呗，编译器和直译器一块上！

![](https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/overview/seven-03.png)

编译器负责把 Java 源代码编译成字节码（不清楚的小伙伴可以点击链接查看[上一节](https://mp.weixin.qq.com/s/GYDFndO0Q1Nqzcc_Te61gw)），Java 虚拟机（Java Virtual Machine，简称 JVM） 负责把字节码转换成机器码。转换的时候，可以做一些压缩或者优化，这样的机器码跑起来就快多了。

不仅跨平台的目的达到了，而且性能得到了优化。

三妹是不是想问，“为什么 Java 虚拟机会叫 Java 虚拟机呢？”

虚拟机，顾名思义，就是虚拟的机器（多苍白的解释），反正就是看不见摸不着的机器，把它想象成一个会执行字节码的怪兽吧。

记得上大学那会，由于没有 Linux 环境，但又需要在上面玩一些命令，于是就在 Windows 上装 Linux 的虚拟机，这个 JVM 就类似这种东西。

说白了，就是我们编写 Java 代码，编译 Java 代码，目的不是让它在 Linux、Windows 或者 MacOS 上跑，而是在 JVM 上跑。

说到这，三妹是不是想问，“都有哪些 Java 虚拟机呢？”来看下面这张思维导图：

![](https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/overview/seven-04.png)

除了我们经常看到，经常听到的 Hotspot VM，还有很多，下面我来简单介绍一下。

- Sun Classic：世界上第一款商用 Java 虚拟机，但执行效率低下，导致 Java 程序的性能和 C/C++ 存在很大差距，因此给后来者留下了“Java 语言很慢”的刻板印象。

- Exact VM：为了提升 Classic 的效率，Sun 的虚拟机团队曾在 Solaris（Sun 研发的一款类似 Unix 的操作系统）上发布过这款虚拟机，它的执行系统里包含有热点探测、即时编译等，但不是很成熟。

Sun Classic 在 JDK 1.4 的时候被彻底抛弃，而 Exact VM 被抛弃得更早，取代它的正是 HotSpot VM——时也命也。

- HotSpot VM：OracleJDK（商用）和 OpenJDK（开源）的默认虚拟机，也是目前使用最广泛的 Java 虚拟机。

HotSpot 的技术优势就在于热点代码探测技术（名字就从这来）和准确式内存管理技术，但其实这两个技术在 Exact VM 中都有体现，因此你看起个好的名字多重要（开玩笑了，这就是命）。

热点代码探测，指的是，通过执行计数器找出最具有编译价值的代码，然后通知即时编译器以方法为单位进行编译，解释器就可以不再逐行的将字节码翻译成机器码，而是将一整个方法的所有字节码翻译成机器码再执行。

这样的话，效率就提高了很多，对吧？

- Mobile VM：Java 在移动手机端（被 Android 和 IOS 二分天下）的发展并没有那么成功，因此 Mobile VM 的声望值比较低。

- Embedded VM：嵌入式设备上的虚拟机。

- BEA JRockit：曾经号称是“世界上最快的 Java 虚拟机”，后来被 Oracle 收购后就没有声音了。

- IBM J9 VM：提起 IBM，基本上所有程序员都知道了，也是个巨头，所以他家的虚拟机也很强，在职责分离和模块化上做得比 HotSpot 更好。目前已经开源给 Eclipse 基金会。

- BEA Liquid VM：是 BEA 公司开发的可以直接运行在自家系统上的虚拟机，可以越过操作系统直接和硬件打交道，因此可以更大程度上的发挥硬件的能力。不过核心用的还是 JRockit，所以伴随着 JRockit 的消失，Liquid VM 也退出历史舞台了。

- Azul VM：是 Azul 公司在 HotSpot 基础上进行大量改进后的，可以运行在 Azul 公司专有硬件上的虚拟机。2010 年起，Azul 公司的重心从硬件转移到软件上，并发布了 Zing 虚拟机，性能方面很强大。

- Apache Harmony 和 Google Android Dalvik VM 并不是 严格意义上的 Java 虚拟机，但对 Java 虚拟机的发展起到了很大的刺激作用。但它们终究没有熬过时间。

- Microsoft JVM：在早期的 Java Applets 年代，微软为了在 IE 中支持 Applets 开发了自己的 Java 虚拟机。你敢相信？Microsoft JVM 只有 Windows 版本，它与 JVM 实现的“一次编译，到处运行”的理念完全沾不上边。

关键是，1997 年 10 月，Sun 公司因为这事把微软告了，最后微软赔给了 Sun 公司 2000 万美金，并且终止了在 Java 虚拟机方面的发展。如果，我是说如果，如果微软保持着对 Java 的热情，后面还有 .Net 什么事？

![](https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/overview/seven-05.png)

解释了这么多 Java 虚拟机后，三妹是不是想问，“Java 虚拟机长什么样子呢？”

Java 虚拟机虽然是虚拟的，但它的内部是可以划分为：

- 类加载器（Class Loader）
- 运行时数据区（Runtime Data Areas）
- 执行引擎（Excution Engine）

![](https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/overview/seven-06.png)

**1）类加载器**

类加载器是 Java 虚拟机的一个子系统，用于加载类文件。每当我们运行一个 Java 程序，它都会由类加载器首先加载。

一般来说，Java 程序员并不需要直接同类加载器进行交互。JVM 默认的行为就已经足够满足大多数情况的需求了。不过，如果遇到了需要和类加载器进行交互的情况，而对类加载器的机制又不是很了解的话，就不得不花大量的时间去调试
`ClassNotFoundException` 和 `NoClassDefFoundError` 等异常。

对于任意一个类，都需要由它的类加载器和这个类本身一同确定其在 JVM 中的唯一性。也就是说，如果两个类的加载器不同，即使两个类来源于同一个字节码文件，那这两个类就必定不相等（比如两个类的 Class 对象不 `equals`）。

来通过一段简单的代码了解下。

```java
/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class Test {
    public static void main(String[] args) {
        ClassLoader loader = Test.class.getClassLoader();
        while (loader != null) {
            System.out.println(loader);
            loader = loader.getParent();
        }
    }
}
```

每个 Java 类都维护着一个指向定义它的类加载器的引用，通过 `类名.class.getClassLoader()` 可以获取到此引用；然后通过 `loader.getParent()` 可以获取类加载器的上层类加载器。

上面这段代码的输出结果如下：

```
jdk.internal.loader.ClassLoaders$AppClassLoader@512ddf17
jdk.internal.loader.ClassLoaders$PlatformClassLoader@2d209079
```

第一行输出为 Test 的类加载器，即应用类加载器，它是 `jdk.internal.loader.ClassLoaders$AppClassLoader` 类的实例；第二行输出为平台类加载器，是 `jdk.internal.loader.ClassLoaders$PlatformClassLoader` 类的实例。那启动类加载器呢？

按理说，扩展类加载器的上层类加载器是启动类加载器，但启动类加载器是虚拟机的内置类加载器，通常表示为 null。

**2）运行时数据区**

来看下面这张图：

![](https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/overview/seven-07.png)

- PC 寄存器（PC Register），也叫程序计数器（Program Counter Register），是一块较小的内存空间，它的作用可以看做是当前线程所执行的字节码的信号指示器。

- JVM 栈（Java Virtual Machine Stack），与 PC 寄存器一样，JVM 栈也是线程私有的。每一个 JVM 线程都有自己的 JVM 栈，这个栈与线程同时创建，它的生命周期与线程相同。

- 本地方法栈（Native Method Stack），JVM 可能会使用到传统的栈来支持 Native 方法（使用 Java 语言以外的其它语言［C 语言］编写的方法）的执行，这个栈就是本地方法栈。

- 堆（Heap），在 JVM 中，堆是可供各条线程共享的运行时内存区域，也是供所有类实例和数据对象分配内存的区域。

- 方法区（Method area），在 JVM 中，被加载类型的信息都保存在方法区中。包括类型信息（Type Information）和方法列表（Method Tables）。方法区是所有线程共享的，所以访问方法区信息的方法必须是线程安全的。

- 运行时常量池（Runtime Constant Pool），运行时常量池是每一个类或接口的常量池在运行时的表现形式，它包括了编译器可知的数值字面量，以及运行期解析后才能获得的方法或字段的引用。简而言之，当一个方法或者变量被引用时，JVM 通过运行时常量区来查找方法或者变量在内存里的实际地址。

**3）执行引擎**

执行引擎包含了：

- 解释器：读取字节码流，然后执行指令。因为它是一行一行地解释和执行指令，所以它可以很快地解释字节码，但是执行起来会比较慢（毕竟要一行执行完再执行下一行）。

- 即时（Just-In-Time，JIT）编译器：即时编译器用来弥补解释器的缺点，提高性能。执行引擎首先按照解释执行的方式来执行，然后在合适的时候，即时编译器把整段字节码编译成本地代码。然后，执行引擎就没有必要再去解释执行方法了，它可以直接通过本地代码去执行。执行本地代码比一条一条进行解释执行的速度快很多。编译后的代码可以执行的很快，因为本地代码是保存在缓存里的。

“三妹，关于 Java 虚拟机，今天我们就学到这吧，后面再展开讲，怎么样？”转动了一下僵硬的脖子后，我对三妹说，“Java 虚拟机是一块很大很深的内容，如果一上来学太多的话，我怕难倒你。”

“好的，二哥，我也觉得今天的知识量够了，我要好好消化几天。我会加油的！”三妹似乎对未来充满了希望，这正是我想看到的。

![](https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/xingbiaogongzhonghao.png)
