"use strict";(self.webpackChunkcoding_road=self.webpackChunkcoding_road||[]).push([[6989],{50545:(a,n,e)=>{e.r(n),e.d(n,{data:()=>s});const s={key:"v-21b53bf7",path:"/coding-road/java-core/basic-grammar/java-naming.html",title:"Java 命名规范（非常全面，可以收藏）",lang:"zh-CN",frontmatter:{category:["Java核心"],tag:["Java"],summary:"Java 命名规范（非常全面，可以收藏） “二哥，Java 中的命名约定都有哪些呢？”三妹的脸上泛着甜甜的笑容，她开始对接下来要学习的内容充满期待了，这正是我感到欣慰的地方。 “对于我们中国人来说，名字也是有讲究的，比如说我叫沉默王二，你就叫沉默王三，哈哈。”我笑着对三妹说。 命名约定决定我们使用什么样的标识符来命名包、类、字段、方法等等，虽然这个规则不是强",head:[["meta",{property:"og:url",content:"https://vuepress-theme-hope-v2-demo.mrhope.site/coding-road/java-core/basic-grammar/java-naming.html"}],["meta",{property:"og:site_name",content:"coding-rode"}],["meta",{property:"og:title",content:"Java 命名规范（非常全面，可以收藏）"}],["meta",{property:"og:type",content:"article"}],["meta",{property:"og:updated_time",content:"2022-06-04T07:20:53.000Z"}],["meta",{property:"og:locale",content:"zh-CN"}],["meta",{property:"article:tag",content:"Java"}],["meta",{property:"article:modified_time",content:"2022-06-04T07:20:53.000Z"}]]},excerpt:"",headers:[{level:3,title:"01、包（package）",slug:"_01、包-package",children:[]},{level:3,title:"02、类（class）",slug:"_02、类-class",children:[]},{level:3,title:"03、接口（interface）",slug:"_03、接口-interface",children:[]},{level:3,title:"04、字段（field）和变量（variable）",slug:"_04、字段-field-和变量-variable",children:[]},{level:3,title:"05、常量（constant）",slug:"_05、常量-constant",children:[]},{level:3,title:"06、方法（method）",slug:"_06、方法-method",children:[]},{level:3,title:"07、总结",slug:"_07、总结",children:[]}],git:{createdTime:1653617096e3,updatedTime:1654327253e3,contributors:[{name:"林振辉",email:"linzhenhui@apexsoft.com",commits:2}]},readingTime:{minutes:5.96,words:1787},filePathRelative:"coding-road/java-core/basic-grammar/java-naming.md"}},30040:(a,n,e)=>{e.r(n),e.d(n,{default:()=>t});var s=e(95393);const i=[(0,s.uE)('<h1 id="java-命名规范-非常全面-可以收藏" tabindex="-1"><a class="header-anchor" href="#java-命名规范-非常全面-可以收藏" aria-hidden="true">#</a> Java 命名规范（非常全面，可以收藏）</h1><p>“二哥，Java 中的命名约定都有哪些呢？”三妹的脸上泛着甜甜的笑容，她开始对接下来要学习的内容充满期待了，这正是我感到欣慰的地方。</p><p>“对于我们中国人来说，名字也是有讲究的，比如说我叫沉默王二，你就叫沉默王三，哈哈。”我笑着对三妹说。</p><p>命名约定决定我们使用什么样的标识符来命名包、类、字段、方法等等，虽然这个规则不是强制的，可以遵守，也可以不遵守，但如果不遵守的话，就会带来很多不必要的麻烦。</p><p>起个好的名字，就好像穿一件得体的衣服，呈现给人的用户体验是完全不一样的。</p><p>好的命名可以让你的代码更易读，包括你自己和你的小伙伴，看一眼，不用想太多，就能明白代码是干嘛的。</p><p>拿我这个笔名“沉默王二”来举例吧，读起来我就觉得朗朗上口，读者看到这个笔名就知道我是一个什么样的人——对不熟的人保持沉默，对熟的人妙语连珠，哈哈。</p><h3 id="_01、包-package" tabindex="-1"><a class="header-anchor" href="#_01、包-package" aria-hidden="true">#</a> 01、包（package）</h3><p>包的命名应该遵守以下规则：</p><ul><li><p>应该全部是小写字母</p></li><li><p>点分隔符之间有且仅有一个自然语义的英语单词</p></li><li><p>包名统一使用单数形式，比如说 <code>com.itwanger.util</code> 不能是 <code>com.itwanger.utils</code></p></li><li><p>在最新的 Java 编程规范中，要求开发人员在自己定义的包名前加上唯一的前缀。由于互联网上的域名是不会重复的，所以多数开发人员采用自己公司（或者个人博客）在互联网上的域名称作为包的唯一前缀。比如我文章中出现的代码示例的包名就是 <code>package com.itwanger</code>。</p></li></ul><h3 id="_02、类-class" tabindex="-1"><a class="header-anchor" href="#_02、类-class" aria-hidden="true">#</a> 02、类（class）</h3><p>类的命名应该遵守以下规则：</p><ul><li><p>必须以大写字母开头</p></li><li><p>最好是一个名词，比如说 System</p></li><li><p>类名使用 UpperCamelCase（驼峰式命名）风格</p></li><li><p>尽量不要省略成单词的首字母，但以下情形例外：DO/BO/DTO/VO/AO/ PO / UID 等</p></li></ul><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/core-grammar/fifteen-01.png" alt="" loading="lazy"></p><p>另外，如果是抽象类的话，使用 Abstract 或 Base 开头；如果是异常类的话，使用 Exception 结尾；如果是测试类的话，使用 Test 结尾。</p><h3 id="_03、接口-interface" tabindex="-1"><a class="header-anchor" href="#_03、接口-interface" aria-hidden="true">#</a> 03、接口（interface）</h3><p>接口的命名应该遵守以下规则：</p><ul><li><p>必须以大写字母开头</p></li><li><p>最好是一个形容词，比如说 Runnable</p></li><li><p>尽量不要省略成单词的首字母</p></li></ul><p>来看个例子：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">interface</span> <span class="token class-name">Printable</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接口和实现类之间也有一些规则：</p><ul><li><p>实现类用 Impl 的后缀与接口区别，比如说 CacheServiceImpl 实现 CacheService 接口</p></li><li><p>或者，AbstractTranslator 实现 Translatable 接口</p></li></ul><h3 id="_04、字段-field-和变量-variable" tabindex="-1"><a class="header-anchor" href="#_04、字段-field-和变量-variable" aria-hidden="true">#</a> 04、字段（field）和变量（variable）</h3><p>字段和变量的命名应该遵守以下规则：</p><ul><li><p>必须以小写字母开头</p></li><li><p>可以包含多个单词，第一个单词的首字母小写，其他的单词首字母大写，比如说 <code>firstName</code></p></li><li><p>最好不要使用单个字符，比如说 <code>int a</code>，除非是局部变量</p></li><li><p>类型与中括号紧挨相连来表示数组，比如说 <code>int[] arrayDemo</code>，main 方法中字符串数组参数不应该写成 <code>String args[]</code></p></li><li><p>POJO 类中的任何布尔类型的变量，都不要加 is 前缀，否则部分框架解析会引起序列化错误，我自己知道的有 fastjson</p></li><li><p>避免在子类和父类的成员变量之间、或者不同代码块的局部变量之间采用完全相同的命名，使可理解性降低。子类、父类成员变量名相同，即使是 public 类型的变量也能够通过编译，另外，局部变量在同一方法内的不同代码块中同名也是合法的，这些情况都要避免。</p></li></ul><p>反例：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConfusingName</span> <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token keyword">int</span> stock<span class="token punctuation">;</span>\n\n    <span class="token comment">// 非 setter/getter 的参数名称，不允许与本类成员变量同名</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">String</span> alibaba<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>condition<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">final</span> <span class="token keyword">int</span> money <span class="token operator">=</span> <span class="token number">666</span><span class="token punctuation">;</span>\n<span class="token comment">// ...</span>\n        <span class="token punctuation">}</span>\n        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n<span class="token comment">// 在同一方法体中，不允许与其它代码块中的 money 命名相同 final int money = 15978;</span>\n<span class="token comment">// ...</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">class</span> <span class="token class-name">Son</span> <span class="token keyword">extends</span> <span class="token class-name">ConfusingName</span> <span class="token punctuation">{</span>\n<span class="token comment">// 不允许与父类的成员变量名称相同 public int stock;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_05、常量-constant" tabindex="-1"><a class="header-anchor" href="#_05、常量-constant" aria-hidden="true">#</a> 05、常量（constant）</h3><p>常量的命名应该遵守以下规则：</p><ul><li><p>应该全部是大写字母</p></li><li><p>可以包含多个单词，单词之间使用“_”连接，比如说 <code>MAX_PRIORITY</code>，力求语义表达完整清楚，不要嫌名字长</p></li><li><p>可以包含数字，但不能以数字开头</p></li></ul><p>来看个例子：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> MIN_AGE <span class="token operator">=</span> <span class="token number">18</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_06、方法-method" tabindex="-1"><a class="header-anchor" href="#_06、方法-method" aria-hidden="true">#</a> 06、方法（method）</h3><p>方法的命名应该遵守以下规则：</p><ul><li><p>必须以小写字母开头</p></li><li><p>最好是一个动词，比如说 <code>print()</code></p></li><li><p>可以包含多个单词，第一个单词的首字母小写，其他的单词首字母大写，比如说 <code>actionPerformed()</code></p></li></ul><p>来看个例子：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">writeBook</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Service/DAO 层的方法命名规约：</p><ul><li><p>获取单个对象的方法用 get 做前缀</p></li><li><p>获取多个对象的方法用 list 做前缀，复数结尾，如：listObjects</p></li><li><p>获取统计值的方法用 count 做前缀</p></li><li><p>插入的方法用 save/insert 做前缀</p></li><li><p>删除的方法用 remove/delete 做前缀</p></li><li><p>修改的方法用 update 做前缀</p></li></ul><h3 id="_07、总结" tabindex="-1"><a class="header-anchor" href="#_07、总结" aria-hidden="true">#</a> 07、总结</h3><p>除了以上这些规则以外，还有一些共同的规则需要遵守，比如说：</p><ul><li>代码中的命名均不能以下划线或美元符号开始，也不能以下划线或美元符号结束。反例：<code>_name / __name / $name / name_ / name$ / name__</code></li><li>所有编程相关的命名严禁使用拼音与英文混合的方式，更不允许直接使用中文的方式。反例：<code>DaZhePromotion [打折] / getPingfenByName() [评分] / String fw[福娃] / int 某变量 = 3</code></li><li>代码和注释中都要避免使用任何语言的种族歧视性词语。反例：<code>RIBENGUIZI / Asan / blackList / whiteList / slave</code></li><li>方法名、参数名、成员变量、局部变量都统一使用 lowerCamelCase 风格。</li><li>杜绝完全不规范的缩写，避免望文不知义。反例：AbstractClass “缩写”成 AbsClass；condition “缩写”成 condi；Function 缩写”成 Fu，此类随意缩写严重降低了代码的可阅读性。</li><li>为了达到代码自解释的目标，任何自定义编程元素在命名时，使用尽量完整的单词组合来表达。</li><li>在常量与变量的命名时，表示类型的名词放在词尾，以提升辨识度。正例：<code>startTime / workQueue / nameList / TERMINATED_THREAD_COUNT</code></li><li>如果模块、接口、类、方法使用了设计模式，在命名时需体现出具体模式。 将设计模式体现在名字中，有利于阅读者快速理解架构设计理念。比如说：<code>public class OrderFactory;public class LoginProxy;public class ResourceObserver;</code></li><li>枚举类名带上 Enum 后缀，枚举成员名称需要全大写，单词间用下划线隔开。枚举其实就是特殊的常量类，且构造方法被默认强制是私有。比如说：<code>枚举名字为 ProcessStatusEnum 的成员名称：SUCCESS / UNKNOWN_REASON</code>。</li></ul><hr><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png" alt="" loading="lazy"></p>',44)],l={},t=(0,e(13860).Z)(l,[["render",function(a,n){return(0,s.wg)(),(0,s.iD)("div",null,i)}]])},13860:(a,n)=>{n.Z=(a,n)=>{const e=a.__vccOpts||a;for(const[a,s]of n)e[a]=s;return e}}}]);