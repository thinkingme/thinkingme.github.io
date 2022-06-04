"use strict";(self.webpackChunkcoding_road=self.webpackChunkcoding_road||[]).push([[825],{32e3:(n,s,a)=>{a.r(s),a.d(s,{data:()=>t});const t={key:"v-5b1ec212",path:"/coding-road/java-core/string-Array/equals.html",title:"Java 判断两个字符串是否相等？",lang:"zh-CN",frontmatter:{category:["Java核心"],tag:["Java"],summary:"Java 判断两个字符串是否相等？ “哥，如何比较两个字符串相等啊？”三妹问。 “这个问题看似简单，却在 Stack Overflow 上有超过 370 万的访问量。”我说，“这个问题也可以引申为 .equals() 和 ‘==’ 操作符有什么区别。” “==”操作符用于比较两个对象的地址是否相等。; .equals() 方法用于比较两个对象的内容是否相等。",head:[["meta",{property:"og:url",content:"https://vuepress-theme-hope-v2-demo.mrhope.site/coding-road/java-core/string-Array/equals.html"}],["meta",{property:"og:site_name",content:"coding-rode"}],["meta",{property:"og:title",content:"Java 判断两个字符串是否相等？"}],["meta",{property:"og:type",content:"article"}],["meta",{property:"og:updated_time",content:"2022-06-04T08:56:49.000Z"}],["meta",{property:"og:locale",content:"zh-CN"}],["meta",{property:"article:tag",content:"Java"}],["meta",{property:"article:modified_time",content:"2022-06-04T08:56:49.000Z"}]]},excerpt:"",headers:[],git:{createdTime:1653617096e3,updatedTime:1654333009e3,contributors:[{name:"林振辉",email:"linzhenhui@apexsoft.com",commits:2},{name:"thinkingme",email:"linzhenhuigg@gmail.com",commits:1}]},readingTime:{minutes:5.83,words:1748},filePathRelative:"coding-road/java-core/string-Array/equals.md"}},91459:(n,s,a)=>{a.r(s),a.d(s,{default:()=>o});var t=a(95393);const p=[(0,t.uE)('<h1 id="java-判断两个字符串是否相等" tabindex="-1"><a class="header-anchor" href="#java-判断两个字符串是否相等" aria-hidden="true">#</a> Java 判断两个字符串是否相等？</h1><p>“哥，如何比较两个字符串相等啊？”三妹问。</p><p>“这个问题看似简单，却在 Stack Overflow 上有超过 370 万的访问量。”我说，“这个问题也可以引申为 <code>.equals()</code> 和 ‘==’ 操作符有什么区别。”</p><ul><li>“==”操作符用于比较两个对象的地址是否相等。</li><li><code>.equals()</code> 方法用于比较两个对象的内容是否相等。</li></ul><p>“不是很理解。”三妹感到很困惑。</p><p>“我来举个不恰当又很恰当的例子，一看你就明白了，三妹。”</p><p>有一对双胞胎，姐姐叫阿丽塔，妹妹叫洛丽塔。我们普通人可能完全无法分辨谁是姐姐谁是妹妹，可她们的妈妈却可以轻而易举地辨认出。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/string/equals-01.png" alt="" loading="lazy"></p><p><code>.equals()</code> 就好像我们普通人，看见阿丽塔以为是洛丽塔，看见洛丽塔以为是阿丽塔，看起来一样就觉得她们是同一个人；“==”操作符就好像她们的妈妈，要求更严格，观察更细致，一眼就能分辨出谁是姐姐谁是妹妹。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">String</span> alita <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token string">&quot;小萝莉&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">String</span> luolita <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token string">&quot;小萝莉&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>alita<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>luolita<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>\n<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>alita <span class="token operator">==</span> luolita<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>就上面这段代码来说，<code>.equals()</code> 输出的结果为 true，而“==”操作符输出的结果为 false——前者要求内容相等就可以，后者要求必须是同一个对象。</p><p>“三妹，之前已经学过了，Java 的所有类都默认地继承 Object 这个超类，该类有一个名为 <code>.equals()</code> 的方法。”一边说，我一边打开了 Object 类的源码。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">Object</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">==</span> obj<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你看，Object 类的 <code>.equals()</code> 方法默认采用的是“<mark>”操作符进行比较。假如子类没有重写该方法的话，那么“</mark>”操作符和 <code>.equals()</code> 方法的功效就完全一样——比较两个对象的内存地址是否相等。</p><p>但实际情况中，有不少类重写了 <code>.equals()</code> 方法，因为比较内存地址的要求比较严格，不太符合现实中所有的场景需求。拿 String 类来说，我们在比较字符串的时候，的确只想判断它们俩的内容是相等的就可以了，并不想比较它们俩是不是同一个对象。</p><p>况且，字符串有字符串常量池的概念，本身就推荐使用 <code>String s = &quot;字符串&quot;</code> 这种形式来创建字符串对象，而不是通过 new 关键字的方式，因为可以把字符串缓存在字符串常量池中，方便下次使用。</p><p>“哦，我明白了。”三妹说。</p><p>“那就来看一下 <code>.equals()</code> 方法的源码吧。”我说。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">Object</span> anObject<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">==</span> anObject<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>anObject <span class="token keyword">instanceof</span> <span class="token class-name">String</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">String</span> aString <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">)</span>anObject<span class="token punctuation">;</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">coder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> aString<span class="token punctuation">.</span><span class="token function">coder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> <span class="token function">isLatin1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token class-name">StringLatin1</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> aString<span class="token punctuation">.</span>value<span class="token punctuation">)</span>\n                    <span class="token operator">:</span> <span class="token class-name">StringUTF16</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> aString<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，如果两个字符串对象的可以“==”，那就直接返回 true 了，因为这种情况下，字符串内容是必然相等的。否则就按照字符编码进行比较，分为 UTF16 和 Latin1，差别不是很大，就拿 Latin1 的来说吧。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token annotation punctuation">@HotSpotIntrinsicCandidate</span>\n<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">equals</span><span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> value<span class="token punctuation">,</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> other<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>value<span class="token punctuation">.</span>length <span class="token operator">==</span> other<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> value<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">if</span> <span class="token punctuation">(</span>value<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">!=</span> other<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n        <span class="token punctuation">}</span>\n        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我的 JDK 版本是 Java 11，也就是最新的 LTS（长期支持）版本。该版本中，String 类使用字节数组实现的，所以比较两个字符串的内容是否相等时，可以先比较字节数组的长度是否相等，不相等就直接返回 false；否则就遍历两个字符串的字节数组，只有有一个字节不相等，就返回 false。</p><p>“嗯，二哥，这段源码不难理解。”三妹自信地说。</p><p>“那出几道题考考你吧！”我说。</p><p>第一题：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token string">&quot;小萝莉&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;小萝莉&quot;</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>“输出什么呢？”我问。</p><p>“<code>.equals()</code> 比较的是两个字符串对象的内容是否相等，所以结果为 true。”三妹答。</p><p>第二题：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token string">&quot;小萝莉&quot;</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token string">&quot;小萝莉&quot;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>“==操作符左侧的是在堆中创建的对象，右侧是在字符串常量池中的对象，尽管内容相同，但内存地址不同，所以返回 false。”三妹答。</p><p>第三题：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token string">&quot;小萝莉&quot;</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token string">&quot;小萝莉&quot;</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>“new 出来的对象肯定是完全不同的内存地址，所以返回 false。”三妹答。</p><p>第四题：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token string">&quot;小萝莉&quot;</span> <span class="token operator">==</span> <span class="token string">&quot;小萝莉&quot;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>“字符串常量池中只会有一个相同内容的对象，所以返回 true。”三妹答。</p><p>第五题：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token string">&quot;小萝莉&quot;</span> <span class="token operator">==</span> <span class="token string">&quot;小&quot;</span> <span class="token operator">+</span> <span class="token string">&quot;萝莉&quot;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>“由于‘小’和‘萝莉’都在字符串常量池，所以编译器在遇到‘+’操作符的时候将其自动优化为“小萝莉”，所以返回 true。”</p><p>第六题：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token string">&quot;小萝莉&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">intern</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token string">&quot;小萝莉&quot;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>“<code>new String(&quot;小萝莉&quot;)</code> 在执行的时候，会先在字符串常量池中创建对象，然后再在堆中创建对象；执行 <code>intern()</code> 方法的时候发现字符串常量池中已经有了‘小萝莉’这个对象，所以就直接返回字符串常量池中的对象引用了，那再与字符串常量池中的‘小萝莉’比较，当然会返回 true 了。”三妹说。</p><p>哇，不得不说，三妹前几节的字符串相关内容都完全学会了呀！</p><p>“三妹，哥再给你补充一点。”我说。</p><p>“如果要进行两个字符串对象的内容比较，除了 <code>.equals()</code> 方法，还有其他两个可选的方案。”</p><p>1）<code>Objects.equals()</code></p><p><code>Objects.equals()</code> 这个静态方法的优势在于不需要在调用之前判空。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">Object</span> a<span class="token punctuation">,</span> <span class="token class-name">Object</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">(</span>a <span class="token operator">==</span> b<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token punctuation">(</span>a <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> a<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果直接使用 <code>a.equals(b)</code>，则需要在调用之前对 a 进行判空，否则可能会抛出空指针 <code>java.lang.NullPointerException</code>。<code>Objects.equals()</code> 用起来就完全没有这个担心。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;小萝莉&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token string">&quot;小&quot;</span> <span class="token operator">+</span> <span class="token string">&quot;萝莉&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// --&gt; true</span>\n<span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token string">&quot;小&quot;</span> <span class="token operator">+</span> <span class="token string">&quot;萝莉&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// --&gt; false</span>\n<span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token comment">// --&gt; true</span>\n\n<span class="token class-name">String</span> a <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\na<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token string">&quot;小&quot;</span> <span class="token operator">+</span> <span class="token string">&quot;萝莉&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// throw exception</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2）String 类的 <code>.contentEquals()</code></p><p><code>.contentEquals()</code> 的优势在于可以将字符串与任何的字符序列（StringBuffer、StringBuilder、String、CharSequence）进行比较。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">contentEquals</span><span class="token punctuation">(</span><span class="token class-name">CharSequence</span> cs<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// Argument is a StringBuffer, StringBuilder</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>cs <span class="token keyword">instanceof</span> <span class="token class-name">AbstractStringBuilder</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>cs <span class="token keyword">instanceof</span> <span class="token class-name">StringBuffer</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">synchronized</span><span class="token punctuation">(</span>cs<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                <span class="token keyword">return</span> <span class="token function">nonSyncContentEquals</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">AbstractStringBuilder</span><span class="token punctuation">)</span>cs<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> <span class="token function">nonSyncContentEquals</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">AbstractStringBuilder</span><span class="token punctuation">)</span>cs<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n    <span class="token comment">// Argument is a String</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>cs <span class="token keyword">instanceof</span> <span class="token class-name">String</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token function">equals</span><span class="token punctuation">(</span>cs<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token comment">// Argument is a generic CharSequence</span>\n    <span class="token keyword">int</span> n <span class="token operator">=</span> cs<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>n <span class="token operator">!=</span> <span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> val <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isLatin1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>val<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">&amp;</span> <span class="token number">0xff</span><span class="token punctuation">)</span> <span class="token operator">!=</span> cs<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token class-name">StringUTF16</span><span class="token punctuation">.</span><span class="token function">contentEquals</span><span class="token punctuation">(</span>val<span class="token punctuation">,</span> cs<span class="token punctuation">,</span> n<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从源码上可以看得出，如果 cs 是 StringBuffer，该方法还会进行同步，非常的智能化；如果是 String 的话，其实调用的还是 <code>equals()</code> 方法。当然了，这也就意味着使用该方法进行比较的时候，多出来了很多步骤，性能上有些损失。</p><p>“是的，总体上感觉还是 <code>Objects.equals()</code> 比较舒服。”三妹的眼睛是雪亮的，发现了这个方法的优点。</p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/xingbiaogongzhonghao.png">',57)],e={},o=(0,a(13860).Z)(e,[["render",function(n,s){return(0,t.wg)(),(0,t.iD)("div",null,p)}]])},13860:(n,s)=>{s.Z=(n,s)=>{const a=n.__vccOpts||n;for(const[n,t]of s)a[n]=t;return a}}}]);