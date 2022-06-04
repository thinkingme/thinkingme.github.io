---
category:
  - Java核心
tag:
  - Java
---

# Java instanceof 关键字用法

instanceof 关键字的用法其实很简单：

```java
(object) instanceof (type)
```

用意也非常简单，判断对象是否符合指定的类型，结果要么是 true，要么是 false。在反序列化的时候，instanceof 操作符还是蛮常用的，因为这时候我们不太确定对象属不属于指定的类型，如果不进行判断的话，就容易抛出 ClassCastException 异常。

我们来建这样一个简单的类 Round：

```java
class Round {
}
```

然后新增一个扩展类 Ring：

```java
class Ring extends Round {
}
```

这时候，我们就可以通过 instanceof 来检查 Ring 对象是否属于 Round 类型。

```java
Ring ring = new Ring();
System.out.println(ring instanceof Round);
```

结果会输出 true，因为 Ring 继承了 Round，也就意味着 Ring 和 Round 符合 ` is-a` 的关系，而 instanceof 操作符正是基于类与类之间的继承关系，以及类与接口之间的实现关系的。

我们再来新建一个接口 Shape：

```java
interface Shape {
}
```

然后新建 Circle 类实现 Shape 接口并继承 Round 类：

```java
class Circle extends Round implements Shape {
}
```

如果对象是由该类创建的，那么 instanceof 的结果肯定为 true。

```java
Circle circle = new Circle();
System.out.println(circle instanceof Circle);
```

这个肯定没毛病，instanceof 就是干这个活的，大家也很好理解。那如果类型是父类呢？

```java
System.out.println(circle instanceof Round);
```

结果肯定还是 true，因为依然符合 `is-a` 的关系。那如果类型为接口呢？

```java
System.out.println(circle instanceof Shape);
```

结果仍然为 true， 因为也符合 `is-a` 的关系。如果要比较的对象和要比较的类型之间没有关系，当然是不能使用 instanceof 进行比较的。

为了验证这一点，我们来创建一个实现了 Shape 但与 Circle 无关的 Triangle 类：

```java
class Triangle implements Shape {
}
```

这时候，再使用 instanceof 进行比较的话，编译器就报错了。

```java
 System.out.println(circle instanceof Triangle);
```

错误信息如下所示：

```
Inconvertible types; cannot cast 'com.itwanger.twentyfour.instanceof1.Circle' to 'com.itwanger.twentyfour.instanceof1.Triangle'
```

意思就是类型不匹配，不能转换，我们使用 instanceof 比较的目的，也就是希望如果结果为 true 的时候能进行类型转换。但显然 Circle 不能转为 Triangle。

编译器已经提前帮我们预知了，很聪明。

Java 是一门面向对象的编程语言，也就意味着除了基本数据类型，所有的类都会隐式继承 Object 类。所以下面的结果肯定也会输出 true。

```java
Thread thread = new Thread();
System.out.println(thread instanceof Object);
```

“那如果对象为 null 呢？”三妹这时候插话了。

“这个还真的是一个好问题啊。”我忍不住对三妹竖了一个大拇指。

```java
System.out.println(null instanceof Object);
```

只有对象才会有 null 值，所以编译器是不会报错的，只不过，对于 null 来说，instanceof 的结果为 false。因为所有的对象都可以为 null，所以也不好确定 null 到底属于哪一个类。

通常，我们是这样使用 instanceof 操作符的。

```java
// 先判断类型
if (obj instanceof String) {
    // 然后强制转换
    String s = (String) obj;
    // 然后才能使用
}
```

先用 instanceof 进行类型判断，然后再把 obj 强制转换成我们期望的类型再进行使用。

JDK 16 的时候，instanceof 模式匹配转了正，意味着使用 instanceof 的时候更便捷了。

```java
if (obj instanceof String s) {
    // 如果类型匹配 直接使用 s
}
```

可以直接在 if 条件判断类型的时候添加一个变量，就不需要再强转和声明新的变量了。

“哇，这样就简洁了呀！”三妹不仅惊叹到！

好了，关于 instanceof 操作符我们就先讲到这吧，难是一点都不难，希望各位同学也能够很好的掌握。

![](https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/xingbiaogongzhonghao.png)
