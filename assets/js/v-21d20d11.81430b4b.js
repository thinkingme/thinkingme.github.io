"use strict";(self.webpackChunkcoding_road=self.webpackChunkcoding_road||[]).push([[6038],{30013:(a,p,n)=>{n.r(p),n.d(p,{data:()=>e});const e={key:"v-21d20d11",path:"/coding-road/java-core/overview/what-is-java.html",title:"什么是 Java？",lang:"zh-CN",frontmatter:{category:["Java核心"],tag:["Java"],summary:"什么是 Java？ 01、什么是 Java？ “二哥，到底什么是 Java？给我说说呗。” “三妹啊，这就直奔主题了啊，先去给哥买包烟吧，哥先考验考验你的诚心。” （五分钟过后） “三妹啊，你怎么还不去？” “二哥，掏钱啊。” （真实亲妹子啊，买包烟还得我掏钱，关键是还得给跑腿费。十分钟后，三妹从楼下小卖部买了一包熊猫回来了，我用 Zippo 火机点了一支—",head:[["meta",{property:"og:url",content:"https://vuepress-theme-hope-v2-demo.mrhope.site/coding-road/java-core/overview/what-is-java.html"}],["meta",{property:"og:site_name",content:"coding-rode"}],["meta",{property:"og:title",content:"什么是 Java？"}],["meta",{property:"og:type",content:"article"}],["meta",{property:"og:updated_time",content:"2022-06-04T08:56:49.000Z"}],["meta",{property:"og:locale",content:"zh-CN"}],["meta",{property:"article:tag",content:"Java"}],["meta",{property:"article:modified_time",content:"2022-06-04T08:56:49.000Z"}]]},excerpt:"",headers:[{level:2,title:"01、什么是 Java？",slug:"_01、什么是-java",children:[]},{level:2,title:"02、Java 的发展简史",slug:"_02、java-的发展简史",children:[]},{level:2,title:"03、Java 的优势",slug:"_03、java-的优势",children:[]}],git:{createdTime:1653617096e3,updatedTime:1654333009e3,contributors:[{name:"林振辉",email:"linzhenhui@apexsoft.com",commits:2},{name:"thinkingme",email:"linzhenhuigg@gmail.com",commits:1}]},readingTime:{minutes:15.42,words:4627},filePathRelative:"coding-road/java-core/overview/what-is-java.md"}},9954:(a,p,n)=>{n.r(p),n.d(p,{default:()=>s});var e=n(95393);const i=[(0,e.uE)('<h1 id="什么是-java" tabindex="-1"><a class="header-anchor" href="#什么是-java" aria-hidden="true">#</a> 什么是 Java？</h1><h2 id="_01、什么是-java" tabindex="-1"><a class="header-anchor" href="#_01、什么是-java" aria-hidden="true">#</a> 01、什么是 Java？</h2><p>“二哥，到底什么是 Java？给我说说呗。”</p><p>“三妹啊，这就直奔主题了啊，先去给哥买包烟吧，哥先考验考验你的诚心。”</p><p>（五分钟过后）</p><p>“三妹啊，你怎么还不去？”</p><p>“二哥，掏钱啊。”</p><p>（真实亲妹子啊，买包烟还得我掏钱，关键是还得给跑腿费。十分钟后，三妹从楼下小卖部买了一包熊猫回来了，我用 Zippo 火机点了一支——这火机是 21 岁生日的时候初恋女友送我的，质量确实不错，现在还在用。）</p><p>“三妹啊，听我慢慢来给你解释。”</p><p>Java 是一门计算机编程语言，高级、健壮、面向对象，并且非常安全。它由 Sun 公司在 1995 年开发，主力开发叫 James Gosling，被称为 Java 之父，就是下图这位，头秃的厉害。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/overview/one-01.png" alt="" loading="lazy"></p><p>“三妹啊，你要不要再考虑考虑？做程序员不容易啊”</p><p>“二哥，你咋没有秃呢？是因为你不够厉害吗？”</p><p>（这孩子，嘴咋这么损呢？）</p><p>Java 在叫“Java”之前，其实叫 Oak（橡树的意思，我感觉好像比 Java 好听一些）。怎么想到呢？James Gosling 坐在办公室，望向窗外，视野里出现了一颗橡树。不过，遗憾的是，Oak 已经被 另外一家公司注册了，因此 1995 年 5 月 23 日，Oak 语言改名为 Java。</p><p>Java 起初并不是 James Gosling 的首选，也不是命名团队的首选。团队其他人员更青睐 Silk（丝绸），但 Gosling 不喜欢，他本人喜欢的是 Lyric（抒情诗），但没通过律师这一关。最后，排在第四位的“Java”脱颖而出。是不是像极了婴儿没生下来之前，家人就着急着起名的那种感觉。</p><p>James Gosling 回忆说，“Java”是一个叫 Mark Opperman 的人提议的，他是在一家咖啡店得到灵感的，“Java”是印度尼西亚爪哇岛的英文名，因生产咖啡而闻名。</p><p>使用十六进制编辑器打开由 Java 源代码编译出的二进制文件（.class 文件），就可以看得到，最前面的 8 个字符是 CA FE BA BE（定义文件类型的魔数），即词组“CAFE BABE”（咖啡屋宝贝）。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/overview/one-02.png" alt="" loading="lazy"></p><p>“二哥，能给我展示一段 Java 代码吗？我想感受一下。”</p><p>“三妹啊，马上就来。”</p><p>（我噼里啪啦一阵在键盘上一阵狂按）</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloWorld</span> <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>“二哥，这都什么跟什么啊，看得一头雾水。”</p><p>“三妹啊，先不要着急，Hello World 这段代码以后再慢慢消化，现在就是让它来给你打个招呼。”</p><p>“好吧。”</p><p>“二哥，学 Java 到底有没有前途啊？我毕业以后能不能找到工作啊？”</p><p>“三妹啊，就目前来说，Java 不仅仅是一门编程语言，它还是一个由一系列计算机软件和规范组成的技术体系，这个技术体系提供了完整的用于软件开发和跨平台部署的支持环境，并广泛应用于以下这些场合。”</p><p>1）桌面应用程序； 2）Web 应用程序； 3）企业应用程序，体现了 Java 的安全性、负载均衡和集群的优势； 4）移动端应用程序，主要就是安卓； 5）嵌入式系统； 6）机器人技术； 7）游戏。</p><p>时至今日，Java 技术体系已经吸引了 600 多万软件开发者，是全球最大的软件开发团队。Java 能够获得如此广泛的认可，除了它是一门结构严谨、面向对象的编程语言之外，还有很多其他不可忽视的优点：</p><ul><li>摆脱了硬件平台的束缚，实现了“一次编写，处处运行”的理念；</li><li>内存管理相对安全，避免了绝大部分内存泄露和指针越界的问题；</li><li>实现了热点代码检测和运行时编译，使得 Java 应用能随着运行时间的增长而获得更高的性能；</li><li>有一套完善的应用程序接口，还有无数来自商业机构和开源社区的第三方类库。</li></ul><p>这一切的一切，都让软件开发的效率大大的提高。所以，学习 Java 还是很有“钱”“秃”的。</p><h2 id="_02、java-的发展简史" tabindex="-1"><a class="header-anchor" href="#_02、java-的发展简史" aria-hidden="true">#</a> 02、Java 的发展简史</h2><p>20 世纪 90 年代，单片式计算机系统诞生。单片式计算机系统不仅廉价（之前的计算机非常庞大，并且昂贵），而且功能强大，可以大幅度提升消费性电子产品的智能化程度。</p><p>Sun 公司为了抢占市场先机，在 1991 年成立了一个由詹姆斯·高斯林（James Gosling）领导的，名为“Green”的项目组，目的是开发一种能够在各种消费性电子产品上运行的程序架构。</p><p>项目组首先考虑的是采用 C++ 来编写程序，但 C++ 过于复杂和庞大，再加上消费电子产品所采用的嵌入式处理器芯片的种类繁杂，需要让编写的程序能够跨平台运行并不容易——C++ 在跨平台方面做得并不好。</p><p>思前想后，项目组最后决定：在 C++ 的基础上创建一种新的编程语言，既能够剔除 C++ 复杂的指针和内存管理，还能够兼容各种设备。这语言最初的名字叫做 <strong>Greentalk</strong>，文件扩展名为 <code>.gt</code>。这个名字叫的比较随意，就因为项目组叫 Green，没什么特殊的寓意。</p><p><strong>Oak</strong> 是“Java”的第二个名字，这次就有点意义了。Oak（橡树）是力量的象征，被美国、法国、德国等许多欧美国家选为国树。橡树长下面这样。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/overview/two-01.png" alt="" loading="lazy"></p><p>1992 年，Oak 的雏形有了，但项目组在向硬件生产商进行商演的时候，并没有获得认可，于是 Oak 就被搁置一旁了。</p><p>1994 年，项目组发现 Java 更适合进行 Internet 编程。随后，项目组用 Oak 语言研发了一种能将小程序嵌入到网页中执行的技术——Applet。Applet 不仅能嵌入网页，还能够随同网页在网络上进行传输。</p><p>不得不感慨一下，技术的更新迭代是真的快，Applet 拯救了 Oak，并使其蜕变成顶天立地的 Java，但很早之前就被无情地拍死在了沙滩上。是不是很残酷？</p><p>1995 年，Oak 被重新命名为“Java”，因为 Oak 被别的公司注册过了。新的名字最好能够表达出技术的本质：dynamic（动态的）、revolutionary（革命性的）、Silk（像丝绸一样柔软的）、Cool（炫酷的）等等。另外，名字一定要容易拼写，念起来也比较有趣。</p><p>选来选去，项目组最后选择了“Java”，中文叫“爪哇”。细心的小伙伴可能会发现，Java 这个单词里有一个敏感词，所以有段时间微信（文章专辑名这块）为了禁敏感词，竟然把 Java 都禁了，我当时就只能用爪哇来代替 Java，手动狗头。</p><p>“Java”是印度尼西亚爪哇岛的英文名，因生产咖啡而闻名，所以，小伙伴也看到了，Java 这个单词经常和一杯冒着热气的咖啡一起出现。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/overview/two-02.png" alt="" loading="lazy"></p><p>同年，Sun 公司在 SunWorld 大会上正式发布了 Java 1.0 版本，第一次提出了“Write Once, Run anywhere”的口号。《时代》杂志将 Java 评为 1995 年十大最佳产品之一。</p><p>1996 年 1 月 23 日，JDK 1.0 发布，Java 语言有了第一个正式版本的运行环境。JDK 1.0 是一个纯解释执行的 Java 虚拟机，代表技术有：Java 虚拟机、AWT（图形化界面）、Applet。</p><p>4 月，十个主要的操作系统和计算机供应商宣称将在产品中嵌入 Java 技术。9 月，已有大约 8.3 万网页应用采用了 Java 来制作。5 月底，第一届 JavaOne 大会在旧金山举行，从此，JavaOne 成为全世界数百万 Java 语言开发者的技术盛会。</p><p>1997 年 2 月 19 日，JDK 1.1 发布，代表技术有：JAR 文件格式、JDBC、JavaBeans、RMI（远程方法调用）。</p><p>1998 年 12 月 4 日，JDK 1.2 发布，这是一个里程碑式的版本。Sun 在这个版本中把 Java 拆分为三个方向：面向桌面开发的 J2SE、面向企业开发的 J2EE，面向移动开发的 J2ME。代表技术有：EJB、Swing。</p><p>2000 年 5 月 8 日，JDK 1.3 发布，对 Java 2D 做了大幅修改。</p><p>2002 年 2 月 13 日，JDK 1.4 发布，这是 Java 真正走向成熟的一个版本，IBM、富士通等著名公司都有参与。代表技术有：正则表达式、NIO。</p><p>2004 年 9 月 30 日，JDK 5 发布，注意 Sun 把“1.x”的命名方式抛弃了。JDK 5 在 Java 语法的易用性上做出了非常大的改进，比如说：自动装箱、泛型、动态注解、枚举、可变参数、foreach 循环。</p><p>2006 年 12 月 11 日，JDK 6 发布，J2SE 变成了 Java SE 6，J2EE 变成了 Java EE 6，J2ME 变成了 Java ME 6。JDK 6 恐怕是 Java 历史上使用寿命最长的一个版本了。主要的原因有：代码复杂性的增加、世界经济危机、Oracle 对 Sun 的收购。</p><p>JDK 6 的最后一个升级补丁为 Java SE 6 Update 211， 于 2018 年 10 月 18 日发布——12 年的跨度啊！</p><p>2009 年 2 月 19 日，JDK 7 发布，但功能是阉割。很多翘首以盼的功能都没有完成，比如说 Lambda 表达式。主要是因为 Sun 公司在商业上陷入了泥沼，已经无力推动 JDK 7 的研发工作。</p><p>2009 年 4 月 20 日，Oracle 以 74 亿美元的价格收购了市值曾超过 2000 亿美元的 Sun 公司——太阳终究还是落山了。对于 Java 语言这个孩子来说，可以说是好事，也可以说是坏事。好事是 Oracle 有钱，能够注入资金推动 Java 的发展；坏处就是 Oracle 是后爸，对 Java 肯定没有 Sun 那么亲，走的是极具商业化的道路。</p><p>2014 年 3 月 18 日，JDK 8 终于来了，步伐是那么蹒跚，但终究还是来了。带着最强有力的武器——Lambda 表达式而来。虽然 JDK 15 已经发布了，但“新版任你发，我用 Java 8”的梗至今还流传着。</p><p>2017 年 9 月 21 日，JDK 9 发布。从此以后，JDK 更新版本的速度令开发者应接不暇，半年一个版本，虽然 Oracle 的目的是好的，为了避免因功能增加而引发的跳票风险，但不得不承认，版本更新的节奏实在是有点过于频繁。</p><p>这就导致一个问题，好不容易更新一个版本，用了六个月后，Oracle 不维护了。针对这个问题，Oracle 给出的解决方案挺奇葩的，每六个 JDK 大版本才会被长期支持（Long Term Support，LTS）。</p><p>JDK 8 是 LTS 版，2018 年 9 月 25 日发布的 JDK 11 是 LTS 版， 2018 年 3 月 20 日发布的 JDK 10 就可以一笔带过了。按照这个节奏算下去的话，下一个 LTS 版就是 2021 年发布的 JDK 17 了。</p><p>JDK 12、JDK 13、JDK 14、JDK 15、JDK 16 都是过渡产品，就好像是试验品一样，不太受开发者待见。</p><p>Java 发展到今天已经 20 多年了，作为一个编程语言确实不简单，Java 代表的面向对象思想确实给工程领域带来了革命性的变化，关键是 Java 一直在拥抱变化。</p><p>大数据方面，有 Apache Kafka、Apache Samza、Apache Storm、Apache Spark、Apache Flink，除了 Spark 是基于 JVM 的函数语言 Scala 编写的，其余都是 Java 编写的。</p><p>Java 在云时代面临着以 Go 语言为主的容器（Docker 等技术）生态圈的挑战，但是，Java 的大型分布式系统越来越多，Java 在云计算与分布式系统中还是扮演着主要角色，并且形成了一个大型的生态圈。</p><p>虽然 Java 和 C++，C 一样，都“老”了，被其他语言不断地挑战，但只有强者才有机会接受挑战，对吧？我相信，Java 的未来依然很光明。</p><h2 id="_03、java-的优势" tabindex="-1"><a class="header-anchor" href="#_03、java-的优势" aria-hidden="true">#</a> 03、Java 的优势</h2><p>尽管 Java 已经 25 岁了，但仍然“宝刀未老”。在 Stack Overflow 2019 年流行编程语言调查报告中，Java 位居第 5 位，有 41% 的受调开发者认为 Java 仍然是一门受欢迎的编程语言。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/overview/three-01.png" alt="" loading="lazy"></p><p>很多大型的互联网公司都在使用 Java，国内最有名的当属阿里巴巴，国外最有名的当属谷歌。那为什么 Java 如此流行呢？</p><p><strong>1）简单性</strong></p><p>Java 为开发者提供了简单易用的用户体验，与其他面向对象编程语言相比，Java 的设计和生态库具有巨大的优势。Java 剔除了 C++ 中很少使用、难以理解、易混淆的特别，比如说指针运算、操作符重载，内存管理等。</p><p>Java 可以做到堆栈分配、垃圾回收和自动内存管理，在一定程度上为开发者减轻了入门的难度。</p><p><strong>2）可移植性</strong></p><p>如果 Java 直接编译成操作系统能识的二进制码，可能一个标识在 Windows 操作系统下是 1100，而 Linux 下是 1001，这样的话，在 Windows 操作系统下可以运行的程序到了 Linux 环境下就无法运行。</p><p>为了解决这个问题，Java 先编译生成字节码，再由 JVM（Java 虚拟机）来解释执行，目的就是将统一的字节码转成操作系统可以识别的二进制码，然后执行。而针对不同的操作系统，都有相应版本的 JVM，所以 Java 就实现了可移植性。</p><p><strong>3）安全性</strong></p><p>Java 适用于网络/分布式环境，为了达到这个目标，在安全方面投入了巨大的精力。使用 Java 可以构建防病毒、防篡改的程序。</p><p>从一开始，Java 就设计了很多可以防范攻击的机制，比如说：</p><ul><li>运行时堆栈溢出，这是蠕虫病毒常用的攻击手段。</li><li>字节码验证，可以确保代码符合 JVM 规范并防止恶意代码破坏运行时环境。</li><li>安全的类加载，可以防止不受信任的代码干扰 Java 程序的运行。</li><li>全面的 API 支持广泛的加密服务，包括数字签名、消息摘要、（对称、非对称）密码、密钥生成器。</li><li>安全通信，支持 HTTPS、SSL，保护传输的数据完整性和隐私性。</li></ul><p><strong>4）并发性</strong></p><p>Java 在多线程方面做得非常突出，只要操作系统支持，Java 中的线程就可以利用多个处理器，带来了更好的交互响应和实时行为。</p><p>“二哥，那 Java 还会继续流行下去吗？”三妹眨了眨她的长睫毛，对我说。</p><p>“当然。”我斩钉截铁地回答到。</p><p><strong>大数据领域：</strong></p><p>与 Python 一样，Java 在大数据领域占据着主导地位，很多用于处理大规模数据的框架都是基于 Java 开发的。</p><ul><li><p>Apache Hadoop，用于在分布式环境中处理大规模数据集。Hadoop 采用了主副架构模式，其中主节点负责控制整个分布式计算栈。Hadoop 在需要处理和分析大规模数据的公司当中很流行。</p></li><li><p>Apache Spark，大型的 ETL（数据仓库技术）、预测分析和报表程序经常使用到 Spark。</p></li><li><p>Apache Mahout，用于机器学习，比如分类、聚类和推荐。</p></li><li><p>JFreechart，用于可视化数据，可以用它制作各种图表，比如饼图、柱状图、线图、散点图、盒状图、直方图等等。</p></li><li><p>Deeplearning4j，用于构建各种类型的神经网络，可以与 Spark 集成，运行在 GPU（图形处理器）上。</p></li><li><p>Apache Storm，用于处理实时数据流，一个 Storm 节点可以在秒级处理数百万个作业。</p></li></ul><p><strong>物联网（IoT）领域：</strong></p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/overview/three-02.png" alt="" loading="lazy"></p><p>Oracle 表示，灵活性和流行度是 IoT 程序员选择 Java 的主要原因。Java 提供了大量的 API 库，可以很容易应用到嵌入式应用程序中。相比其他编程语言，比如 C 语言，Java 在切换平台时更加顺畅，不容易出错。</p><p><strong>金融服务领域：</strong></p><ul><li><p>聊天机器人，由于可移植性、可维护性、可视化等诸多方面的因素，Java 成了开发聊天机器人最好的工具。</p></li><li><p>欺诈检测和管理，银行和金融公司使用 AI（人工智能）工具来进行金融欺诈和信用卡欺诈检测，而 Java 常用来开发这些 AI 工具。</p></li><li><p>交易系统，Java 虚拟机提供的动态运行时编译优化在很多情况下比编译型语言（如 C++）具有更好的性能，让交易系统运行得更顺畅。</p></li><li><p>移动钱包，基于 AI 和 Java 算法开发的移动钱包，可以帮助用户在花钱时做出更智能的决策。</p></li></ul><p><strong>Web 领域：</strong></p><p>Java 技术对 Web 领域的发展注入了强大的动力，主流的 Java Web 开发框架有很多：</p><ul><li><p>Spring 框架，一个轻量级的控制反转（IoC）和面向切面（AOP）的容器框架，渗透了 Java EE 技术的方方面面，绝大部分 Java 应用都可以从 Spring 框架中受益。</p></li><li><p>Spring MVC 框架，是一种基于 Java 实现的 MVC（Model-View-Controller）设计模式的请求驱动类型的轻量级 Web 框架。</p></li><li><p>MyBatis 框架，一个优秀的数据持久层框架，可在实体类和 SQL 语句之间建立映射关系，是一种半自动化的 ORM（Object Relational Mapping，对象关系映射）实现。</p></li><li><p>JavaServer Faces 框架，由 Oracle 开发，能够将表示层与应用程序代码轻松连接，它提供了一个 API 集，用于表示和管理 UI 组件。</p></li></ul><p>总之，Oracle 宣称，Java 正运行在 97% 的企业计算机上——有点厉害的样子。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/xingbiaogongzhonghao.png" alt="" loading="lazy"></p>',98)],t={},s=(0,n(13860).Z)(t,[["render",function(a,p){return(0,e.wg)(),(0,e.iD)("div",null,i)}]])},13860:(a,p)=>{p.Z=(a,p)=>{const n=a.__vccOpts||a;for(const[a,e]of p)n[a]=e;return n}}}]);