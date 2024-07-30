# spring面试

## Spring系列之父子容器详解

[Spring系列之父子容器详解 - 掘金](https://juejin.cn/post/7094425000450949150)

tomcat也有容器的概念，java也有类继承的概念

## Spring中有哪些方式可以把Bean注入到IOC容器

7种

- 使用xml的方式来声明Bean的定义，Spring容器在启动的时候会加载并解析这个xml，把bean装载到IOC容器中。
- 使用@CompontScan注解来扫描声明了@Controller、@Service、@Repository、@Component注解的类。
- 使用@Configuration注解声明配置类，并使用@Bean注解实现Bean的定义，这种方式其实是xml配置方式的一种演变，是Spring迈入到无配置化时代的里程碑。
- 使用@Import注解，导入配置类或者普通的Bean
- 使用FactoryBean工厂bean，动态构建一个Bean实例，Spring Cloud OpenFeign里面的动态代理实例就是使用FactoryBean来实现的。
- 实现ImportBeanDefinitionRegistrar接口，可以动态注入Bean实例。这个在Spring Boot里面的启动注解有用到。
- 实现ImportSelector接口，动态批量注入配置类或者Bean对象，这个在Spring Boot里面的自动装配机制里面有用到。
