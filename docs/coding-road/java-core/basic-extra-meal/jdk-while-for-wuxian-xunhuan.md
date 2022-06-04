---
category:
  - Java核心
tag:
  - Java
---

# 为什么 JDK 源码中，无限循环大多使用 for(;;)而不是 while(true)?

在知乎上看到 R 大的这篇回答，着实感觉需要分享给在座的各位 javaer 们，真心透彻。

> https://www.zhihu.com/question/52311366/answer/130090347

---

首先是先问是不是再问为什么系列。

在 JDK8u 的 jdk 项目下做个很粗略的搜索：

```
mymbp:/Users/me/workspace/jdk8u/jdk/src
$ egrep -nr "for \\(\\s?;\\s?;" . | wc -l
     369
mymbp:/Users/me/workspace/jdk8u/jdk/src
$ egrep -nr "while \\(true" . | wc -l
     323
```

并没有差多少。

其次，for (;;) 在 Java 中的来源。个人看法是喜欢用这种写法的人，追根溯源是受到 C 语言里的写法的影响。这些人不一定是自己以前写 C 习惯了这样写，而可能是间接受以前写 C 的老师、前辈的影响而习惯这样写的。

在 C 语言里，如果不 include 某些头文件或者自己声明的话，是没有内建的\_Bool / bool 类型，也没有 TRUE / FALSE / true / false 这些\_Bool / bool 类型值的字面量的。

所以，假定没有 include 那些头文件或者自己 define 出上述字面量，一个不把循环条件写在 while (...)括号里的 while 语句，最常见的是这样：

```
while (1) {
    /* ... */
  }
```

…但不是所有人都喜欢看到那个魔数“1”的。

而用 for (;;)来表达不写循环条件（也就是循环体内不用 break 或 goto 就会是无限循环）则非常直观——这就是 for 语句本身的功能，而且不需要写任何魔数。所以这个写法就流传下来了。

顺带一提，在 Java 里我是倾向于写 while (true)的，不过我也不介意别人在他们自己的项目里写 for (;;)。

=====================================

至于 Java 里 while (true)与 for (;;)哪个“效率更高”。这种规范没有规定的问题，答案都是“看实现”，毕竟实现只要保证语义符合规范就行了，而效率并不在规范管得着的范畴内。

以 Oracle/Sun JDK8u / OpenJDK8u 的实现来看，首先看 javac 对下面俩语句的编译结果：

```java
public void foo() {
    int i = 0;
    while (true) { i++; }
  }

/*
  public void foo();
    Code:
      stack=1, locals=2, args_size=1
         0: iconst_0
         1: istore_1
         2: iinc          1, 1
         5: goto          2
*/
```

与

````java
public void bar() {
    int i = 0;
    for (;;) { i++; }
  }```

/*
  public void bar();
    Code:
      stack=1, locals=2, args_size=1
         0: iconst_0
         1: istore_1
         2: iinc          1, 1
         5: goto          2
*/
````

连 javac 这种几乎什么优化都不做（只做了 Java 语言规范规定一定要做的常量折叠，和非常少量别的优化）的编译器，对上面俩版本的代码都生成了一样的字节码。后面到解释执行、JIT 编译之类的就不用说了，输入都一样，输出也不会不同。

---

分享的最后，二哥简单说几句。

可能在我们普通人眼中，这种问题完全没有求真的必要性，但 R 大认真去研究了，并且得出了非常令人信服的答案。

所以，牛逼之人必有三连之处啊。

以后就可以放心大胆在代码里写 `for(;;) while(true)` 这样的死循环了。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png)
