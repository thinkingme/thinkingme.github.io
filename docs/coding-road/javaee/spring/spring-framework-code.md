# spring框架代码原理

> 本文研究通过迷你spring配合官方源码理解，源码链接：[GitHub - DerekYRC/mini-spring: mini-spring是简化版的spring框架，能帮助你快速熟悉spring源码和掌握spring的核心原理。抽取了spring的核心逻辑，代码极度简化，保留spring的核心功能，如IoC和AOP、资源加载器、事件监听器、类型转换、容器扩展点、bean生命周期和作用域、应用上下文等核心功能。](https://github.com/DerekYRC/mini-spring/)

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
```

我来根据每个方法逐一分析一下。

## synchronized加锁

我们可以在spring ioc容器加入bean时看到spring做了一些加锁的处理

org.springframework.beans.factory.support.DefaultSingletonBeanRegistry

一开始想到，spring初始化bean是单线程的，为什么还需要加锁呢。

后来认为，spring中controller等类是会有多线程操作的，而如果我们设置bean为lazy也就是懒加载。那么在这些多线程操作的类中如果进行加载bean的操作的话，有可能会引发多线程的问题。

## prepare

准备阶段

### preoareRefresh

ConfigurableListableBeanFactory beanFactory = obtainFreshBeanFactory();

### prepareBeanFactory

## 循环依赖

spring解决循环依赖，正常来说二级缓存就可以解决循环依赖问题，但是spring还需要存放代理对象，所以需要三级缓存，其中一个来存放代理过的对象。

我感觉二级缓存就够了，三级缓存只是个写法吧
