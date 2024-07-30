# Java依赖冲突

**简介：** 由于阿里妈妈联盟团队负责业务的特殊性，系统有庞大的对外依赖，依赖集团六七十个团队服务及N多工具组件，通过此文和大家分享一下我们积累的一些复杂依赖有效治理的经验，除了简单技术技巧的总结外，也会探讨一些关于这方面架构的思考，希望此文能系统彻底的解决java依赖冲突对大家的困扰。

### 一 概述

由于阿里妈妈联盟团队负责业务的特殊性，系统有庞大的对外依赖，依赖集团六七十个团队服务及N多工具组件，通过此文和大家分享一下我们积累的一些复杂依赖有效治理的经验，除了简单技术技巧的总结外，也会探讨一些关于这方面架构的思考，希望此文能系统彻底的解决java依赖冲突对大家的困扰。

### 二 依赖冲突产生的本质原因

要解决依赖冲突，首先要理解一下java依赖冲突产生的本质原因。

![image.png](https://ucc.alicdn.com/pic/developer-ecology/63827901df9f4228a6010d0fc3ff7c92.png)

图1

以上图为例，目前阿里大部分java工程都是maven工程，此类工程从开发到上线要经历以下两个重要步骤：

#### 1 编译打包

平时我们编写的应用代码，用maven编译应用代码时，maven只依赖第一级jar包(A.jar，B.jar，*.jar)既完成应用代码的编译，至于传递依赖的jar包(Y.jar，Z.jar)maven首先会对同名不同version的jar包进行依赖仲裁，然后依据仲裁结果下载对应的jar放到指定目录下(例如上图中Y.jar最终只会仲裁1.0或2.0一个版本，此处假定仲裁到2.0版本，Z.jar即便内容与Y.jar一致，但名称不一样所以不属于maven仲裁范畴)。

有一点需注意不同maven版本可能会有差异，这会导致有时本地环境和日常、预发打包不一致造成应用逻辑表现不一致的情况（说明一下这种情况还有其他一些原因会导致，不是说一定是maven版本不一致仲裁结果不一致导致的）。

#### 2 发布上线

先明确一个概念，在JVM中，一个类型实例是通过它的全类名和加载它的类加载器（ClassLoader）实例来唯一确定的。所以所谓的“类隔离”，实际就是通过不同的类加载器实例去加载需要隔离的类来实现的，这样即便两个全类名完全相同但内容不同的类，只要他们的类加载器实例不同，就能在一个容器进程中共存，并且各自运行互不干扰。

发布启动容器时，不管是tomcat、taobao-tomcat还是PandoraBoot，还是其他容器， 首先都是用特定的类加载器实例先加载容器本身依赖的jar包，容器一般都会有多个类加载器实例，容器自身所依赖的jar包一般由专门的类加载器实例加载实现与应用包的绝对隔离，像Pandroa还有专门的类加载器实例加载淘系中间件避免中间件与应用类冲突，如下图所示：

![image.png](https://ucc.alicdn.com/pic/developer-ecology/45acc04592e24091999debd7e4831671.png)

容器内部依赖jar加载完成后，才轮到必然的一步：由某个应用ClassLoader实例(一般与容器类加载器实例不是一个)来加载编译打包阶段打出来的应用jar包及应用.class程序，这样容器才能运行业务，同时确保应用不会干扰容器的运行。

例如图1中，最终打出的应用包中Y.jar-2.0，Z.jar都有com.taobao.Cc.class类，但一个应用ClassLoader实例仅能加载V3或V2中一个版本的com.taobao.Cc.class类。

那到底会加载哪个版本的com.taobao.Cc.class类呢？答案是不一定，这个取决于容器应用类加载实现策略， 从以往遇到的情况看，tomcat，taobao-tomcat、Pandora的做法都是直接装载应用lib包下所有.jar包文件列表(上例是A.jar,B.jar,*.jar,Y.jar,Z.jar。除tomcat外都没看源码核实过，有错欢迎纠正)。但Java 在装载一个目录下所有jar包时， 它加载的顺序完全取决于操作系统！而Linux的顺序完全取决于INode的顺序，INode的顺序不完全能一致，所以笔者之前就遇到类似的问题，上线20台机器，用同一个镜像，有2台就是起不来的情况。遇到这种情况目前就只能乖乖按以下章节中的手段去解决了。理论上最正确的做法应该是容器装载应用 jar包时，按指定顺序加载。

基于以上分析，我们可以得出结论，基本所有的类冲突产生的本质原因：要么是因为maven依赖仲裁jar包不满足运行时需要，要么是容器类加载过程中加载的类不满足运行时需要导致的。

关于容器类加载隔离策略，网上ATA上有很多资料介绍，本文重点向大家讲解遇到冲突的各种解决之道，解决冲突大家只需要知道以上重点原理就够了。

理解了依赖冲突产生的本质原因，那么发生依赖冲突如何高效定位具体是哪些jar包引起的冲突呢？请继续看下一章节。

### 三 依赖冲突问题高效定位技巧

发生依赖冲突主要表现为系统启动或运行中会发生异常，99%表现为三种NoClassDefFoundError、ClassNotFoundException、NoSuchMethodError。下面逐一讲解一下定位技巧。

#### 1 NoClassDefFoundError、ClassNotFoundException排查定位步骤

STEP1、发生NoClassDefFoundError首先要看完整异常栈，确认是否是静态代码块发生异常，静态代码块发生异常堆栈与jar包冲突有很明显的区别，出现"Could not initialize"、"Caused by: ..."关键字一般是静态代码块发生异常导致类加载失败:

![image.png](https://ucc.alicdn.com/pic/developer-ecology/ae8b3dbf58274255ae09d359ea3af981.png)

因为静态代码块发生异常导致NoClassDefFoundError，修改静态代码块避免抛出异常即可。如果不是静态代码块发生异常导致的问题，继续下一步。

STEP2、如果不是静态代码块发生异常导致加载失败，异常message关键字中会明确显示缺失的类名称，例如：

![image.png](https://ucc.alicdn.com/pic/developer-ecology/3d5b4d943eeb4da7b4cb8e99e6d1a7f2.png)

STEP3、在IDEA中(快捷键Ctrl+N)查找异常栈中提示缺失的类在哪些版本的jar包中有，如上例中的org.apache.commons.lang.CharUtils

![image.png](https://ucc.alicdn.com/pic/developer-ecology/4e9fcb41111b4b29949f8f6779082d24.png)

STEP4、查看应用部署机器上应用lib包目录下(一般是/home/admin/union-uc/target/${projectName}/lib或union-pub/target/${projectName}.war/WEB-INF/lib)是否存在上一步骤中查出对应版本的jar包，以上情况一般是因为此时应用依赖的是低版本jar包，而jar包中又没有冲突的类，绝大部分情况下NoClassDefFoundError、ClassNotFoundException定位确认都是因为maven依赖仲裁最终采纳的jar包版本与运行时需要的不一致导致。

#### 2 NoSuchMethodError排查到位步骤

STEP1、发生NoSuchMethodError，异常堆栈日志核心片段(异常栈中处于栈底的片段，见过很多同学发生异常乱翻一通，那样毫无意义，要有目的的翻关键地方，不要乱翻)会明确显示具体是哪个类，缺失了哪个方法，异常堆栈核心片段示例如下：

```
Caused by: java.lang.NoSuchMethodError: org.springframework.beans.factory.support.DefaultListableBeanFactory.getDependencyComparator()Ljava/util/Comparator;
    at org.springframework.context.annotation.AnnotationConfigUtils.registerAnnotationConfigProcessors(AnnotationConfigUtils.java:190)
    at org.springframework.context.annotation.ComponentScanBeanDefinitionParser.registerComponents(ComponentScanBeanDefinitionParser.java:150)
    at org.springframework.context.annotation.ComponentScanBeanDefinitionParser.parse(ComponentScanBeanDefinitionParser.java:86)
    at org.springframework.beans.factory.xml.NamespaceHandlerSupport.parse(NamespaceHandlerSupport.java:73)
```

首先需确认JVM中当前加载的缺失方法类，如上"org.springframework.beans.factory.support.DefaultListableBeanFactory"类到底来自哪个jar包，目前最高效的办法：

外部环境容器下，或者某些容器版本过低不支持Arthas在线诊断的情况下，可以通过在JVM启动参数中增加" -XX:+TraceClassLoading"，然后重新启动系统，在系统工程日志中即可看到JVM加载类的信息。从中即可找到JVM是从哪个jar包中加载的。

STEP2、在IDEA中(快捷键Ctrl+N)查找异常栈中提示缺失的类在哪些版本的jar包中有，如下图所示：

![image.png](https://ucc.alicdn.com/pic/developer-ecology/d65f372628fa46d5ae84c44a3235e3bb.png)

然后依次查看各版本jar包中冲突类的源码，工程中部分jar打包时附带了源码包可直接看到源码，不带源码的需要用IDEA插件(推荐jad)反编译一下。然后依次搜寻各个jar包中的冲突类，搜寻第一步是点击上图中某个版本类，在IDEA中查找类级次关系(快捷键Ctrl+H)，如下图所示：

![image.png](https://ucc.alicdn.com/pic/developer-ecology/e36f0b8236ec41778939ac94b2a0739a.png)

然后在冲突类及所有冲突类的父类源码中找到NoSuchMethodError异常信息中描述缺失的方法，以上例子中就是"getDependencyComparator()Ljava/util/Comparator"。

上例中通过搜寻可以发现spring-beans-3.2.1.RELEASE.jar，spring-2.5.6.SEC03.jar两个版本DefaultListableBeanFactory类及父类中没有"getDependencyComparator()Ljava/util/Comparator"方法，spring-beans-4.2.4.RELEASE.jar，spring-beans-4.3.5.RELEASE.jar两个版本DefaultListableBeanFactory类中有缺失的"getDependencyComparator()Ljava/util/Comparator"方法。

STEP3、查看应用部署机器上应用lib包目录下(一般是/home/admin/union-uc/target/${projectName}/lib或union-pub/target/${projectName}.war/WEB-INF/lib)下，找到相关jar包的版本，如上例中：

![image.png](https://ucc.alicdn.com/pic/developer-ecology/4190b7da8dec4785aa2bda98e625126f.png)

致此定位问题根本原因是应用启动时加载"org.springframework.beans.factory.support.DefaultListableBeanFactory"类未加载到运行时预期所需的spring-beans-4.3.5.RELEASE.jar版本，而是加载了spring-2.5.6.SEC03.jar导致。

按照以上流程步骤，基本99%的依赖冲突都可以定位到根本原因。定位到原因后如何解决冲突呢？事实上有些时候解决冲突远没有内网上很多帖子描述的"mvn dependency:tree"一下，排排jar那么简单。具体细节请继续看下一章节。

### 四 通过maven调整依赖jar解决依赖冲突

#### 1 升降级jar包解决依赖冲突

上一章节中的第一个例子中，最简单的情况，如果发生冲突的jar包高版本是完全兼容低版本功能的情况下，只需在pom中简单升级jar包版本即可。

但如果冲突 jar包高版本不兼容低版本，且应用依赖不是很复杂的情况下，可以分析升级冲突jar包后会对哪些业务有影响，具体做法推荐通过IDEA Maven Helper 插件查找冲突jar包有哪些业务依赖（此处不推荐"mvn dependency:tree"，目前本人见过的大部分Maven工程都有多个Module，比如*-dal,*-Service,*-Controller，这类工程结构如果module未单独打包上传Maven仓库，"mvn dependency:tree"是不能完整分析依赖关系的），记录下来。如下图所示：

![image.png](https://ucc.alicdn.com/pic/developer-ecology/aecaccb294414d55b4efcd85c09f9bf5.png)

然后升级冲突包，通过回归测试受到影响的二方库对应的业务点。

如果应用依赖非常复杂(例如冲突包有几十个二方库依赖，或者依赖冲突包的二方库是个基础包，业务系统中无法清晰枚举出使用受影响二方库的业务点)，这种情况下，如果要通过升级jar包解决依赖冲突，必须完整回归整个应用功能。笔者有几次因为回归不全面引发故障的惨痛经历，希望大家不要重蹈覆辙。通过这几次事例，笔者深刻理解到我们这个时代最伟大的计算机科学家Dijkstra大神“简单是可靠的先决条件”这句至理名言，深深的体会到如果一个系统复杂到你完全无法理清楚他错综复杂的依赖关系的时候，那说明你该重构你的系统了，否则系统维护将会逐步变成噩梦。

当然不是所有情况都可以通过升降级jar解决冲突，举个例子：

![image.png](https://ucc.alicdn.com/pic/developer-ecology/761a3cfd8539442784823d93084b09bd.png)

如上图假设应用系统同时依赖A.jar，B.jar，而A.jar，B.jar都依赖protobuf-java，系统运行时都会分别用到A.jar，B.jar中protobuf部分的功能，而且A.jar，B.jar依赖的protobuf版本无法通过升高降低版本调整到一致。由于protobuf-java3.0版本序列化协议，类内容各方面都不兼容protobuf-java2.0版本。这种情况无论如何调整依赖都无法解决冲突的问题，要解决这种冲突，请继续往下看，第五第六章内容。

#### 2 排除jar包解决依赖冲突

上一章节中第二个例子，主要原因是容器启动时加载到的类不是预期spring-beans-4.3.5.RELEASE.jar中的类，而是spring-2.5.6.SEC03.jar包中的类，如果spring-2.5.6.SEC03.jar排除对业务无影响，可以通过排除spring-2.5.6.SEC03.jar来解决冲突。与上一节例子类似，可以通过IDEA Maven Helper 插件确定spring-2.5.6.SEC03.jar是由哪个jar间接依赖进来的，判断业务的影响范围，此处不在赘述。与上一节一样，类似的情况不一定都可以用排除jar解决。

### 五 通过pandora自定义插件解决依赖冲突

第四章中有讲到，如果一个应用中要同时运行两个不兼容版本的jar包，是无法通过Maven调整依赖关系解决的。第二章讲解依赖冲突原理时有提到，Pandora通过类隔离机制实现了集团各个中间件之间的隔离，Pandroa同时也支持业务方按规范创建一个可以运行在Pandora容器中的插件，容器帮业务方实现加载隔离。

联盟一淘团队就将类似IC、卡券这种核武器级存在的二方包根据自己业务的需要进行裁剪包装后，制作成Pandora插件来避免依赖冲突，取得了很好的效果。

用Pandora插件确实能在不对应用做很大调整，不影响性能的情况下完美解决依赖冲突问题。

但也有一些问题就不太适合用局部方法解决了，比如：

当维护的应用依赖过于复杂，每个应用依赖外部三四十个二方库时。这种重量级应用就会严重影响生产效率。

![image.png](https://ucc.alicdn.com/pic/developer-ecology/dab0886ec1994e5aa75c8ee8cef8715d.png)

如上图所示，早期本人负责联盟用户平台时，就遇到两个巨无霸应用，adv(6w+代码)、pub(12w+代码)。

一方面因为依赖多，基本每周都会遇到集团各种升级，安全问题，各种小修小补，不断的上线。一方面业务发布需求也较多。

导致需要频繁发布，比如有一年个人就发布了566次。此时庞大的依赖导致部署效率，影响评估回归都会很难，此时就不应该从局部解决冲突这种视角去看，应该考虑优化应用架构，进行依赖治理，尽量避免冲突。

### 六 通过依赖架构治理解决依赖冲突

#### 1通过依赖管理解决依赖冲突

统一依赖的版本，使用bom来进行统一依赖版本管理。

#### 2 复杂依赖标准化、简化治理

首先，依赖本身就是一种复杂的业务。大部分依赖背后都有较深的业务领域知识 或者 技术领域知识。

比如我们查询搜索。

业务领域知识方面，光销量就有交易成交笔数，成交件数，搜索销量【有些订单不计入搜索销量】等。

技术领域知识方面，主搜索，联盟广告搜索引擎有时是配合使用的，比如商家未入驻广告前给商家展示货品信息就需要查主搜索，而入驻后投放下行时则需要用广告引擎。不同引擎的调用方法，结果都不一样。

如下图所示，如果我们每个业务应用都各自实现，那么各应用开发同学就要消化大量搜索客户端相关的业务、技术领域知识。成本是很高的。

![image.png](https://ucc.alicdn.com/pic/developer-ecology/6e51095aa39f4bb1878bb58a3f1b0a94.png)

面对这种情况，如果我们将这类复杂的依赖，由专人owner进行统一包装标准化【专人干专事】，会大大提升组织协同效率。如下图所示。

![image.png](https://ucc.alicdn.com/pic/developer-ecology/1f6241de85a74ac0aea997fbb930b009.png)

我们通过对主搜索，联盟引擎的统一封装。对检索条件，返回结果的标准化封装。大大降低了同学们的接入成本，以往要熟悉一个引擎的接入大概要2天，用标准化封装后的wrapper，在专人，规范文档的指导下仅0.5天就可以，大大提升效率。

#### 3 重量级依赖代理服务化

第五节中有讲到，应用依赖的jar包过多会导致应用启动很慢，因此如果一个依赖引入jar包超过30个以上时，务必要警惕，这种依赖引入几个，就会逐步导致你工作效率大大下降。比如IC，TP，优惠中心的二方包就是典型的例子。

目前我们针对这类依赖，是直接封装一个标准代理服务，避免应用被这种巨无霸二方包拖慢。

![image.png](https://ucc.alicdn.com/pic/developer-ecology/724ab90349904dca855e6c97ab96cc0f.png)

经过以上综合治理手段，取得了很好的效果。目前联盟很少再需要大家去解决冲突问题。

![image.png](https://ucc.alicdn.com/pic/developer-ecology/812dae66149240d4813cc1c2551f812a.png)

参考链接：
INode讲解：http://www.cnblogs.com/itech/archive/2012/05/15/2502284.html