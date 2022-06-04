# Gradle 聚合模块配置

[Yiyuery](https://blog.51cto.com/u_15263565)2021-06-11 13:49:10© 著作权

> 熟悉`maven`的同学肯定搭建过基于`<parent>`标签配置的子父级依赖项目。今天，我来介绍下如何利用 gradle 构建一个子父级嵌套的项目，避免多个相似子级项目中出现重复模块依赖配置、重复代码。

> 做什么？

- 解决 Gradle 根模块下配置所有子模块的依赖和版本配置
- 解决 Gradle 快速构建模块间互相依赖的问题
- 解决 Gradle 模块管理中的聚合模块的配置方式
- 解决 Gradle 配置项目多模块嵌套的项目配置
- 解决多模块之间依赖和功能分层处理方式
- 避免日常代码学习和项目搭建中重复造轮子的行为

## 准备工作

> 先看下后期搭建完后实现的项目树结构

```html
> Task :spring-security-sso:spring-security-resources:printTree +---
ishare-project | -- common-dependencies | +---- common-dependency | \----
common-template | -- spring-security-sso | +---- spring-security-auth | \----
spring-security-resources 1.2.3.4.5.6.7.8.
```

编写了一个脚本程序，把项目的结构树打印了出来。其中，

- `ishare-project`为整个工程的根目录；
- `common-dependencies`为整个工程的基础依赖模块
- `common-dependency`、`common-template`为基础大模块下的多个个基础模块，该基础模块的一些公共配置可以放在`common-dependencies`进行配置
- `spring-security-sso`为开发的应用模块，此处可以看成是一个大的模块，该模块下面可以细分更多的小模块
- `spring-security-auth`、`spring-security-resources`为第三层级的模块，主要通过依赖`spring-security-sso`的依赖配置来完成依赖配置的简化

### 根目录配置

> 开始搭建根目录模块

- `build.gradle` 全局项目插件和依赖管理

```java
configure(allprojects) { project ->
    group = 'com.example'
    version = '0.0.1-SNAPSHOT'

    apply from: "${rootDir}/dependency.gradle"

    apply plugin: 'maven'

    ext.gradleScriptDir = "${rootProject.projectDir}/gradle"

    apply from: "${gradleScriptDir}/task.gradle"
}

def holderProjects = Arrays.asList('spring-security-sso', 'common-dependencies')

configure(subprojects) { subproject ->
    //此处主要为了过滤容器模块中的插件配置，容器模块的主要用来管理下属部分的模块，无需添加依赖和插件
    if (!holderProjects.contains(subproject.name)) {
        apply plugin: 'java'

        sourceCompatibility = 1.8
        targetCompatibility = 1.8

        [compileJava, compileTestJava, javadoc]*.options*.encoding = 'UTF-8'

        apply from: "${rootDir}/dependency.gradle"

        repositories {
            maven { url = 'https://maven.aliyun.com/repository/jcenter' }
            maven { url = 'https://oss.sonatype.org/content/repositories/snapshots/' }
            maven { url = "https://plugins.gradle.org/m2/" }
            jcenter()
        }

        dependencies {
            implementation libs['commons-lang3']
            //lombok
            annotationProcessor libs['lombok']
            compileOnly libs['lombok']
            testAnnotationProcessor libs['lombok']
            testCompileOnly libs['lombok']

            testImplementation libs['junit']
        }
    }
}

1.2.3.4.5.6.7.8.9.10.11.12.13.14.15.16.17.18.19.20.21.22.23.24.25.26.27.28.29.30.31.32.33.34.35.36.37.38.39.40.41.42.43.44.45.46.
```

此处主要为了过滤容器模块中的插件配置，容器模块的主要用来管理下属部分的模块，无需添加依赖和插件
`spring-security-sso`、`common-dependencies`都是容器模块

- `dependency.gradle` 全局依赖和设计版本的常量定义

```java
// when add a new dependency, gradle not download that package
// just when module build.gradle use this dependency, then download and build project
ext {
    ver = [
            utils  : [
                    guava               : "26.0-jre",
                    lombok              : "1.18.2",
                    common_lang3        : "3.8",
                    commons_io          : "2.4",
                    commons_collections4: "4.2",
                    fastjson            : "1.2.47",
                    junit               : "4.12",
                    joda_time           : "2.10",
                    groovy_all          : "2.4.13"

            ],
            swagger: [
                    swagger2markup     : "1.3.3",
                    swagger_annotations: "1.5.22"
            ],
            spring : [
                    boot               : "2.1.0.RELEASE",
                    spring_version     : "5.1.2.RELEASE",
                    spring_jdbc_version: "4.3.18.RELEASE"
            ],
            cloud  : [
                    spring_cloud_start_alibaba_nacos_config: "0.2.1.RELEASE"
            ],
            nacos  : [
                    nacos_config_spring_boot_starter: "0.2.1"
            ],
            common : [
                    //数据库
                    postgresql                 : "42.2.5",
                    mysql                      : '8.0.13',
                    durid                      : '1.1.14',

                    mybatis_plus_boot_starter  : "3.0.6",
                    mybatis                    : "3.4.6",
                    mybatis_generator          : "1.3.7",
                    mapper                     : "4.1.2",
                    mybatis_spring_boot_starter: "1.3.2",

                    velocity_engine_core       : "2.0",
                    freemarker                 : "2.3.28",

                    pagehelper                 : "5.1.8",

                    //日志
                    slf4j_version              : "1.7.25",
                    logback_version            : "1.2.3"
            ]
    ]
    libs = [
            //UTILS
            "lombok"                                   : "org.projectlombok:lombok:$ver.utils.lombok",
            "commons-lang3"                            : "org.apache.commons:commons-lang3:$ver.utils.common_lang3",
            "commons-io"                               : "commons-io:commons-io:$ver.utils.commons_io",
            "commons-collections4"                     : "org.apache.commons:commons-collections4:$ver.utils.commons_collections4",
            "guava"                                    : "com.google.guava:guava:$ver.utils.guava",
            "fastjson"                                 : "com.alibaba:fastjson:$ver.utils.fastjson",
            "joda-time"                                : "joda-time:joda-time:$ver.utils.joda_time",
            "groovy-all"                               : "org.codehaus.groovy:groovy-all:$ver.utils.groovy_all",

            //TEST
            "junit"                                    : "junit:junit:$ver.utils.junit",

            //SPRING-BOOT
            "spring-boot-gradle-plugin"                : "org.springframework.boot:spring-boot-gradle-plugin:$ver.spring.boot",
            "jdbc"                                     : "org.springframework.boot:spring-boot-starter-jdbc:$ver.spring.boot",
            "spring-security-oauth2" : "org.springframework.security.oauth:spring-security-oauth2:$ver.spring.boot",

            //SPRING
            "spring-context"                           : "org.springframework:spring-context:$ver.spring.spring_version",
            "spring-web"                               : "org.springframework:spring-web:$ver.spring.spring_version",
            "spring-jdbc"                              : "org.springframework:spring-jdbc:$ver.spring.spring_jdbc_version",

            //DB
            "postgresql"                               : "org.postgresql:postgresql:$ver.common.postgresql",
            "mysql-connector-java"                     : "mysql:mysql-connector-java:$ver.common.mysql",
            "druid"                                    : "com.alibaba:druid:$ver.common.druid",

            // MYBATIS 核心库
            "mybatis-plus-boot-starter"                : "com.baomidou:mybatis-plus-boot-starter:$ver.common.mybatis_plus_boot_starter",
            "mybatis-plus"                             : "com.baomidou:mybatis-plus:$ver.common.mybatis_plus",
            "mybatis-plus-generator"                   : "com.baomidou:mybatis-plus-generator:$ver.common.mybatis_plus",
            "mybatis"                                  : "org.mybatis:mybatis:$ver.common.mybatis",
            "mybatis-generator-core"                   : "org.mybatis.generator:mybatis-generator-core:$ver.common.mybatis_generator",
            "mapper"                                   : "tk.mybatis:mapper:$ver.common.mapper",
            "mybatis-spring-boot-starter"              : "org.mybatis.spring.boot:mybatis-spring-boot-starter:$ver.common.mybatis_spring_boot_starter",

            //模板引擎，需要指定 mpg.setTemplateEngine(new FreemarkerTemplateEngine());
            "freemarker"                               : "org.freemarker:freemarker:$ver.common.freemarker",
            "velocity-engine-core"                     : "org.apache.velocity:velocity-engine-core:$ver.common.velocity_engine_core",

            "pagehelper"                               : "com.github.pagehelper:pagehelper:$ver.common.pagehelper",

            //LOG
            "slf4j-api"                                : "org.slf4j:slf4j-api:$ver.common.slf4j_version",
            "log4j-over-slf4j"                         : "org.slf4j:log4j-over-slf4j:$ver.common.slf4j_version",
            "jcl-over-slf4j"                           : "org.slf4j:jcl-over-slf4j:$ver.common.slf4j_version",
            "jul-to-slf4j"                             : "org.slf4j:jul-to-slf4j:$ver.common.slf4j_version",
            "logback-classic"                          : "ch.qos.logback:logback-classic:$ver.common.logback_version",
            "logback-core"                             : "ch.qos.logback:logback-core:$ver.common.logback_version",

            //SWAGGER
            "swagger2markup"                           : "io.github.swagger2markup:swagger2markup:$ver.swagger.swagger2markup",

            //热部署
            "spring-boot-devtools"                     : "org.springframework.boot:spring-boot-devtools:$ver.spring.boot",

            //Spring Cloud
            "spring-cloud-starter-alibaba-nacos-config": "org.springframework.cloud:spring-cloud-starter-alibaba-nacos-config:$ver.cloud.spring_cloud_start_alibaba_nacos_config",

            //Nacos
            "nacos-config-spring-boot-starter"         : "com.alibaba.boot:nacos-config-spring-boot-starter:$ver.nacos.nacos_config_spring_boot_starter",
            "nacos-config-spring-boot-actuator"        : "com.alibaba.boot:nacos-config-spring-boot-actuator:$ver.nacos.nacos_config_spring_boot_starter",

            //Swagger
            "swagger-annotations"                      : "io.swagger:swagger-annotations:$ver.swagger.swagger_annotations"

    ]
}
```

- 根目录模块配置`settings.gradle`,此文件只需要存在在根目录中，其余子模块不需要此配置文件

```java
if ( !JavaVersion.current().java8Compatible ) {
    throw new GradleException( "Gradle must be run with Java 8" )
}

include ':common-dependencies:common-dependency'
include ':common-dependencies:common-template'

include ':spring-security-sso:spring-security-auth'
include ':spring-security-sso:spring-security-resources'

/**
 * 递归检查build.gradle文件是否根据模块名生成
 * @param dirs
 * @return
 */
def assertProjectBuildFile(Set<ProjectDescriptor> dirs){
    if(dirs.size()>0){
        dirs.each { project ->
            project.buildFileName = "${project.name}.gradle"
            assert project.projectDir.isDirectory()
            assert project.buildFile.exists()
            assert project.buildFile.isFile()
        }
        if(dirs.children.size()>0){
            dirs.children.each {project->
                assertProjectBuildFile(project)
            }
        }
    }
}

assertProjectBuildFile(rootProject.children)


```

配置文件中的`assertProjectBuildFile`函数主要为了检查模块下是否含有对应模块名的 gradle 配置文件，
在编译的时候可以选择指定编译模块，以每个子模块为最小配置单元，注释掉对应模块的 include…即可,例如

```html
//include ':common-dependencies:common-template' 1.
```

这样，可以加速主要模块的构建和编译速度

### 容器模块和子模块配置

> 配置全局基础依赖模块单元`common-dependency`

- `common-dependency.gradle`

```java
dependencies {
    /** 开源的Java工具库*/
    compile libs["guava"]
    compile libs["commons-lang3"]
    compile libs["commons-collections4"]
    compile libs["fastjson"]
    compile libs["joda-time"]
    compile libs["guava"]
    compile libs["commons-io"]

    /*分页和mapper插件*/
    compile libs["pagehelper"]
    compile libs["mapper"]

    //mybatis核心库
    compile libs["mybatis"]

    /**数据库驱动*/
    compile libs["postgresql"]
    compile libs["mysql-connector-java"]

    compile libs["spring-context"]
    compile libs["spring-web"]
    compile libs["spring-jdbc"]

    compile libs["slf4j-api"]
    compile libs["log4j-over-slf4j"]
    compile libs["jcl-over-slf4j"]
    compile libs["jul-to-slf4j"]
    compile libs["logback-classic"]
    compile libs["logback-core"]

    compile group: 'io.swagger', name: 'swagger-annotations', version: '1.5.22'
    compile group: 'com.alibaba', name: 'druid', version: '1.1.14'

    testCompile libs["junit"]
}


```

![[Gradle] Gradle 聚合模块配置_聚合模块](https://s5.51cto.com/images/blog/202106/09/d46acf21e10c6d81fd5ef52461278fe4.png?x-oss-process=image/watermark,size_16,text_QDUxQ1RP5Y2a5a6i,color_FFFFFF,t_30,g_se,x_10,y_10,shadow_20,type_ZmFuZ3poZW5naGVpdGk=)

- `common-template.gradle`

容器模块下子模块间互相依赖配置方式如下

```html
dependencies { compile project(':common-dependencies:common-dependency') }
```

一般我们在开发项目的时候为了测试往往会写个`Hello World`的请求测试地址或页面，在`common-template`子模块中我便定义了这样的一个接口，一些注解或是类的依赖通过引入`common-dependency`基础依赖来实现

```java
/*
 * @ProjectName: 编程学习
 * @Copyright:   2019 HangZhou xiazhaoyang Dev, Ltd. All Right Reserved.
 * @address:     http://xiazhaoyang.tech
 * @date:        2019/3/26 06:59
 * @email:       xiazhaoyang@live.com
 * @description: 本内容仅限于编程技术学习使用，转发请注明出处.
 */
package com.example.template;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * <p>
 *
 * </p>
 *
 * @author xiazhaoyang
 * @version v1.0.0
 * @date 2019/3/26 06:59
 * @modificationHistory=========================逻辑或功能性重大变更记录
 * @modify By: {修改人} 2019/3/26
 * @modify reason: {方法名}:{原因}
 * ...
 */
@RestController
@RequestMapping("/template")
public class HelloController {

    @GetMapping("/hello")
    public String hello(){
        return "common-template request to `/template/hello`:" +
                new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date())+"\n";
    }
}

```

特别需要注意的是：`common-dependencies`作为容器模块，基础项目依赖我已经在根目录中定义过了，所以并未定义对应的脚本或是函数，所以`common-dependencies.gradle`中是空的。
这样做的原因是，如果是一些构建任务脚本，我在根目录下新建了一个 gradle 文件夹，里面放置了很多我需要执行的`xxx.gradle`构建任务脚本，这是为了脚本的统一管理，这样做对代码复用和脚本管理是很有帮助的。例外，项目模块的基础依赖的定义，一个根目录下的`build.gradle`已经够用了,没有必要在每个容器模块中定义子模块的依赖了。要不然，`common-dependencies`的配置就显得很多余了。而且我的初衷就是通过`common-dependencies`下定义不同类型项目需要的项目依赖。

然后在根目录的`build.gradle`文件中定义一些基础构建规则和模块依赖

### 基础模块的使用

> 前文说了配置了基础依赖的模块和含有测试模板的模块，那么，如何引入并使用它们呢？

```
spring-security-resources.gradle
buildscript {
    repositories {
        maven { url = "https://plugins.gradle.org/m2/" }
        maven { url = "http://maven.aliyun.com/nexus/content/groups/public/" }
        jcenter()
    }
    dependencies {
        classpath libs["spring-boot-gradle-plugin"]
    }
}

apply plugin: "io.spring.dependency-management"
apply plugin: "org.springframework.boot"

bootJar {
    baseName = 'spring-security-resources'
    version =  '1.0.0'
}

dependencies {
    compile project(':common-dependencies:common-template')
    implementation 'org.springframework.boot:spring-boot-starter-web'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}



```

此处是个 boot 项目，启动类配置下，因为我们引入了基础模块的依赖

```java
/*
 * @ProjectName: 编程学习
 * @Copyright:   2019 HangZhou xiazhaoyang Dev, Ltd. All Right Reserved.
 * @address:     http://xiazhaoyang.tech
 * @date:        2019/5/13 22:59
 * @email:       xiazhaoyang@live.com
 * @description: 本内容仅限于编程技术学习使用，转发请注明出处.
 */
package com.example.res;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/**
 * <p>
 *
 * </p>
 *
 * @author xiazhaoyang
 * @version v1.0.0
 * @date 2019/5/13 22:59
 * @modificationHistory=========================逻辑或功能性重大变更记录
 * @modify By: {修改人} 2019/5/13
 * @modify reason: {方法名}:{原因}
 * ...
 */
@SpringBootApplication
@ComponentScan(basePackages = {"com.example"})
public class SpringSecurityResourceApp {
    public static void main(String[] args) {
        SpringApplication.run(SpringSecurityResourceApp.class, args);
    }
}

1.2.3.4.5.6.7.8.9.10.11.12.13.14.15.16.17.18.19.20.21.22.23.24.25.26.27.28.29.30.31.32.33.34.
server:
  port: 8080
  servlet:
    context-path: /spring-security-resources

```

以 jar 方式启动后，请求`http://localhost:8080/spring-security-resources/template/hello`

![[Gradle] Gradle 聚合模块配置_Gradle_02](https://s7.51cto.com/images/blog/202106/09/1cc3215614ec4d8963dd8e27d44cff55.png?x-oss-process=image/watermark,size_16,text_QDUxQ1RP5Y2a5a6i,color_FFFFFF,t_30,g_se,x_10,y_10,shadow_20,type_ZmFuZ3poZW5naGVpdGk=)

如此一来，对于项目模块中常用的一些测试模块和工具类，我们就可以很轻松的管理起来了，每次搭建项目也不用重复写一次啦。。。。相较于`Maven`的方式，个人感觉是简化了很多很多，尤其是脚本函数的定义，可以使用 java 的语法轻松应对，上手很简单。

> 最后分享下我的 gradle 文件夹（脚本管理）中项目树的打印脚本

```java
/**
 * 自动根据层级深度生成占位符
 * @param level
 * @return
 */
static def generatorTreeNodePrefix(int level, String startStr) {
    def s = '|   '
    for (int i = 0; i < level; i++) {
        s += ((0 == i) && level != 1 ? startStr : '--')
    }
    return s+' '
}
/**
 * 打印工程目录树
 * @param dirs
 * @return
 */
def printProjectTree(Map<String, Project> dirs) {
    if (dirs.size() > 0) {
        def len = dirs.values().size()
        def index = 0
        dirs.values().each { e ->
            def startStr = (index++ + 1 == len) ? '\\--' : '+--'
            println generatorTreeNodePrefix(e.depth, startStr) + e.name
            if (e.childProjects.values().size() > 0) {
                printProjectTree(e.childProjects)
            }
        }
    }
}

task printTree << {
    println '+--- ' + rootProject.name
    printProjectTree(rootProject.childProjects)
}

```

Tips`: 引入任务脚本的方式在文章开头的根目录配置文件中哦！ `

apply from: "${gradleScriptDir}/task.gradle"

## REFRENCES

- [ Gradle（入门）- 云栖社区](https://yq.aliyun.com/articles/348530)
- [ Gradle 项目树 - CSDN](https://blog.csdn.net/woxueliuyun/article/details/54603184)
- [ java – 具有共享依赖项的多模块项目的 Gradle 配置](https://codeday.me/bug/20190105/504641.html)
- [ 你真的了解 Gradle 吗？](https://www.jianshu.com/p/e17cece5f80c)
- [ Gradle 初探（一）：创建一个 Gradle 项目](https://www.cnblogs.com/skzncer99/p/5315631.html)
- [ Gradle 学习系列之八——构建多个 Project - 无知者云](https://www.cnblogs.com/davenkin/p/gradle-learning-8.html)
