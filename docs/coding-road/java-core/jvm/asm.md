---
category:
  - Java核心
  - JVM
tag:
  - Java
---

# 史上最通俗易懂的 ASM 教程

## 一勺思想

We are all in the gutter, but some of us are looking at the stars. （我们都生活在阴沟里，但仍有人仰望星空 ）- 王尔德 《温德米尔夫人的扇子》

举世混浊我独清，众人皆醉我独醒 - 屈原 《楚辞》

## 前言

ASM 是一种通用 Java 字节码操作和分析框架。它可以用于修改现有的 class 文件或动态生成 class 文件。

> **ASM **is an all purpose Java bytecode manipulation and analysis framework. It can be used to modify existing classes or to dynamically generate classes, directly in binary form. ASM provides some common bytecode transformations and analysis algorithms from which custom complex transformations and code analysis tools can be built. ASM offers similar functionality as other Java bytecode frameworks, but is focused on[performance](https://asm.ow2.io/performance.html). Because it was designed and implemented to be as small and as fast as possible, it is well suited for use in dynamic systems (but can of course be used in a static way too, e.g. in compilers).

本篇文章分享的是对 ASM 的理解和应用，之前需要我们掌握**class 字节码**，**JVM 基于栈的设计模式,JVM 指令**

## class 字节码

我们编写的 java 文件，会通过 javac 命令编译为 class 文件，JVM 最终会执行该类型文件来运行程序。下图所示为 class 文件结构。

![](https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/jvm/asm-43844b78-c01f-4990-b038-3c91ff2eeb34.jpg)

下面我们通过一个简单的实例来进行说明。下面是我们编写的一个简单的 java 文件，只是简单的函数调用.

```java
public class Test {
    private int num1 = 1;
    public static int NUM1 = 100;
    public int func(int a,int b){
        return add(a,b);
    }
    public int add(int a,int b) {
        return a+b+num1;
    }
    public int sub(int a, int b) {
        return a-b-NUM1;
    }
}
```

使用 javac -g Test.java 编译为 class 文件，然后通过 `javap -verbose Test.class` 命令查看 class 文件格式。

```
public class com.wuba.asmdemo.Test
  minor version: 0
  major version: 52
  flags: ACC_PUBLIC, ACC_SUPER
Constant pool:
   #1 = Methodref          #6.#26         // java/lang/Object."<init>":()V
   #2 = Fieldref           #5.#27         // com/wuba/asmdemo/Test.num1:I
   #3 = Methodref          #5.#28         // com/wuba/asmdemo/Test.add:(II)I
   #4 = Fieldref           #5.#29         // com/wuba/asmdemo/Test.NUM1:I
   #5 = Class              #30            // com/wuba/asmdemo/Test
   #6 = Class              #31            // java/lang/Object
   #7 = Utf8               num1
   #8 = Utf8               I
   #9 = Utf8               NUM1
  #10 = Utf8               <init>
  #11 = Utf8               ()V
  #12 = Utf8               Code
  #13 = Utf8               LineNumberTable
  #14 = Utf8               LocalVariableTable
  #15 = Utf8               this
  #16 = Utf8               Lcom/wuba/asmdemo/Test;
  #17 = Utf8               func
  #18 = Utf8               (II)I
  #19 = Utf8               a
  #20 = Utf8               b
  #21 = Utf8               add
  #22 = Utf8               sub
  #23 = Utf8               <clinit>
  #24 = Utf8               SourceFile
  #25 = Utf8               Test.java
  #26 = NameAndType        #10:#11        // "<init>":()V
  #27 = NameAndType        #7:#8          // num1:I
  #28 = NameAndType        #21:#18        // add:(II)I
  #29 = NameAndType        #9:#8          // NUM1:I
  #30 = Utf8               com/wuba/asmdemo/Test
  #31 = Utf8               java/lang/Object
{
  public static int NUM1;
    descriptor: I
    flags: ACC_PUBLIC, ACC_STATIC

  public com.wuba.asmdemo.Test();     //构造函数
    descriptor: ()V
    flags: ACC_PUBLIC
    Code:
      stack=2, locals=1, args_size=1
         0: aload_0
         1: invokespecial #1                  // Method java/lang/Object."<init>":()V
         4: aload_0
         5: iconst_1
         6: putfield      #2                  // Field num1:I
         9: return
      LineNumberTable:
        line 3: 0
        line 5: 4
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0      10     0  this   Lcom/wuba/asmdemo/Test;

  public int func(int, int);
    descriptor: (II)I
    flags: ACC_PUBLIC
    Code:
      stack=3, locals=3, args_size=3
         0: aload_0
         1: iload_1
         2: iload_2
         3: invokevirtual #3                  // Method add:(II)I
         6: ireturn
      LineNumberTable:
        line 10: 0
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0       7     0  this   Lcom/wuba/asmdemo/Test;
            0       7     1     a   I
            0       7     2     b   I

  public int add(int, int);
    descriptor: (II)I
    flags: ACC_PUBLIC
    Code:
      stack=2, locals=3, args_size=3
         0: iload_1
         1: iload_2
         2: iadd
         3: aload_0
         4: getfield      #2                  // Field num1:I
         7: iadd
         8: ireturn
      LineNumberTable:
        line 14: 0
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0       9     0  this   Lcom/wuba/asmdemo/Test;
            0       9     1     a   I
            0       9     2     b   I

  public int sub(int, int);
    descriptor: (II)I
    flags: ACC_PUBLIC
    Code:
      stack=2, locals=3, args_size=3
         0: iload_1
         1: iload_2
         2: isub
         3: getstatic     #4                  // Field NUM1:I
         6: isub
         7: ireturn
      LineNumberTable:
        line 18: 0
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0       8     0  this   Lcom/wuba/asmdemo/Test;
            0       8     1     a   I
            0       8     2     b   I

  static {};
    descriptor: ()V
    flags: ACC_STATIC
    Code:
      stack=1, locals=0, args_size=0
         0: bipush        100
         2: putstatic     #4                  // Field NUM1:I
         5: return
      LineNumberTable:
        line 7: 0
}
SourceFile: "Test.java"
```

可以看出在编译为 class 文件后，字段名称，方法名称，类型名称等均在常量池中存在的。从而做到减小文件的目的。同时方法定义也转变为了 jvm 指令。下面我们需要对 jvm 指令加深一下了解。在了解之前需要我们理解 JVM 基于栈的设计模式

## JVM 基于栈的设计模式

JVM 的指令集是基于栈而不是寄存器，基于栈可以具备很好的跨平台性。在线程中执行一个方法时，我们会创建一个栈帧入栈并执行，如果该方法又调用另一个方法时会再次创建新的栈帧然后入栈，方法返回之际，原栈帧会返回方法的执行结果给之前的栈帧，随后虚拟机将会丢弃此栈帧。

![](https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/jvm/asm-e31b7e50-1d48-4eef-9552-6fa7e6c68fed.jpg)

### 局部变量表

**局部变量表(Local Variable Table)**是一组变量值存储空间，用于存放方法参数和方法内定义的局部变量。虚拟机通过索引定位的方法查找相应的局部变量。举个例子。以上述的代码为例

```java
 public int sub(int a, int b) {
        return a-b-NUM1;
    }
```

这个方法大家可以猜测一下局部变量有哪些? 答案是 3 个，不应该只有 a,b 吗？还有 this,对应实例对象方法编译器都会追加一个 this 参数。如果该方法为静态方法则为 2 个了。

```
public int sub(int, int);
    descriptor: (II)I
    flags: ACC_PUBLIC
    Code:
      stack=2, locals=3, args_size=3
         0: iload_1
         1: iload_2
         2: isub
         3: getstatic     #4                  // Field NUM1:I
         6: isub
         7: ireturn
      LineNumberTable:
        line 18: 0
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0       8     0  this   Lcom/wuba/asmdemo/Test;
            0       8     1     a   I
            0       8     2     b   I
```

所以局部变量表第 0 个元素为 this, 第一个为 a,第二个为 b

### 操作数栈

通过局部变量表我们有了要操作和待更新的数据，我们如果对局部变量这些数据进行操作呢？通过操作数栈。当一个方法刚刚开始执行时，其操作数栈是空的，随着方法执行和字节码指令的执行，会从局部变量表或对象实例的字段中复制常量或变量写入到操作数栈，再随着计算的进行将栈中元素出栈到局部变量表或者返回给方法调用者，也就是出栈/入栈操作。一个完整的方法执行期间往往包含多个这样出栈/入栈的过程。

### JVM 指令

- load 命令：用于将局部变量表的指定位置的相应类型变量加载到操作数栈顶；
- store 命令：用于将操作数栈顶的相应类型数据保入局部变量表的指定位置；
- invokevirtual:调用实例方法
- ireturn: 当前方法返回 int

**再举个例子**

a = b + c 的字节码执行过程中操作数栈以及局部变量表的变化如下图所示

![](https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/jvm/asm-4670450e-6199-4562-9cf4-354234c734c8.jpg)

![](https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/jvm/asm-9808d639-327f-4796-80d4-1809be0b9106.jpg)

## ASM 操作

通过上面的介绍，我们对字节码和 JVM 指令有了进一步的了解，下面我们看一下 ASM 是如果编辑 class 字节码的。

## ASM API

ASM API 基于访问者模式，为我们提供了 ClassVisitor，MethodVisitor，FieldVisitor API 接口，每当 ASM 扫描到类字段是会回调 visitField 方法，扫描到类方法是会回调 MethodVisitor，下面我们看一下 API 接口

**ClassVisitor 方法解析**

```java
public abstract class ClassVisitor {
        ......
    public void visit(int version, int access, String name, String signature, String superName, String[] interfaces);
    //访问类字段时回调
    public FieldVisitor visitField(int access, String name, String desc, String signature, Object value);
    //访问类方法是回调
    public MethodVisitor visitMethod(int access, String name, String desc, String signature, String[] exceptions);
    public void visitEnd();
}
```

## MethodVisitor 方法解析

```java
public abstract class MethodVisitor {
        ......
    public void visitParameter(String name, int access);
    //访问本地变量类型指令 操作码可以是LOAD,STORE，RET中一种；
    public void visitIntInsn(int opcode, int operand);
    //域操作指令，用来加载或者存储对象的Field
    public void visitFieldInsn(int opcode, String owner, String name, String descriptor);
    //访问方法操作指令
    public void visitMethodInsn(int opcode, String owner, String name, String descriptor);
    public void visitEnd();
}
```

### ASM 使用 Demo

java 源码

```java
 public int add(int a,int b) {
        return a+b+num1;
 }
```

class 字节码

```
 public int add(int, int);
    descriptor: (II)I
    flags: ACC_PUBLIC
    Code:
      stack=2, locals=3, args_size=3
         0: iload_1
         1: iload_2
         2: iadd
         3: aload_0
         4: getfield      #2                  // Field num1:I
         7: iadd
         8: ireturn
      LineNumberTable:
        line 14: 0
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0       9     0  this   Lcom/wuba/asmdemo/Test;
            0       9     1     a   I
            0       9     2     b   I
```

ASM 对应的 API

```
mv = cw.visitMethod(ACC_PUBLIC, "add", "(II)I", null, null);
mv.visitCode();
mv.visitVarInsn(ILOAD, 1);
mv.visitVarInsn(ILOAD, 2);
mv.visitInsn(IADD);
mv.visitVarInsn(ALOAD, 0);
mv.visitFieldInsn(GETFIELD, "com/wuba/asmdemo/Test", "num1", "I");
mv.visitInsn(IADD);
mv.visitInsn(IRETURN);
Label l1 = new Label();
mv.visitLabel(l1);
mv.visitLocalVariable("this", "Lcom/wuba/asmdemo/Test;", null, l0, l1, 0);
mv.visitLocalVariable("a", "I", null, l0, l1, 1);
mv.visitLocalVariable("b", "I", null, l0, l1, 2);
mv.visitMaxs(2, 3);
mv.visitEnd();
```

可以看出 ASM 是在指令层次上操作字节码的，和 class 字节码更加接近。如果我们有些字节码操作的需求，ASM 一定可以实现的。只是使用起来比较麻烦一些。这里强烈推荐一款 ASM 插件

> https://plugins.jetbrains.com/plugin/5918-asm-bytecode-outline

可以一键生成对应的 ASM API 代码

![](https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/jvm/asm-3c8c8db4-5b6a-4576-b147-62965d0e0c1c.jpg)

---

> 参考链接：https://zhuanlan.zhihu.com/p/94498015

![](https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/xingbiaogongzhonghao.png)
