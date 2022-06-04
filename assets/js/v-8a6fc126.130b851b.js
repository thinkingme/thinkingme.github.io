"use strict";(self.webpackChunkcoding_road=self.webpackChunkcoding_road||[]).push([[6229],{65196:(e,t,i)=>{i.r(t),i.d(t,{data:()=>a});const a={key:"v-8a6fc126",path:"/coding-road/java-core/jvm/cpu-percent-100.html",title:"一次生产 CPU 100% 排查优化实践",lang:"zh-CN",frontmatter:{category:["Java核心","JVM"],tag:["Java"],summary:"一次生产 CPU 100% 排查优化实践 前言 最近又收到了运维报警：表示有些服务器负载非常高，让我们定位问题。 定位问题 拿到问题后首先去服务器上看了看，发现运行的只有我们的 Java 应用。于是先用 ps 命令拿到了应用的 PID。 接着使用 top -Hp pid 将这个进程的线程显示出来。输入大写的 P 可以将线程按照 CPU 使用比例排序，于是得到",head:[["meta",{property:"og:url",content:"https://vuepress-theme-hope-v2-demo.mrhope.site/coding-road/java-core/jvm/cpu-percent-100.html"}],["meta",{property:"og:site_name",content:"coding-rode"}],["meta",{property:"og:title",content:"一次生产 CPU 100% 排查优化实践"}],["meta",{property:"og:type",content:"article"}],["meta",{property:"og:updated_time",content:"2022-06-04T08:56:49.000Z"}],["meta",{property:"og:locale",content:"zh-CN"}],["meta",{property:"article:tag",content:"Java"}],["meta",{property:"article:modified_time",content:"2022-06-04T08:56:49.000Z"}]]},excerpt:"",headers:[{level:2,title:"前言",slug:"前言",children:[]},{level:2,title:"定位问题",slug:"定位问题",children:[]},{level:2,title:"解决问题",slug:"解决问题",children:[{level:3,title:"本地模拟",slug:"本地模拟",children:[]},{level:3,title:"优化解决",slug:"优化解决",children:[]}]},{level:2,title:"总结",slug:"总结",children:[]}],git:{createdTime:1653617096e3,updatedTime:1654333009e3,contributors:[{name:"林振辉",email:"linzhenhui@apexsoft.com",commits:2},{name:"thinkingme",email:"linzhenhuigg@gmail.com",commits:1}]},readingTime:{minutes:5.76,words:1729},filePathRelative:"coding-road/java-core/jvm/cpu-percent-100.md"}},27940:(e,t,i)=>{i.r(t),i.d(t,{default:()=>_});var a=i(95393);const r=(0,a.uE)('<h1 id="一次生产-cpu-100-排查优化实践" tabindex="-1"><a class="header-anchor" href="#一次生产-cpu-100-排查优化实践" aria-hidden="true">#</a> 一次生产 CPU 100% 排查优化实践</h1><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>最近又收到了运维报警：表示有些服务器负载非常高，让我们定位问题。</p><h2 id="定位问题" tabindex="-1"><a class="header-anchor" href="#定位问题" aria-hidden="true">#</a> 定位问题</h2><p>拿到问题后首先去服务器上看了看，发现运行的只有我们的 Java 应用。于是先用 <code>ps</code> 命令拿到了应用的 <code>PID</code>。</p><p>接着使用 <code>top -Hp pid</code> 将这个进程的线程显示出来。输入大写的 P 可以将线程按照 CPU 使用比例排序，于是得到以下结果。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/jvm/cpu-percent-100-e9b35104-fce9-40ea-ae91-8bbb7fd8aa96.jpg" alt="" loading="lazy"></p><p>果然某些线程的 CPU 使用率非常高。</p><p>为了方便定位问题我立马使用 <code>jstack pid &gt; pid.log</code> 将线程栈 <code>dump</code> 到日志文件中。</p><p>我在上面 100% 的线程中随机选了一个 <code>pid=194283</code> 转换为 16 进制（2f6eb）后在线程快照中查询：</p><blockquote><p>因为线程快照中线程 ID 都是 16 进制存放。</p></blockquote><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/jvm/cpu-percent-100-f8b051d5-f28d-481e-a0b2-e97151797e3b.jpg" alt="" loading="lazy"></p>',12),p=(0,a.Uk)("发现这是 "),c=(0,a._)("code",null,"Disruptor",-1),n=(0,a.Uk)(" 的一个堆栈，前段时间正好解决过一个由于 Disruptor 队列引起的一次 "),d=(0,a._)("a",{href:""},"OOM",-1),o=(0,a.Uk)("："),g={href:"https://crossoverjie.top/2018/08/29/java-senior/OOM-Disruptor/",target:"_blank",rel:"noopener noreferrer"},l=(0,a.Uk)("强如 Disruptor 也发生内存溢出？"),h=(0,a._)("p",null,"没想到又来一出。",-1),s=(0,a._)("p",null,"为了更加直观的查看线程的状态信息，我将快照信息上传到专门分析的平台上。",-1),m={href:"http://fastthread.io/",target:"_blank",rel:"noopener noreferrer"},u=(0,a.Uk)("http://fastthread.io/"),b=(0,a.uE)('<p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/jvm/cpu-percent-100-d6c9bc1c-9600-47f2-9ff1-d0c9bd8ef849.jpg" alt="" loading="lazy"></p><p>其中有一项菜单展示了所有消耗 CPU 的线程，我仔细看了下发现几乎都是和上面的堆栈一样。</p><p>也就是说都是 <code>Disruptor</code> 队列的堆栈，同时都在执行 <code>java.lang.Thread.yield</code> 函数。</p><p>众所周知 <code>yield</code> 函数会让当前线程让出 <code>CPU</code> 资源，再让其他线程来竞争。</p><p>根据刚才的线程快照发现处于 <code>RUNNABLE</code> 状态并且都在执行 <code>yield</code> 函数的线程大概有 30 几个。</p><p>因此初步判断为大量线程执行 <code>yield</code> 函数之后互相竞争导致 CPU 使用率增高，而通过对堆栈发现是和使用 <code>Disruptor</code> 有关。</p><h2 id="解决问题" tabindex="-1"><a class="header-anchor" href="#解决问题" aria-hidden="true">#</a> 解决问题</h2><p>而后我查看了代码，发现是根据每一个业务场景在内部都会使用 2 个 <code>Disruptor</code> 队列来解耦。</p><p>假设现在有 7 个业务类型，那就等于是创建 <code>2*7=14</code> 个 <code>Disruptor</code> 队列，同时每个队列有一个消费者，也就是总共有 14 个消费者（生产环境更多）。</p><p>同时发现配置的消费等待策略为 <code>YieldingWaitStrategy</code> 这种等待策略确实会执行 yield 来让出 CPU。</p><p>代码如下：</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/jvm/cpu-percent-100-49840c0d-2c10-4bcb-80c6-1df7553ddb6c.jpg" alt="" loading="lazy"></p><blockquote><p>初步看来和这个等待策略有很大的关系。</p></blockquote><h3 id="本地模拟" tabindex="-1"><a class="header-anchor" href="#本地模拟" aria-hidden="true">#</a> 本地模拟</h3><p>为了验证，我在本地创建了 15 个 <code>Disruptor</code> 队列同时结合监控观察 CPU 的使用情况。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/jvm/cpu-percent-100-7f3b2fa6-6505-4b67-9f42-0170a236832b.jpg" alt="" loading="lazy"><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/jvm/cpu-percent-100-d597089d-54e0-49ef-a0f9-41798e84de48.jpg" alt="" loading="lazy"></p><p>创建了 15 个 <code>Disruptor</code> 队列，同时每个队列都用线程池来往 <code>Disruptor队列</code> 里面发送 100W 条数据。</p><p>消费程序仅仅只是打印一下。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/jvm/cpu-percent-100-97b88b4d-2d81-47ab-9beb-830ac122c282.jpg" alt="" loading="lazy"></p><p>跑了一段时间发现 CPU 使用率确实很高。</p><hr><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/jvm/cpu-percent-100-c0ee1da2-29af-4581-b0d8-97f6250401e7.jpg" alt="" loading="lazy"></p><p>同时 <code>dump</code> 线程发现和生产的现象也是一致的：消费线程都处于 <code>RUNNABLE</code> 状态，同时都在执行 <code>yield</code>。</p><p>通过查询 <code>Disruptor</code> 官方文档发现：</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/jvm/cpu-percent-100-de904a90-8b59-4333-82f5-9ec94a6525a0.jpg" alt="" loading="lazy"></p><blockquote><p>YieldingWaitStrategy 是一种充分压榨 CPU 的策略，使用<code>自旋 + yield</code>的方式来提高性能。 当消费线程（Event Handler threads）的数量小于 CPU 核心数时推荐使用该策略。</p></blockquote><hr><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/jvm/cpu-percent-100-3faf6f7e-0d2c-4cfe-8e3a-07e15601485d.jpg" alt="" loading="lazy"></p><p>同时查阅到其他的等待策略 <code>BlockingWaitStrategy</code> （也是默认的策略），它使用的是锁的机制，对 CPU 的使用率不高。</p><p>于是在和之前同样的条件下将等待策略换为 <code>BlockingWaitStrategy</code>。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/jvm/cpu-percent-100-12912ce3-a702-4bb2-a19b-816c22f7d43a.jpg" alt="" loading="lazy"></p><hr><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/jvm/cpu-percent-100-b4aad83e-af9d-48fc-bcd0-ad2a42588179.jpg" alt="" loading="lazy"><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/jvm/cpu-percent-100-56dc1513-8f10-422f-bb2a-ae5dcfb8413f.jpg" alt="" loading="lazy"></p><p>和刚才的 CPU 对比会发现到后面使用率的会有明显的降低；同时 dump 线程后会发现大部分线程都处于 waiting 状态。</p><h3 id="优化解决" tabindex="-1"><a class="header-anchor" href="#优化解决" aria-hidden="true">#</a> 优化解决</h3><p>看样子将等待策略换为 <code>BlockingWaitStrategy</code> 可以减缓 CPU 的使用，</p><p>但留意到官方对 <code>YieldingWaitStrategy</code> 的描述里谈道： 当消费线程（Event Handler threads）的数量小于 CPU 核心数时推荐使用该策略。</p><p>而现有的使用场景很明显消费线程数已经大大的超过了核心 CPU 数了，因为我的使用方式是一个 <code>Disruptor</code> 队列一个消费者，所以我将队列调整为只有 1 个再试试(策略依然是 <code>YieldingWaitStrategy</code>)。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/jvm/cpu-percent-100-b1cbc2c2-828a-46e8-ba14-86cd0fa660c6.jpg" alt="" loading="lazy"></p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/jvm/cpu-percent-100-f8fb7682-a61a-407d-923c-890a16bce109.jpg" alt="" loading="lazy"></p><p>跑了一分钟，发现 CPU 的使用率一直都比较平稳而且不高。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>所以排查到此可以有一个结论了，想要根本解决这个问题需要将我们现有的业务拆分；现在是一个应用里同时处理了 N 个业务，每个业务都会使用好几个 <code>Disruptor</code> 队列。</p><p>由于是在一台服务器上运行，所以 CPU 资源都是共享的，这就会导致 CPU 的使用率居高不下。</p><p>所以我们的调整方式如下：</p><ul><li>为了快速缓解这个问题，先将等待策略换为 <code>BlockingWaitStrategy</code>，可以有效降低 CPU 的使用率（业务上也还能接受）。</li><li>第二步就需要将应用拆分（上文模拟的一个 <code>Disruptor</code> 队列），一个应用处理一种业务类型；然后分别单独部署，这样也可以互相隔离互不影响。</li></ul><p>当然还有其他的一些优化，因为这也是一个老系统了，这次 dump 线程居然发现创建了 800+ 的线程。</p><p>创建线程池的方式也是核心线程数、最大线程数是一样的，导致一些空闲的线程也得不到回收；这样会有很多无意义的资源消耗。</p><p>所以也会结合业务将创建线程池的方式调整一下，将线程数降下来，尽量的物尽其用。</p><p>本文的演示代码已上传至 GitHub：</p>',50),v={href:"https://github.com/crossoverJie/JCSprout/tree/master/src/main/java/com/crossoverjie/disruptor",target:"_blank",rel:"noopener noreferrer"},k=(0,a.Uk)("https://github.com/crossoverJie/JCSprout"),f=(0,a._)("p",null,[(0,a._)("strong",null,"你的点赞与分享是对我最大的支持")],-1),j=(0,a.Uk)("原文链接："),y={href:"https://github.com/crossoverJie/JCSprout/blob/master/docs/jvm/cpu-percent-100.md",target:"_blank",rel:"noopener noreferrer"},U=(0,a.Uk)("https://github.com/crossoverJie/JCSprout/blob/master/docs/jvm/cpu-percent-100.md"),C=(0,a._)("p",null,[(0,a._)("img",{src:"https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/xingbiaogongzhonghao.png",alt:"",loading:"lazy"})],-1),P={},_=(0,i(13860).Z)(P,[["render",function(e,t){const i=(0,a.up)("ExternalLinkIcon");return(0,a.wg)(),(0,a.iD)("div",null,[r,(0,a._)("p",null,[p,c,n,d,o,(0,a._)("a",g,[l,(0,a.Wm)(i)])]),h,s,(0,a._)("p",null,[(0,a._)("a",m,[u,(0,a.Wm)(i)])]),b,(0,a._)("p",null,[(0,a._)("a",v,[k,(0,a.Wm)(i)])]),f,(0,a._)("p",null,[j,(0,a._)("a",y,[U,(0,a.Wm)(i)])]),C])}]])},13860:(e,t)=>{t.Z=(e,t)=>{const i=e.__vccOpts||e;for(const[e,a]of t)i[e]=a;return i}}}]);