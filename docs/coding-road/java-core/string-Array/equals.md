---
category:
  - Java核心
tag:
  - Java
---

# Java 判断两个字符串是否相等？

“哥，如何比较两个字符串相等啊？”三妹问。

“这个问题看似简单，却在 Stack Overflow 上有超过 370 万的访问量。”我说，“这个问题也可以引申为 `.equals()` 和 ‘==’ 操作符有什么区别。”

- “==”操作符用于比较两个对象的地址是否相等。
- `.equals()` 方法用于比较两个对象的内容是否相等。

“不是很理解。”三妹感到很困惑。

“我来举个不恰当又很恰当的例子，一看你就明白了，三妹。”

有一对双胞胎，姐姐叫阿丽塔，妹妹叫洛丽塔。我们普通人可能完全无法分辨谁是姐姐谁是妹妹，可她们的妈妈却可以轻而易举地辨认出。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/string/equals-01.png)

`.equals()` 就好像我们普通人，看见阿丽塔以为是洛丽塔，看见洛丽塔以为是阿丽塔，看起来一样就觉得她们是同一个人；“==”操作符就好像她们的妈妈，要求更严格，观察更细致，一眼就能分辨出谁是姐姐谁是妹妹。

```java
String alita = new String("小萝莉");
String luolita = new String("小萝莉");

System.out.println(alita.equals(luolita)); // true
System.out.println(alita == luolita); // false
```

就上面这段代码来说，`.equals()` 输出的结果为 true，而“==”操作符输出的结果为 false——前者要求内容相等就可以，后者要求必须是同一个对象。

“三妹，之前已经学过了，Java 的所有类都默认地继承 Object 这个超类，该类有一个名为 `.equals()` 的方法。”一边说，我一边打开了 Object 类的源码。

```java
public boolean equals(Object obj) {
    return (this == obj);
}
```

你看，Object 类的 `.equals()` 方法默认采用的是“==”操作符进行比较。假如子类没有重写该方法的话，那么“==”操作符和 `.equals()` 方法的功效就完全一样——比较两个对象的内存地址是否相等。

但实际情况中，有不少类重写了 `.equals()` 方法，因为比较内存地址的要求比较严格，不太符合现实中所有的场景需求。拿 String 类来说，我们在比较字符串的时候，的确只想判断它们俩的内容是相等的就可以了，并不想比较它们俩是不是同一个对象。

况且，字符串有字符串常量池的概念，本身就推荐使用 `String s = "字符串"` 这种形式来创建字符串对象，而不是通过 new 关键字的方式，因为可以把字符串缓存在字符串常量池中，方便下次使用。

“哦，我明白了。”三妹说。

“那就来看一下 `.equals()` 方法的源码吧。”我说。

```java
public boolean equals(Object anObject) {
    if (this == anObject) {
        return true;
    }
    if (anObject instanceof String) {
        String aString = (String)anObject;
        if (coder() == aString.coder()) {
            return isLatin1() ? StringLatin1.equals(value, aString.value)
                    : StringUTF16.equals(value, aString.value);
        }
    }
    return false;
}
```

首先，如果两个字符串对象的可以“==”，那就直接返回 true 了，因为这种情况下，字符串内容是必然相等的。否则就按照字符编码进行比较，分为 UTF16 和 Latin1，差别不是很大，就拿 Latin1 的来说吧。

```java
@HotSpotIntrinsicCandidate
public static boolean equals(byte[] value, byte[] other) {
    if (value.length == other.length) {
        for (int i = 0; i < value.length; i++) {
            if (value[i] != other[i]) {
                return false;
            }
        }
        return true;
    }
    return false;
}
```

我的 JDK 版本是 Java 11，也就是最新的 LTS（长期支持）版本。该版本中，String 类使用字节数组实现的，所以比较两个字符串的内容是否相等时，可以先比较字节数组的长度是否相等，不相等就直接返回 false；否则就遍历两个字符串的字节数组，只有有一个字节不相等，就返回 false。

“嗯，二哥，这段源码不难理解。”三妹自信地说。

“那出几道题考考你吧！”我说。

第一题：

```java
new String("小萝莉").equals("小萝莉")
```

“输出什么呢？”我问。

“`.equals()` 比较的是两个字符串对象的内容是否相等，所以结果为 true。”三妹答。

第二题：

```java
new String("小萝莉") == "小萝莉"
```

“==操作符左侧的是在堆中创建的对象，右侧是在字符串常量池中的对象，尽管内容相同，但内存地址不同，所以返回 false。”三妹答。

第三题：

```java
new String("小萝莉") == new String("小萝莉")
```

“new 出来的对象肯定是完全不同的内存地址，所以返回 false。”三妹答。

第四题：

```java
"小萝莉" == "小萝莉"
```

“字符串常量池中只会有一个相同内容的对象，所以返回 true。”三妹答。

第五题：

```java
"小萝莉" == "小" + "萝莉"
```

“由于‘小’和‘萝莉’都在字符串常量池，所以编译器在遇到‘+’操作符的时候将其自动优化为“小萝莉”，所以返回 true。”

第六题：

```java
new String("小萝莉").intern() == "小萝莉"
```

“`new String("小萝莉")` 在执行的时候，会先在字符串常量池中创建对象，然后再在堆中创建对象；执行 `intern()` 方法的时候发现字符串常量池中已经有了‘小萝莉’这个对象，所以就直接返回字符串常量池中的对象引用了，那再与字符串常量池中的‘小萝莉’比较，当然会返回 true 了。”三妹说。

哇，不得不说，三妹前几节的字符串相关内容都完全学会了呀！

“三妹，哥再给你补充一点。”我说。

“如果要进行两个字符串对象的内容比较，除了 `.equals()` 方法，还有其他两个可选的方案。”

1）`Objects.equals()`

`Objects.equals()` 这个静态方法的优势在于不需要在调用之前判空。

```java
public static boolean equals(Object a, Object b) {
    return (a == b) || (a != null && a.equals(b));
}
```

如果直接使用 `a.equals(b)`，则需要在调用之前对 a 进行判空，否则可能会抛出空指针 `java.lang.NullPointerException`。`Objects.equals()` 用起来就完全没有这个担心。

```java
Objects.equals("小萝莉", new String("小" + "萝莉")) // --> true
Objects.equals(null, new String("小" + "萝莉")); // --> false
Objects.equals(null, null) // --> true

String a = null;
a.equals(new String("小" + "萝莉")); // throw exception
```

2）String 类的 `.contentEquals()`

`.contentEquals()` 的优势在于可以将字符串与任何的字符序列（StringBuffer、StringBuilder、String、CharSequence）进行比较。

```java
public boolean contentEquals(CharSequence cs) {
    // Argument is a StringBuffer, StringBuilder
    if (cs instanceof AbstractStringBuilder) {
        if (cs instanceof StringBuffer) {
            synchronized(cs) {
                return nonSyncContentEquals((AbstractStringBuilder)cs);
            }
        } else {
            return nonSyncContentEquals((AbstractStringBuilder)cs);
        }
    }
    // Argument is a String
    if (cs instanceof String) {
        return equals(cs);
    }
    // Argument is a generic CharSequence
    int n = cs.length();
    if (n != length()) {
        return false;
    }
    byte[] val = this.value;
    if (isLatin1()) {
        for (int i = 0; i < n; i++) {
            if ((val[i] & 0xff) != cs.charAt(i)) {
                return false;
            }
        }
    } else {
        if (!StringUTF16.contentEquals(val, cs, n)) {
            return false;
        }
    }
    return true;
}
```

从源码上可以看得出，如果 cs 是 StringBuffer，该方法还会进行同步，非常的智能化；如果是 String 的话，其实调用的还是 `equals()` 方法。当然了，这也就意味着使用该方法进行比较的时候，多出来了很多步骤，性能上有些损失。

“是的，总体上感觉还是 `Objects.equals()` 比较舒服。”三妹的眼睛是雪亮的，发现了这个方法的优点。

<img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png">
