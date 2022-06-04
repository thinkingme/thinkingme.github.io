"use strict";(self.webpackChunkcoding_road=self.webpackChunkcoding_road||[]).push([[9689],{88936:(n,a,s)=>{s.r(a),s.d(a,{data:()=>e});const e={key:"v-6fefc4ad",path:"/coding-road/javaee/wheels/knife4j.html",title:"knife4j：一款界面更炫酷的 API 文档生成神器",lang:"zh-CN",frontmatter:{category:["Java企业级开发"],tag:["辅助工具/轮子"],summary:"knife4j：一款界面更炫酷的 API 文档生成神器 一般在使用 Spring Boot 开发前后端分离项目的时候，都会用到 Swagger。Swagger 是一个规范和完整的框架，用于生成、描述、调试和可视化 RESTful 风格的 Web API 服务框架。 但随着系统功能的不断增加，接口数量的爆炸式增长，Swagger 的使用体验就会变得越来越差，比",head:[["meta",{property:"og:url",content:"https://vuepress-theme-hope-v2-demo.mrhope.site/coding-road/javaee/wheels/knife4j.html"}],["meta",{property:"og:site_name",content:"coding-rode"}],["meta",{property:"og:title",content:"knife4j：一款界面更炫酷的 API 文档生成神器"}],["meta",{property:"og:type",content:"article"}],["meta",{property:"og:updated_time",content:"2022-06-04T08:56:49.000Z"}],["meta",{property:"og:locale",content:"zh-CN"}],["meta",{property:"article:tag",content:"辅助工具/轮子"}],["meta",{property:"article:modified_time",content:"2022-06-04T08:56:49.000Z"}]]},excerpt:"",headers:[{level:3,title:"一、关于 Knife4j",slug:"一、关于-knife4j",children:[]},{level:3,title:"二、整合 Swagger",slug:"二、整合-swagger",children:[]},{level:3,title:"三、整合 Knife4j",slug:"三、整合-knife4j",children:[]},{level:3,title:"四、Knife4j 的功能特点",slug:"四、knife4j-的功能特点",children:[]},{level:3,title:"五、尾声",slug:"五、尾声",children:[]}],git:{createdTime:1653617096e3,updatedTime:1654333009e3,contributors:[{name:"林振辉",email:"linzhenhui@apexsoft.com",commits:2},{name:"thinkingme",email:"linzhenhuigg@gmail.com",commits:1}]},readingTime:{minutes:5.34,words:1603},filePathRelative:"coding-road/javaee/wheels/knife4j.md"}},348:(n,a,s)=>{s.r(a),s.d(a,{default:()=>q});var e=s(95393);const t=(0,e.uE)('<h1 id="knife4j-一款界面更炫酷的-api-文档生成神器" tabindex="-1"><a class="header-anchor" href="#knife4j-一款界面更炫酷的-api-文档生成神器" aria-hidden="true">#</a> knife4j：一款界面更炫酷的 API 文档生成神器</h1><p>一般在使用 Spring Boot 开发前后端分离项目的时候，都会用到 Swagger。Swagger 是一个规范和完整的框架，用于生成、描述、调试和可视化 RESTful 风格的 Web API 服务框架。</p><p>但随着系统功能的不断增加，接口数量的爆炸式增长，Swagger 的使用体验就会变得越来越差，比如请求参数为 JSON 的时候没办法格式化，返回结果没办法折叠，还有就是没有提供搜索功能。</p><p>刚好最近发现 Knife4j 弥补了这些不足，赋予了 Swagger 更强的生命力，于是就来给大家安利一波。</p><h3 id="一、关于-knife4j" tabindex="-1"><a class="header-anchor" href="#一、关于-knife4j" aria-hidden="true">#</a> 一、关于 Knife4j</h3><p>Knife4j 的前身是 swagger-bootstrap-ui，是 springfox-swagger-ui 的增强 UI 实现。swagger-bootstrap-ui 采用的是前端 UI 混合后端 Java 代码的打包方式，在微服务的场景下显得非常臃肿，改良后的 Knife4j 更加小巧、轻量，并且功能更加强大。</p><p>springfox-swagger-ui 的界面长这个样子，说实话，确实略显丑陋。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/gongju/knife4j-1.png" alt="" loading="lazy"></p><p>swagger-bootstrap-ui 增强后的样子长下面这样。单纯从直观体验上来看，确实增强了。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/gongju/knife4j-2.png" alt="" loading="lazy"></p><p>改良后的 Knife4j 不仅在界面上更加优雅、炫酷，功能上也更加强大：后端 Java 代码和前端 UI 模块分离了出来，在微服务场景下更加灵活；更提供了专注于 Swagger 的增强解决方案。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/gongju/knife4j-3.png" alt="" loading="lazy"></p><p>官方文档：</p>',13),i={href:"https://doc.xiaominfo.com/knife4j/documentation/",target:"_blank",rel:"noopener noreferrer"},p=(0,e.Uk)("https://doc.xiaominfo.com/knife4j/documentation/"),o=(0,e._)("p",null,"码云地址：",-1),l={href:"https://gitee.com/xiaoym/knife4j",target:"_blank",rel:"noopener noreferrer"},c=(0,e.Uk)("https://gitee.com/xiaoym/knife4j"),u=(0,e._)("p",null,"示例地址：",-1),r={href:"https://gitee.com/xiaoym/swagger-bootstrap-ui-demo",target:"_blank",rel:"noopener noreferrer"},g=(0,e.Uk)("https://gitee.com/xiaoym/swagger-bootstrap-ui-demo"),d=(0,e.uE)('<h3 id="二、整合-swagger" tabindex="-1"><a class="header-anchor" href="#二、整合-swagger" aria-hidden="true">#</a> 二、整合 Swagger</h3><p>为了对比 Knife4j 和 Swagger，我们先来整合体验一把 Swagger。</p><p>第一步，在 pom.xml 中添加 springfox 的官方 Swagger 依赖：</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;dependency&gt;\n    &lt;groupId&gt;io.springfox&lt;/groupId&gt;\n    &lt;artifactId&gt;springfox-boot-starter&lt;/artifactId&gt;\n    &lt;version&gt;3.0.0&lt;/version&gt;\n&lt;/dependency&gt;\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二步，添加 Swagger 的 Java 配置，只需要配置基本的 API 信息和需要扫描的类路径即可。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SwaggerConfig</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Bean</span>\n    <span class="token keyword">public</span> <span class="token class-name">Docket</span> <span class="token function">docket</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Docket</span> docket <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Docket</span><span class="token punctuation">(</span><span class="token class-name">DocumentationType</span><span class="token punctuation">.</span>OAS_30<span class="token punctuation">)</span>\n                <span class="token punctuation">.</span><span class="token function">apiInfo</span><span class="token punctuation">(</span><span class="token function">apiInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">enable</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>\n                <span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n                <span class="token comment">//apis： 添加swagger接口提取范围</span>\n                <span class="token punctuation">.</span><span class="token function">apis</span><span class="token punctuation">(</span><span class="token class-name">RequestHandlerSelectors</span><span class="token punctuation">.</span><span class="token function">basePackage</span><span class="token punctuation">(</span><span class="token string">&quot;com.codingmore.controller&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n                <span class="token punctuation">.</span><span class="token function">paths</span><span class="token punctuation">(</span><span class="token class-name">PathSelectors</span><span class="token punctuation">.</span><span class="token function">any</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n                <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token keyword">return</span> docket<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">private</span> <span class="token class-name">ApiInfo</span> <span class="token function">apiInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ApiInfoBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n                <span class="token punctuation">.</span><span class="token function">title</span><span class="token punctuation">(</span><span class="token string">&quot;编程猫学习网站的 admin 管理端 API&quot;</span><span class="token punctuation">)</span>\n                <span class="token punctuation">.</span><span class="token function">description</span><span class="token punctuation">(</span><span class="token string">&quot;codingmore&quot;</span><span class="token punctuation">)</span>\n                <span class="token punctuation">.</span><span class="token function">contact</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Contact</span><span class="token punctuation">(</span><span class="token string">&quot;沉默王二&amp;石磊&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;https://tobebetterjavaer.com&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;983436076@qq.com&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n                <span class="token punctuation">.</span><span class="token function">version</span><span class="token punctuation">(</span><span class="token string">&quot;1.0&quot;</span><span class="token punctuation">)</span>\n                <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二步，访问 API 文档，访问地址如下所示：</p>',7),k={href:"http://localhost:9002/swagger-ui/",target:"_blank",rel:"noopener noreferrer"},m=(0,e.Uk)("http://localhost:9002/swagger-ui/"),h=(0,e.uE)('<p>在项目路径后面添加上 <code>swagger-ui</code> 就可以了。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/gongju/knife4j-4.png" alt="" loading="lazy"></p><p>在 Controller 类中，可以看到常见的 Swagger 注解 @Api 和 @ApiOperation：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token annotation punctuation">@Controller</span>\n<span class="token annotation punctuation">@Api</span><span class="token punctuation">(</span>tags <span class="token operator">=</span> <span class="token string">&quot;文章 &quot;</span><span class="token punctuation">)</span>\n<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/posts&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PostsController</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;/delete&quot;</span><span class="token punctuation">,</span> method <span class="token operator">=</span> <span class="token class-name">RequestMethod</span><span class="token punctuation">.</span>GET<span class="token punctuation">)</span>\n    <span class="token annotation punctuation">@ResponseBody</span>\n    <span class="token annotation punctuation">@ApiOperation</span><span class="token punctuation">(</span><span class="token string">&quot;删除&quot;</span><span class="token punctuation">)</span>\n    <span class="token keyword">public</span> <span class="token class-name">ResultObject</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> <span class="token function">delete</span><span class="token punctuation">(</span><span class="token keyword">long</span> postsId<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token class-name">ResultObject</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span>postsService<span class="token punctuation">.</span><span class="token function">removePostsById</span><span class="token punctuation">(</span>postsId<span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token string">&quot;删除成功&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;删除失败&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>@Api 注解用在类上，该注解将一个 Controller 类标记位一个 Swagger 资源（API）。默认情况下，Swagger 只会扫描解析具有 @Api 注解的类。</p></li><li><p>@ApiOperation 注解用在方法上，该注解在指定的方法上，对一个方法进行描述。</p></li></ul><p>Swagger 还有很多其他的注解，比如说 @ApiParam、@ApiResponses 等等，这里就不再一一说明。</p><h3 id="三、整合-knife4j" tabindex="-1"><a class="header-anchor" href="#三、整合-knife4j" aria-hidden="true">#</a> 三、整合 Knife4j</h3><p>Knife4j 完全遵循了 Swagger 的使用方式，所以可以无缝切换。</p><p>第一步，在 pom.xml 文件中添加 Knife4j 的依赖（<strong>不需要再引入 springfox-boot-starter</strong>）。</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;dependency&gt;\n    &lt;groupId&gt;com.github.xiaoymin&lt;/groupId&gt;\n    &lt;artifactId&gt;knife4j-spring-boot-starter&lt;/artifactId&gt;\n    &lt;!--在引用时请在maven中央仓库搜索3.X最新版本号--&gt;\n    &lt;version&gt;3.0.2&lt;/version&gt;\n&lt;/dependency&gt;\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二步，在 Java 配置类上添加 @EnableOpenApi 注解，开启 Knife4j 增强功能。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>\n<span class="token annotation punctuation">@EnableOpenApi</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SwaggerConfig</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第三步，重新运行 Spring Boot 项目，访问 API 文档，查看效果。</p>',13),v=(0,e.Uk)("访问地址："),f={href:"http://localhost:9002/doc.html",target:"_blank",rel:"noopener noreferrer"},b=(0,e.Uk)("http://localhost:9002/doc.html"),j=(0,e.uE)('<p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/gongju/knife4j-5.png" alt="" loading="lazy"></p><p>如果项目中加了权限认证的话，记得给 Knife4j 添加白名单。我的项目用的是 SpringSecurity，所以需要在 application.yml 文件中添加。</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>secure:\n  ignored:\n    urls: #安全路径白名单\n      - /doc.html\n      - /swagger-ui/**\n      - /swagger/**\n      - /swagger-resources/**\n      - /**/v3/api-docs\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="四、knife4j-的功能特点" tabindex="-1"><a class="header-anchor" href="#四、knife4j-的功能特点" aria-hidden="true">#</a> 四、Knife4j 的功能特点</h3><p><strong>1）支持登录认证</strong></p><p>Knife4j 和 Swagger 一样，也是支持头部登录认证的，点击「authorize」菜单，添加登录后的信息即可保持登录认证的 token。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/gongju/knife4j-6.png" alt="" loading="lazy"></p><p>如果某个 API 需要登录认证的话，就会把之前填写的信息带过来。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/gongju/knife4j-7.png" alt="" loading="lazy"></p><p><strong>2）支持 JSON 折叠</strong></p><p>Swagger 是不支持 JSON 折叠的，当返回的信息非常多的时候，界面就会显得非常的臃肿。Knife4j 则不同，可以对返回的 JSON 节点进行折叠。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/gongju/knife4j-8.png" alt="" loading="lazy"></p><p><strong>3）离线文档</strong></p><p>Knife4j 支持把 API 文档导出为离线文档（支持 markdown 格式、HTML 格式、Word 格式），</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/gongju/knife4j-9.png" alt="" loading="lazy"></p><p>使用 Typora 打开后的样子如下，非常的大方美观。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/gongju/knife4j-10.png" alt="" loading="lazy"></p><p><strong>4）全局参数</strong></p><p>当某些请求需要全局参数时，这个功能就很实用了，Knife4j 支持 header 和 query 两种方式。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/gongju/knife4j-11.png" alt="" loading="lazy"></p><p>之后进行请求的时候，就会把这个全局参数带过去。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/gongju/knife4j-12.png" alt="" loading="lazy"></p><p><strong>5）搜索 API 接口</strong></p><p>Swagger 是没有搜索功能的，当要测试的接口有很多的时候，当需要去找某一个 API 的时候就傻眼了，只能一个个去拖动滚动条去找。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/gongju/knife4j-13.png" alt="" loading="lazy"></p><p>在文档的右上角，Knife4j 提供了文档搜索功能，输入要查询的关键字，就可以检索筛选了，是不是很方便？</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/gongju/knife4j-14.png" alt="" loading="lazy"></p><p>目前支持搜索接口的地址、名称和描述。</p><h3 id="五、尾声" tabindex="-1"><a class="header-anchor" href="#五、尾声" aria-hidden="true">#</a> 五、尾声</h3><p>除了我上面提到的增强功能，Knife4j 还提供了很多实用的功能，大家可以通过官网的介绍一一尝试下，生产效率会提高不少。</p>',30),w={href:"https://doc.xiaominfo.com/knife4j/documentation/enhance.html",target:"_blank",rel:"noopener noreferrer"},y=(0,e.Uk)("https://doc.xiaominfo.com/knife4j/documentation/enhance.html"),x=(0,e.uE)('<p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/gongju/knife4j-15.png" alt="" loading="lazy"></p><p>如果项目中之前使用过 Swagger 生成接口文档，切换到 Knife4j 可以说是非常的丝滑，只需要两步：</p><ul><li>在 pom.xml 文件中把 <code>springfox-boot-starter</code> 替换为 <code>knife4j-spring-boot-starter</code>；</li><li>访问地址由原来的 <code>http://${host}:${port}/swagger-ui.html</code> 切换到 <code>http://${host}:${port}/doc.html</code>，如果有权限限制的话，记得开白名单。</li></ul><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/xingbiaogongzhonghao.png" alt="" loading="lazy"></p>',4),S={},q=(0,s(13860).Z)(S,[["render",function(n,a){const s=(0,e.up)("ExternalLinkIcon");return(0,e.wg)(),(0,e.iD)("div",null,[t,(0,e._)("blockquote",null,[(0,e._)("p",null,[(0,e._)("a",i,[p,(0,e.Wm)(s)])])]),o,(0,e._)("blockquote",null,[(0,e._)("p",null,[(0,e._)("a",l,[c,(0,e.Wm)(s)])])]),u,(0,e._)("blockquote",null,[(0,e._)("p",null,[(0,e._)("a",r,[g,(0,e.Wm)(s)])])]),d,(0,e._)("blockquote",null,[(0,e._)("p",null,[(0,e._)("a",k,[m,(0,e.Wm)(s)])])]),h,(0,e._)("blockquote",null,[(0,e._)("p",null,[v,(0,e._)("a",f,[b,(0,e.Wm)(s)])])]),j,(0,e._)("blockquote",null,[(0,e._)("p",null,[(0,e._)("a",w,[y,(0,e.Wm)(s)])])]),x])}]])},13860:(n,a)=>{a.Z=(n,a)=>{const s=n.__vccOpts||n;for(const[n,e]of a)s[n]=e;return s}}}]);