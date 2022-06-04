"use strict";(self.webpackChunkcoding_road=self.webpackChunkcoding_road||[]).push([[8106],{96237:(n,a,s)=>{s.r(a),s.d(a,{data:()=>t});const t={key:"v-6d539db4",path:"/coding-road/java-core/string-Array/print.html",title:"如何优雅地打印 Java 数组？",lang:"zh-CN",frontmatter:{category:["Java核心"],tag:["Java"],summary:"如何优雅地打印 Java 数组？ “哥，之前听你说，数组也是一个对象，但 Java 中并未明确的定义这样一个类。”看来三妹有在用心地学习。 “是的，因此数组也就没有机会覆盖 Object.toString() 方法。如果尝试直接打印数组的话，输出的结果并不是我们预期的结果。”我接着三妹的话继续说。 “那怎么打印数组呢？”三妹心有灵犀地把今天的核心问题提了出来",head:[["meta",{property:"og:url",content:"https://vuepress-theme-hope-v2-demo.mrhope.site/coding-road/java-core/string-Array/print.html"}],["meta",{property:"og:site_name",content:"coding-rode"}],["meta",{property:"og:title",content:"如何优雅地打印 Java 数组？"}],["meta",{property:"og:type",content:"article"}],["meta",{property:"og:updated_time",content:"2022-06-04T08:56:49.000Z"}],["meta",{property:"og:locale",content:"zh-CN"}],["meta",{property:"article:tag",content:"Java"}],["meta",{property:"article:modified_time",content:"2022-06-04T08:56:49.000Z"}]]},excerpt:"",headers:[],git:{createdTime:1653617096e3,updatedTime:1654333009e3,contributors:[{name:"林振辉",email:"linzhenhui@apexsoft.com",commits:2},{name:"thinkingme",email:"linzhenhuigg@gmail.com",commits:1}]},readingTime:{minutes:4.35,words:1304},filePathRelative:"coding-road/java-core/string-Array/print.md"}},55372:(n,a,s)=>{s.r(a),s.d(a,{default:()=>k});var t=s(95393);const e=(0,t.uE)('<h1 id="如何优雅地打印-java-数组" tabindex="-1"><a class="header-anchor" href="#如何优雅地打印-java-数组" aria-hidden="true">#</a> 如何优雅地打印 Java 数组？</h1><p>“哥，之前听你说，数组也是一个对象，但 Java 中并未明确的定义这样一个类。”看来三妹有在用心地学习。</p><p>“是的，因此数组也就没有机会覆盖 <code>Object.toString()</code> 方法。如果尝试直接打印数组的话，输出的结果并不是我们预期的结果。”我接着三妹的话继续说。</p><p>“那怎么打印数组呢？”三妹心有灵犀地把今天的核心问题提了出来。</p><p>“首先，我们来看一下，为什么不能直接打印数组，直接打印的话，会出现什么问题。”</p><p>来看这样一个例子。</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>String [] cmowers = {&quot;沉默&quot;,&quot;王二&quot;,&quot;一枚有趣的程序员&quot;};\nSystem.out.println(cmowers);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>程序打印的结果是：</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>[Ljava.lang.String;@3d075dc0\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>[Ljava.lang.String;</code> 表示字符串数组的 Class 名，@ 后面的是十六进制的 hashCode——这样的打印结果太“人性化”了，一般人表示看不懂！为什么会这样显示呢？查看一下 <code>java.lang.Object</code> 类的 <code>toString()</code> 方法就明白了。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;@&quot;</span> <span class="token operator">+</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">toHexString</span><span class="token punctuation">(</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再次证明，数组虽然没有显式定义成一个类，但它的确是一个对象，继承了祖先类 Object 的所有方法。</p><p>“哥，那为什么数组不单独定义一个类来表示呢？就像字符串 String 类那样呢？”三妹这个问题让人头大，但也好解释。</p><p>“一个合理的说法是 Java 将其隐藏了。假如真的存在这么一个类，就叫 Array.java 吧，我们假想一下它真实的样子，必须得有一个容器来存放数组的每一个元素，就像 String 类那样。”一边回答三妹，我一边打开了 String 类的源码。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">String</span>\n    <span class="token keyword">implements</span> <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span>Serializable</span><span class="token punctuation">,</span> <span class="token class-name">Comparable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">,</span> <span class="token class-name">CharSequence</span> <span class="token punctuation">{</span>\n    <span class="token doc-comment comment">/** The value is used for character storage. */</span>\n    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">char</span> value<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>“最终还是要用类似一种数组的形式来存放数组的元素，对吧？这就变得很没有必要了，不妨就把数组当做是一个没有形体的对象吧！”</p><p>“好了，不讨论这个了。”我怕话题扯远了，扯到我自己也答不出来就尴尬了，赶紧把三妹的思路拽了回来。</p><p>“我们来看第一种打印数组的方法，使用时髦一点的 Stream 流。”</p><p>第一种形式：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>cmowers<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>s <span class="token operator">-&gt;</span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>第二种形式：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">Stream</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>cmowers<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token operator">::</span><span class="token function">println</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>第三种形式：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>cmowers<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token operator">::</span><span class="token function">println</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>打印的结果如下所示。</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>沉默\n王二\n一枚有趣的程序员\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>没错，这三种方式都可以轻松胜任本职工作，并且显得有点高大上，毕竟用到了 Stream，以及 lambda 表达式。</p><p>“当然了，也可以使用比较土的方式，for 循环。甚至 for-each 也行。”</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> cmowers<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>cmowers<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> s <span class="token operator">:</span> cmowers<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>',29),p=(0,t.Uk)("“哥，你难道忘了"),o={href:"https://mp.weixin.qq.com/s/acnDNH6A8USm_EYIT6i-jA",target:"_blank",rel:"noopener noreferrer"},c=(0,t.Uk)("上一篇"),i=(0,t.Uk)("在讲 Arrays 工具类的时候，提到过另外一种方法 "),l=(0,t._)("code",null,"Arrays.toString()",-1),u=(0,t.Uk)(" 吗？”三妹看我一直说不到点子上，有点着急了。"),r=(0,t.uE)('<p>“当然没有了，我认为 <code>Arrays.toString()</code> 是打印数组的最佳方式，没有之一。”我的情绪有点激动。</p><p><code>Arrays.toString()</code> 可以将任意类型的数组转成字符串，包括基本类型数组和引用类型数组。该方法有多种重载形式。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/array/print-01.png" alt="" loading="lazy"></p><p>使用 <code>Arrays.toString()</code> 方法来打印数组再优雅不过了，就像，就像，就像蒙娜丽莎的微笑。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/array/print-02.png" alt="" loading="lazy"></p><p>（三妹看到这么一副图的时候忍不住地笑了）</p><p>“三妹，你不要笑，来，怀揣着愉快的心情看一下代码示例。”</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> cmowers <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&quot;沉默&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;王二&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;一枚有趣的程序员&quot;</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>cmowers<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>程序打印结果：</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>[沉默, 王二, 一枚有趣的程序员]\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>哇，打印格式不要太完美，不多不少！完全是我们预期的结果：<code>[]</code> 表明是一个数组，<code>,</code> 点和空格用来分割元素。</p><p>“哥，那如果我想打印二维数组呢？”</p><p>“可以使用 <code>Arrays.deepToString()</code> 方法。”</p><p>打印结果如下所示。</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>[[沉默, 王二], [一枚有趣的程序员]]\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><hr><p>“说到打印，三妹，哥给你提醒一点。阿里巴巴的 Java 开发手册上有这样一条规约，你看。”</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/array/print-03.png" alt="" loading="lazy"></p><p>“什么是 POJO 呢，就是 Plain Ordinary Java Object 的缩写，一般在 Web 应用程序中建立一个数据库的映射对象时，我们称它为 POJO，这类对象不继承或不实现任何其它 Java 框架的类或接口。”</p><p>“对于这样的类，最好是重写一下它的 <code>toString()</code> 方法，方便查看这个对象到底包含了什么字段，好排查问题。”</p><p>“如果不重写的话，打印出来的 Java 对象就像直接打印数组的那样，一串谁也看不懂的字符序列。”</p><p>“可以借助 Intellij IDEA 生成重写的 <code>toString()</code> 方法，特别方便。”</p><p>“好的，哥，我记住了。以后遇到的话，我注意下。你去休息吧，我来敲一下你提到的这些代码，练一练。”</p><p>“OK，我走，我走。”</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/xingbiaogongzhonghao.png" alt="" loading="lazy"></p>',25),d={},k=(0,s(13860).Z)(d,[["render",function(n,a){const s=(0,t.up)("ExternalLinkIcon");return(0,t.wg)(),(0,t.iD)("div",null,[e,(0,t._)("p",null,[p,(0,t._)("a",o,[c,(0,t.Wm)(s)]),i,l,u]),r])}]])},13860:(n,a)=>{a.Z=(n,a)=>{const s=n.__vccOpts||n;for(const[n,t]of a)s[n]=t;return s}}}]);