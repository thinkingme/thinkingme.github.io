---
category:
  - Java核心
tag:
  - Java
---

# Java 方法

“二哥，[上一节](https://mp.weixin.qq.com/s/UExby8GP3kSacCXliQw8pQ)学了对象和类，这一节我们学什么呢？”三妹满是期待的问我。

“这一节我们来了解一下 Java 中的方法——什么是方法？如何声明方法？方法有哪几种？什么是实例方法？什么是抽象方法？”我笑着对三妹说，“我开始了啊，你不要闪啊。”

### 01、Java 中的方法是什么？

方法用来实现代码的可重用性，我们编写一次方法，并多次使用它。通过增加或者删除方法中的一部分代码，就可以提高整体代码的可读性。

只有方法被调用时，它才会执行。Java 中最有名的方法当属 `main()` 方法，点击下面的链接可以阅读更多关于 `main()` 方法的知识点。

> [零基础学 Java 第 4 讲：Hello World](https://mp.weixin.qq.com/s/191I_2CVOxVuyfLVtb4jhg)

### 02、如何声明方法？

方法的声明反映了方法的一些信息，比如说可见性、返回类型、方法名和参数。如下图所示。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/object-class/17-01.png)

**访问权限**：它指定了方法的可见性。Java 提供了四种访问权限修饰符：

- public：该方法可以被所有类访问。
- private：该方法只能在定义它的类中访问。
- protected：该方法可以被同一个包中的类，或者不同包中的子类访问。
- default：该方法如果没有使用任何访问权限修饰符，Java 默认它使用 default 修饰符，该方法只能被同一个包中类可见。

**返回类型**：方法返回的数据类型，可以是基本数据类型、对象和集合，如果不需要返回数据，则使用 void 关键字。

**方法名**：方法名最好反应出方法的功能，比如，我们要创建一个将两个数字相减的方法，那么方法名最好是 subtract。

方法名最好是一个动词，并且以小写字母开头。如果方法名包含两个以上单词，那么第一个单词最好是动词，然后是形容词或者名词，并且要以驼峰式的命名方式命名。比如：

- 一个单词的方法名：`sum()`
- 多个单词的方法名：`stringComparision()`

一个方法可能与同一个类中的另外一个方法同名，这被称为方法重载。

**参数**：参数被放在一个圆括号内，如果有多个参数，可以使用逗号隔开。参数包含两个部分，参数类型和参数名。如果方法没有参数，圆括号是空的。

**方法签名**：每一个方法都有一个签名，包括方法名和参数。

**方法体**：方法体放在一对花括号内，把一些代码放在一起，用来执行特定的任务。

### 02、方法有哪几种？

方法可以分为两种，一种叫预先定义方法，一种叫用户自定义方法。

**1）预先定义方法**

Java 提供了大量预先定义好的方法供我们调用，也称为标准类库方法，或者内置方法。比如说 String 类的 `length()`、`equals()`、`compare()` 方法，以及我们在初学 Java 阶段最常用的 `println()` 方法，用来在控制台打印信息。

```java
/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class PredefinedMethodDemo {
    public static void main(String[] args) {
        System.out.println("沉默王二，一枚有趣的程序员");
    }
}
```

在上面的代码中，我们使用了两个预先定义的方法，`main()` 方法是程序运行的入口，`println()` 方法是 `PrintStream` 类的一个方法。这些方法已经提前定义好了，所以我们可以直接使用它们。

我们可以通过集成开发工具查看预先定义方法的方法签名，当我们把鼠标停留在 `println()` 方法上面时，就会显示下图中的内容：

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/object-class/17-02.png)

`println()` 方法的访问权限修饰符是 public，返回类型为 void，方法名为 println，参数为 `String x`，以及 Javadoc（方法是干嘛的）。

预先定义方法让编程变得简单了起来，我们只需要在实现某些功能的时候直接调用这些方法即可，不需要重新编写。

**2）用户自定义方法**

当预先定义方法无法满足我们的要求时，就需要自定义一些方法，比如说，我们来定义这样一个方法，用来检查数字是偶数还是奇数。

```java
public static void findEvenOdd(int num) {
    if (num % 2 == 0) {
        System.out.println(num + " 是偶数");
    } else {
        System.out.println(num + " 是奇数");
    }
}
```

方法名叫做 `findEvenOdd`，访问权限修饰符是 public，并且是静态的（static），返回类型是 void，参数有一个整型（int）的 num。方法体中有一个 if else 语句，如果 num 可以被 2 整除，那么就打印这个数字是偶数，否则就打印这个数字是奇数。

方法被定义好后，如何被调用呢？

```java
/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class EvenOddDemo {
    public static void main(String[] args) {
        findEvenOdd(10);
        findEvenOdd(11);
    }

    public static void findEvenOdd(int num) {
        if (num % 2 == 0) {
            System.out.println(num + " 是偶数");
        } else {
            System.out.println(num + " 是奇数");
        }
    }
}
```

`main()` 方法是程序的入口，并且是静态的，那么就可以直接调用同样是静态方法的 `findEvenOdd()`。

当一个方法被 static 关键字修饰时，它就是一个静态方法。换句话说，静态方法是属于类的，不属于类实例的（不需要通过 new 关键字创建对象来调用，直接通过类名就可以调用）。

### 03、什么是实例方法？

没有使用 static 关键字修饰，但在类中声明的方法被称为实例方法，在调用实例方法之前，必须创建类的对象。

```java
/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class InstanceMethodExample {
    public static void main(String[] args) {
        InstanceMethodExample instanceMethodExample = new InstanceMethodExample();
        System.out.println(instanceMethodExample.add(1, 2));
    }

    public int add(int a, int b) {
        return a + b;
    }
}
```

`add()` 方法是一个实例方法，需要创建 InstanceMethodExample 对象来访问。

实例方法有两种特殊类型：

- getter 方法
- setter 方法

getter 方法用来获取私有变量（private 修饰的字段）的值，setter 方法用来设置私有变量的值。

```java
/**
 * @author 沉默王二，一枚有趣的程序员
 */
public class Person {
    private String name;
    private int age;
    private int sex;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getSex() {
        return sex;
    }

    public void setSex(int sex) {
        this.sex = sex;
    }
}
```

getter 方法以 get 开头，setter 方法以 set 开头。

### 04、什么是抽象方法？

没有方法体的方法被称为抽象方法，它总是在抽象类中声明。这意味着如果类有抽象方法的话，这个类就必须是抽象的。可以使用 atstract 关键字创建抽象方法和抽象类。

```java
/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
abstract class AbstractDemo {
    abstract void display();
}
```

当一个类继承了抽象类后，就必须重写抽象方法：

```java
/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class MyAbstractDemo extends AbstractDemo {
    @Override
    void display() {
        System.out.println("重写了抽象方法");
    }

    public static void main(String[] args) {
        MyAbstractDemo myAbstractDemo = new MyAbstractDemo();
        myAbstractDemo.display();
    }
}
```

输出结果如下所示：

```
重写了抽象方法
```

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png)
