"use strict";(self.webpackChunkcoding_road=self.webpackChunkcoding_road||[]).push([[8594],{6792:(n,s,a)=>{a.r(s),a.d(s,{data:()=>e});const e={key:"v-32afc5b8",path:"/coding-road/java-core/basic-extra-meal/hashcode.html",title:"深入理解 Java 中的 hashCode 方法",lang:"zh-CN",frontmatter:{category:["Java核心"],tag:["Java"],summary:"深入理解 Java 中的 hashCode 方法 假期结束了，需要快速切换到工作的状态投入到新的一天当中。放假的时候痛快地玩耍，上班的时候积极的工作，这应该是我们大多数“现代人”该有的生活状态。 我之所以费尽心思铺垫了前面这段话，就是想告诉大家，技术文虽迟但到，来吧，学起来~ 今天我们来谈谈 Java 中的 hashCode() 方法。众所周知，Java 是",head:[["meta",{property:"og:url",content:"https://vuepress-theme-hope-v2-demo.mrhope.site/coding-road/java-core/basic-extra-meal/hashcode.html"}],["meta",{property:"og:site_name",content:"coding-rode"}],["meta",{property:"og:title",content:"深入理解 Java 中的 hashCode 方法"}],["meta",{property:"og:type",content:"article"}],["meta",{property:"og:updated_time",content:"2022-06-04T07:20:53.000Z"}],["meta",{property:"og:locale",content:"zh-CN"}],["meta",{property:"article:tag",content:"Java"}],["meta",{property:"article:modified_time",content:"2022-06-04T07:20:53.000Z"}]]},excerpt:"",headers:[],git:{createdTime:1653617096e3,updatedTime:1654327253e3,contributors:[{name:"林振辉",email:"linzhenhui@apexsoft.com",commits:2}]},readingTime:{minutes:8.7,words:2609},filePathRelative:"coding-road/java-core/basic-extra-meal/hashcode.md"}},42798:(n,s,a)=>{a.r(s),a.d(s,{default:()=>o});var e=a(95393);const t=[(0,e.uE)('<h1 id="深入理解-java-中的-hashcode-方法" tabindex="-1"><a class="header-anchor" href="#深入理解-java-中的-hashcode-方法" aria-hidden="true">#</a> 深入理解 Java 中的 hashCode 方法</h1><p>假期结束了，需要快速切换到工作的状态投入到新的一天当中。放假的时候痛快地玩耍，上班的时候积极的工作，这应该是我们大多数“现代人”该有的生活状态。</p><p>我之所以费尽心思铺垫了前面这段话，就是想告诉大家，技术文虽迟但到，来吧，学起来~</p><p>今天我们来谈谈 Java 中的 <code>hashCode()</code> 方法。众所周知，Java 是一门面向对象的编程语言，所有的类都会默认继承自 Object 类，而 Object 的中文意思就是“对象”。</p><p>Object 类中就包含了 <code>hashCode()</code> 方法：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token annotation punctuation">@HotSpotIntrinsicCandidate</span>\n<span class="token keyword">public</span> <span class="token keyword">native</span> <span class="token keyword">int</span> <span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>意味着所有的类都会有一个 <code>hashCode()</code> 方法，该方法会返回一个 int 类型的值。由于 <code>hashCode()</code> 方法是一个本地方法（<code>native</code> 关键字修饰的方法，用 <code>C/C++</code> 语言实现，由 Java 调用），意味着 Object 类中并没有给出具体的实现。</p><p>具体的实现可以参考 <code>jdk/src/hotspot/share/runtime/synchronizer.cpp</code>（源码可以到 GitHub 上 OpenJDK 的仓库中下载）。<code>get_next_hash()</code> 方法会根据 hashCode 的取值来决定采用哪一种哈希值的生成策略。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/basic-extra-meal/hashcode-1.png" alt="" loading="lazy"></p><p>并且 <code>hashCode()</code> 方法被 <code>@HotSpotIntrinsicCandidate</code> 注解修饰，说明它在 HotSpot 虚拟机中有一套高效的实现，基于 CPU 指令。</p><p>那大家有没有想过这样一个问题：为什么 Object 类需要一个 <code>hashCode()</code> 方法呢？</p><p>在 Java 中，<code>hashCode()</code> 方法的主要作用就是为了配合哈希表使用的。</p><p>哈希表（Hash Table），也叫散列表，是一种可以通过关键码值（key-value）直接访问的数据结构，它最大的特点就是可以快速实现查找、插入和删除。其中用到的算法叫做哈希，就是把任意长度的输入，变换成固定长度的输出，该输出就是哈希值。像 MD5、SHA1 都用的是哈希算法。</p><p>像 Java 中的 HashSet、Hashtable（注意是小写的 t）、HashMap 都是基于哈希表的具体实现。其中的 HashMap 就是最典型的代表，不仅面试官经常问，工作中的使用频率也非常的高。</p><p>大家想一下，如果没有哈希表，但又需要这样一个数据结构，它里面存放的数据是不允许重复的，该怎么办呢？</p><p>要不使用 <code>equals()</code> 方法进行逐个比较？这种方案当然是可行的。但如果数据量特别特别大，采用 <code>equals()</code> 方法进行逐个对比的效率肯定很低很低，最好的解决方案就是哈希表。</p><p>拿 HashMap 来说吧。当我们要在它里面添加对象时，先调用这个对象的 <code>hashCode()</code> 方法，得到对应的哈希值，然后将哈希值和对象一起放到 HashMap 中。当我们要再添加一个新的对象时：</p><ul><li>获取对象的哈希值；</li><li>和之前已经存在的哈希值进行比较，如果不相等，直接存进去；</li><li>如果有相等的，再调用 <code>equals()</code> 方法进行对象之间的比较，如果相等，不存了；</li><li>如果不等，说明哈希冲突了，增加一个链表，存放新的对象；</li><li>如果链表的长度大于 8，转为红黑树来处理。</li></ul><p>就这么一套下来，调用 <code>equals()</code> 方法的频率就大大降低了。也就是说，只要哈希算法足够的高效，把发生哈希冲突的频率降到最低，哈希表的效率就特别的高。</p><p>来看一下 HashMap 的哈希算法：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token function">hash</span><span class="token punctuation">(</span><span class="token class-name">Object</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">int</span> h<span class="token punctuation">;</span>\n    <span class="token keyword">return</span> <span class="token punctuation">(</span>key <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token number">0</span> <span class="token operator">:</span> <span class="token punctuation">(</span>h <span class="token operator">=</span> key<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">^</span> <span class="token punctuation">(</span>h <span class="token operator">&gt;&gt;&gt;</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>先调用对象的 <code>hashCode()</code> 方法，然后对该值进行右移运算，然后再进行异或运算。</p><p>通常来说，String 会用来作为 HashMap 的键进行哈希运算，因此我们再来看一下 String 的 <code>hashCode()</code> 方法：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">int</span> h <span class="token operator">=</span> hash<span class="token punctuation">;</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>h <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> value<span class="token punctuation">.</span>length <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        hash <span class="token operator">=</span> h <span class="token operator">=</span> <span class="token function">isLatin1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token class-name">StringLatin1</span><span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>\n                <span class="token operator">:</span> <span class="token class-name">StringUTF16</span><span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> h<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">int</span> h <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>\n    <span class="token keyword">int</span> length <span class="token operator">=</span> value<span class="token punctuation">.</span>length <span class="token operator">&gt;&gt;</span> <span class="token number">1</span><span class="token punctuation">;</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        h <span class="token operator">=</span> <span class="token number">31</span> <span class="token operator">*</span> h <span class="token operator">+</span> <span class="token function">getChar</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> h<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可想而知，经过这么一系列复杂的运算，再加上 JDK 作者这种大师级别的设计，哈希冲突的概率我相信已经降到了最低。</p><p>当然了，从理论上来说，对于两个不同对象，它们通过 <code>hashCode()</code> 方法计算后的值可能相同。因此，不能使用 <code>hashCode()</code> 方法来判断两个对象是否相等，必须得通过 <code>equals()</code> 方法。</p><p>也就是说：</p><ul><li>如果两个对象调用 <code>equals()</code> 方法得到的结果为 true，调用 <code>hashCode()</code> 方法得到的结果必定相等；</li><li>如果两个对象调用 <code>hashCode()</code> 方法得到的结果不相等，调用 <code>equals()</code> 方法得到的结果必定为 false；</li></ul><p>反之：</p><ul><li>如果两个对象调用 <code>equals()</code> 方法得到的结果为 false，调用 <code>hashCode()</code> 方法得到的结果不一定不相等；</li><li>如果两个对象调用 <code>hashCode()</code> 方法得到的结果相等，调用 <code>equals()</code> 方法得到的结果不一定为 true；</li></ul><p>来看下面这段代码。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span> <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Student</span> s1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token number">18</span><span class="token punctuation">,</span> <span class="token string">&quot;张三&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> scores <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        scores<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>s1<span class="token punctuation">,</span> <span class="token number">98</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>scores<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token number">18</span><span class="token punctuation">,</span> <span class="token string">&quot;张三&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n <span class="token keyword">class</span> <span class="token class-name">Student</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>\n\n     <span class="token keyword">public</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token keyword">int</span> age<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n         <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>\n         <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>\n     <span class="token punctuation">}</span>\n\n     <span class="token annotation punctuation">@Override</span>\n     <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n         <span class="token class-name">Student</span> student <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Student</span><span class="token punctuation">)</span> o<span class="token punctuation">;</span>\n         <span class="token keyword">return</span> age <span class="token operator">==</span> student<span class="token punctuation">.</span>age <span class="token operator">&amp;&amp;</span>\n                 <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> student<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>\n     <span class="token punctuation">}</span>\n <span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们重写了 Student 类的 <code>equals()</code> 方法，如果两个学生的年纪和姓名相同，我们就认为是同一个学生，虽然很离谱，但我们就是这么草率。</p><p>在 <code>main()</code> 方法中，18 岁的张三考试得了 98 分，很不错的成绩，我们把张三和成绩放到了 HashMap 中，然后准备输出张三的成绩：</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>null\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>很不巧，结果为 null，而不是预期当中的 98。这是为什么呢？</p><p>原因就在于重写 <code>equals()</code> 方法的时候没有重写 <code>hashCode()</code> 方法。默认情况下，<code>hashCode()</code> 方法是一个本地方法，会返回对象的存储地址，显然 <code>put()</code> 中的 s1 和 <code>get()</code> 中的 <code>new Student(18, &quot;张三&quot;)</code> 是两个对象，它们的存储地址肯定是不同的。</p><p>HashMap 的 <code>get()</code> 方法会调用 <code>hash(key.hashCode())</code> 计算对象的哈希值，虽然两个不同的 <code>hashCode()</code> 结果经过 <code>hash()</code> 方法计算后有可能得到相同的结果，但这种概率微乎其微，所以就导致 <code>scores.get(new Student(18, &quot;张三&quot;))</code> 无法得到预期的值 18。</p><p>怎么解决这个问题呢？很简单，重写 <code>hashCode()</code> 方法。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code> <span class="token annotation punctuation">@Override</span>\n <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n     <span class="token keyword">return</span> <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">hash</span><span class="token punctuation">(</span>age<span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>\n <span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Objects 类的 <code>hash()</code> 方法可以针对不同数量的参数生成新的 <code>hashCode()</code> 值。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token class-name">Object</span> a<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n <span class="token keyword">if</span> <span class="token punctuation">(</span>a <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>\n     <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>\n\n <span class="token keyword">int</span> result <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>\n\n <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Object</span> element <span class="token operator">:</span> a<span class="token punctuation">)</span>\n     result <span class="token operator">=</span> <span class="token number">31</span> <span class="token operator">*</span> result <span class="token operator">+</span> <span class="token punctuation">(</span>element <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token number">0</span> <span class="token operator">:</span> element<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n <span class="token keyword">return</span> result<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码似乎很简单，归纳出的数学公式如下所示（n 为字符串长度）。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/basic-extra-meal/hashcode-2.png" alt="" loading="lazy"></p><p>注意：31 是个奇质数，不大不小，一般质数都非常适合哈希计算，偶数相当于移位运算，容易溢出，造成数据信息丢失。</p><p>这就意味着年纪和姓名相同的情况下，会得到相同的哈希值。<code>scores.get(new Student(18, &quot;张三&quot;))</code> 就会返回 98 的预期值了。</p><p>《Java 编程思想》这本圣经中有一段话，对 <code>hashCode()</code> 方法进行了一段描述。</p><blockquote><p>设计 <code>hashCode()</code> 时最重要的因素就是：无论何时，对同一个对象调用 <code>hashCode()</code> 都应该生成同样的值。如果在将一个对象用 <code>put()</code> 方法添加进 HashMap 时产生一个 <code>hashCode()</code> 值，而用 <code>get()</code> 方法取出时却产生了另外一个 <code>hashCode()</code> 值，那么就无法重新取得该对象了。所以，如果你的 <code>hashCode()</code> 方法依赖于对象中易变的数据，用户就要当心了，因为此数据发生变化时，<code>hashCode()</code> 就会生成一个不同的哈希值，相当于产生了一个不同的键。</p></blockquote><p>也就是说，如果在重写 <code>hashCode()</code> 和 <code>equals()</code> 方法时，对象中某个字段容易发生改变，那么最好舍弃这些字段，以免产生不可预期的结果。</p><p>好。有了上面这些内容作为基础后，我们回头再来看看本地方法 <code>hashCode()</code> 的 C++ 源码。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">static</span> inline intptr_t <span class="token function">get_next_hash</span><span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token operator">*</span> current<span class="token punctuation">,</span> oop obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  intptr_t value <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>hashCode <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// This form uses global Park-Miller RNG.</span>\n    <span class="token comment">// On MP system we&#39;ll have lots of RW access to a global, so the</span>\n    <span class="token comment">// mechanism induces lots of coherency traffic.</span>\n    value <span class="token operator">=</span> os<span class="token operator">::</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>hashCode <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// This variation has the property of being stable (idempotent)</span>\n    <span class="token comment">// between STW operations.  This can be useful in some of the 1-0</span>\n    <span class="token comment">// synchronization schemes.</span>\n    intptr_t addr_bits <span class="token operator">=</span> cast_from_oop<span class="token generics"><span class="token punctuation">&lt;</span>intptr_t<span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token operator">&gt;&gt;</span> <span class="token number">3</span><span class="token punctuation">;</span>\n    value <span class="token operator">=</span> addr_bits <span class="token operator">^</span> <span class="token punctuation">(</span>addr_bits <span class="token operator">&gt;&gt;</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token operator">^</span> <span class="token class-name">GVars</span><span class="token punctuation">.</span>stw_random<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>hashCode <span class="token operator">==</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    value <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>            <span class="token comment">// for sensitivity testing</span>\n  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>hashCode <span class="token operator">==</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    value <span class="token operator">=</span> <span class="token operator">++</span><span class="token class-name">GVars</span><span class="token punctuation">.</span>hc_sequence<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>hashCode <span class="token operator">==</span> <span class="token number">4</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    value <span class="token operator">=</span> cast_from_oop<span class="token generics"><span class="token punctuation">&lt;</span>intptr_t<span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n    <span class="token comment">// Marsaglia&#39;s xor-shift scheme with thread-specific state</span>\n    <span class="token comment">// This is probably the best overall implementation -- we&#39;ll</span>\n    <span class="token comment">// likely make this the default in future releases.</span>\n    unsigned t <span class="token operator">=</span> current<span class="token operator">-&gt;</span>_hashStateX<span class="token punctuation">;</span>\n    t <span class="token operator">^=</span> <span class="token punctuation">(</span>t <span class="token operator">&lt;&lt;</span> <span class="token number">11</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    current<span class="token operator">-&gt;</span>_hashStateX <span class="token operator">=</span> current<span class="token operator">-&gt;</span>_hashStateY<span class="token punctuation">;</span>\n    current<span class="token operator">-&gt;</span>_hashStateY <span class="token operator">=</span> current<span class="token operator">-&gt;</span>_hashStateZ<span class="token punctuation">;</span>\n    current<span class="token operator">-&gt;</span>_hashStateZ <span class="token operator">=</span> current<span class="token operator">-&gt;</span>_hashStateW<span class="token punctuation">;</span>\n    unsigned v <span class="token operator">=</span> current<span class="token operator">-&gt;</span>_hashStateW<span class="token punctuation">;</span>\n    v <span class="token operator">=</span> <span class="token punctuation">(</span>v <span class="token operator">^</span> <span class="token punctuation">(</span>v <span class="token operator">&gt;&gt;</span> <span class="token number">19</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">^</span> <span class="token punctuation">(</span>t <span class="token operator">^</span> <span class="token punctuation">(</span>t <span class="token operator">&gt;&gt;</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    current<span class="token operator">-&gt;</span>_hashStateW <span class="token operator">=</span> v<span class="token punctuation">;</span>\n    value <span class="token operator">=</span> v<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  value <span class="token operator">&amp;=</span> markWord<span class="token operator">::</span><span class="token function">hash_mask</span><span class="token punctuation">;</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> value <span class="token operator">=</span> <span class="token number">0xBAD</span><span class="token punctuation">;</span>\n  <span class="token keyword">assert</span><span class="token punctuation">(</span>value <span class="token operator">!=</span> markWord<span class="token operator">::</span><span class="token function">no_hash</span><span class="token punctuation">,</span> <span class="token string">&quot;invariant&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">return</span> value<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果没有 C++ 基础的话，不用细致去看每一行代码，我们只通过表面去了解一下 <code>get_next_hash()</code> 这个方法就行。其中的 <code>hashCode</code> 变量是 JVM 启动时的一个全局参数，可以通过它来切换哈希值的生成策略。</p><ul><li><code>hashCode==0</code>，调用操作系统 OS 的 <code>random()</code> 方法返回随机数。</li><li><code>hashCode == 1</code>，在 STW（stop-the-world）操作中，这种策略通常用于同步方案中。利用对象地址进行计算，使用不经常更新的随机数（<code>GVars.stw_random</code>）参与其中。</li><li><code>hashCode == 2</code>，使用返回 1，用于某些情况下的测试。</li><li><code>hashCode == 3</code>，从 0 开始计算哈希值，不是线程安全的，多个线程可能会得到相同的哈希值。</li><li><code>hashCode == 4</code>，与创建对象的内存位置有关，原样输出。</li><li><code>hashCode == 5</code>，默认值，支持多线程，使用了 Marsaglia 的 xor-shift 算法产生伪随机数。所谓的 xor-shift 算法，简单来说，看起来就是一个移位寄存器，每次移入的位由寄存器中若干位取异或生成。所谓的伪随机数，不是完全随机的，但是真随机生成比较困难，所以只要能通过一定的随机数统计检测，就可以当作真随机数来使用。</li></ul><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png" alt="" loading="lazy"></p>',54)],p={},o=(0,a(13860).Z)(p,[["render",function(n,s){return(0,e.wg)(),(0,e.iD)("div",null,t)}]])},13860:(n,s)=>{s.Z=(n,s)=>{const a=n.__vccOpts||n;for(const[n,e]of s)a[n]=e;return a}}}]);