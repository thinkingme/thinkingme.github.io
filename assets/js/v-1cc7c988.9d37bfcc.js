"use strict";(self.webpackChunkcoding_road=self.webpackChunkcoding_road||[]).push([[1219],{26765:(n,a,s)=>{s.r(a),s.d(a,{data:()=>p});const p={key:"v-1cc7c988",path:"/coding-road/java-core/string-Array/array.html",title:"深入理解 Java 数组",lang:"zh-CN",frontmatter:{category:["Java核心"],tag:["Java"],summary:"深入理解 Java 数组 “哥，我看你之前的文章里提到，ArrayList 的内部是用数组实现的，我就对数组非常感兴趣，想深入地了解一下，今天终于到这个环节了，好期待呀！”三妹的语气里显得很兴奋。 “的确是的，看 ArrayList 的源码就一清二楚了。”我一边说，一边打开 Intellij IDEA，并找到了 ArrayList 的源码。 “瞧见没？Obj",head:[["meta",{property:"og:url",content:"https://vuepress-theme-hope-v2-demo.mrhope.site/coding-road/java-core/string-Array/array.html"}],["meta",{property:"og:site_name",content:"coding-rode"}],["meta",{property:"og:title",content:"深入理解 Java 数组"}],["meta",{property:"og:type",content:"article"}],["meta",{property:"og:updated_time",content:"2022-06-04T07:20:53.000Z"}],["meta",{property:"og:locale",content:"zh-CN"}],["meta",{property:"article:tag",content:"Java"}],["meta",{property:"article:modified_time",content:"2022-06-04T07:20:53.000Z"}]]},excerpt:"",headers:[],git:{createdTime:1653617096e3,updatedTime:1654327253e3,contributors:[{name:"林振辉",email:"linzhenhui@apexsoft.com",commits:2}]},readingTime:{minutes:6.77,words:2032},filePathRelative:"coding-road/java-core/string-Array/array.md"}},27697:(n,a,s)=>{s.r(a),s.d(a,{default:()=>r});var p=s(95393);const t=(0,p.uE)('<h1 id="深入理解-java-数组" tabindex="-1"><a class="header-anchor" href="#深入理解-java-数组" aria-hidden="true">#</a> 深入理解 Java 数组</h1><p>“哥，我看你之前的文章里提到，ArrayList 的内部是用数组实现的，我就对数组非常感兴趣，想深入地了解一下，今天终于到这个环节了，好期待呀！”三妹的语气里显得很兴奋。</p><p>“的确是的，看 ArrayList 的源码就一清二楚了。”我一边说，一边打开 Intellij IDEA，并找到了 ArrayList 的源码。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token doc-comment comment">/**\n * The array buffer into which the elements of the ArrayList are stored.\n * The capacity of the ArrayList is the length of this array buffer. Any\n * empty ArrayList with elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA\n * will be expanded to DEFAULT_CAPACITY when the first element is added.\n */</span>\n<span class="token keyword">transient</span> <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> elementData<span class="token punctuation">;</span> <span class="token comment">// non-private to simplify nested class access</span>\n\n<span class="token doc-comment comment">/**\n * The size of the ArrayList (the number of elements it contains).\n *\n * <span class="token keyword">@serial</span>\n */</span>\n<span class="token keyword">private</span> <span class="token keyword">int</span> size<span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>“瞧见没？<code>Object[] elementData</code> 就是数组。”我指着显示屏上这串代码继续说。</p><p>数组是一个对象，它包含了一组固定数量的元素，并且这些元素的类型是相同的。数组会按照索引的方式将元素放在指定的位置上，意味着我们可以通过索引来访问这些元素。在 Java 中，索引是从 0 开始的。</p><p>“哥，能说一下为什么索引从 0 开始吗？”三妹突然这个话题很感兴趣。</p><p>“哦，Java 是基于 C/C++ 语言实现的，而 C 语言的下标是从 0 开始的，所以 Java 就继承了这个良好的传统习惯。C 语言有一个很重要概念，叫做指针，它实际上是一个偏移量，距离开始位置的偏移量，第一个元素就在开始的位置，它的偏移量就为 0，所以索引就为 0。”此刻，我很自信。</p><p>“此外，还有另外一种说法。早期的计算机资源比较匮乏，0 作为起始下标相比较于 1 作为起始下标，编译的效率更高。”</p><p>“哦。”三妹意味深长地点了点头。</p><p>我们可以将数组理解为一个个整齐排列的单元格，每个单元格里面存放着一个元素。</p><p>数组元素的类型可以是基本数据类型（比如说 int、double），也可以是引用数据类型（比如说 String），包括自定义类型。</p><p>数组的声明方式分两种。</p><p>先来看第一种：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> anArray<span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>再来看第二种：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">int</span> anOtherArray<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>不同之处就在于中括号的位置，是跟在类型关键字的后面，还是跟在变量的名称的后面。前一种的使用频率更高一些，像 ArrayList 的源码中就用了第一种方式。</p><p>同样的，数组的初始化方式也有多种，最常见的是：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> anArray <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>看到了没？上面这行代码中使用了 new 关键字，这就意味着数组的确是一个对象，只有对象的创建才会用到 new 关键字，基本数据类型是不用的。然后，我们需要在方括号中指定数组的长度。</p>',21),e=(0,p.Uk)("这时候，数组中的每个元素都会被初始化为默认值，int 类型的就为 0，Object 类型的就为 null。 不同数据类型的默认值不同，可以参照"),o={href:"https://mp.weixin.qq.com/s/twim3w_dp5ctCigjLGIbFw",target:"_blank",rel:"noopener noreferrer"},c=(0,p.Uk)("之前的文章"),l=(0,p.Uk)("。"),i=(0,p.uE)('<p>另外，还可以使用大括号的方式，直接初始化数组中的元素：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">int</span> anOtherArray<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这时候，数组的元素分别是 1、2、3、4、5，索引依次是 0、1、2、3、4，长度是 5。</p><p>“哥，怎么访问数组呢？”三妹及时地插话到。</p><p>前面提到过，可以通过索引来访问数组的元素，就像下面这样：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>anArray<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>变量名，加上中括号，加上元素的索引，就可以访问到数组，通过“=”操作符可以对元素进行赋值。</p><p>如果索引的值超出了数组的界限，就会抛出 <code>ArrayIndexOutOfBoundException</code>。</p><p>既然数组的索引是从 0 开始，那就是到数组的 <code>length - 1</code> 结束，不要使用超出这个范围内的索引访问数组，就不会抛出数组越界的异常了。</p><p>当数组的元素非常多的时候，逐个访问数组就太辛苦了，所以需要通过遍历的方式。</p><p>第一种，使用 for 循环：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">int</span> anOtherArray<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> anOtherArray<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>anOtherArray<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过 length 属性获取到数组的长度，然后从 0 开始遍历，就得到了数组的所有元素。</p><p>第二种，使用 for-each 循环：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> element <span class="token operator">:</span> anOtherArray<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果不需要关心索引的话（意味着不需要修改数组的某个元素），使用 for-each 遍历更简洁一些。当然，也可以使用 while 和 do-while 循环。</p><p>在 Java 中，可变参数用于将任意数量的参数传递给方法，来看 <code>varargsMethod()</code> 方法：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">varargsMethod</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> varargs<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该方法可以接收任意数量的字符串参数，可以是 0 个或者 N 个，本质上，可变参数就是通过数组实现的。为了证明这一点，我们可以看一下反编译一后的字节码：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">VarargsDemo</span>\n<span class="token punctuation">{</span>\n\n    <span class="token keyword">public</span> <span class="token class-name">VarargsDemo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">transient</span> <span class="token keyword">void</span> <span class="token function">varargsMethod</span><span class="token punctuation">(</span><span class="token class-name">String</span> as<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以，我们其实可以直接将数组作为参数传递给该方法：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">VarargsDemo</span> demo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VarargsDemo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> anArray <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token string">&quot;沉默王二&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;一枚有趣的程序员&quot;</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\ndemo<span class="token punctuation">.</span><span class="token function">varargsMethod</span><span class="token punctuation">(</span>anArray<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以直接传递多个字符串，通过逗号隔开的方式：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>demo<span class="token punctuation">.</span><span class="token function">varargsMethod</span><span class="token punctuation">(</span><span class="token string">&quot;沉默王二&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;一枚有趣的程序员&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在 Java 中，数组与 List 关系非常密切。List 封装了很多常用的方法，方便我们对集合进行一些操作，而如果直接操作数组的话，有很多不便，因为数组本身没有提供这些封装好的操作，所以有时候我们需要把数组转成 List。</p><p>“怎么转呢？”三妹问到。</p><p>最原始的方式，就是通过遍历数组的方式，一个个将数组添加到 List 中。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> anArray <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> aList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> element <span class="token operator">:</span> anArray<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    aList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>更优雅的方式是通过 Arrays 类的 <code>asList()</code> 方法：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> aList <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>anArray<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但需要注意的是，该方法返回的 ArrayList 并不是 <code>java.util.ArrayList</code>，它其实是 Arrays 类的一个内部类：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> <span class="token keyword">extends</span> <span class="token class-name">AbstractList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span>\n        <span class="token keyword">implements</span> <span class="token class-name">RandomAccess</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span>Serializable</span><span class="token punctuation">{</span><span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果需要添加元素或者删除元素的话，需要把它转成 <code>java.util.ArrayList</code>。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>anArray<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Java 8 新增了 Stream 流的概念，这就意味着我们也可以将数组转成 Stream 进行操作。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> anArray <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token string">&quot;沉默王二&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;一枚有趣的程序员&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;好好珍重他&quot;</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token class-name">Stream</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> aStream <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>anArray<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果想对数组进行排序的话，可以使用 Arrays 类提供的 <code>sort()</code> 方法。</p><ul><li>基本数据类型按照升序排列</li><li>实现了 Comparable 接口的对象按照 <code>compareTo()</code> 的排序</li></ul><p>来看第一个例子：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> anArray <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>anArray<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>排序后的结果如下所示：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">]</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>来看第二个例子：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> yetAnotherArray <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;E&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Z&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;B&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;C&quot;</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>yetAnotherArray<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span>\n                <span class="token class-name">Comparator</span><span class="token punctuation">.</span><span class="token function">comparing</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token operator">::</span><span class="token function">toString</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">reversed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>只对 1-3 位置上的元素进行反序，所以结果如下所示：</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>[A, Z, E, B, C]\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>有时候，我们需要从数组中查找某个具体的元素，最直接的方式就是通过遍历的方式：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> anArray <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> anArray<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>anArray<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token number">4</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;找到了 &quot;</span> <span class="token operator">+</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">break</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上例中从数组中查询元素 4，找到后通过 break 关键字退出循环。</p><p>如果数组提前进行了排序，就可以使用二分查找法，这样效率就会更高一些。<code>Arrays.binarySearch()</code> 方法可供我们使用，它需要传递一个数组，和要查找的元素。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> anArray <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">binarySearch</span><span class="token punctuation">(</span>anArray<span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>“除了一维数组，还有二维数组，三妹你可以去研究下，比如说用二维数组打印一下杨辉三角。”说完，我就去阳台上休息了，留三妹在那里学习，不能打扰她。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png" alt="" loading="lazy"></p>',53),u={},r=(0,s(13860).Z)(u,[["render",function(n,a){const s=(0,p.up)("ExternalLinkIcon");return(0,p.wg)(),(0,p.iD)("div",null,[t,(0,p._)("p",null,[e,(0,p._)("a",o,[c,(0,p.Wm)(s)]),l]),i])}]])},13860:(n,a)=>{a.Z=(n,a)=>{const s=n.__vccOpts||n;for(const[n,p]of a)s[n]=p;return s}}}]);