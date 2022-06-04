---
category:
  - Java核心
tag:
  - Java
---

# Java 代码初始化块

“哥，今天我们要学习的内容是‘代码初始化块’，对吧？”看来三妹已经提前预习了我上次留给她的作业。

“是的，三妹。代码初始化块用于初始化一些成员变量。 ”我面带着朴实无华的微笑回答着她，“对象在创建的时候会执行代码初始化块。”

“可以直接通过‘=’操作符对成员变量进行初始化，但通过代码初始化块可以做更多的事情，比如说打印出成员变量初始化后的值。”

“三妹，来看下面的代码，我们可以直接通过 `=` 操作符对成员变量进行初始化。”

```java
class Bike{
    int speed=100;
}
```

“哥，那为什么还需要代码初始化块呢？”三妹眨了眨眼睛，不解地问。

“我们可以通过代码初始化块执行一个更复杂的操作，比如为集合填充值。来看下面这段代码。”

```java
public class Bike {
    List<String> list;

    {
        list = new ArrayList<>();
        list.add("沉默王二");
        list.add("沉默王三");
    }

    public static void main(String[] args) {
        System.out.println(new Bike().list);
    }
}
```

“如果只使用‘=’操作符的话，是没办法完成集合初始化的，对吧？‘=’ 后面只能 new 出集合，却没办法填充值，代码初始化就可以完成这项工作。”

“构造方法执行得早还是代码初始化块啊，哥？”三妹这个问题问的还是挺有水平的。

“不要着急，三妹，先来看下面这个例子。”

```java
public class Car {
    Car() {
        System.out.println("构造方法");
    }

    {
        System.out.println("代码初始化块");
    }

    public static void main(String[] args) {
        new Car();
    }
}
```

“我们来看一下程序的输出结果就一下子明白了。”

```
代码初始化块
构造方法
```

“从输出结果看上去，仿佛代码初始化块执行得更早，对吧？事实上是这样子吗？”我露出神秘的微笑，问三妹。

“难道我看到的是假象吗？”三妹睁大了眼睛。

“不是的，对象在初始化的时候会先调用构造方法，这是毫无疑问的，只不过，构造方法在执行的时候会把代码初始化块放在构造方法中其他代码之前，所以，先看到了‘代码初始化块’，后看到了‘’构造方法’。”

说完这句话，我打开 draw.io，使上了吃奶的劲，画出了下面这幅图。

![](https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/object-class/22-01.png)

“哦，原来如此啊！”三妹仿佛发现了新大陆，意味深长地说。

等三妹明白彻底搞明白后，我对她继续说道：“对于代码初始化来说，它有三个规则。”

- 类实例化的时候执行代码初始化块；
- 实际上，代码初始化块是放在构造方法中执行的，只不过比较靠前；
- 代码初始化块里的执行顺序是从前到后的。

“这些规则不用死记硬背，大致了解一下就行了。我们继续来看下面这段代码。”话音刚落，我就在新版的 IDEA 中噼里啪啦地敲了起来，新版真香。

```java
class A {
    A () {
        System.out.println("父类构造方法");
    }
}
public class B extends A{
    B() {
        System.out.println("子类构造方法");
    }

    {
        System.out.println("代码初始化块");
    }

    public static void main(String[] args) {
        new B();
    }
}
```

“来看一下输出结果。”

```
父类构造方法
代码初始化块
子类构造方法
```

“在默认情况下，子类的构造方法在执行的时候会主动去调用父类的构造方法。也就是说，其实是构造方法先执行的，再执行的代码初始化块。”

“这个例子再次印证了之前的第二条规则：代码初始化块是放在构造方法中执行的，只不过比较靠前。”

![](https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/xingbiaogongzhonghao.png)
