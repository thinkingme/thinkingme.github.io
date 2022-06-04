"use strict";(self.webpackChunkcoding_road=self.webpackChunkcoding_road||[]).push([[3656],{74218:(n,s,a)=>{a.r(s),a.d(s,{data:()=>e});const e={key:"v-0ef42136",path:"/coding-road/java-core/oo/interface.html",title:"Java 接口",lang:"zh-CN",frontmatter:{category:["Java核心"],tag:["Java"],summary:"Java 接口 “哥，我看你朋友圈说《Java 程序员进阶之路》专栏收到了第一笔赞赏呀，虽然只有一块钱，但我也替你感到开心。”三妹的脸上洋溢着自信的微笑，仿佛这钱是打给她的一样。 “是啊，早上起来的时候看到这条信息，还真的是挺开心的，虽然只有一块钱，但是开源的第一笔，也是我人生当中的第一笔，真的非常感谢这个读者，值得纪念的一天。”我自己也掩饰不住内心的激动。",head:[["meta",{property:"og:url",content:"https://vuepress-theme-hope-v2-demo.mrhope.site/coding-road/java-core/oo/interface.html"}],["meta",{property:"og:site_name",content:"coding-rode"}],["meta",{property:"og:title",content:"Java 接口"}],["meta",{property:"og:type",content:"article"}],["meta",{property:"og:updated_time",content:"2022-06-04T08:56:49.000Z"}],["meta",{property:"og:locale",content:"zh-CN"}],["meta",{property:"article:tag",content:"Java"}],["meta",{property:"article:modified_time",content:"2022-06-04T08:56:49.000Z"}]]},excerpt:"",headers:[],git:{createdTime:1653617096e3,updatedTime:1654333009e3,contributors:[{name:"林振辉",email:"linzhenhui@apexsoft.com",commits:2},{name:"thinkingme",email:"linzhenhuigg@gmail.com",commits:1}]},readingTime:{minutes:8.97,words:2690},filePathRelative:"coding-road/java-core/oo/interface.md"}},26866:(n,s,a)=>{a.r(s),a.d(s,{default:()=>b});var e=a(95393);const p=(0,e._)("h1",{id:"java-接口",tabindex:"-1"},[(0,e._)("a",{class:"header-anchor",href:"#java-接口","aria-hidden":"true"},"#"),(0,e.Uk)(" Java 接口")],-1),t=(0,e._)("p",null,"“哥，我看你朋友圈说《Java 程序员进阶之路》专栏收到了第一笔赞赏呀，虽然只有一块钱，但我也替你感到开心。”三妹的脸上洋溢着自信的微笑，仿佛这钱是打给她的一样。",-1),c=(0,e._)("p",null,[(0,e._)("img",{src:"https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/object-class/interface-01.png",alt:"",loading:"lazy"})],-1),o=(0,e._)("p",null,"“是啊，早上起来的时候看到这条信息，还真的是挺开心的，虽然只有一块钱，但是开源的第一笔，也是我人生当中的第一笔，真的非常感谢这个读者，值得纪念的一天。”我自己也掩饰不住内心的激动。",-1),l=(0,e._)("p",null,"“有了这份鼓励，我相信你更新下去的动力更足了！”三妹今天说的话真的是特别令人喜欢。",-1),i=(0,e._)("p",null,[(0,e._)("img",{src:"https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/object-class/interface-02.png",alt:"",loading:"lazy"})],-1),u=(0,e.Uk)("“是啊是啊，所以，今天要更新第 26 讲了——接口。”我接着说，“对于面向对象编程来说，抽象是一个极具魅力的特征。如果一个程序员的抽象思维很差，那他在编程中就会遇到很多困难，无法把业务变成具体的代码。在 Java 中，可以通过两种形式来达到抽象的目的，一种上一篇的主角——"),d={href:"https://mp.weixin.qq.com/s/WSmGwdtlimIFVVDVKfvrWQ",target:"_blank",rel:"noopener noreferrer"},r=(0,e.Uk)("抽象类"),k=(0,e.Uk)("，另外一种就是今天的主角——接口。”"),v=(0,e.uE)('<hr><p>“接口是什么呀？”三妹顺着我的话题及时的插话到。</p><p>接口通过 interface 关键字来定义，它可以包含一些常量和方法，来看下面这个示例。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Electronic</span> <span class="token punctuation">{</span>\n    <span class="token comment">// 常量</span>\n    <span class="token class-name">String</span> LED <span class="token operator">=</span> <span class="token string">&quot;LED&quot;</span><span class="token punctuation">;</span>\n\n    <span class="token comment">// 抽象方法</span>\n    <span class="token keyword">int</span> <span class="token function">getElectricityUse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">// 静态方法</span>\n    <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isEnergyEfficient</span><span class="token punctuation">(</span><span class="token class-name">String</span> electtronicType<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> electtronicType<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>LED<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token comment">// 默认方法</span>\n    <span class="token keyword">default</span> <span class="token keyword">void</span> <span class="token function">printDescription</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;电子&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>来看一下这段代码反编译后的字节码。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Electronic</span>\n<span class="token punctuation">{</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">int</span> <span class="token function">getElectricityUse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isEnergyEfficient</span><span class="token punctuation">(</span><span class="token class-name">String</span> electtronicType<span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> electtronicType<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;LED&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">printDescription</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;\\u7535\\u5B50&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> LED <span class="token operator">=</span> <span class="token string">&quot;LED&quot;</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>发现没？接口中定义的所有变量或者方法，都会自动添加上 <code>public</code> 关键字。</p><p>接下来，我来一一解释下 Electronic 接口中的核心知识点。</p><p>1）接口中定义的变量会在编译的时候自动加上 <code>public static final</code> 修饰符（注意看一下反编译后的字节码），也就是说上例中的 LED 变量其实就是一个常量。</p><p>Java 官方文档上有这样的声明：</p><blockquote><p>Every field declaration in the body of an interface is implicitly public, static, and final.</p></blockquote><p>换句话说，接口可以用来作为常量类使用，还能省略掉 <code>public static final</code>，看似不错的一种选择，对吧？</p><p>不过，这种选择并不可取。因为接口的本意是对方法进行抽象，而常量接口会对子类中的变量造成命名空间上的“污染”。</p><p>2）没有使用 <code>private</code>、<code>default</code> 或者 <code>static</code> 关键字修饰的方法是隐式抽象的，在编译的时候会自动加上 <code>public abstract</code> 修饰符。也就是说上例中的 <code>getElectricityUse()</code> 其实是一个抽象方法，没有方法体——这是定义接口的本意。</p><p>3）从 Java 8 开始，接口中允许有静态方法，比如说上例中的 <code>isEnergyEfficient()</code> 方法。</p><p>静态方法无法由（实现了该接口的）类的对象调用，它只能通过接口名来调用，比如说 <code>Electronic.isEnergyEfficient(&quot;LED&quot;)</code>。</p><p>接口中定义静态方法的目的是为了提供一种简单的机制，使我们不必创建对象就能调用方法，从而提高接口的竞争力。</p><p>4）接口中允许定义 <code>default</code> 方法也是从 Java 8 开始的，比如说上例中的 <code>printDescription()</code> 方法，它始终由一个代码块组成，为，实现该接口而不覆盖该方法的类提供默认实现。既然要提供默认实现，就要有方法体，换句话说，默认方法后面不能直接使用“;”号来结束——编译器会报错。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/object-class/interface-03.png" alt="" loading="lazy"></p><p>“为什么要在接口中定义默认方法呢？”三妹好奇地问到。</p><p>允许在接口中定义默认方法的理由很充分，因为一个接口可能有多个实现类，这些类就必须实现接口中定义的抽象类，否则编译器就会报错。假如我们需要在所有的实现类中追加某个具体的方法，在没有 <code>default</code> 方法的帮助下，我们就必须挨个对实现类进行修改。</p><p>由之前的例子我们就可以得出下面这些结论：</p><ul><li>接口中允许定义变量</li><li>接口中允许定义抽象方法</li><li>接口中允许定义静态方法（Java 8 之后）</li><li>接口中允许定义默认方法（Java 8 之后）</li></ul><p>除此之外，我们还应该知道：</p><p>1）接口不允许直接实例化，否则编译器会报错。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/object-class/interface-04.png" alt="" loading="lazy"></p><p>需要定义一个类去实现接口，见下例。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Computer</span> <span class="token keyword">implements</span> <span class="token class-name">Electronic</span> <span class="token punctuation">{</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">new</span> <span class="token class-name">Computer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getElectricityUse</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后再实例化。</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Electronic e = new Computer();\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2）接口可以是空的，既可以不定义变量，也可以不定义方法。最典型的例子就是 Serializable 接口，在 <code>java.io</code> 包下。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Serializable 接口用来为序列化的具体实现提供一个标记，也就是说，只要某个类实现了 Serializable 接口，那么它就可以用来序列化了。</p><p>3）不要在定义接口的时候使用 final 关键字，否则会报编译错误，因为接口就是为了让子类实现的，而 final 阻止了这种行为。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/object-class/interface-05.png" alt="" loading="lazy"></p><p>4）接口的抽象方法不能是 private、protected 或者 final，否则编译器都会报错。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/object-class/interface-06.png" alt="" loading="lazy"></p><p>5）接口的变量是隐式 <code>public static final</code>（常量），所以其值无法改变。</p><p>“接口可以做什么呢？”三妹见缝插针，问的很及时。</p><p>第一，使某些实现类具有我们想要的功能，比如说，实现了 Cloneable 接口的类具有拷贝的功能，实现了 Comparable 或者 Comparator 的类具有比较功能。</p><p>Cloneable 和 Serializable 一样，都属于标记型接口，它们内部都是空的。实现了 Cloneable 接口的类可以使用 <code>Object.clone()</code> 方法，否则会抛出 CloneNotSupportedException。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CloneableTest</span> <span class="token keyword">implements</span> <span class="token class-name">Cloneable</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">protected</span> <span class="token class-name">Object</span> <span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">CloneNotSupportedException</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">CloneNotSupportedException</span> <span class="token punctuation">{</span>\n        <span class="token class-name">CloneableTest</span> c1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CloneableTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">CloneableTest</span> c2 <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">CloneableTest</span><span class="token punctuation">)</span> c1<span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行后没有报错。现在把 <code>implements Cloneable</code> 去掉。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CloneableTest</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">protected</span> <span class="token class-name">Object</span> <span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">CloneNotSupportedException</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">CloneNotSupportedException</span> <span class="token punctuation">{</span>\n        <span class="token class-name">CloneableTest</span> c1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CloneableTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">CloneableTest</span> c2 <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">CloneableTest</span><span class="token punctuation">)</span> c1<span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行后抛出 CloneNotSupportedException：</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Exception in thread &quot;main&quot; java.lang.CloneNotSupportedException: com.cmower.baeldung.interface1.CloneableTest\n\tat java.base/java.lang.Object.clone(Native Method)\n\tat com.cmower.baeldung.interface1.CloneableTest.clone(CloneableTest.java:6)\n\tat com.cmower.baeldung.interface1.CloneableTest.main(CloneableTest.java:11)\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二，Java 原则上只支持单一继承，但通过接口可以实现多重继承的目的。</p><p>如果有两个类共同继承（extends）一个父类，那么父类的方法就会被两个子类重写。然后，如果有一个新类同时继承了这两个子类，那么在调用重写方法的时候，编译器就不能识别要调用哪个类的方法了。这也正是著名的菱形问题，见下图。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/object-class/interface-07.png" alt="" loading="lazy"></p><p>简单解释下，ClassC 同时继承了 ClassA 和 ClassB，ClassC 的对象在调用 ClassA 和 ClassB 中重写的方法时，就不知道该调用 ClassA 的方法，还是 ClassB 的方法。</p><p>接口没有这方面的困扰。来定义两个接口，Fly 接口会飞，Run 接口会跑。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Fly</span> <span class="token punctuation">{</span>\n    <span class="token keyword">void</span> <span class="token function">fly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Run</span> <span class="token punctuation">{</span>\n    <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后让 Pig 类同时实现这两个接口。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Pig</span> <span class="token keyword">implements</span> <span class="token class-name">Fly</span><span class="token punctuation">,</span><span class="token class-name">Run</span><span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">fly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;会飞的猪&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;会跑的猪&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在某种形式上，接口实现了多重继承的目的：现实世界里，猪的确只会跑，但在雷军的眼里，站在风口的猪就会飞，这就需要赋予这只猪更多的能力，通过抽象类是无法实现的，只能通过接口。</p><p>第三，实现多态。</p><p>什么是多态呢？通俗的理解，就是同一个事件发生在不同的对象上会产生不同的结果，鼠标左键点击窗口上的 X 号可以关闭窗口，点击超链接却可以打开新的网页。</p><p>多态可以通过继承（<code>extends</code>）的关系实现，也可以通过接口的形式实现。</p><p>Shape 接口表示一个形状。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>\n    <span class="token class-name">String</span> <span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Circle 类实现了 Shape 接口，并重写了 <code>name()</code> 方法。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Circle</span> <span class="token keyword">implements</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token string">&quot;圆&quot;</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Square 类也实现了 Shape 接口，并重写了 <code>name()</code> 方法。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Square</span> <span class="token keyword">implements</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token string">&quot;正方形&quot;</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后来看测试类。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Shape</span><span class="token punctuation">&gt;</span></span> shapes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Shape</span> circleShape <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Shape</span> squareShape <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Square</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nshapes<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>circleShape<span class="token punctuation">)</span><span class="token punctuation">;</span>\nshapes<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>squareShape<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Shape</span> shape <span class="token operator">:</span> shapes<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>shape<span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这就实现了多态，变量 circleShape、squareShape 的引用类型都是 Shape，但执行 <code>shape.name()</code> 方法的时候，Java 虚拟机知道该去调用 Circle 的 <code>name()</code> 方法还是 Square 的 <code>name()</code> 方法。</p><p>说一下多态存在的 3 个前提：</p><p>1、要有继承关系，比如说 Circle 和 Square 都实现了 Shape 接口。 2、子类要重写父类的方法，Circle 和 Square 都重写了 <code>name()</code> 方法。 3、父类引用指向子类对象，circleShape 和 squareShape 的类型都为 Shape，但前者指向的是 Circle 对象，后者指向的是 Square 对象。</p><p>然后，我们来看一下测试结果：</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>圆\n正方形\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>也就意味着，尽管在 for 循环中，shape 的类型都为 Shape，但在调用 <code>name()</code> 方法的时候，它知道 Circle 对象应该调用 Circle 类的 <code>name()</code> 方法，Square 对象应该调用 Square 类的 <code>name()</code> 方法。</p><p>“哦，我理解了哥。那我再问一下，抽象类和接口有什么差别呢？”</p><p>“哇，三妹呀，你这个问题恰到好处，问到了点子上。”我不由得为三妹竖起了大拇指。</p><p>1）语法层面上</p><ul><li>接口中不能有 private 和 protected 修饰的方法，抽象类中可以有。</li><li>接口中的变量只能是隐式的常量，抽象类中可以有任意类型的变量。</li><li>一个类只能继承一个抽象类，但却可以实现多个接口。</li></ul><p>2）设计层面上</p><p>抽象类是对类的一种抽象，继承抽象类的子类和抽象类本身是一种 <code>is-a</code> 的关系。</p><p>接口是对类的某种行为的一种抽象，接口和类之间并没有很强的关联关系，举个例子来说，所有的类都可以实现 <code>Serializable</code> 接口，从而具有序列化的功能，但不能说所有的类和 Serializable 之间是 <code>is-a</code> 的关系。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/xingbiaogongzhonghao.png" alt="" loading="lazy"></p>',80),m={},b=(0,a(13860).Z)(m,[["render",function(n,s){const a=(0,e.up)("ExternalLinkIcon");return(0,e.wg)(),(0,e.iD)("div",null,[p,t,c,o,l,i,(0,e._)("p",null,[u,(0,e._)("a",d,[r,(0,e.Wm)(a)]),k]),v])}]])},13860:(n,s)=>{s.Z=(n,s)=>{const a=n.__vccOpts||n;for(const[n,e]of s)a[n]=e;return a}}}]);