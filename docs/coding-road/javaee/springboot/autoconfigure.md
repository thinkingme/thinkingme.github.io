# springboot自动装配原理

## 照谈-官方spring-boot-starter和自定义starter异同分析

## 1、看看官方starter的jar里面都有啥

之前使用starter的时候，都是用了就完事了，这次发邮件的时候，好奇心上来了，点开了spring-boot-starter-mail的jar包内容，发现竟然只有一个MANIFEST.MF文件，没有class文件，没有配置文件，非常的简单。

![](https://pic4.zhimg.com/v2-112134441bfab43739fd61bc60eee8fb_b.jpg)

我们看下这个MANIFEST.MF里面都有些啥

```text
Manifest-Version: 1.0
Implementation-Title: Spring Boot Mail Starter
Automatic-Module-Name: spring.boot.starter.mail
Implementation-Version: 2.1.8.RELEASE
Built-By: Spring
Build-Jdk-Spec: 1.8
Created-By: Maven Archiver 3.4.0
```

这个也非常的普通，比平平无奇的古天乐还要平平无奇，这不科学啊。如果只凭这个文件就能发邮件，那我早就靠收藏写真图片娶到新垣结衣了。肯定代码在别的地方，在找代码前，我们先动手自己制作一个starter。

## 2、突然要开始自己写个starter

自己写个starter也很简单，我们先从[https://start.spring.io/](https://link.zhihu.com/?target=https%3A//start.spring.io/)下载一个基本的项目结构下来，然后需要修改几个地方。

首先是pom文件要修改，我的pom文件是这样的

```text
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.skyblue</groupId>
    <artifactId>mystarter-spring-boot-starter</artifactId>
    <version>1.0</version>
    <name>mystarter</name>
    <description>spring boot starter demo</description>

    <properties>
        <java.version>1.8</java.version>
    </properties>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>2.1.9.RELEASE</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <dependencies>
        <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-autoconfigure</artifactId>
        <scope>compile</scope>
    </dependency>

    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>1.18.6</version>
        <optional>true</optional>
        <scope>provided</scope>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>

    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
```

比起原始的pom.xml，改动了这么几个地方。

```text
<artifactId>mystarter-spring-boot-starter</artifactId>
```

spring 官方的推荐写artifactId的方法是这样

- 官方命名格式为： spring-boot-starter-{name}
- 非官方建议命名格式：{name}-spring-boot-starter

所以，官方用来发mail的starter是spring-boot-starter-mail，我这边用的就是mystarter-spring-boot-starter。

原始pom.xml会有这一段，是需要去掉的，否则打包的时候自己写的类加不进去，jar里面都是spring boot的类

```text
<parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.1.9.RELEASE</version>
        <relativePath /> <!-- lookup parent from repository -->
</parent>
```

另外需要加至少两个依赖进去

```text
<dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>2.1.9.RELEASE</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-autoconfigure</artifactId>
            <scope>compile</scope>
        </dependency>
    </dependencies>
```

其实把两个依赖都放在<dependencies>节点里面也行，<dependencyManagement>和<dependencies>的区别请自行搜索。

pom.xml改好了后我们需要为自己的starter写class啦，我们这边为了演示，就只实现打印两个值的功能，看代码

```text
public interface MyStarterService {
    String getMessage();
    Integer getCode();
}

public class MyStarterServiceImpl implements MyStarterService{
    @Autowired
    private MyStarterProperties myStarterProperties;
    public String getMessage() {
        return myStarterProperties.getMessage();
    }

    public Integer getCode() {
        return myStarterProperties.getCode();
    }
}
```

这个接口和实现类就是简单的返回属性值而已，属性值的配置文件是这样的

```text
@ConfigurationProperties(prefix = "mystarter")
public class MyStarterProperties {
    String message;
    int code;
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public int getCode() {
        return code;
    }
    public void setCode(int code) {
        this.code = code;
    }
}
```

@ConfigurationProperties注解表示MyStarterProperties 里面的参数message和code都会从配置文件里面读取，prefix = "mystarter"表示配置文件里面参数名称是有前缀的，前缀就是mystarter。举个具体的例子，比如我们之前发邮件的参数也是配置在application.properties，参数的内容是这样的

```text
spring.mail.host=smtp.163.com
spring.mail.port=25
spring.mail.username=youname@163.com
spring.mail.password=yourpassword
```

里面host,port,username,password就是参数的名称，spring.mail就是前缀。

上面这些写好了相当于业务功能部分，现在需要把业务功能申明到spring-boot-starter体系里面去，需要靠下面这个类

```text
@Configuration
//告诉spring容器配置文件读取用MyStarterProperties.class
@EnableConfigurationProperties({MyStarterProperties.class})
//导入业务组件MyStarterServiceImpl
@Import(MyStarterServiceImpl.class)
public class MyStarterAutoConfiguration {
}
```

我用的是最简单的方式，其实spring boot还提供了@Conditional 系列注解实现更加精确的配置加载Bean的条件，这里就不详述了。

最后，我们需要告诉spring boot在哪里去找到这个MyStarterAutoConfiguration ，在resources/META-INF下面建一个spring.factories文件

![](https://pic3.zhimg.com/v2-2dec37dd366b5c991253db026840d666_b.jpg)

内容也很简单，就一句而已

```text
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
com.skyblue.mystarter.MyStarterAutoConfiguration
```

这样，其实一个自定义的starter就完成了，用mvn install就可以直接生成一个starter了。

## 3、回头看spring-boot-starter-mail真正的实现代码

在给starter取名字的时候说了，官方命名格式是有固定格式的。其实官方的便利可不在名字上，而是代码都包含在spring boot的jar里面，我们引入spring boot的依赖时，会自动加载spring-boot-autoconfigure.xxx.jar，打开这个jar，就可以看到mail的真正代码了

![](https://pic3.zhimg.com/v2-3c9f2cce044ba103af17d0150d8946e6_b.jpg)

有没有一种很熟悉的感觉，MailProperties和上面的MyStarterProperties，MailSenderAutoConfiguration和上面的MyStarterAutoConfiguration，显然都是一样按照spring boot starter的规则写的，只是这个官方starter的代码不放在starter的jar包，而是包装到了spring-boot-autoconfigure的jar里面，我们看下MailSenderAutoConfiguration的源代码，可以看到它就用到了@Configuration、@EnableConfigurationProperties、[@Import](https://link.zhihu.com/?target=https%3A//my.oschina.net/u/3201731)，还用到了我们没用到的@Conditional注解

```ja
@Configuration
@ConditionalOnClass({ MimeMessage.class, MimeType.class, MailSender.class })
@ConditionalOnMissingBean(MailSender.class)
@Conditional(MailSenderCondition.class)
@EnableConfigurationProperties(MailProperties.class)
@Import({ MailSenderJndiConfiguration.class, MailSenderPropertiesConfiguration.class })
public class MailSenderAutoConfiguration {

    /**
     * Condition to trigger the creation of a {@link MailSender}. This kicks in if either
     * the host or jndi name property is set.
     */
    static class MailSenderCondition extends AnyNestedCondition {

        MailSenderCondition() {
            super(ConfigurationPhase.PARSE_CONFIGURATION);
        }

        @ConditionalOnProperty(prefix = "spring.mail", name = "host")
        static class HostProperty {

        }

        @ConditionalOnProperty(prefix = "spring.mail", name = "jndi-name")
        static class JndiNameProperty {

        }

    }

}
```

还有一个spring.factories文件，也可以在spring-boot-autoconfigure.jar里面找到

![](https://pic2.zhimg.com/v2-4830d991d9a137e6f1e4b6e9be86df49_b.jpg)

在里面，我们可以看到完整的spring boot官方starter的AutoConfiguration类列表

```text
# Auto Configure
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
org.springframework.boot.autoconfigure.admin.SpringApplicationAdminJmxAutoConfiguration,\
org.springframework.boot.autoconfigure.aop.AopAutoConfiguration,\
org.springframework.boot.autoconfigure.amqp.RabbitAutoConfiguration,\
org.springframework.boot.autoconfigure.batch.BatchAutoConfiguration,\
org.springframework.boot.autoconfigure.cache.CacheAutoConfiguration,\
org.springframework.boot.autoconfigure.cassandra.CassandraAutoConfiguration,\
org.springframework.boot.autoconfigure.cloud.CloudServiceConnectorsAutoConfiguration,\
......
```

我这边就不全列出来了，大家根据这个去找需要的官方starter就比较方便了。

## 4、猛回头我们调用下我们的自定义starter

我们另外用[https://start.spring.io/](https://link.zhihu.com/?target=https%3A//start.spring.io/)再创建一个项目，然后在pom.xml里面加载starter的依赖

```text
<dependency>
            <groupId>com.skyblue</groupId>
            <artifactId>mystart</artifactId>
            <version>1.0</version>
            <type>jar</type>
            <scope>system</scope>
            <systemPath>D:\\workspace\\mystart\\target\\mystarter-spring-boot-starter-1.0.jar</systemPath>
        </dependency>
```

我为了图方便，就直接用pom.xml调用了本地打包的starter包，如果有maven的私服，就可以正常引入。配置application.properties文件

```text
mystarter.message=hello world!
mystarter.code=42
```

写一个调用starter的类

```text
@Service
public class TestService {

    @Resource
    private MyStarterService myStarterService;

    public void message() {
        System.out.println("code:" + myStarterService.getCode());
        System.out.println("message:" + myStarterService.getMessage());
    }
}
```

启动spring boot 查看结果

```text
@SpringBootApplication
public class StartdemoApplication {

    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(StartdemoApplication.class, args);
        ((TestService)context.getBean("testService")).message();
    }

}
```

console可以看到打印出来的message和code

```text
.   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::        (v2.1.9.RELEASE)

2019-10-10 22:13:49.521  INFO 21952 --- [           main] c.w.startdemo.StartdemoApplication       : Starting StartdemoApplication on skyblue with PID 21952 (C:\My%20Space\Soft%20Project\Hui%20Ge\startdemo\target\classes started by wphmo in C:\My%20Space\Soft%20Project\Hui%20Ge\startdemo)
2019-10-10 22:13:49.527  INFO 21952 --- [           main] c.w.startdemo.StartdemoApplication       : No active profile set, falling back to default profiles: default
2019-10-10 22:13:50.405  INFO 21952 --- [           main] c.w.startdemo.StartdemoApplication       : Started StartdemoApplication in 1.353 seconds (JVM running for 1.983)
code:42
message:hello world!
```

这样，一个完整的自定义starter就运行成功了。
