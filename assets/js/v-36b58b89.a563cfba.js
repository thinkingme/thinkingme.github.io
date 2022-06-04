"use strict";(self.webpackChunkcoding_road=self.webpackChunkcoding_road||[]).push([[3710],{41526:(n,a,s)=>{s.r(a),s.d(a,{data:()=>e});const e={key:"v-36b58b89",path:"/coding-road/java-core/juc/ali-executors.html",title:"为什么阿里巴巴要禁用 Executors 创建线程池？",lang:"zh-CN",frontmatter:{category:["Java核心"],tag:["Java"],summary:"为什么阿里巴巴要禁用 Executors 创建线程池？ 看阿里巴巴开发手册并发编程这块有一条：线程池不允许使用 Executors 去创建，而是通过 ThreadPoolExecutor 的方式，今天我们来通过源码分析一下禁用的原因。 通过阅读本篇文章你将了解到： 线程池的定义; Executors 创建线程池的几种方式; ThreadPoolExecuto",head:[["meta",{property:"og:url",content:"https://vuepress-theme-hope-v2-demo.mrhope.site/coding-road/java-core/juc/ali-executors.html"}],["meta",{property:"og:site_name",content:"coding-rode"}],["meta",{property:"og:title",content:"为什么阿里巴巴要禁用 Executors 创建线程池？"}],["meta",{property:"og:type",content:"article"}],["meta",{property:"og:updated_time",content:"2022-06-04T07:20:53.000Z"}],["meta",{property:"og:locale",content:"zh-CN"}],["meta",{property:"article:tag",content:"Java"}],["meta",{property:"article:modified_time",content:"2022-06-04T07:20:53.000Z"}]]},excerpt:"",headers:[{level:3,title:"一、线程池的定义",slug:"一、线程池的定义",children:[]},{level:3,title:"二、ThreadPoolExecutor 对象",slug:"二、threadpoolexecutor-对象",children:[]},{level:3,title:"三、总结：",slug:"三、总结",children:[]},{level:3,title:"四、如何定义线程池参数",slug:"四、如何定义线程池参数",children:[]}],git:{createdTime:1653617096e3,updatedTime:1654327253e3,contributors:[{name:"林振辉",email:"linzhenhui@apexsoft.com",commits:2}]},readingTime:{minutes:6.94,words:2083},filePathRelative:"coding-road/java-core/juc/ali-executors.md"}},18777:(n,a,s)=>{s.r(a),s.d(a,{default:()=>k});var e=s(95393);const t=(0,e.uE)('<h1 id="为什么阿里巴巴要禁用-executors-创建线程池" tabindex="-1"><a class="header-anchor" href="#为什么阿里巴巴要禁用-executors-创建线程池" aria-hidden="true">#</a> 为什么阿里巴巴要禁用 Executors 创建线程池？</h1><p>看阿里巴巴开发手册并发编程这块有一条：<strong>线程池不允许使用 Executors 去创建，而是通过 ThreadPoolExecutor 的方式</strong>，今天我们来通过源码分析一下禁用的原因。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/ali-executors-1.png" alt="" loading="lazy"></p><p>通过阅读本篇文章你将了解到：</p><ul><li>线程池的定义</li><li>Executors 创建线程池的几种方式</li><li>ThreadPoolExecutor 对象</li><li>线程池执行任务逻辑和线程池参数的关系</li><li>Executors 创建返回 ThreadPoolExecutor 对象</li><li>OOM 异常测试</li><li>如何定义线程池参数</li></ul><p>如果只想知道原因可以直接拉到文末总结那。</p><h3 id="一、线程池的定义" tabindex="-1"><a class="header-anchor" href="#一、线程池的定义" aria-hidden="true">#</a> 一、线程池的定义</h3><p>管理一组工作线程。通过线程池复用线程有以下几点优点：</p><ul><li>减少资源创建 =&gt; 减少内存开销，创建线程占用内存</li><li>降低系统开销 =&gt; 创建线程需要时间，会延迟处理的请求</li><li>提高稳定稳定性 =&gt; 避免无限创建线程引起的 OutOfMemoryError【简称 OOM】</li></ul><p>Executors 创建线程池的方式，根据返回的对象类型创建线程池可以分为三类：</p><ul><li>创建返回 ThreadPoolExecutor 对象</li><li>创建返回 ScheduleThreadPoolExecutor 对象</li><li>创建返回 ForkJoinPool 对象</li></ul><p>本文只讨论创建返回 ThreadPoolExecutor 对象。</p><h3 id="二、threadpoolexecutor-对象" tabindex="-1"><a class="header-anchor" href="#二、threadpoolexecutor-对象" aria-hidden="true">#</a> 二、ThreadPoolExecutor 对象</h3><p>在介绍 Executors 创建线程池方法前先介绍一下 ThreadPoolExecutor，因为这些创建线程池的静态方法都是返回 ThreadPoolExecutor 对象，和我们手动创建 ThreadPoolExecutor 对象的区别就是我们不需要自己传构造方法的参数。</p><p>ThreadPoolExecutor 的构造方法共有四个，但最终调用的都是同一个：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">ThreadPoolExecutor</span><span class="token punctuation">(</span><span class="token keyword">int</span> corePoolSize<span class="token punctuation">,</span>\n <span class="token keyword">int</span> maximumPoolSize<span class="token punctuation">,</span>\n <span class="token keyword">long</span> keepAliveTime<span class="token punctuation">,</span>\n <span class="token class-name">TimeUnit</span> unit<span class="token punctuation">,</span>\n <span class="token class-name">BlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Runnable</span><span class="token punctuation">&gt;</span></span> workQueue<span class="token punctuation">,</span>\n <span class="token class-name">ThreadFactory</span> threadFactory<span class="token punctuation">,</span>\n <span class="token class-name">RejectedExecutionHandler</span> handler<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码构造方法的参数说明：</p><ul><li>corePoolSize =&gt; 线程池核心线程数量</li><li>maximumPoolSize =&gt; 线程池最大数量</li><li>keepAliveTime =&gt; 空闲线程存活时间</li><li>unit =&gt; 时间单位</li><li>workQueue =&gt; 线程池所使用的缓冲队列</li><li>threadFactory =&gt; 线程池创建线程使用的工厂</li><li>handler =&gt; 线程池对拒绝任务的处理策略</li></ul><p>线程池执行任务逻辑和线程池参数的关系。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/ali-executors-2.png" alt="" loading="lazy"></p><p>执行逻辑说明：</p><ul><li>判断核心线程数是否已满，核心线程数大小和 corePoolSize 参数有关，未满则创建线程执行任务</li><li>若核心线程池已满，判断队列是否满，队列是否满和 workQueue 参数有关，若未满则加入队列中</li><li>若队列已满，判断线程池是否已满，线程池是否已满和 maximumPoolSize 参数有关，若未满创建线程执行任务</li><li>若线程池已满，则采用拒绝策略处理无法执执行的任务，拒绝策略和 handler 参数有关</li></ul><p>Executors 创建返回 ThreadPoolExecutor 对象的方法共有三种：</p><ul><li>Executors.newCachedThreadPool =&gt; 创建可缓存的线程池</li><li>Executors#.newSingleThreadExecutor =&gt; 创建单线程的线程池</li><li>Executors.newFixedThreadPool =&gt; 创建固定长度的线程池</li></ul><p>Executors.newCachedThreadPool 方法：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">ExecutorService</span> <span class="token function">newCachedThreadPool</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ThreadPoolExecutor</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span>MAX_VALUE<span class="token punctuation">,</span>\n<span class="token number">60L</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span>SECONDS<span class="token punctuation">,</span>\n<span class="token keyword">new</span> <span class="token class-name">SynchronousQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Runnable</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CachedThreadPool 是一个根据需要创建新线程的线程池：</p><ul><li>corePoolSize =&gt; 0，核心线程池的数量为 0</li><li>maximumPoolSize =&gt; Integer.MAX_VALUE，线程池最大数量为 Integer.MAX_VALUE，可以认为可以无限创建线程</li><li>keepAliveTime =&gt; 60L</li><li>unit =&gt; 秒</li><li>workQueue =&gt; SynchronousQueue</li></ul><p>当一个任务提交时，corePoolSize 为 0 不创建核心线程，SynchronousQueue 是一个不存储元素的队列，可以理解为队里永远是满的，因此最终会创建非核心线程来执行任务。</p><p>对于非核心线程空闲 60s 时将被回收。因为 Integer.MAX_VALUE 非常大，可以认为是可以无限创建线程的，在资源有限的情况下容易引起 OOM 异常。</p><p>Executors.newSingleThreadExecutor 方法：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">ExecutorService</span> <span class="token function">newSingleThreadExecutor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">FinalizableDelegatedExecutorService</span>\n<span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ThreadPoolExecutor</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span>\n<span class="token number">0L</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span>MILLISECONDS<span class="token punctuation">,</span>\n<span class="token keyword">new</span> <span class="token class-name">LinkedBlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Runnable</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>SingleThreadExecutor 是单线程线程池，只有一个核心线程：</p><ul><li>corePoolSize =&gt; 1，核心线程池的数量为 1</li><li>maximumPoolSize =&gt; 1，线程池最大数量为 1，即最多只可以创建一个线程，唯一的线程就是核心线程</li><li>keepAliveTime =&gt; 0L</li><li>unit =&gt; 毫秒</li><li>workQueue =&gt; LinkedBlockingQueue</li></ul><p>当一个任务提交时，首先会创建一个核心线程来执行任务，如果超过核心线程的数量，将会放入队列中，因为 LinkedBlockingQueue 是长度为 Integer.MAX_VALUE 的队列，可以认为是无界队列，因此往队列中可以插入无限多的任务，在资源有限的时候容易引起 OOM 异常，同时因为无界队列，maximumPoolSize 和 keepAliveTime 参数将无效，压根就不会创建非核心线程。</p><p>Executors.newFixedThreadPool 方法</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">ExecutorService</span> <span class="token function">newFixedThreadPool</span><span class="token punctuation">(</span><span class="token keyword">int</span> nThreads<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ThreadPoolExecutor</span><span class="token punctuation">(</span>nThreads<span class="token punctuation">,</span> nThreads<span class="token punctuation">,</span>\n<span class="token number">0L</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span>MILLISECONDS<span class="token punctuation">,</span>\n<span class="token keyword">new</span> <span class="token class-name">LinkedBlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Runnable</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>FixedThreadPool 是固定核心线程的线程池，固定核心线程数由用户传入：</p><ul><li>corePoolSize =&gt; nThreads，核心线程池的数量为 1</li><li>maximumPoolSize =&gt; nThreads，线程池最大数量为 nThreads，即最多只可以创建 nThreads 个线程</li><li>keepAliveTime =&gt; 0L</li><li>unit =&gt; 毫秒</li><li>workQueue =&gt; LinkedBlockingQueue</li></ul><p>它和 SingleThreadExecutor 类似，唯一的区别就是核心线程数不同，并且由于使用的是 LinkedBlockingQueue，在资源有限的时候容易引起 OOM 异常。</p><h3 id="三、总结" tabindex="-1"><a class="header-anchor" href="#三、总结" aria-hidden="true">#</a> 三、总结：</h3><ul><li>FixedThreadPool 和 SingleThreadExecutor =&gt; 允许的请求队列长度为 Integer.MAX_VALUE，可能会堆积大量的请求，从而引起 OOM 异常</li><li>CachedThreadPool =&gt; 允许创建的线程数为 Integer.MAX_VALUE，可能会创建大量的线程，从而引起 OOM 异常</li></ul><p>这就是为什么禁止使用 Executors 去创建线程池，而是推荐自己去创建 ThreadPoolExecutor 的原因。</p><p><strong>OOM 异常测试</strong></p><p>理论上会出现 OOM 异常，必须测试一波验证之前的说法。</p><p>测试类：TaskTest.java</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TaskTest</span> <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">ExecutorService</span> es <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newCachedThreadPool</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>\n        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            es<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Task</span><span class="token punctuation">(</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 Executors 创建的 CachedThreadPool，往线程池中无限添加线程。</p><p>在启动测试类之前先将 JVM 内存调整小一点，不然很容易将电脑跑出问题【别问我为什么知道，是铁憨憨没错了！！！】，在 idea 里：Run -&gt; Edit Configurations。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/ali-executors-3.png" alt="" loading="lazy"></p><p>JVM 参数说明：</p><ul><li>-Xms10M =&gt; Java Heap 内存初始化值</li><li>-Xmx10M =&gt; Java Heap 内存最大值</li></ul><p>运行结果：</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Exception: java.lang.OutOfMemoryError thrown from the UncaughtExceptionHandler in thread &quot;main&quot;\nDisconnected from the target VM, address: &#39;127.0.0.1:60416&#39;, transport: &#39;socket&#39;\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>创建到 3w 多个线程的时候开始报 OOM 错误。</p><p>另外两个线程池就不做测试了，测试方法一致，只是创建的线程池不一样。</p><h3 id="四、如何定义线程池参数" tabindex="-1"><a class="header-anchor" href="#四、如何定义线程池参数" aria-hidden="true">#</a> 四、如何定义线程池参数</h3><p><strong>1）CPU 密集型</strong></p><p>线程池的大小推荐为 CPU 数量 + 1，CPU 数量可以根据 Runtime.availableProcessors 方法获取</p><p><strong>2）IO 密集型</strong></p><p>CPU 数量 _ CPU 利用率 _ (1 + 线程等待时间/线程 CPU 时间)</p><p><strong>3）混合型</strong></p><p>将任务分为 CPU 密集型和 IO 密集型，然后分别使用不同的线程池去处理，从而使每个线程池可以根据各自的工作负载来调整。</p><p><strong>4）阻塞队列</strong></p><p>推荐使用有界队列，有界队列有助于避免资源耗尽的情况发生</p><p><strong>5）拒绝策略</strong></p><p>默认采用的是 AbortPolicy 拒绝策略，直接在程序中抛出 RejectedExecutionException 异常【因为是运行时异常，不强制 catch】，这种处理方式不够优雅。</p><p>处理拒绝策略有以下几种比较推荐：</p><ul><li>在程序中捕获 RejectedExecutionException 异常，在捕获异常中对任务进行处理。针对默认拒绝策略</li><li>使用 CallerRunsPolicy 拒绝策略，该策略会将任务交给调用 execute 的线程执行【一般为主线程】，此时主线程将在一段时间内不能提交任何任务，从而使工作线程处理正在执行的任务。此时提交的线程将被保存在 TCP 队列中，TCP 队列满将会影响客户端，这是一种平缓的性能降低</li><li>自定义拒绝策略，只需要实现 RejectedExecutionHandler 接口即可</li><li>如果任务不是特别重要，使用 DiscardPolicy 和 DiscardOldestPolicy 拒绝策略将任务丢弃也是可以的</li></ul><p>如果使用 Executors 的静态方法创建 ThreadPoolExecutor 对象，可以通过使用 Semaphore 对任务的执行进行限流也可以避免出现 OOM 异常。</p><p>由于线程池参数定义经验较少，都是理论知识，欢迎有经验的大佬在评论区补充。</p><hr>',72),o=(0,e.Uk)("编辑：沉默王二 转载链接："),l={href:"https://mp.weixin.qq.com/s/dd_IPt7lQQeIMH7YTdgLIw",target:"_blank",rel:"noopener noreferrer"},p=(0,e.Uk)("https://mp.weixin.qq.com/s/dd_IPt7lQQeIMH7YTdgLIw"),c=(0,e.Uk)(" 原文链接："),i={href:"https://juejin.cn/post/6844903989675458574",target:"_blank",rel:"noopener noreferrer"},u=(0,e.Uk)("https://juejin.cn/post/6844903989675458574"),r=(0,e._)("img",{src:"http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png"},null,-1),d={},k=(0,s(13860).Z)(d,[["render",function(n,a){const s=(0,e.up)("ExternalLinkIcon");return(0,e.wg)(),(0,e.iD)("div",null,[t,(0,e._)("blockquote",null,[(0,e._)("p",null,[o,(0,e._)("a",l,[p,(0,e.Wm)(s)]),c,(0,e._)("a",i,[u,(0,e.Wm)(s)])])]),r])}]])},13860:(n,a)=>{a.Z=(n,a)=>{const s=n.__vccOpts||n;for(const[n,e]of a)s[n]=e;return s}}}]);