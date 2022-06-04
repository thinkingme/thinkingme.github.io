"use strict";(self.webpackChunkcoding_road=self.webpackChunkcoding_road||[]).push([[552],{25713:(n,s,a)=>{a.r(s),a.d(s,{data:()=>t});const t={key:"v-0fe1631a",path:"/coding-road/javaee/spring/aop-log.html",title:"Spring AOP 扫盲",lang:"zh-CN",frontmatter:{category:["Java企业级开发"],tag:["Spring"],summary:"Spring AOP 扫盲 AOP 是 Spring 体系中非常重要的两个概念之一（另外一个是 IoC），今天这篇文章就来带大家通过实战的方式，在编程猫 SpringBoot 项目中使用 AOP 技术为 controller 层添加一个切面来实现接口访问的统一日志记录。 一、关于 AOP AOP，也就是 Aspect-oriented Programming",head:[["meta",{property:"og:url",content:"https://vuepress-theme-hope-v2-demo.mrhope.site/coding-road/javaee/spring/aop-log.html"}],["meta",{property:"og:site_name",content:"coding-rode"}],["meta",{property:"og:title",content:"Spring AOP 扫盲"}],["meta",{property:"og:type",content:"article"}],["meta",{property:"og:updated_time",content:"2022-06-04T07:20:53.000Z"}],["meta",{property:"og:locale",content:"zh-CN"}],["meta",{property:"article:tag",content:"Spring"}],["meta",{property:"article:modified_time",content:"2022-06-04T07:20:53.000Z"}]]},excerpt:"",headers:[{level:3,title:"一、关于 AOP",slug:"一、关于-aop",children:[]},{level:3,title:"二、AOP 的相关术语",slug:"二、aop-的相关术语",children:[]},{level:3,title:"三、实操 AOP 记录接口访问日志",slug:"三、实操-aop-记录接口访问日志",children:[]}],git:{createdTime:1653617096e3,updatedTime:1654327253e3,contributors:[{name:"林振辉",email:"linzhenhui@apexsoft.com",commits:2}]},readingTime:{minutes:4.69,words:1406},filePathRelative:"coding-road/javaee/spring/aop-log.md"}},68274:(n,s,a)=>{a.r(s),a.d(s,{default:()=>T});var t=a(95393);const e=(0,t.uE)('<h1 id="spring-aop-扫盲" tabindex="-1"><a class="header-anchor" href="#spring-aop-扫盲" aria-hidden="true">#</a> Spring AOP 扫盲</h1><p>AOP 是 Spring 体系中非常重要的两个概念之一（另外一个是 IoC），今天这篇文章就来带大家通过实战的方式，在编程猫 SpringBoot 项目中使用 AOP 技术为 controller 层添加一个切面来实现接口访问的统一日志记录。</p><h3 id="一、关于-aop" tabindex="-1"><a class="header-anchor" href="#一、关于-aop" aria-hidden="true">#</a> 一、关于 AOP</h3><p>AOP，也就是 Aspect-oriented Programming，译为面向切面编程，是计算机科学中的一个设计思想，旨在通过切面技术为业务主体增加额外的通知（Advice），从而对声明为“切点”（Pointcut）的代码块进行统一管理和装饰。</p><p>这种思想非常适用于，将那些与核心业务不那么密切关联的功能添加到程序中，就好比我们今天的主题——日志功能，就是一个典型的案例。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/aop-log-1.png" alt="" loading="lazy"></p><p>AOP 是对面向对象编程（Object-oriented Programming，俗称 OOP）的一种补充，OOP 的核心单元是类（class），而 AOP 的核心单元是切面（Aspect）。利用 AOP 可以对业务逻辑的各个部分进行隔离，从而降低耦合度，提高程序的可重用性，同时也提高了开发效率。</p><p>我们可以简单的把 AOP 理解为贯穿于方法之中，在方法执行前、执行时、执行后、返回值后、异常后要执行的操作。</p><h3 id="二、aop-的相关术语" tabindex="-1"><a class="header-anchor" href="#二、aop-的相关术语" aria-hidden="true">#</a> 二、AOP 的相关术语</h3><p>来看下面这幅图，这是一个 AOP 的模型图，就是在某些方法执行前后执行一些通用的操作，并且这些操作不会影响程序本身的运行。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/aop-log-2.png" alt="" loading="lazy"> 我们了解下 AOP 涉及到的 5 个关键术语：</p><p><strong>1）横切关注点</strong>，从每个方法中抽取出来的同一类非核心业务</p><p><strong>2）切面（Aspect）</strong>，对横切关注点进行封装的类，每个关注点体现为一个通知方法；通常使用 @Aspect 注解来定义切面。</p><p><strong>3）通知（Advice）</strong>，切面必须要完成的各个具体工作，比如我们的日志切面需要记录接口调用前后的时长，就需要在调用接口前后记录时间，再取差值。通知的方式有五种：</p><ul><li>@Before：通知方法会在目标方法调用之前执行</li><li>@After：通知方法会在目标方法调用后执行</li><li>@AfterReturning：通知方法会在目标方法返回后执行</li><li>@AfterThrowing：通知方法会在目标方法抛出异常后执行</li><li>@Around：把整个目标方法包裹起来，在被调用前和调用之后分别执行通知方法</li></ul><p><strong>4）连接点（JoinPoint）</strong>，通知应用的时机，比如接口方法被调用时就是日志切面的连接点。</p><p><strong>5）切点（Pointcut）</strong>，通知功能被应用的范围，比如本篇日志切面的应用范围是所有 controller 的接口。通常使用 @Pointcut 注解来定义切点表达式。</p><p>切入点表达式的语法格式规范如下所示：</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>execution(modifiers-pattern? ret-type-pattern declaring-type-pattern?\n\t\t\t\tname-pattern(param-pattern)\n                throws-pattern?)\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>modifiers-pattern?</code> 为访问权限修饰符</li><li><code>ret-type-pattern</code> 为返回类型，通常用 <code>*</code> 来表示任意返回类型</li><li><code>declaring-type-pattern?</code> 为包名</li><li><code>name-pattern</code> 为方法名，可以使用 <code>*</code> 来表示所有，或者 <code>set*</code> 来表示所有以 set 开头的类名</li><li><code>param-pattern)</code> 为参数类型，多个参数可以用 <code>,</code> 隔开，各个参与也可以使用 <code>*</code> 来表示所有类型的参数，还可以使用 <code>(..)</code> 表示零个或者任意参数</li><li><code>throws-pattern?</code> 为异常类型</li><li><code>?</code> 表示前面的为可选项</li></ul><p>举个例子：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token annotation punctuation">@Pointcut</span><span class="token punctuation">(</span><span class="token string">&quot;execution(public * com.codingmore.controller.*.*(..))&quot;</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>表示 <code>com.codingmore.controller</code> 包下的所有 public 方法都要应用切面的通知。</p><h3 id="三、实操-aop-记录接口访问日志" tabindex="-1"><a class="header-anchor" href="#三、实操-aop-记录接口访问日志" aria-hidden="true">#</a> 三、实操 AOP 记录接口访问日志</h3><p>第一步，在 Spring Boot 项目的 pom.xml 文件中添加 spring-boot-starter-aop 依赖。</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;dependency&gt;\n    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;\n    &lt;artifactId&gt;spring-boot-starter-aop&lt;/artifactId&gt;\n&lt;/dependency&gt;\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二步，添加日志信息封装类 WebLog，用于记录什么样的操作、操作的人是谁、开始时间、花费的时间、操作的路径、操作的方法名、操作主机的 IP、请求参数、返回结果等。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token doc-comment comment">/**\n * Controller层的日志封装类\n * Created by macro on 2018/4/26.\n */</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">WebLog</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> description<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> username<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">Long</span> startTime<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">Integer</span> spendTime<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> basePath<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> uri<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> url<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> method<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> ip<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">Object</span> parameter<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">Object</span> result<span class="token punctuation">;</span>\n    <span class="token comment">//省略了getter,setter方法</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第三步，添加统一日志处理切面 WebLogAspect。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token doc-comment comment">/**\n * 统一日志处理切面\n * Created by 石磊\n */</span>\n<span class="token annotation punctuation">@Aspect</span>\n<span class="token annotation punctuation">@Component</span>\n<span class="token annotation punctuation">@Order</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">WebLogAspect</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Logger</span> LOGGER <span class="token operator">=</span> <span class="token class-name">LoggerFactory</span><span class="token punctuation">.</span><span class="token function">getLogger</span><span class="token punctuation">(</span><span class="token class-name">WebLogAspect</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Pointcut</span><span class="token punctuation">(</span><span class="token string">&quot;execution(public * com.codingmore.controller.*.*(..))&quot;</span><span class="token punctuation">)</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">webLog</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Before</span><span class="token punctuation">(</span><span class="token string">&quot;webLog()&quot;</span><span class="token punctuation">)</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doBefore</span><span class="token punctuation">(</span><span class="token class-name">JoinPoint</span> joinPoint<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Throwable</span> <span class="token punctuation">{</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@AfterReturning</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;webLog()&quot;</span><span class="token punctuation">,</span> returning <span class="token operator">=</span> <span class="token string">&quot;ret&quot;</span><span class="token punctuation">)</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doAfterReturning</span><span class="token punctuation">(</span><span class="token class-name">Object</span> ret<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Throwable</span> <span class="token punctuation">{</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Around</span><span class="token punctuation">(</span><span class="token string">&quot;webLog()&quot;</span><span class="token punctuation">)</span>\n    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">doAround</span><span class="token punctuation">(</span><span class="token class-name">ProceedingJoinPoint</span> joinPoint<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Throwable</span> <span class="token punctuation">{</span>\n        <span class="token keyword">long</span> startTime <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token comment">//获取当前请求对象</span>\n        <span class="token class-name">ServletRequestAttributes</span> attributes <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">ServletRequestAttributes</span><span class="token punctuation">)</span> <span class="token class-name">RequestContextHolder</span><span class="token punctuation">.</span><span class="token function">getRequestAttributes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">HttpServletRequest</span> request <span class="token operator">=</span> attributes<span class="token punctuation">.</span><span class="token function">getRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token comment">//记录请求信息(通过Logstash传入Elasticsearch)</span>\n        <span class="token class-name">WebLog</span> webLog <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WebLog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">Object</span> result <span class="token operator">=</span> joinPoint<span class="token punctuation">.</span><span class="token function">proceed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">Signature</span> signature <span class="token operator">=</span> joinPoint<span class="token punctuation">.</span><span class="token function">getSignature</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">MethodSignature</span> methodSignature <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">MethodSignature</span><span class="token punctuation">)</span> signature<span class="token punctuation">;</span>\n        <span class="token class-name">Method</span> method <span class="token operator">=</span> methodSignature<span class="token punctuation">.</span><span class="token function">getMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>method<span class="token punctuation">.</span><span class="token function">isAnnotationPresent</span><span class="token punctuation">(</span><span class="token class-name">ApiOperation</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token class-name">ApiOperation</span> log <span class="token operator">=</span> method<span class="token punctuation">.</span><span class="token function">getAnnotation</span><span class="token punctuation">(</span><span class="token class-name">ApiOperation</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            webLog<span class="token punctuation">.</span><span class="token function">setDescription</span><span class="token punctuation">(</span>log<span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n        <span class="token keyword">long</span> endTime <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">String</span> urlStr <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">getRequestURL</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        webLog<span class="token punctuation">.</span><span class="token function">setBasePath</span><span class="token punctuation">(</span><span class="token class-name">StrUtil</span><span class="token punctuation">.</span><span class="token function">removeSuffix</span><span class="token punctuation">(</span>urlStr<span class="token punctuation">,</span> <span class="token class-name">URLUtil</span><span class="token punctuation">.</span><span class="token function">url</span><span class="token punctuation">(</span>urlStr<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        webLog<span class="token punctuation">.</span><span class="token function">setIp</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span><span class="token function">getRemoteUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> logMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        logMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;spendTime&quot;</span><span class="token punctuation">,</span>webLog<span class="token punctuation">.</span><span class="token function">getSpendTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        logMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;description&quot;</span><span class="token punctuation">,</span>webLog<span class="token punctuation">.</span><span class="token function">getDescription</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        LOGGER<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;{}&quot;</span><span class="token punctuation">,</span> <span class="token class-name">JSONUtil</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>webLog<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> result<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第四步，运行项目，并对 controller 下的某个控制器进行测试。</p>',31),p=(0,t.Uk)("Swagger knife4j 访问地址："),o={href:"http://localhost:9022/doc.html",target:"_blank",rel:"noopener noreferrer"},c=(0,t.Uk)("http://localhost:9022/doc.html"),l=(0,t._)("p",null,"执行登录用户查询操作：",-1),i=(0,t._)("p",null,[(0,t._)("img",{src:"http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/aop-log-3.png",alt:"",loading:"lazy"})],-1),u=(0,t._)("p",null,"可以在控制台可以看到以下日志信息：",-1),r=(0,t._)("p",null,[(0,t._)("img",{src:"http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/aop-log-4.png",alt:"",loading:"lazy"}),(0,t.Uk)(" 源码地址：")],-1),k={href:"https://github.com/itwanger/coding-more",target:"_blank",rel:"noopener noreferrer"},d=(0,t.Uk)("https://github.com/itwanger/coding-more"),m=(0,t._)("p",null,"参考链接：",-1),g=(0,t.Uk)("作者 cxuan："),v={href:"https://www.cnblogs.com/cxuanBlog/p/13060510.html",target:"_blank",rel:"noopener noreferrer"},b=(0,t.Uk)("https://www.cnblogs.com/cxuanBlog/p/13060510.html"),h=(0,t._)("br",null,null,-1),w=(0,t.Uk)(" 灰小猿："),f={href:"https://bbs.huaweicloud.com/blogs/289045",target:"_blank",rel:"noopener noreferrer"},y=(0,t.Uk)("https://bbs.huaweicloud.com/blogs/289045"),A=(0,t._)("br",null,null,-1),P=(0,t.Uk)(" 山高我为峰："),O={href:"https://www.cnblogs.com/liaojie970/p/7883687.html",target:"_blank",rel:"noopener noreferrer"},S=(0,t.Uk)("https://www.cnblogs.com/liaojie970/p/7883687.html"),_=(0,t._)("br",null,null,-1),j=(0,t.Uk)(" macrozheng："),q={href:"https://github.com/macrozheng/mall",target:"_blank",rel:"noopener noreferrer"},x=(0,t.Uk)("https://github.com/macrozheng/mall"),L=(0,t._)("p",null,[(0,t._)("img",{src:"http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png",alt:"",loading:"lazy"})],-1),U={},T=(0,a(13860).Z)(U,[["render",function(n,s){const a=(0,t.up)("ExternalLinkIcon");return(0,t.wg)(),(0,t.iD)("div",null,[e,(0,t._)("blockquote",null,[(0,t._)("p",null,[p,(0,t._)("a",o,[c,(0,t.Wm)(a)])])]),l,i,u,r,(0,t._)("blockquote",null,[(0,t._)("p",null,[(0,t._)("a",k,[d,(0,t.Wm)(a)])])]),m,(0,t._)("blockquote",null,[(0,t._)("p",null,[g,(0,t._)("a",v,[b,(0,t.Wm)(a)]),h,w,(0,t._)("a",f,[y,(0,t.Wm)(a)]),A,P,(0,t._)("a",O,[S,(0,t.Wm)(a)]),_,j,(0,t._)("a",q,[x,(0,t.Wm)(a)])])]),L])}]])},13860:(n,s)=>{s.Z=(n,s)=>{const a=n.__vccOpts||n;for(const[n,t]of s)a[n]=t;return a}}}]);