# spring框架代码原理

> 本文研究通过迷你spring配合官方源码理解，源码链接：[GitHub - DerekYRC/mini-spring: mini-spring是简化版的spring框架，能帮助你快速熟悉spring源码和掌握spring的核心原理。抽取了spring的核心逻辑，代码极度简化，保留spring的核心功能，如IoC和AOP、资源加载器、事件监听器、类型转换、容器扩展点、bean生命周期和作用域、应用上下文等核心功能。](https://github.com/DerekYRC/mini-spring/)

## 设计图

![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\spring-framework-code\2023-03-07-11-20-24-image.png)

理解大概后其实可以根据继承图，以及里面的字段就可以看出spring的整体设计 

下图就是注解式的上下文类继承图，其中在AnnotationConfigWebApplicationContext还会使用到AnnotatedBeanDefinitionReader并不是继承关系所以没体现出来。

<img src="file:///D:/workspace/coding-road/images/spring-framework-code/2023-03-09-11-33-06-image.png" title="" alt="" width="695">

## springbean生命周期

可以看看org.springframework.beans.factory.BeanFactory类的注释

Bean factory implementations should support the standard bean lifecycle interfaces as far as possible. The full set of initialization methods and their standard order is:

1. BeanNameAware's setBeanName

2. BeanClassLoaderAware's setBeanClassLoader

3. BeanFactoryAware's setBeanFactory

4. EnvironmentAware's setEnvironment

5. EmbeddedValueResolverAware's setEmbeddedValueResolver

6. ResourceLoaderAware's setResourceLoader (only applicable when running in an application context)

7. ApplicationEventPublisherAware's setApplicationEventPublisher (only applicable when running in an application context)

8. MessageSourceAware's setMessageSource (only applicable when running in an application context)

9. ApplicationContextAware's setApplicationContext (only applicable when running in an application context)

10. ServletContextAware's setServletContext (only applicable when running in a web application context)

11. postProcessBeforeInitialization methods of BeanPostProcessors
    InitializingBean's afterPropertiesSet

12. a custom init-method definition

13. postProcessAfterInitialization methods of BeanPostProcessors

On shutdown of a bean factory, the following lifecycle methods apply:

1. postProcessBeforeDestruction methods of DestructionAwareBeanPostProcessors

2. DisposableBean's destroy

3. a custom destroy-method definition

> 总结就是

创建时：

1. 各种xxxAware接口实现后会进行注入对应的内容

2. bean后置处理器类的postProcessBeforeInitialization实现方法执行

3. 

4. init-method

5. bean后置处理器类的postProcessAfterInitialization实现方法执行

销毁时：

1. DestructionAwareBeanPostProcessors的postProcessBeforeDestruction执行

2. bean销毁

3. destroy-method

然后我们看看具体的实现

直接上重点，org.springframework.context.support.AbstractApplicationContext类下面的refresh()方法，用于刷新spring容器上下文。

```java
public abstract class AbstractApplicationContext extends DefaultResourceLoader
        implements ConfigurableApplicationContext {

public void refresh() throws BeansException, IllegalStateException {
        synchronized (this.startupShutdownMonitor) {
            // Prepare this context for refreshing.
            prepareRefresh();

            // Tell the subclass to refresh the internal bean factory.
            ConfigurableListableBeanFactory beanFactory = obtainFreshBeanFactory();

            // Prepare the bean factory for use in this context.
            prepareBeanFactory(beanFactory);

            try {
                // Allows post-processing of the bean factory in context subclasses.
                postProcessBeanFactory(beanFactory);

                // Invoke factory processors registered as beans in the context.
                invokeBeanFactoryPostProcessors(beanFactory);

                // Register bean processors that intercept bean creation.
                registerBeanPostProcessors(beanFactory);

                // Initialize message source for this context.
                initMessageSource();

                // Initialize event multicaster for this context.
                initApplicationEventMulticaster();

                // Initialize other special beans in specific context subclasses.
                onRefresh();

                // Check for listener beans and register them.
                registerListeners();

                // Instantiate all remaining (non-lazy-init) singletons.
                finishBeanFactoryInitialization(beanFactory);

                // Last step: publish corresponding event.
                finishRefresh();
            }

            catch (BeansException ex) {
                if (logger.isWarnEnabled()) {
                    logger.warn("Exception encountered during context initialization - " +
                            "cancelling refresh attempt: " + ex);
                }

                // Destroy already created singletons to avoid dangling resources.
                destroyBeans();

                // Reset 'active' flag.
                cancelRefresh(ex);

                // Propagate exception to caller.
                throw ex;
            }

            finally {
                // Reset common introspection caches in Spring's core, since we
                // might not ever need metadata for singleton beans anymore...
                resetCommonCaches();
            }
        }

}

}
```

我来根据每个方法逐一分析一下。

## synchronized加锁

我们可以在spring ioc容器加入bean时看到spring做了一些加锁的处理

org.springframework.beans.factory.support.DefaultSingletonBeanRegistry

一开始想到，spring初始化bean是单线程的，为什么还需要加锁呢。

后来认为，spring中controller等类是会有多线程操作的，而如果我们设置bean为lazy也就是懒加载。那么在这些多线程操作的类中如果进行加载bean的操作的话，有可能会引发多线程的问题。

## prepare准备阶段

### preoareRefresh

```java
// Initialize any placeholder property sources in the context environment.
initPropertySources();
// Validate that all properties marked as required are resolvable:
// see ConfigurablePropertyResolver#setRequiredProperties
getEnvironment().validateRequiredProperties();
this.applicationListeners.addAll(this.earlyApplicationListeners);
```

initPropertySources初始化参数

getEnvironment().validateRequiredProperties()  验证必须的属性不为空

简单说就是new了一些对象。

### obtainFreshBeanFactory

这个方法调用下面这个方法，是一个抽象方法

我们看的是AbstractRefreshableApplicationContext中这个方法的实现

```java
public abstract class AbstractRefreshableApplicationContext extends AbstractApplicationContext {


//创建工厂存放的地方，可见工厂存在上下文中
private volatile DefaultListableBeanFactory beanFactory;

protected final void refreshBeanFactory() throws BeansException {
        if (hasBeanFactory()) {
            destroyBeans();
            closeBeanFactory();
        }
        try {//创建DefaultListableBeanFactory 
            DefaultListableBeanFactory beanFactory = createBeanFactory();
            beanFactory.setSerializationId(getId());
            customizeBeanFactory(beanFactory);
            loadBeanDefinitions(beanFactory);
            this.beanFactory = beanFactory;
        }
        catch (IOException ex) {
            throw new ApplicationContextException("I/O error parsing bean definition source for " + getDisplayName(), ex);
        }
    }

}
```

* createBeanFactory方法里面实现了父子工厂的创建，刚开始创建是作为父工厂，后面创建将变成子工厂

* customizeBeanFactory 设置是否允许覆盖bean和循环依赖

* loadBeanDefinitions ，文档解释Load bean definitions into the given bean factory, typically through delegating to one or more bean definition readers.意思就是将 Bean 定义加载到给定的 Bean 工厂中，通常是通过委派给一个或多个 Bean 定义读取器。实现由xml和注解等：AnnotatedBeanDefinitionReader、XmlBeanDefinitionReader。

loadBeanDefinitions时，当选择XmlBeanDefinitionReader是就会进入XmlWebApplicationContext，如下，在这个类中的loadBeanDefinitions会创建一个XmlBeanDefinitionRead并设置环境变量，资源加载器。其中资源加载器是他自己，可以看到默认读取配置文件的路径/WEB-INF/applicationContext.xml

```java
    public static final String DEFAULT_CONFIG_LOCATION = "/WEB-INF/applicationContext.xml";

    /** Default prefix for building a config location for a namespace. */
    public static final String DEFAULT_CONFIG_LOCATION_PREFIX = "/WEB-INF/";

    /** Default suffix for building a config location for a namespace. */
    public static final String DEFAULT_CONFIG_LOCATION_SUFFIX = ".xml";
    protected void loadBeanDefinitions(DefaultListableBeanFactory beanFactory) throws BeansException, IOException {
        // Create a new XmlBeanDefinitionReader for the given BeanFactory.
        XmlBeanDefinitionReader beanDefinitionReader = new XmlBeanDefinitionReader(beanFactory);

        // Configure the bean definition reader with this context's
        // resource loading environment.
        beanDefinitionReader.setEnvironment(getEnvironment());
        beanDefinitionReader.setResourceLoader(this);
        beanDefinitionReader.setEntityResolver(new ResourceEntityResolver(this));

        // Allow a subclass to provide custom initialization of the reader,
        // then proceed with actually loading the bean definitions.
        initBeanDefinitionReader(beanDefinitionReader);
        loadBeanDefinitions(beanDefinitionReader);
    }
```

### prepareBeanFactory

```java
//配置工厂的标准上下文特征，例如上下文的类加载器和后处理器
protected void prepareBeanFactory(ConfigurableListableBeanFactory beanFactory) {
        // Tell the internal bean factory to use the context's class loader etc.
        beanFactory.setBeanClassLoader(getClassLoader());
        //注册表达式解析（spel :#{})
        beanFactory.setBeanExpressionResolver(new StandardBeanExpressionResolver(beanFactory.getBeanClassLoader()));

        //注册占位符解析(${})
        beanFactory.addPropertyEditorRegistrar(new ResourceEditorRegistrar(this, getEnvironment()));

        // Configure the bean factory with context callbacks.
        //往bean工厂中添加后置处理器，增强bean，是否实现下面这些接口，用于获取对应的功能
        //EnvironmentAware（获取环境变量）
        //EmbeddedValueResolverAware
        //ResourceLoaderAware
        //ApplicationEventPublisherAware
        //MessageSourceAware
        //ApplicationContextAware
        beanFactory.addBeanPostProcessor(new ApplicationContextAwareProcessor(this));
        //下面是忽略掉这些bean的注入，因为添加了后置处理器注入，防止用注解又注入了
        beanFactory.ignoreDependencyInterface(EnvironmentAware.class);
        beanFactory.ignoreDependencyInterface(EmbeddedValueResolverAware.class);
        beanFactory.ignoreDependencyInterface(ResourceLoaderAware.class);
        beanFactory.ignoreDependencyInterface(ApplicationEventPublisherAware.class);
        beanFactory.ignoreDependencyInterface(MessageSourceAware.class);
        beanFactory.ignoreDependencyInterface(ApplicationContextAware.class);

        // BeanFactory interface not registered as resolvable type in a plain factory.
        // MessageSource registered (and found for autowiring) as a bean.
        beanFactory.registerResolvableDependency(BeanFactory.class, beanFactory);
        beanFactory.registerResolvableDependency(ResourceLoader.class, this);
        beanFactory.registerResolvableDependency(ApplicationEventPublisher.class, this);
        beanFactory.registerResolvableDependency(ApplicationContext.class, this);

        // Register early post-processor for detecting inner beans as ApplicationListeners.
        //添加后置处理器，用于检测bean是不是监听器，是的话注入监听器
        beanFactory.addBeanPostProcessor(new ApplicationListenerDetector(this));

        // Detect a LoadTimeWeaver and prepare for weaving, if found.
        //加载时切面（aspectJ）
        if (beanFactory.containsBean(LOAD_TIME_WEAVER_BEAN_NAME)) {
            beanFactory.addBeanPostProcessor(new LoadTimeWeaverAwareProcessor(beanFactory));
            // Set a temporary ClassLoader for type matching.
            beanFactory.setTempClassLoader(new ContextTypeMatchClassLoader(beanFactory.getBeanClassLoader()));
        }

        //注入环境变量。用于autowrie
        // Register default environment beans.
        if (!beanFactory.containsLocalBean(ENVIRONMENT_BEAN_NAME)) {
            beanFactory.registerSingleton(ENVIRONMENT_BEAN_NAME, getEnvironment());
        }
        if (!beanFactory.containsLocalBean(SYSTEM_PROPERTIES_BEAN_NAME)) {
            beanFactory.registerSingleton(SYSTEM_PROPERTIES_BEAN_NAME, getEnvironment().getSystemProperties());
        }
        if (!beanFactory.containsLocalBean(SYSTEM_ENVIRONMENT_BEAN_NAME)) {
            beanFactory.registerSingleton(SYSTEM_ENVIRONMENT_BEAN_NAME, getEnvironment().getSystemEnvironment());
        }
    }
```

## postProcessBeanFactory

可以看AnnotationConfigServletWebServerApplicationContext的postProcessBeanFactory方法

```java
protected void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) {
        super.postProcessBeanFactory(beanFactory);
        if (this.basePackages != null && this.basePackages.length > 0) {
            this.scanner.scan(this.basePackages);
        }
        if (!this.annotatedClasses.isEmpty()) {
            this.reader.register(ClassUtils.toClassArray(this.annotatedClasses));
        }
    }
```

可以看到开始扫描，所以重点就是扫描basePackages

所以这一步是扫描basePackages，获取bean定义信息。

## invokeBeanFactoryPostProcessors

BeanFactoryPostProcessors在SpringApplication的run 方法中在refreshContext之前  的prepareContext如果设置懒加载就会注入LazyInitializationBeanFactoryPostProcessor，设置所有的bean定义为懒加载

调用BeanFactoryPostProcessors，bean工厂的增强。这一步在加载完bean定义信息后但是还未实例化的时候调用，目的是为了自定义bean实例化之类的。

![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\spring-framework-code\2023-03-09-14-09-59-image.png)

## registerBeanPostProcessors

注册BeanPostProcessors

## initMessageSource

i18n国际化内容

## initApplicationEventMulticaster

初始化事件发布器，如果没有自定义执行器（线程池）。就用默认的单线程执行

## onRefresh

ServletWebServerApplicationContext类下的createWebServer，默认用tomcat情况下，会找到TomcatServletWebServerFactory类，进行实例化。里面就是启动tomcat服务器的代码了。

## registerListeners

注册监听器对应上面的时间发布器

## finishBeanFactoryInitialization

实例化

我们看重点，也就是AbstractAutowireCapableBeanFactory的createBean方法

```java
Class<?> resolvedClass = resolveBeanClass(mbd, beanName);

// Prepare method overrides.
mbdToUse.prepareMethodOverrides();

// Give BeanPostProcessors a chance to return a proxy instead of the target bean instance.
Object bean = resolveBeforeInstantiation(beanName, mbdToUse);
if (bean != null) {
    return bean;
}
Object beanInstance = doCreateBean(beanName, mbdToUse, args);
```

上面这几个方法，首先是解析类resolveBeanClass，并放入mbdToUse类定义中。而后面这个方法resolveBeforeInstantiation，我们看注释就知道了，给个机会创建代理类。只有当实现自定义targetSource才会走这个方法。

但是如果没有自定义创建代理类是在下面的applyBeanPostProcessorsAfterInitialization中实现的。

到目前为止还没有看到bean 的生命周期提现。

其实都在后面这个方法doCreateBean中。

```java
// Instantiate the bean.
BeanWrapper instanceWrapper = null;
//创建包装器，主要是用构造器还是setget方法注入
instanceWrapper = createBeanInstance(beanName, mbd, args);


// Allow post-processors to modify the merged bean definition.
applyMergedBeanDefinitionPostProcessors(mbd, beanType, beanName);

// Eagerly cache singletons to be able to resolve circular references
// even when triggered by lifecycle interfaces like BeanFactoryAware.
boolean earlySingletonExposure = (mbd.isSingleton() && this.allowCircularReferences &&
        isSingletonCurrentlyInCreation(beanName));
if (earlySingletonExposure) {
    if (logger.isTraceEnabled()) {
        logger.trace("Eagerly caching bean '" + beanName +
                "' to allow for resolving potential circular references");
    }
    addSingletonFactory(beanName, () -> getEarlyBeanReference(beanName, mbd, bean));
}

// Initialize the bean instance.
Object exposedObject = bean;
try {
    populateBean(beanName, mbd, instanceWrapper);
    exposedObject = initializeBean(beanName, exposedObject, mbd);
}


// Register bean as disposable.
try {
    registerDisposableBeanIfNecessary(beanName, bean, mbd);
}
```

在这个方法中，创建了BeanWrapperbean包装器。解决循环依赖。

populateBean注入Autowire的对象

然后生命周期主要在initializeBean方法中

```java
//执行aware方法
rappedBean = applyBeanPostProessorsBeforeInitialization(wrappedBean, beanName);
invokeInitMethods(beanName, wrappedBean, mbd)
wrappedBean = applyBeanPostProcessorsAfterInitialization(wrappedBean, beanName);
```

## finishRefresh

## 循环依赖

spring解决循环依赖，正常来说二级缓存就可以解决循环依赖问题，但是spring还需要存放代理对象，所以需要三级缓存，第三级缓存存放bean的代理方法，进行调用后生成代理对象。因而我感觉二级缓存就够了，三级缓存只是个写法吧。

而且其实还有比如存是否正在创建的bean缓存singletonsCurrentlyInCreation，用于判断是否循环依赖，然后在放入提前暴露缓存。

## aop

理解上面之后，aop其实用的就是AbstractAutoProxyCreator（SmartInstantiationAwareBeanPostProcessor实现类）。调用postProcessBeforeInstantiation进行增强，首先加载advicer顾问。advicer中保存了代理的方法等等，也就是读取xml或者注解中的aspect消息。然后创建动态代理，逻辑如下：

```java
public AopProxy createAopProxy(AdvisedSupport config) throws AopConfigException {
        //如果没有接口
        if (config.isOptimize() || config.isProxyTargetClass() || hasNoUserSuppliedProxyInterfaces(config)) {
            Class<?> targetClass = config.getTargetClass();
            if (targetClass == null) {
                throw new AopConfigException("TargetSource cannot determine target class: " +
                        "Either an interface or a target is required for proxy creation.");
            }
            if (targetClass.isInterface() || Proxy.isProxyClass(targetClass)) {
                return new JdkDynamicAopProxy(config);
            }
            return new ObjenesisCglibAopProxy(config);
        }
        else {
            return new JdkDynamicAopProxy(config);
        }
}
```

## IoC和DI使用问题小结

### 为什么推荐构造器注入方式？

先来看看Spring在文档里怎么说：

> The Spring team generally advocates constructor injection as it enables one to implement application components as immutable objects and to ensure that required dependencies are not null. Furthermore constructor-injected components are always returned to client (calling) code in a fully initialized state.

简单的翻译一下：这个构造器注入的方式**能够保证注入的组件不可变，并且确保需要的依赖不为空**。此外，构造器注入的依赖总是能够在返回客户端（组件）代码的时候保证完全初始化的状态。

下面来简单的解释一下：

- **依赖不可变**：其实说的就是final关键字。
- **依赖不为空**（省去了我们对其检查）：当要实例化UserServiceImpl的时候，由于自己实现了有参数的构造函数，所以不会调用默认构造函数，那么就需要Spring容器传入所需要的参数，所以就两种情况：1、有该类型的参数->传入，OK 。2：无该类型的参数->报错。
- **完全初始化的状态**：这个可以跟上面的依赖不为空结合起来，向构造器传参之前，要确保注入的内容不为空，那么肯定要调用依赖组件的构造方法完成实例化。而在Java类加载实例化的过程中，构造方法是最后一步（之前如果有父类先初始化父类，然后自己的成员变量，最后才是构造方法），所以返回来的都是初始化之后的状态。

#### 源码

在refresh时，会调用一个方法来初始化所有注册过beanDefination的类，除非他是懒加载之类的。下列是使用Autowrie初始化的相关代码

首先,

在org.springframework.beans.factory.support.AbstractBeanFactory 抽象bean工厂中，的doGetBean方法吗，这个方法是spring创建bean的总方法

```java
protected <T> T doGetBean(
            String name, @Nullable Class<T> requiredType, @Nullable Object[] args, boolean typeCheckOnly)
            throws BeansException {

        String beanName = transformedBeanName(name);
        Object bean;

        // Eagerly check singleton cache for manually registered singletons.
        Object sharedInstance = getSingleton(beanName);
        if (sharedInstance != null && args == null) {

        }else {

            try {

                // Create bean instance.
                if (mbd.isSingleton()) {
                    sharedInstance = getSingleton(beanName, () -> {
                        try {
                            return createBean(beanName, mbd, args);
                        }
                        catch (BeansException ex) {
                            // Explicitly remove instance from singleton cache: It might have been put there
                            // eagerly by the creation process, to allow for circular reference resolution.
                            // Also remove any beans that received a temporary reference to the bean.
                            destroySingleton(beanName);
                            throw ex;
                        }
                    });
                    bean = getObjectForBeanInstance(sharedInstance, name, beanName, mbd);
                }

            }
        return (T) bean;
    }
```

删除一些代码后如上，当bean还没创建时，将进入下面的else中，这是getSingleton方法传入beanfactory的实现。也就是传入自定义创建工厂的方法，我们在想要自定义bean的创建时，就是通过这种方法来进行的。spring自己也使用了这种方法。

让我们进入这个方法看下

```java
public Object getSingleton(String beanName, ObjectFactory<?> singletonFactory) {
        Assert.notNull(beanName, "Bean name must not be null");
        synchronized (this.singletonObjects) {
            Object singletonObject = this.singletonObjects.get(beanName);
            if (singletonObject == null) {

                beforeSingletonCreation(beanName);

                try {
                    //调用自定义beanfactory的创建方法    
                    singletonObject = singletonFactory.getObject();
                    newSingleton = true;
                }
                catch (IllegalStateException ex) {
                    // Has the singleton object implicitly appeared in the meantime ->
                    // if yes, proceed with it since the exception indicates that state.
                    singletonObject = this.singletonObjects.get(beanName);
                    if (singletonObject == null) {
                        throw ex;
                    }
                }
                catch (BeanCreationException ex) {
                }
                finally {
                    if (recordSuppressedExceptions) {
                        this.suppressedExceptions = null;
                    }
                    afterSingletonCreation(beanName);
                }
                if (newSingleton) {
                    addSingleton(beanName, singletonObject);
                }
            }
            return singletonObject;
        }
    }
```

可以看到调用了自定义的创建bean方法

我们返回之前的代码看看spring传入的ObjectFactory（这个接口与FactoryBean类似，但后者的实现通常被定义为BeanFactory中的SPI实例，而该类的实现通常被作为API (通过注入) 提供给其他bean。因此， getObject() 方法具有不同的异常处理行为。）

进入createBean方法

```java
protected Object createBean(String beanName, RootBeanDefinition mbd, @Nullable Object[] args)
            throws BeanCreationException {
        try {
            Object beanInstance = doCreateBean(beanName, mbdToUse, args);
            return beanInstance;
        }
    }
```

进入doCreateBean

```java
    /** Cache of singleton objects: bean name to bean instance. */
private final Map<String, Object> singletonObjects = new ConcurrentHashMap<>(256);

    /** Cache of singleton factories: bean name to ObjectFactory. */
private final Map<String, ObjectFactory<?>> singletonFactories = new HashMap<>(16);

    /** Cache of early singleton objects: bean name to bean instance. */
private final Map<String, Object> earlySingletonObjects = new ConcurrentHashMap<>(16);

    /** Names of beans that are currently in creation. */
private final Set<String> singletonsCurrentlyInCreation =
            Collections.newSetFromMap(new ConcurrentHashMap<>(16));

protected Object doCreateBean(String beanName, RootBeanDefinition mbd, @Nullable Object[] args)
            throws BeanCreationException {

        // Instantiate the bean.
        BeanWrapper instanceWrapper = null;
        if (mbd.isSingleton()) {
            instanceWrapper = this.factoryBeanInstanceCache.remove(beanName);
        }
        if (instanceWrapper == null) {
            instanceWrapper = createBeanInstance(beanName, mbd, args);
        }
        Object bean = instanceWrapper.getWrappedInstance();
        Class<?> beanType = instanceWrapper.getWrappedClass();


        // Eagerly cache singletons to be able to resolve circular references
        // even when triggered by lifecycle interfaces like BeanFactoryAware.
        boolean earlySingletonExposure = (mbd.isSingleton() && this.allowCircularReferences &&
                isSingletonCurrentlyInCreation(beanName));
        if (earlySingletonExposure) {
            addSingletonFactory(beanName, () -> getEarlyBeanReference(beanName, mbd, bean));
        }

        // Initialize the bean instance.
        Object exposedObject = bean;
        try {
            populateBean(beanName, mbd, instanceWrapper);
            exposedObject = initializeBean(beanName, exposedObject, mbd);
        }
        catch (Throwable ex) {
            if (ex instanceof BeanCreationException && beanName.equals(((BeanCreationException) ex).getBeanName())) {
                throw (BeanCreationException) ex;
            }
            else {
                throw new BeanCreationException(
                        mbd.getResourceDescription(), beanName, "Initialization of bean failed", ex);
            }
        }
        return exposedObject;
    }
```

这个方法先是创建实例包装器。然后注入属性而在创建实例包装器createBeanInstance方法中，

```java
    protected BeanWrapper createBeanInstance(String beanName, RootBeanDefinition mbd, @Nullable Object[] args) {

    // Candidate constructors for autowiring?
        Constructor<?>[] ctors = determineConstructorsFromBeanPostProcessors(beanClass, beanName);
        if (ctors != null || mbd.getResolvedAutowireMode() == AUTOWIRE_CONSTRUCTOR ||
                mbd.hasConstructorArgumentValues() || !ObjectUtils.isEmpty(args)) {
            return autowireConstructor(beanName, mbd, ctors, args);
        }

        // Preferred constructors for default construction?
        ctors = mbd.getPreferredConstructors();
        if (ctors != null) {
            return autowireConstructor(beanName, mbd, ctors, null);
        }

        // No special handling: simply use no-arg constructor.
        return instantiateBean(beanName, mbd);

    }
```

可以看到根据@Autowire是否在构造器是进行了不同的实现。

#### 结论

当@Autowire在构造器上和不在构造器上时的实现方式是不一样的。而不一样的点正如官方所说那样也就是一开头说的那些。至于为何要这么弄，使用构造器方式应该会更加的严谨而不用的话也行，使用setter方法注入的话spring处理掉循环依赖的问题，采用早期暴露的方式。构造器方式则会直接报错。

## 添加环境变量解析器

解析@value("${}")等
