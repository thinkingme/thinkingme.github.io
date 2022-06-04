"use strict";(self.webpackChunkcoding_road=self.webpackChunkcoding_road||[]).push([[1035],{96579:(i,t,e)=>{e.r(t),e.d(t,{data:()=>n});const n={key:"v-373e95f4",path:"/coding-road/javaee/springboot/initializr.html",title:"搭建第一个Spring Boot项目",lang:"zh-CN",frontmatter:{category:["Java企业级开发"],tag:["Spring Boot"],title:"搭建第一个Spring Boot项目",summary:'搭建第一个 Spring Boot 项目 01、关于 Spring Initializr Spring 官方提供了 Spring Initializr 的方式来创建 Spring Boot 项目。网址如下： " https://start.spring.io/" 打开后的界面如下： 可以将 Spring Initializr 看作是 Spring Boot ',head:[["meta",{property:"og:url",content:"https://vuepress-theme-hope-v2-demo.mrhope.site/coding-road/javaee/springboot/initializr.html"}],["meta",{property:"og:site_name",content:"coding-rode"}],["meta",{property:"og:title",content:"搭建第一个Spring Boot项目"}],["meta",{property:"og:type",content:"article"}],["meta",{property:"og:updated_time",content:"2022-06-04T08:56:49.000Z"}],["meta",{property:"og:locale",content:"zh-CN"}],["meta",{property:"article:tag",content:"Spring Boot"}],["meta",{property:"article:modified_time",content:"2022-06-04T08:56:49.000Z"}]]},excerpt:"",headers:[{level:3,title:"01、关于 Spring Initializr",slug:"_01、关于-spring-initializr",children:[]},{level:3,title:"02、Spring Boot 项目结构分析",slug:"_02、spring-boot-项目结构分析",children:[]},{level:3,title:"03、如何启动/部署 Spring Boot 项目",slug:"_03、如何启动-部署-spring-boot-项目",children:[]},{level:3,title:"04、开发第一个 Web 项目",slug:"_04、开发第一个-web-项目",children:[]}],git:{createdTime:1653617096e3,updatedTime:1654333009e3,contributors:[{name:"林振辉",email:"linzhenhui@apexsoft.com",commits:2},{name:"thinkingme",email:"linzhenhuigg@gmail.com",commits:1}]},readingTime:{minutes:4.85,words:1456},filePathRelative:"coding-road/javaee/springboot/initializr.md"}},98421:(i,t,e)=>{e.r(t),e.d(t,{default:()=>T});var n=e(95393);const r=(0,n._)("h1",{id:"搭建第一个-spring-boot-项目",tabindex:"-1"},[(0,n._)("a",{class:"header-anchor",href:"#搭建第一个-spring-boot-项目","aria-hidden":"true"},"#"),(0,n.Uk)(" 搭建第一个 Spring Boot 项目")],-1),a=(0,n._)("h3",{id:"_01、关于-spring-initializr",tabindex:"-1"},[(0,n._)("a",{class:"header-anchor",href:"#_01、关于-spring-initializr","aria-hidden":"true"},"#"),(0,n.Uk)(" 01、关于 Spring Initializr")],-1),l=(0,n._)("p",null,"Spring 官方提供了 Spring Initializr 的方式来创建 Spring Boot 项目。网址如下：",-1),o={href:"https://start.spring.io/",target:"_blank",rel:"noopener noreferrer"},g=(0,n.Uk)("https://start.spring.io/"),p=(0,n._)("p",null,"打开后的界面如下：",-1),s=(0,n._)("p",null,[(0,n._)("img",{src:"https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/springboot/initializr-01.png",alt:"",loading:"lazy"})],-1),d=(0,n._)("p",null,"可以将 Spring Initializr 看作是 Spring Boot 项目的初始化向导，它可以帮助开发人员在一分钟之内创建一个 Spring Boot 骨架，非常的傻瓜式。",-1),m=(0,n._)("p",null,"来解释一下 Spring Initializr 初始化界面中的关键选项。",-1),c=(0,n.Uk)("1）Project：项目的构建方式，可以选择 "),h={href:"https://tobebetterjavaer.com/maven/maven.html",target:"_blank",rel:"noopener noreferrer"},u=(0,n.Uk)("Maven"),b=(0,n.Uk)("（Maven 的安装可以戳链接参考） 和 Gradle（构建脚本基于 Groovy 或者 Kotlin 等语言来编写，而不是传统的 XML）。默认 Maven 即可。"),v=(0,n.uE)('<p>2）Language：项目的开发语言，可以选择 Java、Kotlin（JetBrains 开发的可以在 JVM 上运行的编程语言）、Groovy（可以作为 Java 平台的脚本语言来使用）。默认 Java 即可。</p><p>3）Spring Boot：项目使用的 Spring Boot 版本。默认版本即可，比较稳定。</p><p>4）Project Metada：项目的基础设置，包括包名、打包方式、JDK 版本等。</p><ul><li>Group：项目所属组织的标识符，比如说 vip.r2java；</li><li>Artifact：项目的标识符，比如说 tobebetterjavaer；</li><li>Name：默认保持和 Artifact 一致即可；</li><li>Description： 项目的描述信息，比如说《Java 程序员进阶之路》；</li><li>Package name：项目包名，根据 Group 和 Artifact 自动生成即可。</li><li>Packaging： 项目打包方式，可以选择 Jar 和 War（SSM 时代，JavaWeb 项目通常会打成 War 包，放在 Tomcat 下），Spring Boot 时代默认 Jar 包即可，因为 Spring Boot 可以内置 Tomcat、Jetty、Undertow 等服务容器了。</li><li>Java：项目选用的 JDK 版本，选择 11 或者 8 就行。</li></ul><p>5）Dependencies：项目所需要的依赖和 starter。如果不选择的话，默认只有核心模块 spring-boot-starter 和测试模块 spring-boot-starter-test。</p><p>好，接下来我们使用 Spring Initializr 初始化一个 Web 项目，Project 选择 Maven，Spring Boot 选择 2.6.1，Java 选择 JDK 8，Dependencies 选择「Build web, including RESTful, applications using Spring MVC. Uses Apache Tomcat as the default embedded container.」</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/springboot/initializr-02.png" alt="" loading="lazy"></p><p>这预示着我们会采用 SpringMVC 并且使用 Tomcat 作为默认服务器来开发一个 Web 项目。</p><p>然后点击底部的「generate」按钮，就会生成一个 Spring Boot 初始化项目的压缩包。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/springboot/initializr-03.png" alt="" loading="lazy"></p><h3 id="_02、spring-boot-项目结构分析" tabindex="-1"><a class="header-anchor" href="#_02、spring-boot-项目结构分析" aria-hidden="true">#</a> 02、Spring Boot 项目结构分析</h3><p>解开压缩包，并导入到 Intellij IDEA 中，可以看到 Spring Boot 项目的目录结构。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/springboot/initializr-04.png" alt="" loading="lazy"></p><p>可以使用 <code>tree -CfL 3</code> 命令以树状图列出目录的内容：</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/springboot/initializr-05.png" alt="" loading="lazy"></p><ul><li>src/main/java 为项目的开发目录，业务代码在这里写。</li><li>src/main/resources 为配置文件目录，静态文件、模板文件和配置文件都放在这里。 <ul><li>子目录 static 用于存放静态资源文件，比如说 JS、CSS 图片等。</li><li>子目录 templates 用于存放模板文件，比如说 thymeleaf 和 freemarker 文件。</li></ul></li><li>src/test/java 为测试类文件目录。</li><li>pom.xml 用来管理项目的依赖和构建。</li></ul><h3 id="_03、如何启动-部署-spring-boot-项目" tabindex="-1"><a class="header-anchor" href="#_03、如何启动-部署-spring-boot-项目" aria-hidden="true">#</a> 03、如何启动/部署 Spring Boot 项目</h3><p>第一次启动，我个人习惯在 main 类中右键，在弹出的右键菜单这种选择「run ... main()」启动。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/springboot/initializr-06.png" alt="" loading="lazy"></p><p>经过 2.5s 左右的 build 后，项目启动成功了，可以在日志中看到 Web 项目是以 Tomcat 为容器的，默认端口号为 8080，根路径为空。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/springboot/initializr-07.png" alt="" loading="lazy"></p><p>这要比传统的 Web 项目省事省心省力，不需要打成 war 包，不需要把 war 包放到 Tomcat 的 webapp 目录下再启动。</p><p>那如果想把项目打成 jar 包放到服务器上，以 <code>java -jar xxx.jar</code> 形式运行的话，该怎么做呢？</p><p>打开 Terminal 终端， 执行命令 <code>mvn clean package</code>，等待打包结果。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/springboot/initializr-08.png" alt="" loading="lazy"></p><p>我们的项目在初始化的时候选择的是 Maven 构建方式，所以 pom.xml 文件中会引入 spring-boot-maven-plugin 插件。</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;build&gt;\n\t&lt;plugins&gt;\n\t\t&lt;plugin&gt;\n\t\t\t&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;\n\t\t\t&lt;artifactId&gt;spring-boot-maven-plugin&lt;/artifactId&gt;\n\t\t&lt;/plugin&gt;\n\t&lt;/plugins&gt;\n&lt;/build&gt;\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此我们就可以利用 Maven 命令来完成项目打包，打包完成后，进入 target 目录下，就可以看到打包好的 jar 包了。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/springboot/initializr-09.png" alt="" loading="lazy"></p>',29),k=(0,n.Uk)("利用终端工具 "),_={href:"https://mp.weixin.qq.com/s/HeUAPe4LqqjfzIeWDe8KIg",target:"_blank",rel:"noopener noreferrer"},z=(0,n.Uk)("Tabby"),S=(0,n.Uk)("，将 jar 包上传到服务器。"),f=(0,n._)("p",null,[(0,n._)("img",{src:"https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/springboot/initializr-10.png",alt:"",loading:"lazy"})],-1),j=(0,n._)("p",null,[(0,n.Uk)("执行 "),(0,n._)("code",null,"java -jar tobebetterjavaer-0.0.1-SNAPSHOT.jar"),(0,n.Uk)(" 命令。")],-1),y=(0,n._)("p",null,[(0,n._)("img",{src:"https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/springboot/initializr-11.png",alt:"",loading:"lazy"})],-1),B=(0,n._)("p",null,"what？？？？？？竟然没有安装 JDK。好吧，为了带白票阿里云服务器的小伙伴一起学习 Linux，我下了血本自己买了一台零添加的服务器。",-1),x=(0,n._)("p",null,"PS：需要在 centos 环境下安装 JDK 的小伙伴可以看这篇。",-1),J={href:"https://segmentfault.com/a/1190000015389941",target:"_blank",rel:"noopener noreferrer"},I=(0,n.Uk)("https://segmentfault.com/a/1190000015389941"),W=(0,n.uE)('<p>安装好 JDK 后，再次执行命令就可以看到 Spring Boot 项目可以正常在服务器上跑起来了。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/springboot/initializr-12.png" alt="" loading="lazy"></p><h3 id="_04、开发第一个-web-项目" tabindex="-1"><a class="header-anchor" href="#_04、开发第一个-web-项目" aria-hidden="true">#</a> 04、开发第一个 Web 项目</h3><p>项目既然启动成功了，我们在浏览器里访问 8080 端口测试下吧。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/springboot/initializr-13.png" alt="" loading="lazy"></p><p>咦，竟然 Whitelabel 了，这个 404 页面是 Spring Boot 默认的错误页面，表示我们的请求在 Web 服务中不存在。</p><p>那该怎么办呢？</p><p>我们来增加一个 Controller 文件，用来处理 Web 请求，内容如下。</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@Controller\npublic class HelloController {\n\n    @GetMapping(&quot;/hello&quot;)\n    @ResponseBody\n    public String hello() {\n        return &quot;hello, springboot&quot;;\n    }\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码的业务逻辑非常简单，用户发送 hello 请求，服务器端响应一个“hello, springboot”回去。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/springboot/initializr-14.png" alt="" loading="lazy"></p><p>OK，现在可以访问到了。也就表明我们的第一个 Spring Boot 项目开发完成了。</p><hr><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/xingbiaogongzhonghao.png" alt="" loading="lazy"></p>',14),w={},T=(0,e(13860).Z)(w,[["render",function(i,t){const e=(0,n.up)("ExternalLinkIcon");return(0,n.wg)(),(0,n.iD)("div",null,[r,a,l,(0,n._)("blockquote",null,[(0,n._)("p",null,[(0,n._)("a",o,[g,(0,n.Wm)(e)])])]),p,s,d,m,(0,n._)("p",null,[c,(0,n._)("a",h,[u,(0,n.Wm)(e)]),b]),v,(0,n._)("p",null,[k,(0,n._)("a",_,[z,(0,n.Wm)(e)]),S]),f,j,y,B,x,(0,n._)("blockquote",null,[(0,n._)("p",null,[(0,n._)("a",J,[I,(0,n.Wm)(e)])])]),W])}]])},13860:(i,t)=>{t.Z=(i,t)=>{const e=i.__vccOpts||i;for(const[i,n]of t)e[i]=n;return e}}}]);