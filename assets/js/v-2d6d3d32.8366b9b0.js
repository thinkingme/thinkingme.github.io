"use strict";(self.webpackChunkcoding_road=self.webpackChunkcoding_road||[]).push([[1072],{42133:(n,s,a)=>{a.r(s),a.d(s,{data:()=>e});const e={key:"v-2d6d3d32",path:"/coding-road/java-core/oo/abstract.html",title:"Java 抽象类",lang:"zh-CN",frontmatter:{category:["Java核心"],tag:["Java"],summary:"Java 抽象类 “二哥，你这明显加快了更新的频率呀！”三妹对于我最近的肝劲由衷的佩服了起来。 “哈哈，是呀，这次不能再断更了，我要再更 175 篇，总计 200 篇，给广大的学弟学妹们一个完整的 Java 学习体系。”我对未来充满了信心。 “那就开始吧。”三妹说。 --- 定义抽象类的时候需要用到关键字 abstract，放在 class 关键字前，就像下",head:[["meta",{property:"og:url",content:"https://vuepress-theme-hope-v2-demo.mrhope.site/coding-road/java-core/oo/abstract.html"}],["meta",{property:"og:site_name",content:"coding-rode"}],["meta",{property:"og:title",content:"Java 抽象类"}],["meta",{property:"og:type",content:"article"}],["meta",{property:"og:updated_time",content:"2022-06-04T08:56:49.000Z"}],["meta",{property:"og:locale",content:"zh-CN"}],["meta",{property:"article:tag",content:"Java"}],["meta",{property:"article:modified_time",content:"2022-06-04T08:56:49.000Z"}]]},excerpt:"",headers:[],git:{createdTime:1653617096e3,updatedTime:1654333009e3,contributors:[{name:"林振辉",email:"linzhenhui@apexsoft.com",commits:2},{name:"thinkingme",email:"linzhenhuigg@gmail.com",commits:1}]},readingTime:{minutes:5.48,words:1645},filePathRelative:"coding-road/java-core/oo/abstract.md"}},63306:(n,s,a)=>{a.r(s),a.d(s,{default:()=>c});var e=a(95393);const t=[(0,e.uE)('<h1 id="java-抽象类" tabindex="-1"><a class="header-anchor" href="#java-抽象类" aria-hidden="true">#</a> Java 抽象类</h1><p>“二哥，你这明显加快了更新的频率呀！”三妹对于我最近的肝劲由衷的佩服了起来。</p><p>“哈哈，是呀，这次不能再断更了，我要再更 175 篇，总计 200 篇，给广大的学弟学妹们一个完整的 Java 学习体系。”我对未来充满了信心。</p><p>“那就开始吧。”三妹说。</p><hr><p>定义抽象类的时候需要用到关键字 <code>abstract</code>，放在 <code>class</code> 关键字前，就像下面这样。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">AbstractPlayer</span> <span class="token punctuation">{</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>关于抽象类的命名，《阿里的 Java 开发手册》上有强调，“抽象类命名要使用 Abstract 或 Base 开头”，这条规约还是值得遵守的。</p><p>抽象类是不能实例化的，尝试通过 <code>new</code> 关键字实例化的话，编译器会报错，提示“类是抽象的，不能实例化”。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/object-class/abstract-01.png" alt="" loading="lazy"></p><p>虽然抽象类不能实例化，但可以有子类。子类通过 <code>extends</code> 关键字来继承抽象类。就像下面这样。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BasketballPlayer</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractPlayer</span> <span class="token punctuation">{</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果一个类定义了一个或多个抽象方法，那么这个类必须是抽象类。</p><p>当我们尝试在一个普通类中定义抽象方法的时候，编译器会有两处错误提示。第一处在类级别上，提示“这个类必须通过 <code>abstract</code> 关键字定义”，见下图。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/object-class/abstract-02.png" alt="" loading="lazy"></p><p>第二处在尝试定义 abstract 的方法上，提示“抽象方法所在的类不是抽象的”，见下图。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/object-class/abstract-03.png" alt="" loading="lazy"></p><p>抽象类中既可以定义抽象方法，也可以定义普通方法，就像下面这样：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">AbstractPlayer</span> <span class="token punctuation">{</span>\n    <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sleep</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;运动员也要休息而不是挑战极限&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>抽象类派生的子类必须实现父类中定义的抽象方法。比如说，抽象类 AbstractPlayer 中定义了 <code>play()</code> 方法，子类 BasketballPlayer 中就必须实现。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BasketballPlayer</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractPlayer</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">void</span> <span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;我是张伯伦，篮球场上得过 100 分&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果没有实现的话，编译器会提示“子类必须实现抽象方法”，见下图。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/object-class/abstract-04.png" alt="" loading="lazy"></p><p>“二哥，抽象方法我明白了，那什么时候使用抽象方法呢？能给我讲讲它的应用场景吗？”三妹及时的插话道。</p><p>“这问题问的恰到好处呀！”我扶了扶眼镜继续说。</p><p><strong>第一种场景</strong>。</p><p>当我们希望一些通用的功能被多个子类复用的时候，就可以使用抽象类。比如说，AbstractPlayer 抽象类中有一个普通的方法 <code>sleep()</code>，表明所有运动员都需要休息，那么这个方法就可以被子类复用。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">AbstractPlayer</span> <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sleep</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;运动员也要休息而不是挑战极限&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>子类 BasketballPlayer 继承了 AbstractPlayer 类：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">BasketballPlayer</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractPlayer</span> <span class="token punctuation">{</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>也就拥有了 <code>sleep()</code> 方法。BasketballPlayer 的对象可以直接调用父类的 <code>sleep()</code> 方法：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">BasketballPlayer</span> basketballPlayer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BasketballPlayer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nbasketballPlayer<span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>子类 FootballPlayer 继承了 AbstractPlayer 类：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">FootballPlayer</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractPlayer</span> <span class="token punctuation">{</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>也拥有了 <code>sleep()</code> 方法，FootballPlayer 的对象也可以直接调用父类的 <code>sleep()</code> 方法：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">FootballPlayer</span> footballPlayer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FootballPlayer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nfootballPlayer<span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这样是不是就实现了代码的复用呢？</p><p><strong>第二种场景</strong>。</p><p>当我们需要在抽象类中定义好 API，然后在子类中扩展实现的时候就可以使用抽象类。比如说，AbstractPlayer 抽象类中定义了一个抽象方法 <code>play()</code>，表明所有运动员都可以从事某项运动，但需要对应子类去扩展实现，表明篮球运动员打篮球，足球运动员踢足球。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">AbstractPlayer</span> <span class="token punctuation">{</span>\n    <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>BasketballPlayer 继承了 AbstractPlayer 类，扩展实现了自己的 <code>play()</code> 方法。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BasketballPlayer</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractPlayer</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">void</span> <span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;我是张伯伦，我篮球场上得过 100 分，&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>FootballPlayer 继承了 AbstractPlayer 类，扩展实现了自己的 <code>play()</code> 方法。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FootballPlayer</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractPlayer</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">void</span> <span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;我是C罗，我能接住任意高度的头球&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了进一步展示抽象类的特性，我们再来看一个具体的示例。假设现在有一个文件，里面的内容非常简单，只有一个“Hello World”，现在需要有一个读取器将内容从文件中读取出来，最好能按照大写的方式，或者小写的方式来读。</p><p>这时候，最好定义一个抽象类 BaseFileReader：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">BaseFileReader</span> <span class="token punctuation">{</span>\n    <span class="token keyword">protected</span> <span class="token class-name">Path</span> filePath<span class="token punctuation">;</span>\n\n    <span class="token keyword">protected</span> <span class="token class-name">BaseFileReader</span><span class="token punctuation">(</span><span class="token class-name">Path</span> filePath<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>filePath <span class="token operator">=</span> filePath<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> <span class="token function">readFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token class-name">Files</span><span class="token punctuation">.</span><span class="token function">lines</span><span class="token punctuation">(</span>filePath<span class="token punctuation">)</span>\n                <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token operator">::</span><span class="token function">mapFileLine</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">protected</span> <span class="token keyword">abstract</span> <span class="token class-name">String</span> <span class="token function">mapFileLine</span><span class="token punctuation">(</span><span class="token class-name">String</span> line<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>filePath 为文件路径，使用 protected 修饰，表明该成员变量可以在需要时被子类访问到。</p></li><li><p><code>readFile()</code> 方法用来读取文件，方法体里面调用了抽象方法 <code>mapFileLine()</code>——需要子类来扩展实现大小写的不同读取方式。</p></li></ul><p>在我看来，BaseFileReader 类设计的就非常合理，并且易于扩展，子类只需要专注于具体的大小写实现方式就可以了。</p><p>小写的方式：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">LowercaseFileReader</span> <span class="token keyword">extends</span> <span class="token class-name">BaseFileReader</span> <span class="token punctuation">{</span>\n    <span class="token keyword">protected</span> <span class="token class-name">LowercaseFileReader</span><span class="token punctuation">(</span><span class="token class-name">Path</span> filePath<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">super</span><span class="token punctuation">(</span>filePath<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">protected</span> <span class="token class-name">String</span> <span class="token function">mapFileLine</span><span class="token punctuation">(</span><span class="token class-name">String</span> line<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> line<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>大写的方式：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">UppercaseFileReader</span> <span class="token keyword">extends</span> <span class="token class-name">BaseFileReader</span> <span class="token punctuation">{</span>\n    <span class="token keyword">protected</span> <span class="token class-name">UppercaseFileReader</span><span class="token punctuation">(</span><span class="token class-name">Path</span> filePath<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">super</span><span class="token punctuation">(</span>filePath<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">protected</span> <span class="token class-name">String</span> <span class="token function">mapFileLine</span><span class="token punctuation">(</span><span class="token class-name">String</span> line<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> line<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从文件里面一行一行读取内容的代码被子类复用了。与此同时，子类只需要专注于自己该做的工作，LowercaseFileReader 以小写的方式读取文件内容，UppercaseFileReader 以大写的方式读取文件内容。</p><p>来看一下测试类 FileReaderTest：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FileReaderTest</span> <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">URISyntaxException</span><span class="token punctuation">,</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>\n        <span class="token class-name">URL</span> location <span class="token operator">=</span> <span class="token class-name">FileReaderTest</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getResource</span><span class="token punctuation">(</span><span class="token string">&quot;helloworld.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">Path</span> path <span class="token operator">=</span> <span class="token class-name">Paths</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>location<span class="token punctuation">.</span><span class="token function">toURI</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">BaseFileReader</span> lowercaseFileReader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LowercaseFileReader</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">BaseFileReader</span> uppercaseFileReader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UppercaseFileReader</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>lowercaseFileReader<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>uppercaseFileReader<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在项目的 resource 目录下建一个文本文件，名字叫 helloworld.txt，里面的内容就是“Hello World”。文件的具体位置如下图所示，我用的集成开发环境是 Intellij IDEA。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/object-class/abstract-05.png" alt="" loading="lazy"></p><p>在 resource 目录下的文件可以通过 <code>ClassLoader.getResource()</code> 的方式获取到 URI 路径，然后就可以取到文本内容了。</p><p>输出结果如下所示：</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>[hello world]\n[HELLO WORLD]\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>“完了吗？二哥”三妹似乎还沉浸在聆听教诲的快乐中。</p><p>“是滴，这次我们系统化的学习了抽象类，可以说面面俱到了。三妹你可以把代码敲一遍，加强了一些印象，电脑交给你了。”说完，我就跑到阳台去抽烟了。</p><p>“呼。。。。。”一个大大的眼圈飘散开来，又是愉快的一天~</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/xingbiaogongzhonghao.png" alt="" loading="lazy"></p>',66)],p={},c=(0,a(13860).Z)(p,[["render",function(n,s){return(0,e.wg)(),(0,e.iD)("div",null,t)}]])},13860:(n,s)=>{s.Z=(n,s)=>{const a=n.__vccOpts||n;for(const[n,e]of s)a[n]=e;return a}}}]);