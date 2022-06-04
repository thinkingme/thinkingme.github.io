"use strict";(self.webpackChunkcoding_road=self.webpackChunkcoding_road||[]).push([[5132],{13165:(n,s,a)=>{a.r(s),a.d(s,{data:()=>p});const p={key:"v-5e43ea68",path:"/coding-road/java-core/collection/gailan.html",title:"Java 集合框架",lang:"zh-CN",frontmatter:{category:["Java核心"],tag:["Java"],summary:"Java 集合框架 眼瞅着三妹的王者荣耀杀得正嗨，我趁机喊到：“别打了，三妹，我们来一起学习 Java 的集合框架吧。” “才不要呢，等我打完这一局啊。”三妹倔强地说。 “好吧。”我只好摊摊手地说，“那我先画张集合框架的结构图等着你。” “完了没？三妹。” “完了好一会儿了，二哥，你图画得真慢，让我瞧瞧怎么样？” “害，图要画得清晰明了，不容易的。三妹，你瞧",head:[["meta",{property:"og:url",content:"https://vuepress-theme-hope-v2-demo.mrhope.site/coding-road/java-core/collection/gailan.html"}],["meta",{property:"og:site_name",content:"coding-rode"}],["meta",{property:"og:title",content:"Java 集合框架"}],["meta",{property:"og:type",content:"article"}],["meta",{property:"og:updated_time",content:"2022-06-04T07:20:53.000Z"}],["meta",{property:"og:locale",content:"zh-CN"}],["meta",{property:"article:tag",content:"Java"}],["meta",{property:"article:modified_time",content:"2022-06-04T07:20:53.000Z"}]]},excerpt:"",headers:[{level:3,title:"01、List",slug:"_01、list",children:[]},{level:3,title:"02、Set",slug:"_02、set",children:[]},{level:3,title:"03、Queue",slug:"_03、queue",children:[]},{level:3,title:"04、Map",slug:"_04、map",children:[]},{level:3,title:"05、时间复杂度",slug:"_05、时间复杂度",children:[]}],git:{createdTime:1653617096e3,updatedTime:1654327253e3,contributors:[{name:"林振辉",email:"linzhenhui@apexsoft.com",commits:2}]},readingTime:{minutes:10.38,words:3114},filePathRelative:"coding-road/java-core/collection/gailan.md"}},21713:(n,s,a)=>{a.r(s),a.d(s,{default:()=>o});var p=a(95393);const t=[(0,p.uE)('<h1 id="java-集合框架" tabindex="-1"><a class="header-anchor" href="#java-集合框架" aria-hidden="true">#</a> Java 集合框架</h1><p>眼瞅着三妹的王者荣耀杀得正嗨，我趁机喊到：“别打了，三妹，我们来一起学习 Java 的集合框架吧。”</p><p>“才不要呢，等我打完这一局啊。”三妹倔强地说。</p><p>“好吧。”我只好摊摊手地说，“那我先画张集合框架的结构图等着你。”</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/gailan-01.png" alt="" loading="lazy"></p><p>“完了没？三妹。”</p><p>“完了好一会儿了，二哥，你图画得真慢，让我瞧瞧怎么样？”</p><p>“害，图要画得清晰明了，不容易的。三妹，你瞧，不错吧。”</p><p>Java 集合框架可以分为两条大的支线：</p><ul><li>Collection，主要由 List、Set、Queue 组成，List 代表有序、可重复的集合，典型代表就是封装了动态数组的 ArrayList 和封装了链表的 LinkedList；Set 代表无序、不可重复的集合，典型代表就是 HashSet 和 TreeSet；Queue 代表队列，典型代表就是双端队列 ArrayDeque，以及优先级队列 PriorityQue。</li><li>Map，代表键值对的集合，典型代表就是 HashMap。</li></ul><p>“接下来，我们再来过一遍。”</p><h3 id="_01、list" tabindex="-1"><a class="header-anchor" href="#_01、list" aria-hidden="true">#</a> 01、List</h3><blockquote><p>List 的特点是存取有序，可以存放重复的元素，可以用下标对元素进行操作</p></blockquote><p><strong>1）ArrayList</strong></p><ul><li>ArrayList 是由数组实现的，支持随机存取，也就是可以通过下标直接存取元素；</li><li>从尾部插入和删除元素会比较快捷，从中间插入和删除元素会比较低效，因为涉及到数组元素的复制和移动；</li><li>如果内部数组的容量不足时会自动扩容，因此当元素非常庞大的时候，效率会比较低。</li></ul><p><strong>2）LinkedList</strong></p><ul><li>LinkedList 是由双向链表实现的，不支持随机存取，只能从一端开始遍历，直到找到需要的元素后返回；</li><li>任意位置插入和删除元素都很方便，因为只需要改变前一个节点和后一个节点的引用即可，不像 ArrayList 那样需要复制和移动数组元素；</li><li>因为每个元素都存储了前一个和后一个节点的引用，所以相对来说，占用的内存空间会比 ArrayList 多一些。</li></ul><p><strong>3）Vector 和 Stack</strong></p><p>List 的实现类还有一个 Vector，是一个元老级的类，比 ArrayList 出现得更早。ArrayList 和 Vector 非常相似，只不过 Vector 是线程安全的，像 get、set、add 这些方法都加了 <code>synchronized</code> 关键字，就导致执行执行效率会比较低，所以现在已经很少用了。</p><p>更好的选择是并发包下的 CopyOnWriteArrayList。</p><p>Stack 是 Vector 的一个子类，本质上也是由动态数组实现的，只不过还实现了先进后出的功能（在 get、set、add 方法的基础上追加了 pop、peek 等方法），所以叫栈。</p><p>不过，由于 Stack 执行效率比较低（方法上同样加了 synchronized 关键字），就被双端队列 ArrayDeque 取代了。</p><h3 id="_02、set" tabindex="-1"><a class="header-anchor" href="#_02、set" aria-hidden="true">#</a> 02、Set</h3><blockquote><p>Set 的特点是存取无序，不可以存放重复的元素，不可以用下标对元素进行操作，和 List 有很多不同</p></blockquote><p><strong>1）HashSet</strong></p><p>HashSet 其实是由 HashMap 实现的，只不过值由一个固定的 Object 对象填充，而键用于操作。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span>\n    <span class="token keyword">extends</span> <span class="token class-name">AbstractSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span>\n    <span class="token keyword">implements</span> <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">,</span> <span class="token class-name">Cloneable</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span>Serializable</span>\n<span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token keyword">transient</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">,</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> map<span class="token punctuation">;</span>\n\n    <span class="token comment">// Dummy value to associate with an Object in the backing Map</span>\n    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Object</span> PRESENT <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">public</span> <span class="token class-name">HashSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">E</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>e<span class="token punctuation">,</span> PRESENT<span class="token punctuation">)</span><span class="token operator">==</span><span class="token keyword">null</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">remove</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> map<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>o<span class="token punctuation">)</span><span class="token operator">==</span>PRESENT<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2）LinkedHashSet</strong></p><p>LinkedHashSet 继承自 HashSet，其实是由 LinkedHashMap 实现的，LinkedHashSet 的构造方法调用了 HashSet 的一个特殊的构造方法：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">HashSet</span><span class="token punctuation">(</span><span class="token keyword">int</span> initialCapacity<span class="token punctuation">,</span> <span class="token keyword">float</span> loadFactor<span class="token punctuation">,</span> <span class="token keyword">boolean</span> dummy<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n   map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>initialCapacity<span class="token punctuation">,</span> loadFactor<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>3）TreeSet</strong></p><p>“二哥，不用你讲了，我能猜到，TreeSet 是由 TreeMap 实现的，只不过同样操作的键位，值由一个固定的 Object 对象填充。”</p><p>哇，三妹都学会了推理。</p><p>“是的，总体上来说，Set 集合不是关注的重点，因为底层都是由 Map 实现的，为什么要用 Map 实现呢？三妹你能猜到原因吗？”</p><p>“让我想想。”</p><p>“嗯？难道是因为 Map 的键不允许重复、无序吗？”</p><p>老天，竟然被三妹猜到了。</p><p>“是的，你这水平长进了呀，三妹。”</p><h3 id="_03、queue" tabindex="-1"><a class="header-anchor" href="#_03、queue" aria-hidden="true">#</a> 03、Queue</h3><blockquote><p>Queue，也就是队列，通常遵循先进先出（FIFO）的原则，新元素插入到队列的尾部，访问元素返回队列的头部。</p></blockquote><p><strong>1）ArrayDeque</strong></p><p>从名字上可以看得出，ArrayDeque 是一个基于数组实现的双端队列，为了满足可以同时在数组两端插入或删除元素的需求，数组必须是循环的，也就是说数组的任何一点都可以被看作是起点或者终点。</p><p>这是一个包含了 4 个元素的双端队列，和一个包含了 5 个元素的双端队列。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/gailan-02.png" alt="" loading="lazy"></p><p>head 指向队首的第一个有效的元素，tail 指向队尾第一个可以插入元素的空位，因为是循环数组，所以 head 不一定从是从 0 开始，tail 也不一定总是比 head 大。</p><p><strong>2）LinkedList</strong></p><p>LinkedList 一般都归在 List 下，只不过，它也实现了 Deque 接口，可以作为队列来使用。等于说，LinkedList 同时实现了 Stack、Queue、PriorityQueue 的所有功能。</p><p><strong>3）PriorityQueue</strong></p><p>PriorityQueue 是一种优先级队列，它的出队顺序与元素的优先级有关，执行 remove 或者 poll 方法，返回的总是优先级最高的元素。</p><p>要想有优先级，元素就需要实现 Comparable 接口或者 Comparator 接口。</p><h3 id="_04、map" tabindex="-1"><a class="header-anchor" href="#_04、map" aria-hidden="true">#</a> 04、Map</h3><blockquote><p>Map 保存的是键值对，键要求保持唯一性，值可以重复。</p></blockquote><p><strong>1）HashMap</strong></p><p>HashMap 实现了 Map 接口，根据键的 HashCode 值来存储数据，具有很快的访问速度，最多允许一个 null 键。</p><p>HashMap 不论是在学习还是工作当中，使用频率都是相当高的。随着 JDK 版本的不断更新，HashMap 的底层也优化了很多次，JDK 8 的时候引入了红黑树。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">final</span> <span class="token class-name">V</span> <span class="token function">putVal</span><span class="token punctuation">(</span><span class="token keyword">int</span> hash<span class="token punctuation">,</span> <span class="token class-name">K</span> key<span class="token punctuation">,</span> <span class="token class-name">V</span> value<span class="token punctuation">,</span> <span class="token keyword">boolean</span> onlyIfAbsent<span class="token punctuation">,</span>\n               <span class="token keyword">boolean</span> evict<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">HashMap<span class="token punctuation">.</span>Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">[</span><span class="token punctuation">]</span> tab<span class="token punctuation">;</span> <span class="token class-name">HashMap<span class="token punctuation">.</span>Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> p<span class="token punctuation">;</span> <span class="token keyword">int</span> n<span class="token punctuation">,</span> i<span class="token punctuation">;</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>tab <span class="token operator">=</span> table<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token punctuation">(</span>n <span class="token operator">=</span> tab<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>\n        n <span class="token operator">=</span> <span class="token punctuation">(</span>tab <span class="token operator">=</span> <span class="token function">resize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>length<span class="token punctuation">;</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>p <span class="token operator">=</span> tab<span class="token punctuation">[</span>i <span class="token operator">=</span> <span class="token punctuation">(</span>n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span> hash<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>\n        tab<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">newNode</span><span class="token punctuation">(</span>hash<span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">else</span> <span class="token punctuation">{</span>\n        <span class="token class-name">HashMap<span class="token punctuation">.</span>Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> e<span class="token punctuation">;</span> <span class="token class-name">K</span> k<span class="token punctuation">;</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>p<span class="token punctuation">.</span>hash <span class="token operator">==</span> hash <span class="token operator">&amp;&amp;</span>\n                <span class="token punctuation">(</span><span class="token punctuation">(</span>k <span class="token operator">=</span> p<span class="token punctuation">.</span>key<span class="token punctuation">)</span> <span class="token operator">==</span> key <span class="token operator">||</span> <span class="token punctuation">(</span>key <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> key<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>k<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n            e <span class="token operator">=</span> p<span class="token punctuation">;</span>\n        <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>p <span class="token keyword">instanceof</span> <span class="token class-name">HashMap<span class="token punctuation">.</span>TreeNode</span><span class="token punctuation">)</span>\n            e <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">HashMap<span class="token punctuation">.</span>TreeNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">)</span>p<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">putTreeVal</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> tab<span class="token punctuation">,</span> hash<span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">else</span> <span class="token punctuation">{</span>\n            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> binCount <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token punctuation">;</span> <span class="token operator">++</span>binCount<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>e <span class="token operator">=</span> p<span class="token punctuation">.</span>next<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                    p<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token function">newNode</span><span class="token punctuation">(</span>hash<span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n                    <span class="token keyword">if</span> <span class="token punctuation">(</span>binCount <span class="token operator">&gt;=</span> TREEIFY_THRESHOLD <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// -1 for 1st</span>\n                        <span class="token function">treeifyBin</span><span class="token punctuation">(</span>tab<span class="token punctuation">,</span> hash<span class="token punctuation">)</span><span class="token punctuation">;</span>\n                    <span class="token keyword">break</span><span class="token punctuation">;</span>\n                <span class="token punctuation">}</span>\n                <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>hash <span class="token operator">==</span> hash <span class="token operator">&amp;&amp;</span>\n                        <span class="token punctuation">(</span><span class="token punctuation">(</span>k <span class="token operator">=</span> e<span class="token punctuation">.</span>key<span class="token punctuation">)</span> <span class="token operator">==</span> key <span class="token operator">||</span> <span class="token punctuation">(</span>key <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> key<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>k<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n                    <span class="token keyword">break</span><span class="token punctuation">;</span>\n                p <span class="token operator">=</span> e<span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n        <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一旦 HashMap 发生哈希冲突，就把相同键位的地方改成链表，如果链表的长度超过 8，就该用红黑树。</p><p><strong>2）LinkedHashMap</strong></p><p>大多数情况下，只要不涉及线程安全问题，Map 基本都可以使用 HashMap，不过 HashMap 有一个问题，就是迭代 HashMap 的顺序并不是 HashMap 放置的顺序，也就是无序。HashMap 的这一缺点往往会带来困扰，因为有些场景，我们期待一个有序的 Map。</p><p>大多数情况下，只要不涉及到线程安全的问题，有需要键值对的时候就会使用 HashMap，但 HashMap 有一个问题，就是 HashMap 是无序的。在某些场景下，我们需要一个有序的 Map。</p><p>于是 LinkedHashMap 就闪亮登场了。LinkedHashMap 是 HashMap 的子类，内部使用链表来记录插入/访问元素的顺序。</p><p>LinkedHashMap 可以看作是 HashMap + LinkedList 的合体，它使用了 哈希表来存储数据，又用了双向链表来维持顺序。</p><p><strong>3）TreeMap</strong></p><p>HashMap 是无序的，所以遍历的时候元素的顺序也是不可测的。TreeMap 是有序的，它在内部会对键进行排序，所以遍历的时候就可以得到预期的顺序。</p><p>为了保证顺序，TreeMap 的键必须要实现 Comparable 接口或者 Comparator 接口。</p><h3 id="_05、时间复杂度" tabindex="-1"><a class="header-anchor" href="#_05、时间复杂度" aria-hidden="true">#</a> 05、时间复杂度</h3><p>“二哥，为什么要讲时间复杂度呀？”三妹问。</p><p>“因为接下来要用到啊。后面我们学习 ArrayList、LinkedList 的时候，会比较两者在增删改查时的执行效率，而时间复杂度是衡量执行效率的一个重要标准。”我说。</p><p>“到时候跑一下代码，统计一下前后的时间差不更准确吗？”三妹反问道。</p><p>“实际上，你说的是另外一种评估方法，这种评估方法可以得出非常准确的数值，但也有很大的局限性。”我不急不慢地说。</p><p>第一，测试结果会受到测试环境的影响。你比如说，同样的代码，在我这台 iMac 上跑出来的时间和在你那台华为的 MacBook 上抛出的时间可能就差别很大。</p><p>第二，测试结果会受到测试数据的影响。你比如说，一个排序后的数组和一个没有排序后的数组，调用了同一个查询方法，得出来的结果可能会差别特别大。</p><p>“因此，我们需要这种不依赖于具体测试环境和测试数据就能粗略地估算出执行效率的方法，时间复杂度就是其中的一种，还有一种是空间复杂度。”我继续补充道。</p><p>来看下面这段代码：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">int</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// 第 1 行</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span>n<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 第 2 行</span>\n        sum <span class="token operator">=</span> sum <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 第 3 行</span>\n    <span class="token punctuation">}</span> <span class="token comment">// 第 4 行</span>\n    <span class="token keyword">return</span> sum<span class="token punctuation">;</span> <span class="token comment">// 第 5 行</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码非常简单，方法体里总共 5 行代码，包括“}”那一行。每段代码的执行时间可能都不大一样，但假设我们认为每行代码的执行时间是一样的，比如说 unit_time，那么这段代码总的执行时间为多少呢？</p><p>“这个我知道呀！”三妹喊道，“第 1、5 行需要 2 个 unit_time，第 2、3 行需要 2<em>n</em>unit_time，总的时间就是 2(n+1)*unit_time。”</p><p>“对，一段代码的执行时间 T(n) 和总的执行次数成正比，也就是说，代码执行的次数越多，花费的时间就越多。”我总结道，“这个规律可以用一个公式来表达：”</p><blockquote><p>T(n) = O(f(n))</p></blockquote><p>f(n) 表示代码总的执行次数，大写 O 表示代码的执行时间 T(n) 和 f(n) 成正比。</p><p>这也就是大 O 表示法，它不关心代码具体的执行时间是多少，它关心的是代码执行时间的变化趋势，这也就是时间复杂度这个概念的由来。</p><p>对于上面那段代码 <code>sum()</code> 来说，影响时间复杂度的主要是第 2 行代码，其余的，像系数 2、常数 2 都是可以忽略不计的，我们只关心影响最大的那个，所以时间复杂度就表示为 <code>O(n)</code>。</p><p>常见的时间复杂度有这么 3 个：</p><p>1）<code>O(1)</code></p><p>代码的执行时间，和数据规模 n 没有多大关系。</p><p>括号中的 1 可以是 3，可以是 5，可以 100，我们习惯用 1 来表示，表示这段代码的执行时间是一个常数级别。比如说下面这段代码：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>\n<span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>\n<span class="token keyword">int</span> k <span class="token operator">=</span> i <span class="token operator">+</span> j<span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实际上执行了 3 次，但我们也认为这段代码的时间复杂度为 <code>O(1)</code>。</p><p>2）<code>O(n)</code></p><p>时间复杂度和数据规模 n 是线性关系。换句话说，数据规模增大 K 倍，代码执行的时间就大致增加 K 倍。</p><p>3）<code>O(logn)</code></p><p>时间复杂度和数据规模 n 是对数关系。换句话说，数据规模大幅增加时，代码执行的时间只有少量增加。</p><p>来看一下代码示例，</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">logn</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>\n    <span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        i <span class="token operator">*=</span> <span class="token number">2</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>换句话说，当数据量 n 从 2 增加到 2^64 时，代码执行的时间只增加 64 倍。</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>遍历次数 |   i\n----------+-------\n    0     |   i\n    1     |  i*2\n    2     |  i*4\n   ...    |  ...\n   ...    |  ...\n    k     |  i*2^k\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>“好了，三妹，这节就讲到这吧，理解了上面 3 个时间复杂度，后面我们学习 ArrayList、LinkedList 的时候，两者在增删改查时的执行效率就很容易对比清楚了。”我伸了个懒腰后对三妹说，“整体上，集合框架就这么多东西了，随后我们会一一展开来讲，比如说 ArrayList、LinkedList、HashMap 等。”。</p><p>“好的，二哥。”三妹重新回答沙发上，一盘王者荣耀即将开始。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png" alt="" loading="lazy"></p>',99)],e={},o=(0,a(13860).Z)(e,[["render",function(n,s){return(0,p.wg)(),(0,p.iD)("div",null,t)}]])},13860:(n,s)=>{s.Z=(n,s)=>{const a=n.__vccOpts||n;for(const[n,p]of s)a[n]=p;return a}}}]);