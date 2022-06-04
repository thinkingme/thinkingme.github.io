"use strict";(self.webpackChunkcoding_road=self.webpackChunkcoding_road||[]).push([[2360],{50821:(n,s,a)=>{a.r(s),a.d(s,{data:()=>e});const e={key:"v-f130b72e",path:"/coding-road/database/redis/rumen.html",title:"Redis 入门(适合新手)",lang:"zh-CN",frontmatter:{category:["数据库"],tag:["Redis"],summary:"Redis 入门(适合新手) 说起来，可能有些小伙伴会不相信，我是第一次用 Redis，真的。因为公司小，业务量小，Redis 根本派不上用场。不过，最近打算把系统升级一下，顺带把当下时髦的技术入个门，“与时俱进”嘛，虽然进的有“一点点”晚（注意双引号）。 作为一名富有责任心的技术博主，我觉得有必要把我入门 Redis 的过程分享出来，供一些小伙伴作为参考。",head:[["meta",{property:"og:url",content:"https://vuepress-theme-hope-v2-demo.mrhope.site/coding-road/database/redis/rumen.html"}],["meta",{property:"og:site_name",content:"coding-rode"}],["meta",{property:"og:title",content:"Redis 入门(适合新手)"}],["meta",{property:"og:type",content:"article"}],["meta",{property:"og:updated_time",content:"2022-06-04T08:56:49.000Z"}],["meta",{property:"og:locale",content:"zh-CN"}],["meta",{property:"article:tag",content:"Redis"}],["meta",{property:"article:modified_time",content:"2022-06-04T08:56:49.000Z"}]]},excerpt:"",headers:[{level:3,title:"01、Redis 是什么",slug:"_01、redis-是什么",children:[]},{level:3,title:"02、安装 Redis",slug:"_02、安装-redis",children:[]},{level:3,title:"03、Redis 的数据结构",slug:"_03、redis-的数据结构",children:[]},{level:3,title:"04、实操 Redis",slug:"_04、实操-redis",children:[]},{level:3,title:"05、在 Java 中使用 Redis",slug:"_05、在-java-中使用-redis",children:[]},{level:3,title:"06、鸣谢",slug:"_06、鸣谢",children:[]}],git:{createdTime:1653617096e3,updatedTime:1654333009e3,contributors:[{name:"林振辉",email:"linzhenhui@apexsoft.com",commits:2},{name:"thinkingme",email:"linzhenhuigg@gmail.com",commits:1}]},readingTime:{minutes:7.88,words:2363},filePathRelative:"coding-road/database/redis/rumen.md"}},29407:(n,s,a)=>{a.r(s),a.d(s,{default:()=>S});var e=a(95393);const t=(0,e.uE)('<h1 id="redis-入门-适合新手" tabindex="-1"><a class="header-anchor" href="#redis-入门-适合新手" aria-hidden="true">#</a> Redis 入门(适合新手)</h1><p>说起来，可能有些小伙伴会不相信，我是第一次用 Redis，真的。因为公司小，业务量小，Redis 根本派不上用场。不过，最近打算把系统升级一下，顺带把当下时髦的技术入个门，“与时俱进”嘛，虽然进的有“一点点”晚（注意双引号）。</p><p>作为一名富有责任心的技术博主，我觉得有必要把我入门 Redis 的过程分享出来，供一些小伙伴作为参考。要是我哪里写错了，别客气，过来给我一巴掌，就行了（温柔点，别打肿，影响颜值就不好了）。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/redis/rumen-fe7d042b-efed-469c-9460-fb3bc1d4c041.jpg" alt="" loading="lazy"></p><h3 id="_01、redis-是什么" tabindex="-1"><a class="header-anchor" href="#_01、redis-是什么" aria-hidden="true">#</a> 01、Redis 是什么</h3><p>Redis 是互联网技术领域中使用最广泛的存储中间件，它是 <strong>Re</strong>mote <strong>Di</strong>ctionary <strong>S</strong>ervice 三个单词中加粗字母的组合。你别说，组合起来后念着挺自然的。</p><p>Redis 以超高的性能、完美的文档、简洁的源码著称，国内外很多大型互联网公司都在用，比如说阿里、腾讯、GitHub、Stack Overflow 等等。它的版本更新非常的快，功能也越来越强大，最初只是用来作为缓存数据库，现在已经可以用它来实现消息队列了。</p><p>可以这么说吧，掌握 Redis 已经变成了一项后端工程师必须具备的基础技能。</p><p>Redis 的作者是一名意大利人，网名 Antirez，长相还是过得去的，感兴趣的小伙伴可以 Google 一下。知道为什么 Redis 的默认端口是 6379 吗？</p><p>据说是手机键盘上“MERZ”的位置决定的，小伙伴们可以打开自己手机上九宫格键盘感受一下。“MERZ”是什么意思呢？据说是“愚蠢”的意思。这？是不是感觉程序员的生活中还是有蛮多神秘色彩的？</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/redis/rumen-ced599df-4791-4777-970f-20ceeeb39e68.jpg" alt="" loading="lazy"></p><h3 id="_02、安装-redis" tabindex="-1"><a class="header-anchor" href="#_02、安装-redis" aria-hidden="true">#</a> 02、安装 Redis</h3><p>Redis 针对不同的操作系统有不同的安装方式，我们这篇入门的文章就以 Windows 为例吧。</p><p>下载地址如下：</p>',14),i={href:"https://github.com/MicrosoftArchive/redis/releases",target:"_blank",rel:"noopener noreferrer"},p=(0,e.Uk)("https://github.com/MicrosoftArchive/redis/releases"),o=(0,e.uE)('<p>Windows 最新的版本是 3.2.100。从下图中可以看得出，Redis 的体积非常的轻量级，还不到 6 M。体积越小，让我感觉 Redis 越牛逼，你是不是也有这种感觉？</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/redis/rumen-a6709cca-d3a3-4381-b110-0ff37d384f27.jpg" alt="" loading="lazy"></p><p>有两种安装方式，第一种是 msi 的方式，双击运行后安装；第二种是免安装，绿色版，只需要把 zip 包解压就可以了。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/redis/rumen-f3fc9852-7505-45ed-8ce2-d16f1d888251.jpg" alt="" loading="lazy"></p><p>里面有一份英文版的文档——Windows Service Documentation.docx，教我们如何安装 Redis 服务、如何启动、如何关闭，以及如何使用自定义端口启动服务。</p><p>打开命令行，进入到当前解压后的目录，输入启动命令：</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>redis-server redis.windows.conf\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后你就会看到 Redis 启动后的欢迎画面，左边这个盒子感觉好有艺术感啊！有小伙伴知道是怎么生成的吗？</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/redis/rumen-69b11133-7aac-4f8a-aa1e-9e8af576ad32.jpg" alt="" loading="lazy"></p><p>还有一些其他的提示信息：</p>',10),c=(0,e._)("li",null,"Redis 当前的版本号为 3.2.100",-1),l=(0,e._)("li",null,"端口是 6379",-1),d=(0,e._)("li",null,"进程 ID，也就是 PID 为 12636",-1),r=(0,e.Uk)("Redis 官方地址为："),u={href:"http://redis.io",target:"_blank",rel:"noopener noreferrer"},m=(0,e.Uk)("http://redis.io"),g=(0,e.uE)('<p>那如何停止服务呢？可以直接按下 <code>Ctrl+C</code> 组合键——粗暴、壁咚（当然可以直接点右上角的叉号）。</p><p>PS：本来想用 Linux 版或者 OSX 版的，怕入门的小伙伴没有环境。后面可以整一个。</p><h3 id="_03、redis-的数据结构" tabindex="-1"><a class="header-anchor" href="#_03、redis-的数据结构" aria-hidden="true">#</a> 03、Redis 的数据结构</h3><p>Redis 有 5 种基础数据结构，String、Hash、List、Set、SortedSet，也是学 Redis 必须掌握的。除此之外，还有 HyperLogLog、Geo、Pub/Sub，算是高级数据结构了。我们这篇入门的文章就以 String 为例吧。</p><p>String 结构使用非常广泛，比如说把用户的登陆信息转成 JSON 字符串后缓存起来，等需要取出的时候再反序列化一次。</p><p>小伙伴们应该都知道，Java 的 String 是不可变的，无法修改。Redis 的 String 是动态的，可以修改的，两者不同哦。关于 Redis 的 String 结构，我觉得老钱的 Redis 教程上讲得非常明白，大家一起拜读下。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/redis/rumen-d9aca13e-053e-4aea-a8cb-d77b01e5035a.jpg" alt="" loading="lazy"></p><blockquote><p>Redis 的 String 在内部结构实现上类似于 Java 的 ArrayList，采用预分配冗余空间的方式来减少内存的频繁分配。如上图所示，当前字符串实际分配的空间为 capacity，一般高于实际的字符串长度 len。当字符串长度小于 1M 时，扩容是对现有空间的成倍增长；如果长度超过 1M 时，扩容一次只会多增加 1M 的空间。最大长度为 512M。</p></blockquote><h3 id="_04、实操-redis" tabindex="-1"><a class="header-anchor" href="#_04、实操-redis" aria-hidden="true">#</a> 04、实操 Redis</h3><p>好了好了，我估计很多小伙伴们已经整装待发，准备实操一把了。这就来。</p><p>Redis 的解压目录下有一个名叫 redis-cli.exe 的文件，这是 Redis 自带的一个客户端工具，可以用来连接之前我们启动好的 Redis 服务。双击启动它。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/redis/rumen-4fd63521-b07e-41c6-bcbd-b7acb2a81344.jpg" alt="" loading="lazy"></p><p>这个客户端还是非常智能的，当键入命令的时候，会跳出对应的提示</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/redis/rumen-6ca5d00d-4b5d-4475-a49c-9937e22f97af.jpg" alt="" loading="lazy"></p><p>当按下空格跟进关键字的时候，对应位置上的提示会自动消失。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/redis/rumen-656ec70a-c053-44ab-b078-a5c77386bee6.jpg" alt="" loading="lazy"></p><p>以下是完整的键值对测试命令，小伙伴们可以按照格式动手实操一把。</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&gt; set name cmower\nOK\n&gt; get name\n&quot;cmower&quot;\n&gt; exists name\n(integer) 1\n&gt; del name\n(integer) 1\n&gt; get name\n(nil)\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>1）set 命令用来存储一个键值对，在本例中，name 为 key，cmower 为 值。</p><p>2）get 命令用来获取一个键值对。</p><p>3）exists 命令用来测试一个键值对是否存在，<code>(integer) 1</code> 表示存在，<code>(integer) 0</code> 表示不存在。</p><p>4）del 命令用来删除一个键值对，<code>(integer) 1</code> 表示执行成功，<code>(integer) 0</code> 表示执行失败。</p><p>5）当键值对删除后，再通过 get 命令获取时，结果就为 <code>(nil)</code> 。</p><p>可能有小伙伴会好奇，<code>nil</code> 是什么意思？它是 Objective-C、Swift、Ruby、Lua 等编程语言中的一个关键字，更详细的解释可以看一下《Programming in Lua 程序设计第二版》：</p><blockquote><p>nil 是一种类型，它只有一个值 nil，它的主要功能是用于区别其他任何值，就像之前所说的，一个全局变量在第一次赋值前的默认值就是 nil，将 nil 赋予一个全局变量等同于删除它，Lua 将 nil 用于表示一种“无效值(non-value)”的情况，即没有任何有效值的情况。</p></blockquote><p>想了解 Redis 命令的具体使用方法，可以参考以下链接：</p>',26),k={href:"http://redisdoc.com/index.html",target:"_blank",rel:"noopener noreferrer"},v=(0,e.Uk)("http://redisdoc.com/index.html"),h=(0,e.Uk)("是 "),b={href:"http://redis.io/commands",target:"_blank",rel:"noopener noreferrer"},f=(0,e.Uk)("Redis Command Reference"),R=(0,e.Uk)(" 和 "),y={href:"http://redis.io/documentation",target:"_blank",rel:"noopener noreferrer"},_=(0,e.Uk)("Redis Documentation"),x=(0,e.Uk)(" 的中文翻译版，良心吧？"),j=(0,e.uE)('<h3 id="_05、在-java-中使用-redis" tabindex="-1"><a class="header-anchor" href="#_05、在-java-中使用-redis" aria-hidden="true">#</a> 05、在 Java 中使用 Redis</h3><p>有些小伙伴可能会问，“二哥，我是一名 Java 程序员，我该如何在 Java 中使用 Redis 呢？”这个问题问得好，这就来，这就来。</p><p>第一步，在项目中添加 Jedis（Java 和 Redis 的混拼） 依赖：</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;dependency&gt;\n    &lt;groupId&gt;redis.clients&lt;/groupId&gt;\n    &lt;artifactId&gt;jedis&lt;/artifactId&gt;\n    &lt;version&gt;3.2.0&lt;/version&gt;\n&lt;/dependency&gt;\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二步，新建 UserInfo（用户信息）类：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserInfo</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>\n\n    <span class="token keyword">public</span> <span class="token class-name">UserInfo</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> age<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token string">&quot;UserInfo{&quot;</span> <span class="token operator">+</span>\n                <span class="token string">&quot;name=&#39;&quot;</span> <span class="token operator">+</span> name <span class="token operator">+</span> <span class="token char">&#39;\\&#39;&#39;</span> <span class="token operator">+</span>\n                <span class="token string">&quot;, age=&quot;</span> <span class="token operator">+</span> age <span class="token operator">+</span>\n                <span class="token char">&#39;}&#39;</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token comment">// getter / setter</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第三步，在项目中添加 Gson（用于序列化和反序列化用户信息） 依赖：</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;dependency&gt;\n    &lt;groupId&gt;com.google.code.gson&lt;/groupId&gt;\n    &lt;artifactId&gt;gson&lt;/artifactId&gt;\n    &lt;version&gt;2.8.6&lt;/version&gt;\n    &lt;scope&gt;compile&lt;/scope&gt;\n&lt;/dependency&gt;\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第四步，新建测试类 RedisTest：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RedisTest</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> REDIS_KEY <span class="token operator">=</span> <span class="token string">&quot;user&quot;</span><span class="token punctuation">;</span>\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Jedis</span> jedis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Jedis</span><span class="token punctuation">(</span><span class="token string">&quot;localhost&quot;</span><span class="token punctuation">,</span> <span class="token number">6379</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token class-name">Gson</span> gson <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Gson</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">UserInfo</span> userInfo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UserInfo</span><span class="token punctuation">(</span><span class="token string">&quot;沉默王二&quot;</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        jedis<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>REDIS_KEY<span class="token punctuation">,</span> gson<span class="token punctuation">.</span><span class="token function">toJson</span><span class="token punctuation">(</span>userInfo<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">UserInfo</span> getUserInfoFromRedis <span class="token operator">=</span> gson<span class="token punctuation">.</span><span class="token function">fromJson</span><span class="token punctuation">(</span>jedis<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>REDIS_KEY<span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token class-name">UserInfo</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;get：&quot;</span> <span class="token operator">+</span> getUserInfoFromRedis<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;exists：&quot;</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span>REDIS_KEY<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;del：&quot;</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">del</span><span class="token punctuation">(</span>REDIS_KEY<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;get：&quot;</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>REDIS_KEY<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>1）REDIS_KEY 常量为存储用户信息到 Redis 的 key。</p><p>2）在 Jedis 的帮助下，Java 连接 Redis 服务变得非常简单，只需要一行代码：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">Jedis</span> jedis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Jedis</span><span class="token punctuation">(</span><span class="token string">&quot;localhost&quot;</span><span class="token punctuation">,</span> <span class="token number">6379</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数分别是主机名，端口号。</p><p>存储键值对用 <code>set()</code> 方法，获取键值对用 <code>get()</code> 方法，判断键值对是否存在用 <code>exists()</code> 方法，删除键值对用 <code>del()</code> 方法。</p><p>3）Gson 是谷歌提供的一个开源库，可以将 Java 对象序列化为 JSON 字符串，同样可以将 JSON 字符串反序列化（解析）为匹配的 Java 对象。</p><p>使用起来也非常简单，<code>toJson()</code> 方法将对象转成 JSON 字符串，<code>fromJson()</code> 方法将 JSON 字符串反序列化对象。</p><p>好了，来看一下程序的输出结果：</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>get：UserInfo{name=&#39;沉默王二&#39;, age=18}\nexists：true\ndel：1\nget：null\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完全符合我们的预期，perfect！</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/redis/rumen-7135d995-f563-4021-b364-411b1be07b5a.jpg" alt="" loading="lazy"></p><h3 id="_06、鸣谢" tabindex="-1"><a class="header-anchor" href="#_06、鸣谢" aria-hidden="true">#</a> 06、鸣谢</h3><p>好了，我亲爱的小伙伴们，以上就是本文的全部内容了，是不是看完后很想实操一把 Redis，赶快行动吧！如果你在学习的过程中遇到了问题，欢迎随时和我交流，虽然我也是个菜鸟，但我有热情啊。</p><p>另外，如果你想写入门级别的文章，这篇就是最好的范例。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/xingbiaogongzhonghao.png" alt="" loading="lazy"></p>',25),w={},S=(0,a(13860).Z)(w,[["render",function(n,s){const a=(0,e.up)("ExternalLinkIcon");return(0,e.wg)(),(0,e.iD)("div",null,[t,(0,e._)("p",null,[(0,e._)("a",i,[p,(0,e.Wm)(a)])]),o,(0,e._)("ul",null,[c,l,d,(0,e._)("li",null,[r,(0,e._)("a",u,[m,(0,e.Wm)(a)])])]),g,(0,e._)("p",null,[(0,e._)("a",k,[v,(0,e.Wm)(a)])]),(0,e._)("p",null,[h,(0,e._)("a",b,[f,(0,e.Wm)(a)]),R,(0,e._)("a",y,[_,(0,e.Wm)(a)]),x]),j])}]])},13860:(n,s)=>{s.Z=(n,s)=>{const a=n.__vccOpts||n;for(const[n,e]of s)a[n]=e;return a}}}]);