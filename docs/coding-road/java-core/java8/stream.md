---
category:
  - Java核心
tag:
  - Java
date: 2019-01-01
---

# Java 8 Stream 流详细用法

两个星期以前，就有读者强烈要求我写一篇 Java Stream 流的文章，我说市面上不是已经有很多了吗，结果你猜他怎么说：“就想看你写的啊！”你看你看，多么苍白的喜欢啊。那就“勉为其难”写一篇吧，嘻嘻。

![](https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/java8/stream-1.jpg)

单从“Stream”这个单词上来看，它似乎和 java.io 包下的 InputStream 和 OutputStream 有些关系。实际上呢，没毛关系。Java 8 新增的 Stream 是为了解放程序员操作集合（Collection）时的生产力，之所以能解放，很大一部分原因可以归功于同时出现的 Lambda 表达式——极大的提高了编程效率和程序可读性。

Stream 究竟是什么呢？

> Stream 就好像一个高级的迭代器，但只能遍历一次，就好像一江春水向东流；在流的过程中，对流中的元素执行一些操作，比如“过滤掉长度大于 10 的字符串”、“获取每个字符串的首字母”等。

要想操作流，首先需要有一个数据源，可以是数组或者集合。每次操作都会返回一个新的流对象，方便进行链式操作，但原有的流对象会保持不变。

流的操作可以分为两种类型：

1）中间操作，可以有多个，每次返回一个新的流，可进行链式操作。

2）终端操作，只能有一个，每次执行完，这个流也就用光光了，无法执行下一个操作，因此只能放在最后。

来举个例子。

```java
List<String> list = new ArrayList<>();
list.add("武汉加油");
list.add("中国加油");
list.add("世界加油");
list.add("世界加油");

long count = list.stream().distinct().count();
System.out.println(count);
```

`distinct()` 方法是一个中间操作（去重），它会返回一个新的流（没有共同元素）。

```java
Stream<T> distinct();
```

`count()` 方法是一个终端操作，返回流中的元素个数。

```java
long count();
```

中间操作不会立即执行，只有等到终端操作的时候，流才开始真正地遍历，用于映射、过滤等。通俗点说，就是一次遍历执行多个操作，性能就大大提高了。

理论部分就扯这么多，下面直接进入实战部分。

### 01、创建流

如果是数组的话，可以使用 `Arrays.stream()` 或者 `Stream.of()` 创建流；如果是集合的话，可以直接使用 `stream()` 方法创建流，因为该方法已经添加到 Collection 接口中。

```java
public class CreateStreamDemo {
    public static void main(String[] args) {
        String[] arr = new String[]{"武汉加油", "中国加油", "世界加油"};
        Stream<String> stream = Arrays.stream(arr);

        stream = Stream.of("武汉加油", "中国加油", "世界加油");

        List<String> list = new ArrayList<>();
        list.add("武汉加油");
        list.add("中国加油");
        list.add("世界加油");
        stream = list.stream();
    }
}
```

查看 Stream 源码的话，你会发现 `of()` 方法内部其实调用了 `Arrays.stream()` 方法。

```java
public static<T> Stream<T> of(T... values) {
    return Arrays.stream(values);
}
```

另外，集合还可以调用 `parallelStream()` 方法创建并发流，默认使用的是 `ForkJoinPool.commonPool()`线程池。

```java
List<Long> aList = new ArrayList<>();
Stream<Long> parallelStream = aList.parallelStream();
```

### 02、操作流

Stream 类提供了很多有用的操作流的方法，我来挑一些常用的给你介绍一下。

1）过滤

通过 `filter()` 方法可以从流中筛选出我们想要的元素。

```java
public class FilterStreamDemo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("周杰伦");
        list.add("王力宏");
        list.add("陶喆");
        list.add("林俊杰");
        Stream<String> stream = list.stream().filter(element -> element.contains("王"));
        stream.forEach(System.out::println);
    }
}
```

`filter()` 方法接收的是一个 Predicate（Java 8 新增的一个函数式接口，接受一个输入参数返回一个布尔值结果）类型的参数，因此，我们可以直接将一个 Lambda 表达式传递给该方法，比如说 `element -> element.contains("王")` 就是筛选出带有“王”的字符串。

`forEach()` 方法接收的是一个 Consumer（Java 8 新增的一个函数式接口，接受一个输入参数并且无返回的操作）类型的参数，`类名 :: 方法名`是 Java 8 引入的新语法，`System.out` 返回 PrintStream 类，println 方法你应该知道是打印的。

`stream.forEach(System.out::println);` 相当于在 for 循环中打印，类似于下面的代码：

```java
for (String s : strs) {
    System.out.println(s);
}
```

很明显，一行代码看起来更简洁一些。来看一下程序的输出结果：

```
王力宏
```

2）映射

如果想通过某种操作把一个流中的元素转化成新的流中的元素，可以使用 `map()` 方法。

```java
public class MapStreamDemo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("周杰伦");
        list.add("王力宏");
        list.add("陶喆");
        list.add("林俊杰");
        Stream<Integer> stream = list.stream().map(String::length);
        stream.forEach(System.out::println);
    }
}
```

`map()` 方法接收的是一个 Function（Java 8 新增的一个函数式接口，接受一个输入参数 T，返回一个结果 R）类型的参数，此时参数 为 String 类的 length 方法，也就是把 `Stream<String>` 的流转成一个 `Stream<Integer>` 的流。

程序输出的结果如下所示：

```
3
3
2
3
```

3）匹配

Stream 类提供了三个方法可供进行元素匹配，它们分别是：

- `anyMatch()`，只要有一个元素匹配传入的条件，就返回 true。

- `allMatch()`，只有有一个元素不匹配传入的条件，就返回 false；如果全部匹配，则返回 true。

- `noneMatch()`，只要有一个元素匹配传入的条件，就返回 false；如果全部匹配，则返回 true。

```java
public class MatchStreamDemo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("周杰伦");
        list.add("王力宏");
        list.add("陶喆");
        list.add("林俊杰");

        boolean  anyMatchFlag = list.stream().anyMatch(element -> element.contains("王"));
        boolean  allMatchFlag = list.stream().allMatch(element -> element.length() > 1);
        boolean  noneMatchFlag = list.stream().noneMatch(element -> element.endsWith("沉"));
        System.out.println(anyMatchFlag);
        System.out.println(allMatchFlag);
        System.out.println(noneMatchFlag);
    }
}
```

因为“王力宏”以“王”字开头，所以 anyMatchFlag 应该为 true；因为“周杰伦”、“王力宏”、“陶喆”、“林俊杰”的字符串长度都大于 1，所以 allMatchFlag 为 true；因为 4 个字符串结尾都不是“沉”，所以 noneMatchFlag 为 true。

程序输出的结果如下所示：

```
true
true
true
```

4）组合

`reduce()` 方法的主要作用是把 Stream 中的元素组合起来，它有两种用法：

- `Optional<T> reduce(BinaryOperator<T> accumulator)`

没有起始值，只有一个参数，就是运算规则，此时返回 [Optional](https://mp.weixin.qq.com/s/PqK0KNVHyoEtZDtp5odocA)。

- `T reduce(T identity, BinaryOperator<T> accumulator)`

有起始值，有运算规则，两个参数，此时返回的类型和起始值类型一致。

来看下面这个例子。

```java
public class ReduceStreamDemo {
    public static void main(String[] args) {
        Integer[] ints = {0, 1, 2, 3};
        List<Integer> list = Arrays.asList(ints);

        Optional<Integer> optional = list.stream().reduce((a, b) -> a + b);
        Optional<Integer> optional1 = list.stream().reduce(Integer::sum);
        System.out.println(optional.orElse(0));
        System.out.println(optional1.orElse(0));

        int reduce = list.stream().reduce(6, (a, b) -> a + b);
        System.out.println(reduce);
        int reduce1 = list.stream().reduce(6, Integer::sum);
        System.out.println(reduce1);
    }
}
```

运算规则可以是 [Lambda 表达式](https://mp.weixin.qq.com/s/ozr0jYHIc12WSTmmd_vEjw)（比如 `(a, b) -> a + b`），也可以是类名::方法名（比如 `Integer::sum`）。

程序运行的结果如下所示：

```java
6
6
12
12
```

0、1、2、3 在没有起始值相加的时候结果为 6；有起始值 6 的时候结果为 12。

### 03、转换流

既然可以把集合或者数组转成流，那么也应该有对应的方法，将流转换回去——`collect()` 方法就满足了这种需求。

```java
public class CollectStreamDemo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("周杰伦");
        list.add("王力宏");
        list.add("陶喆");
        list.add("林俊杰");

        String[] strArray = list.stream().toArray(String[]::new);
        System.out.println(Arrays.toString(strArray));

        List<Integer> list1 = list.stream().map(String::length).collect(Collectors.toList());
        List<String> list2 = list.stream().collect(Collectors.toCollection(ArrayList::new));
        System.out.println(list1);
        System.out.println(list2);

        String str = list.stream().collect(Collectors.joining(", ")).toString();
        System.out.println(str);
    }
}
```

`toArray()` 方法可以将流转换成数组，你可能比较好奇的是 `String[]::new`，它是什么东东呢？来看一下 `toArray()` 方法的源码。

```java
<A> A[] toArray(IntFunction<A[]> generator);
```

也就是说 `String[]::new` 是一个 IntFunction，一个可以产生所需的新数组的函数，可以通过反编译字节码看看它到底是什么：

```java
String[] strArray = (String[])list.stream().toArray((x$0) -> {
    return new String[x$0];
});
System.out.println(Arrays.toString(strArray));
```

也就是相当于返回了一个指定长度的字符串数组。

当我们需要把一个集合按照某种规则转成另外一个集合的时候，就可以配套使用 `map()` 方法和 `collect()` 方法。

```java
List<Integer> list1 = list.stream().map(String::length).collect(Collectors.toList());
```

通过 `stream()` 方法创建集合的流后，再通过 `map(String:length)` 将其映射为字符串长度的一个新流，最后通过 `collect()` 方法将其转换成新的集合。

Collectors 是一个收集器的工具类，内置了一系列收集器实现，比如说 `toList()` 方法将元素收集到一个新的 `java.util.List` 中；比如说 `toCollection()` 方法将元素收集到一个新的 ` java.util.ArrayList` 中；比如说 `joining()` 方法将元素收集到一个可以用分隔符指定的字符串中。

来看一下程序的输出结果：

```java
[周杰伦, 王力宏, 陶喆, 林俊杰]
[3, 3, 2, 3]
[周杰伦, 王力宏, 陶喆, 林俊杰]
周杰伦, 王力宏, 陶喆, 林俊杰
```

![](https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/java8/stream-2.jpg)

![](https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/xingbiaogongzhonghao.png)

## 原理

推荐一篇博文,很好的介绍了Stream的原理.本文对其进行一些补充更加详细的讲解.

> 作者: 李豪  
> 地址: [https://github.com/CarpenterLee/JavaLambdaInternals/blob/master/6-Stream%20Pipelines.md](https://link.zhihu.com/?target=https%3A//github.com/CarpenterLee/JavaLambdaInternals/blob/master/6-Stream%2520Pipelines.md)

需求:

> 从`"张三","李四","王二","张四五"`中选出以`张`开头的名字,然后从再从中选出名字最长的一个,输出其长度.

## **1.一种直白的实现**

![](https://pic3.zhimg.com/v2-bde29a4c761e183eb493d4aef8baa8be_b.jpg)

**缺点**:

1. 迭代次数过多
2. 频繁产生中间结果,性能无法接受

**实际想要的效果**:  
平常的写法:

```java
int longest = 0;
for(String str : strings){
    if(str.startsWith("张")){// 1. filter(), 保留以张开头的字符串
        int len = str.length();// 2. mapToInt(), 转换成长度
        longest = Math.max(len, longest);// 3. max(), 保留最长的长度
    }
}
System.out.println(longest);
```

Stream的做法:

```java
Stream.of("张三","李四","王二","张四五")
      .filter(x -> x.startsWith("张"))
      .mapToInt(String::length)
      .max()
      .ifPresent(System.out::println);
```

## **2.Stream是怎么做到的?**

**Stream的操作分类**:

中间操作:返回一个新的Stream

```text
- 有状态 sorted(),必须等上一步操作完拿到全部元素后才可操作
 - 无状态 filter(),该操作的元素不受上一步操作的影响 
```

```java
list.stream().filter(x -> x.startWith("张").map(x -> x.length())
list.stream().filter(x -> x.startWith("张").sorted().map(x -> x.length())
```

终端操作:返回结果

```text
- 短路操作findFirst(),找到一个则返回,也就是break当前的循环
- 非短路操作forEach(),遍历全部元素 
```

以上操作决定了Stream一定是先构建完毕再执行的特点,也就是延迟执行,当需要结果(终端操作时)开始执行流水线.  
Stream做到的是对于多次调用合并到一次迭代中处理完所有的调用方式.换句话说就是解决了上述的两个缺点.大概思路是记录下每一步的操作,然后终端操作时对其迭代依次执行每一步的操作,最后再一次循环中处理.

**问题**:

1. 操作是如何记录下来的?
2. 操作是如何叠加的?
3. 叠加完如何执行的?
4. 执行完如何收集结果的?

---

Stream结构示意图:

![](https://pic4.zhimg.com/v2-1a358f8b01bc8061ef0307e0ec0f1997_b.jpg)

示例代码:

```java
List<String> data = new ArrayList<>();
data.add("张三");
data.add("李四");
data.add("王三");
data.add("马六");
data.stream()
    .filter(x -> x.length() == 2)
    .map(x -> x.replace("三","五"))
    .sorted()
    .filter(x -> x.contains("五"))
    .forEach(System.out::println);
```

## **1. 操作是如何记录下来的?**

1. Head记录Stream起始操作
2. StatelessOp记录中间操作
3. StatefulOp记录有状态的中间操作  
   这三个操作实例化会指向其父类`AbstractPipeline`,也就是在`AbstractPipeline`中建立了双向链表

对于Head

```java
AbstractPipeline(Spliterator<?> source,
                 int sourceFlags, boolean parallel) {
    this.previousStage = null; //首操作上一步为null    
    this.sourceSpliterator = source; //数据
    this.sourceStage = this; //Head操作
    this.sourceOrOpFlags = sourceFlags & StreamOpFlag.STREAM_MASK;
    this.combinedFlags = (~(sourceOrOpFlags << 1)) & StreamOpFlag.INITIAL_OPS_VALUE;
    this.depth = 0;
    this.parallel = parallel;
}
```

对于其他Stage:

```java
AbstractPipeline(AbstractPipeline<?, E_IN, ?> previousStage, int opFlags) {
    if (previousStage.linkedOrConsumed)
        throw new IllegalStateException(MSG_STREAM_LINKED);
    previousStage.linkedOrConsumed = true;
    //双向链表的建立
    previousStage.nextStage = this;
    this.previousStage = previousStage;
    this.sourceStage = previousStage.sourceStage;        
    this.depth = previousStage.depth + 1;        

    this.sourceOrOpFlags = opFlags & StreamOpFlag.OP_MASK;
    this.combinedFlags = StreamOpFlag.combineOpFlags(opFlags, previousStage.combinedFlags);
    if (opIsStateful())
        sourceStage.sourceAnyStateful = true;
}
```

调用过程如此用双向链表串联起来,每一步都得知其上一步与下一步的操作.

![](https://pic4.zhimg.com/v2-e13fc52100682a9b250e414f1de96753_b.jpg)

```java
data.stream()
.filter(x -> x.length() == 2)
.map(x -> x.replace(“三”,”五”))
.sorted()
.filter(x -> x.contains(“五”))
.forEach(System.out::println);
```

## **2.操作是如何叠加的?**

`Sink<T>`接口:

1. void begin(long size),循环开始前调用,通知每个Stage做好准备
2. void end(),循环结束时调用,依次调用每个Stage的end方法,处理结果
3. boolean cancellationRequested(),判断是否可以提前结束循环
4. void accept(T value),每一步的处理

其子类之一ChainedReference:

```java
static abstract class ChainedReference<T, E_OUT> implements Sink<T> {
    protected final Sink<? super E_OUT> downstream;
    public ChainedReference(Sink<? super E_OUT> downstream) {
        this.downstream = Objects.requireNonNull(downstream);
    }
    @Override
    public void begin(long size) {
        downstream.begin(size);
    }
    @Override
    public void end() {
        downstream.end();
    }
    @Override
    public boolean cancellationRequested() {
        return downstream.cancellationRequested();
    }
}
```

例Filter:

```java
@Override
public final Stream<P_OUT> filter(Predicate<? super P_OUT> predicate) {
    Objects.requireNonNull(predicate);
    return new StatelessOp<P_OUT, P_OUT>(this, StreamShape.REFERENCE,
                                 StreamOpFlag.NOT_SIZED) {
        @Override
        Sink<P_OUT> opWrapSink(int flags, Sink<P_OUT> sink) {
            return new Sink.ChainedReference<P_OUT, P_OUT>(sink) {
                @Override
                public void begin(long size) {
                    downstream.begin(-1);
                }
                @Override
                public void accept(P_OUT u) {
                    //条件成立则传递给下一个操作,也因为如此所以有状态的操作必须放到
                    //end方法里面
                    if (predicate.test(u))
                        downstream.accept(u);
                }
            };
        }
    };
}
```

再例如sorted():

```java
@Override
public void begin(long size) {
    if (size >= Nodes.MAX_ARRAY_SIZE)
        throw new IllegalArgumentException(Nodes.BAD_SIZE);
    list = (size >= 0) ? new ArrayList<T>((int) size) : new ArrayList<T>();
}
@Override
public void end() {
    list.sort(comparator);
    downstream.begin(list.size());
    if (!cancellationWasRequested) {
        list.forEach(downstream::accept);
    }
    else {
        for (T t : list) {
            if (downstream.cancellationRequested()) break;
            downstream.accept(t);
        }
    }
    downstream.end();
    list = null;
}
@Override
public void accept(T t) {
    list.add(t);
}
```

![](https://pic3.zhimg.com/v2-034ec3fcaeb99bac2df782df981dbf7a_b.jpg)

## **叠加后如何执行?**

执行操作是由终端操作来触发的,例如foreach操作

```java
@Override
public void forEach(Consumer<? super P_OUT> action) {
    //evaluate就是开关,一旦调用就立即执行整个Stream    
    evaluate(ForEachOps.makeRef(action, false));
}
```

执行前会对操作从末尾到起始反向包裹起来,得到调用链

```java
Sink opWrapSink(int flags, Sink<P_OUT> sink) ;
```

```java
//这个Sink是终端操作所对应的Sink
final <P_IN> Sink<P_IN> wrapSink(Sink<E_OUT> sink) {
    Objects.requireNonNull(sink);
    for ( AbstractPipeline p=AbstractPipeline.this; p.depth > 0; p=p.previousStage) {
        sink = p.opWrapSink(p.previousStage.combinedFlags, sink);
    }
    return (Sink<P_IN>) sink;
}
```

![](https://pic1.zhimg.com/v2-899dd62d7ccd05f47d914d2b678e95dc_b.jpg)

```java
@Override
final <P_IN> void copyInto(Sink<P_IN> wrappedSink, Spliterator<P_IN> spliterator) {
    Objects.requireNonNull(wrappedSink);
    if (!StreamOpFlag.SHORT_CIRCUIT.isKnown(getStreamAndOpFlags())) {
        //依次执行调用链
        wrappedSink.begin(spliterator.getExactSizeIfKnown());
        spliterator.forEachRemaining(wrappedSink);
        wrappedSink.end();
    }
    else {
        copyIntoWithCancel(wrappedSink, spliterator);
    }
}
```

## **有状态的中间操作何时执行?**

例如sorted()操作,其依赖上一次操作的结果集,按照调用链来说结果集必须在accept()调用完才会产生.那也就说明sorted操作需要在end中,然后再重新开启调用链.

**sorted的end方法**:

```java
@Override
 public void end() {
     list.sort(comparator);
     downstream.begin(list.size());
     if (!cancellationWasRequested) {
         list.forEach(downstream::accept);
     }
     else {
         for (T t : list) {
             if (downstream.cancellationRequested()) break;
             downstream.accept(t);
         }
     }
     downstream.end();
     list = null;
 }
```

那么就相当于sorted给原有操作断路了一次,然后又重新接上,再次遍历.

![](https://pic3.zhimg.com/v2-0d0ef60a9b3a1d5c81910064a9bcaa02_b.jpg)

## **如何收集到结果?**

foreach是不需要收集到结果的,但是对于collect这样的操作是需要拿到最终end产生的结果.end产生的结果在最后一个Sink中,这样的操作最终都会提供一个取出数据的get方法.

```java
@Override
 public <P_IN> R evaluateSequential(PipelineHelper<T> helper,
                                    Spliterator<P_IN> spliterator) {
     return helper.wrapAndCopyInto(makeSink(), spliterator).get();
 }
```

如此拿到数据返回

> 原文作者：茶饮  
> 原文地址：[Java8学习记录(二)-Stream原理](https://link.zhihu.com/?target=http%3A//mrdear.cn/2017/05/20/java/Java8%25E5%25AD%25A6%25E4%25B9%25A0%25E8%25AE%25B0%25E5%25BD%2595%28%25E4%25BA%258C%29-Stream%25E5%258E%259F%25E7%2590%2586/)  
> 版权说明：本文来源于极乐科技合作作者，版权归作者所有。  
> 一元抢购微信小程序>>>[链接地址](https://link.zhihu.com/?target=https%3A//item.taobao.com/item.htm%3Fspm%3Da230r.7195193.1997079397.8.SkKK1K%26id%3D561184346018%26abbucket%3D19)
