---
category:
  - Java核心
tag:
  - Java
---

# instanceof 关键字是如何实现的？

小二那天去面试，碰到了这个问题：“**instanceof 关键字是如何实现的**？”面试官希望他能从底层来分析一下，结果小二没答上来，就来问我。

我唯唯诺诺，强装镇定，只好把 R 大的一篇回答甩给了他，并且叮嘱他：“认认真真看，玩完后要是还不明白，再来问我。。。”

> 作者：RednaxelaFX，整理：沉默王二，链接：https://www.zhihu.com/question/21574535/answer/18998914

![](https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/basic-extra-meal/instanceof-jvm-b676fee6-bfd4-4ae9-9c7b-e488e345f775.gif)

---

### 场景一：月薪 3000 元一下的码农职位

用 Java 伪代码来表现 instanceof 关键字在 Java 语言规范所描述的运行时语义，是这样的：

```java
// obj instanceof T
boolean result;
if (obj == null) {
  result = false;
} else {
  try {
      T temp = (T) obj; // checkcast
      result = true;
  } catch (ClassCastException e) {
      result = false;
  }
}
```

用中文说就是：如果有表达式 `obj instanceof T`，那么如果 obj 不为 null 并且 (T) obj 不抛 ClassCastException 异常则该表达式值为 true ，否则值为 false 。

如果面试官说“这不是废话嘛”，进入场景二。

### 场景二：月薪 6000-8000 的 Java 研发职位

JVM 有一条名为 instanceof 的指令，而 Java 源码编译到 Class 文件时会把 Java 语言中的 instanceof 运算符映射到 JVM 的 instanceof 指令上。

javac 是这样做的：

- instanceof 是 javac 能识别的一个关键字，对应到 Token.INSTANCEOF 的 token 类型。做词法分析的时候扫描到"instanceof"关键字就映射到了一个 Token.INSTANCEOF token。
- 该编译器的抽象语法树节点有一个 JCTree.JCInstanceOf 类用于表示 instanceof 运算。做语法分析的时候解析到[instanceof 运算符](https://tobebetterjavaer.com/oo/instanceof.html)就会生成这个 JCTree.JCInstanceof 类型的节点。
- 中途还得根据 Java 语言规范对 instanceof 运算符的编译时检查的规定把有问题的情况找出来。
- 到最后生成字节码的时候为 JCTree.JCInstanceof 节点生成 instanceof 字节码指令。

回答到这层面就已经能解决好些实际问题了，如果面试官还说，“这不还是废话嘛”，进入场景三。

### 场景三：月薪 10000 的 Java 高级研发职位

先简单介绍一下 instanceof 的字节码：

- 操作：确定对象是否为给定的类型
- 指令格式：instanceof|indexbyte1|indexbyte2
- 指令执行前后的栈顶状态：
  - ……，objectref=>
  - ……，result

再简单描述下：indexbyte1 和 indexbyte2 用于构造对当前类的常量池的索引，objectref 为 reference 类型，可以是某个类，数组的实例或者是接口。

基本的实现过程：对 indexbyte1 和 indexbyte2 构造的常量池索引进行解析，然后根据 java 规范判断解析的类是不是 objectref 的一个实例，最后在栈顶写入结果。

基本上就是根据规范来 YY 下实现，就能八九不离十蒙混过关了。

如果面试官还不满意，进入场景四。

### 场景四：月薪 10000 以上的 Java 资深研发职位

这个岗位注重性能调优什么的，R 大说可以上论文了：

> https://dl.acm.org/doi/10.1145/583810.583821

论文我也看不懂，所以这里就不 BB 了。（逃

篇论文描述了 HotSpot VM 做子类型判断的算法，这里简单补充一下 JDK6 至今的 HotSpot VM 实际采用的算法：

```java
S.is_subtype_of(T) := {
  int off = T.offset;
  if (S == T) return true;
  if (T == S[off]) return true;
  if (off != &cache) return false;
  if ( S.scan_secondary_subtype_array(T) ) {
    S.cache = T;
    return true;
  }
  return false;
}
```

HotSpot VM 的两个编译器，Client Compiler (C1) 与 Server Compiler (C2) 各自对子类型判断的实现有更进一步的优化。实际上在 JVM 里，instanceof 的功能就实现了 4 份，VM runtime、解释器、C1、C2 各一份。

VM runtime 的：

> http://hg.openjdk.java.net/jdk7u/jdk7u/hotspot/file/tip/src/share/vm/oops/oop.inline.hpp

分享的最后，二哥简单来说一下。

这个问题涉及语法细节，涉及 jvm 实现，涉及编译器，还涉及一点点数据结构设计，比较考验一个 Java 程序员的内功，如果要回答到论文的程度，那真的是，面试官也得提前备好知识点，不然应聘者的回答啥也听不懂就挺尴尬的。

反正 R 大回答里的很多细节我都是第一次听，逃了逃了。。。。。。

![](https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/xingbiaogongzhonghao.png)
