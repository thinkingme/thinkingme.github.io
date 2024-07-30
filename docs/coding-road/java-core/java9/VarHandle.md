# VarHandle

替换unsafe使用VarHandle

它用于例如`AtomicReference`，以前在 Java 8 中`sun.misc.Unsafe`使用的地方：

```java
static {
        try {
            valueOffset = unsafe.objectFieldOffset
                (AtomicBoolean.class.getDeclaredField("value"));
        } catch (Exception ex) { throw new Error(ex); }
    }public final void lazySet(V newValue) {
    unsafe.putOrderedObject(this, valueOffset, newValue);
}

public final boolean compareAndSet(V expect, V update) {
    return unsafe.compareAndSwapObject(this, valueOffset, expect, update);
}
```

valueOffset是value值在内存中的相对对象的偏移量

这里`this`指针与字段偏移量一起使用来访问字段。但这是不安全的，因为这个字段偏移量可以是 any `long`，而你实际上可能正在访问完全不同的东西。然而，这样做有性能优势（例如，它告诉 VM 使用专门的 CPU 指令），因此其他人已经使用过，即使`sun.misc.Unsafe`它是一个内部的、*不安全的*API。

s的部分目的`VarHandle`是用安全的等效项替换操作 in `sun.misc.Unsafe`。[JEP](http://openjdk.java.net/jeps/193)中规定：

> 定义一种标准方法来调用各种 java.util.concurrent.atomic 和 sun.misc.Unsafe 操作的等价物...

> 目标：
> 
> 以下是必需的目标：
> 
> - 安全。必须不可能将 Java 虚拟机置于损坏的内存状态。例如，对象的字段只能使用可转换为字段类型的实例进行更新，或者如果数组索引在数组边界内，则只能在数组内访问数组元素。
> 
> - 正直。访问对象字段遵循与 getfield 和 putfield 字节代码相同的访问规则，此外还有对象的最终字段不能更新的约束。（注意：这样的安全和完整性规则也适用于 MethodHandles 提供对字段的读或写访问权限。）
> 
> - 表现。性能特征必须与等效的 sun.misc.Unsafe 操作相同或相似（具体来说，生成的汇编程序代码应该几乎相同模数某些不能折叠的安全检查）。
> 
> - 可用性。该 API 必须优于 sun.misc.Unsafe API。

所以在 Java 9 中，这些方法看起来像这样：

```java
public final void lazySet(V newValue) {
    VALUE.setRelease(this, newValue);
}

public final boolean compareAndSet(V expectedValue, V newValue) {
    return VALUE.compareAndSet(this, expectedValue, newValue);
}
```

`VALUE`像这样的定义在哪里`VarHandle`：

```java
private static final VarHandle VALUE;
static {
    try {
        MethodHandles.Lookup l = MethodHandles.lookup();
        VALUE = l.findVarHandle(AtomicReference.class, "value", Object.class);
    } catch (ReflectiveOperationException e) {
        throw new Error(e);
    }
}
```
