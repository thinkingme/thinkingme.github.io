---
category:
  - Java核心
tag:
  - Java
---

# 详解 Java 中 Comparable 和 Comparator 的区别

那天，小二去马蜂窝面试，面试官老王一上来就甩给了他一道面试题：请问 Comparable 和 Comparator 有什么区别？小二差点笑出声，因为三年前，也就是 2021 年，他在《Java 程序员进阶之路》专栏上看到过这题 😆。

Comparable 和 Comparator 是 Java 的两个接口，从名字上我们就能够读出来它们俩的相似性：以某种方式来比较两个对象。但它们之间到底有什么区别呢？请随我来，打怪进阶喽！

### 01、Comparable

Comparable 接口的定义非常简单，源码如下所示。

```java
public interface Comparable<T> {
    int compareTo(T t);
}
```

如果一个类实现了 Comparable 接口（只需要干一件事，重写 `compareTo()` 方法），就可以按照自己制定的规则将由它创建的对象进行比较。下面给出一个例子。

```java
public class Cmower implements Comparable<Cmower> {
    private int age;
    private String name;

    public Cmower(int age, String name) {
        this.age = age;
        this.name = name;
    }

    @Override
    public int compareTo(Cmower o) {
        return this.getAge() - o.getAge();
    }

    public static void main(String[] args) {
        Cmower wanger = new Cmower(19,"沉默王二");
        Cmower wangsan = new Cmower(16,"沉默王三");

        if (wanger.compareTo(wangsan) < 0) {
            System.out.println(wanger.getName() + "比较年轻有为");
        } else {
            System.out.println(wangsan.getName() + "比较年轻有为");
        }
    }
}
```

在上面的示例中，我创建了一个 Cmower 类，它有两个字段：age 和 name。Cmower 类实现了 Comparable 接口，并重写了 `compareTo()` 方法。

程序输出的结果是“沉默王三比较年轻有为”，因为他比沉默王二小三岁。这个结果有什么凭证吗？

凭证就在于 `compareTo()` 方法，该方法的返回值可能为负数，零或者正数，代表的意思是该对象按照排序的规则小于、等于或者大于要比较的对象。如果指定对象的类型与此对象不能进行比较，则引发 `ClassCastException` 异常（自从有了泛型，这种情况就少有发生了）。

### 02、Comparator

Comparator 接口的定义相比较于 Comparable 就复杂的多了，不过，核心的方法只有两个，来看一下源码。

```java
public interface Comparator<T> {
    int compare(T o1, T o2);
    boolean equals(Object obj);
}
```

第一个方法 `compare(T o1, T o2)` 的返回值可能为负数，零或者正数，代表的意思是第一个对象小于、等于或者大于第二个对象。

第二个方法 `equals(Object obj)` 需要传入一个 Object 作为参数，并判断该 Object 是否和 Comparator 保持一致。

有时候，我们想让类保持它的原貌，不想主动实现 Comparable 接口，但我们又需要它们之间进行比较，该怎么办呢？

Comparator 就派上用场了，来看一下示例。

1）原封不动的 Cmower 类。

```java
public class Cmower  {
    private int age;
    private String name;

    public Cmower(int age, String name) {
        this.age = age;
        this.name = name;
    }
}
```

（说好原封不动，getter/setter 吃了啊）

Cmower 类有两个字段：age 和 name，意味着该类可以按照 age 或者 name 进行排序。

2）再来看 Comparator 接口的实现类。

```java
public class CmowerComparator implements Comparator<Cmower> {
    @Override
    public int compare(Cmower o1, Cmower o2) {
        return o1.getAge() - o2.getAge();
    }
}
```

按照 age 进行比较。当然也可以再实现一个比较器，按照 name 进行自然排序，示例如下。

```java
public class CmowerNameComparator implements Comparator<Cmower> {
    @Override
    public int compare(Cmower o1, Cmower o2) {
        if (o1.getName().hashCode() < o2.getName().hashCode()) {
            return -1;
        } else if (o1.getName().hashCode() == o2.getName().hashCode()) {
            return 0;
        }
        return 1;
    }
}
```

3）再来看测试类。

```java
Cmower wanger = new Cmower(19,"沉默王二");
Cmower wangsan = new Cmower(16,"沉默王三");
Cmower wangyi = new Cmower(28,"沉默王一");

List<Cmower> list = new ArrayList<>();
list.add(wanger);
list.add(wangsan);
list.add(wangyi);

list.sort(new CmowerComparator());

for (Cmower c : list) {
    System.out.println(c.getName());
}
```

创建了三个对象，age 不同，name 不同，并把它们加入到了 List 当中。然后使用 List 的 `sort()` 方法进行排序，来看一下输出的结果。

```
沉默王三
沉默王二
沉默王一
```

这意味着沉默王三的年纪比沉默王二小，排在第一位；沉默王一的年纪比沉默王二大，排在第三位。和我们的预期完全符合。

### 03、到底该用哪一个呢？

通过上面的两个例子可以比较出 Comparable 和 Comparator 两者之间的区别：

- 一个类实现了 Comparable 接口，意味着该类的对象可以直接进行比较（排序），但比较（排序）的方式只有一种，很单一。
- 一个类如果想要保持原样，又需要进行不同方式的比较（排序），就可以定制比较器（实现 Comparator 接口）。
- Comparable 接口在 `java.lang` 包下，而 `Comparator` 接口在 `java.util` 包下，算不上是亲兄弟，但可以称得上是表（堂）兄弟。

举个不恰当的例子。我想从洛阳出发去北京看长城，体验一下好汉的感觉，要么坐飞机，要么坐高铁；但如果是孙悟空的话，翻个筋斗就到了。我和孙悟空之间有什么区别呢？孙悟空自己实现了 Comparable 接口（他那年代也没有飞机和高铁，没得选），而我可以借助 Comparator 接口（现代化的交通工具）。

---

好了，关于 Comparable 和 Comparator 我们就先聊这么多。总而言之，如果对象的排序需要基于自然顺序，请选择 `Comparable`，如果需要按照对象的不同属性进行排序，请选择 `Comparator`。

![](https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/xingbiaogongzhonghao.png)
