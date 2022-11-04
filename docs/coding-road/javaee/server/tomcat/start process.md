# [Tomcat启动流程简析](https://www.cnblogs.com/54chensongxia/p/13236745.html)

Tomcat是一款我们平时开发过程中最常用到的Servlet容器。本系列博客会记录Tomcat的整体架构、主要组件、IO线程模型、请求在Tomcat内部的流转过程以及一些Tomcat调优的相关知识。

力求达到以下几个目的：

- 更加熟悉Tomcat的工作机制，工作中遇到Tomcat相关问题能够快速定位，从源头来解决；
- 对于一些高并发场景能够对Tomcat进行调优；
- 通过对Tomcat源码的分析，吸收一些Tomcat的设计的理念，应用到自己的软件开发过程中。

------

## 1. Bootstrap启动入口[#](https://www.cnblogs.com/54chensongxia/p/13236745.html#1-bootstrap启动入口)

在前面分析[Tomcat启动脚本](https://www.cnblogs.com/54chensongxia/p/13234398.html)的过程中，我们最后发现startup.bat最后是通过调用Bootstrap这个类的main方法来启动Tomcat的，所以先去看下Bootstrap这个类。

```java
public static void main(String args[]) {

        synchronized (daemonLock) {
            if (daemon == null) {
                // Don't set daemon until init() has completed
                Bootstrap bootstrap = new Bootstrap();
                try {
                    //创建Bootstrap对象，代用init方法
                    bootstrap.init();
                } catch (Throwable t) {
                    handleThrowable(t);
                    t.printStackTrace();
                    return;
                }
                daemon = bootstrap;
            } else {
                // When running as a service the call to stop will be on a new
                // thread so make sure the correct class loader is used to
                // prevent a range of class not found exceptions.
                Thread.currentThread().setContextClassLoader(daemon.catalinaLoader);
            }
        }

        try {
            String command = "start";
            if (args.length > 0) {
                command = args[args.length - 1];
            }

            if (command.equals("startd")) {
                args[args.length - 1] = "start";
                daemon.load(args);
                daemon.start();
            } else if (command.equals("stopd")) {
                args[args.length - 1] = "stop";
                daemon.stop();
            } else if (command.equals("start")) {
                //一般情况下会进入这步，调用Bootstrap对象的load和start方法。
                //将Catalina启动设置成block模式
                daemon.setAwait(true);
                daemon.load(args);
                daemon.start();
                if (null == daemon.getServer()) {
                    System.exit(1);
                }
            } else if (command.equals("stop")) {
                daemon.stopServer(args);
            } else if (command.equals("configtest")) {
                daemon.load(args);
                if (null == daemon.getServer()) {
                    System.exit(1);
                }
                System.exit(0);
            } else {
                log.warn("Bootstrap: command \"" + command + "\" does not exist.");
            }
        } catch (Throwable t) {
            // Unwrap the Exception for clearer error reporting
            if (t instanceof InvocationTargetException &&
                    t.getCause() != null) {
                t = t.getCause();
            }
            handleThrowable(t);
            t.printStackTrace();
            System.exit(1);
        }
    }
折叠 
```

上面的代码逻辑比较简单，如果我们正常启动tomcat，会顺序执行Bootstrap对象的init()方法， daemon.setAwait(true)、daemon.load(args)和daemon.start()方法。我们先看下Bootstrap对象的init方法：

```java
public void init() throws Exception {

        initClassLoaders();
        Thread.currentThread().setContextClassLoader(catalinaLoader);

        SecurityClassLoad.securityClassLoad(catalinaLoader);

        // Load our startup class and call its process() method
        if (log.isDebugEnabled())
            log.debug("Loading startup class");
        Class<?> startupClass = catalinaLoader.loadClass("org.apache.catalina.startup.Catalina");
        Object startupInstance = startupClass.getConstructor().newInstance();

        // Set the shared extensions class loader
        if (log.isDebugEnabled())
            log.debug("Setting startup class properties");
        String methodName = "setParentClassLoader";
        Class<?> paramTypes[] = new Class[1];
        paramTypes[0] = Class.forName("java.lang.ClassLoader");
        Object paramValues[] = new Object[1];
        paramValues[0] = sharedLoader;
        Method method =
            startupInstance.getClass().getMethod(methodName, paramTypes);
        method.invoke(startupInstance, paramValues);

        catalinaDaemon = startupInstance;

    }
```

这个方法主要做了以下几件事：

- 创建commonLoader、catalinaLoader、sharedLoader类加载器（默认情况下这三个类加载器指向同一个对象。建议看看createClassLoader方法，里面做的事情还挺多，比如装载catalina.properties里配置的目录下的文件和jar包，后两个加载器的父加载器都是第一个，最后注册了MBean，可以用于JVM监控该对象）；
- 实例化一个org.apache.catalina.startup.Catalina对象，并赋值给静态成员catalinaDaemon，以sharedLoader作为入参通过反射调用该对象的setParentClassLoader方法。

执行完init()方法，就开始执行bootstrap对象的load和start方法;

```java
 private void load(String[] arguments)
        throws Exception {

        // Call the load() method
        String methodName = "load";
        Object param[];
        Class<?> paramTypes[];
        if (arguments==null || arguments.length==0) {
            paramTypes = null;
            param = null;
        } else {
            paramTypes = new Class[1];
            paramTypes[0] = arguments.getClass();
            param = new Object[1];
            param[0] = arguments;
        }
        Method method =
            catalinaDaemon.getClass().getMethod(methodName, paramTypes);
        if (log.isDebugEnabled())
            log.debug("Calling startup class " + method);
        method.invoke(catalinaDaemon, param);

    }
```

调用catalinaDaemon对象的load方法，catalinaDaemon这个对象的类型是org.apache.catalina.startup.Catalina。strat方法也是类似的，最后都是调用Catalina的start方法。

**总结下Bootstrap的启动方法最主要干的事情就是创建了Catalina对象，并调用它的load和start方法。**

## 2. Catalina的load和start方法[#](https://www.cnblogs.com/54chensongxia/p/13236745.html#2-catalina的load和start方法)

第一节分析到Bootstrap会触发调用Catalina的load和start方法。

```java
     /**
     * 从注释可以看出这个方法的作用是创建一个Server实例
     * Start a new server instance.
     */
    public void load() {
        if (loaded) {
            return;
        }
        loaded = true;
        long t1 = System.nanoTime();
        //检查临时目录
        initDirs();
        // Before digester - it may be needed
        initNaming();

        // Create and execute our Digester
        Digester digester = createStartDigester();

        InputSource inputSource = null;
        InputStream inputStream = null;
        File file = null;
        try {
            try {
                file = configFile();
                inputStream = new FileInputStream(file);
                inputSource = new InputSource(file.toURI().toURL().toString());
            } catch (Exception e) {
                if (log.isDebugEnabled()) {
                    log.debug(sm.getString("catalina.configFail", file), e);
                }
            }
            if (inputStream == null) {
                try {
                    inputStream = getClass().getClassLoader()
                        .getResourceAsStream(getConfigFile());
                    inputSource = new InputSource
                        (getClass().getClassLoader()
                         .getResource(getConfigFile()).toString());
                } catch (Exception e) {
                    if (log.isDebugEnabled()) {
                        log.debug(sm.getString("catalina.configFail",
                                getConfigFile()), e);
                    }
                }
            }

            // This should be included in catalina.jar
            // Alternative: don't bother with xml, just create it manually.
            if (inputStream == null) {
                try {
                    inputStream = getClass().getClassLoader()
                            .getResourceAsStream("server-embed.xml");
                    inputSource = new InputSource
                    (getClass().getClassLoader()
                            .getResource("server-embed.xml").toString());
                } catch (Exception e) {
                    if (log.isDebugEnabled()) {
                        log.debug(sm.getString("catalina.configFail",
                                "server-embed.xml"), e);
                    }
                }
            }


            if (inputStream == null || inputSource == null) {
                if  (file == null) {
                    log.warn(sm.getString("catalina.configFail",
                            getConfigFile() + "] or [server-embed.xml]"));
                } else {
                    log.warn(sm.getString("catalina.configFail",
                            file.getAbsolutePath()));
                    if (file.exists() && !file.canRead()) {
                        log.warn("Permissions incorrect, read permission is not allowed on the file.");
                    }
                }
                return;
            }

            try {
                inputSource.setByteStream(inputStream);
                digester.push(this);
                digester.parse(inputSource);
            } catch (SAXParseException spe) {
                log.warn("Catalina.start using " + getConfigFile() + ": " +
                        spe.getMessage());
                return;
            } catch (Exception e) {
                log.warn("Catalina.start using " + getConfigFile() + ": " , e);
                return;
            }
        } finally {
            if (inputStream != null) {
                try {
                    inputStream.close();
                } catch (IOException e) {
                    // Ignore
                }
            }
        }

        getServer().setCatalina(this);
        getServer().setCatalinaHome(Bootstrap.getCatalinaHomeFile());
        getServer().setCatalinaBase(Bootstrap.getCatalinaBaseFile());

        // Stream redirection
        initStreams();

        // Start the new server
        try {
            getServer().init();
        } catch (LifecycleException e) {
            if (Boolean.getBoolean("org.apache.catalina.startup.EXIT_ON_INIT_FAILURE")) {
                throw new java.lang.Error(e);
            } else {
                log.error("Catalina.start", e);
            }
        }

        long t2 = System.nanoTime();
        if(log.isInfoEnabled()) {
            log.info("Initialization processed in " + ((t2 - t1) / 1000000) + " ms");
        }
    }
折叠 
```

将上面的代码精简下：

```java
Digester digester = createStartDigester();  
inputSource.setByteStream(inputStream);  
digester.push(this);  
digester.parse(inputSource);  
getServer().setCatalina(this);  
getServer().init();  
```

做的事情就两个：

- 创建一个Digester对象（Digester对象的作用就是解析server.xml配置文件，这边会先加载conf/server.xml文件，找不到的话会尝试加载server-embed.xml这个配置文件），解析完成后生成org.apache.catalina.core.StandardServer、org.apache.catalina.core.StandardService、org.apache.catalina.connector.Connector、org.apache.catalina.core.StandardEngine、org.apache.catalina.core.StandardHost、org.apache.catalina.core.StandardContext等等一系列对象，这些对象从前到后前一个包含后一个对象的引用（一对一或一对多的关系）。最后将StandardServer赋值给Catalina对象的server属性；如果你配置了连接器组件共享的线程池，还会生成StandardThreadExecutor对象。
- 第二件事就是调用StandardServer的init方法。

**临时总结下**：Catalina的load方法的作用主要是解析conf/server.xml，生成StandardServer对象，再触发StandardServer的init方法。

第一节中还分析到Bootstrap会触发调用Catalina的start方法。那么我们看看start方法中干了什么。

```java
/**
     * Start a new server instance.
     */
    public void start() {

        if (getServer() == null) {
            load();
        }

        if (getServer() == null) {
            log.fatal("Cannot start server. Server instance is not configured.");
            return;
        }

        long t1 = System.nanoTime();

        // Start the new server
        try {
            getServer().start();
        } catch (LifecycleException e) {
            log.fatal(sm.getString("catalina.serverStartFail"), e);
            try {
                getServer().destroy();
            } catch (LifecycleException e1) {
                log.debug("destroy() failed for failed Server ", e1);
            }
            return;
        }

        long t2 = System.nanoTime();
        if(log.isInfoEnabled()) {
            log.info("Server startup in " + ((t2 - t1) / 1000000) + " ms");
        }

        // Register shutdown hook
        if (useShutdownHook) {
            if (shutdownHook == null) {
                shutdownHook = new CatalinaShutdownHook();
            }
            Runtime.getRuntime().addShutdownHook(shutdownHook);

            // If JULI is being used, disable JULI's shutdown hook since
            // shutdown hooks run in parallel and log messages may be lost
            // if JULI's hook completes before the CatalinaShutdownHook()
            LogManager logManager = LogManager.getLogManager();
            if (logManager instanceof ClassLoaderLogManager) {
                ((ClassLoaderLogManager) logManager).setUseShutdownHook(
                        false);
            }
        }

        if (await) {
            await();
            stop();
        }
    }
折叠 
```

这段代码最主要的作用就是调用StandardServer对象的start方法。

**总结下：Catalina对象的laod和start方法的作用是解析conf/server.xml，生成StandardServer对象，再触发StandardServer的init方法和start方法。**

到这边为止我们可以看到Tomcat的启动流程还是很清晰的，下面继续看StandardServer的init方法和start到底干了些什么。

## 3.StandardServer的init和start方法[#](https://www.cnblogs.com/54chensongxia/p/13236745.html#3standardserver的init和start方法)

通过寻找StandardServer的init方法，我们发现StandardServer本身没有实现这个方法，这个方法是它从父类LifecycleBase中继承过来的：

```java
@Override
    public final synchronized void init() throws LifecycleException {
        if (!state.equals(LifecycleState.NEW)) {
            invalidTransition(Lifecycle.BEFORE_INIT_EVENT);
        }

        try {
            //发布初始化容器时间，对应的listener做相应处理
            setStateInternal(LifecycleState.INITIALIZING, null, false);
            //调用子类的initInternal（）
            initInternal();
            //发布容器已经初始化事件，对应的listener做相应处理
            setStateInternal(LifecycleState.INITIALIZED, null, false);
        } catch (Throwable t) {
            handleSubClassException(t, "lifecycleBase.initFail", toString());
        }
    }
```

所以调用StandardServer的init方法，其实是促发了容器初始化事件发布，然后又调到了StandardServer的initInternal方法。那么我们看看StandardServer的start方法的逻辑是什么。

代码点进去，发现StandardServer的start方法也是调的父类LifecycleBase中的方法。

```java
@Override
    public final synchronized void start() throws LifecycleException {

        if (LifecycleState.STARTING_PREP.equals(state) || LifecycleState.STARTING.equals(state) ||
                LifecycleState.STARTED.equals(state)) {

            if (log.isDebugEnabled()) {
                Exception e = new LifecycleException();
                log.debug(sm.getString("lifecycleBase.alreadyStarted", toString()), e);
            } else if (log.isInfoEnabled()) {
                log.info(sm.getString("lifecycleBase.alreadyStarted", toString()));
            }

            return;
        }

        if (state.equals(LifecycleState.NEW)) {
            init();
        } else if (state.equals(LifecycleState.FAILED)) {
            stop();
        } else if (!state.equals(LifecycleState.INITIALIZED) &&
                !state.equals(LifecycleState.STOPPED)) {
            invalidTransition(Lifecycle.BEFORE_START_EVENT);
        }

        try {
            //发布事件
            setStateInternal(LifecycleState.STARTING_PREP, null, false);
            //调用子类的startInternal
            startInternal();
            if (state.equals(LifecycleState.FAILED)) {
                // This is a 'controlled' failure. The component put itself into the
                // FAILED state so call stop() to complete the clean-up.
                stop();
            } else if (!state.equals(LifecycleState.STARTING)) {
                // Shouldn't be necessary but acts as a check that sub-classes are
                // doing what they are supposed to.
                invalidTransition(Lifecycle.AFTER_START_EVENT);
            } else {
                //发布容器启动事件
                setStateInternal(LifecycleState.STARTED, null, false);
            }
        } catch (Throwable t) {
            // This is an 'uncontrolled' failure so put the component into the
            // FAILED state and throw an exception.
            handleSubClassException(t, "lifecycleBase.startFail", toString());
        }
    }
折叠 
```

从以上init和start方法的定义可以看到这两个方法最终将会调用StandardServer中定义的initInternal和startInternal。

先来看initInternal方法

```java
protected void initInternal() throws LifecycleException {

        super.initInternal();

        // Register global String cache
        // Note although the cache is global, if there are multiple Servers
        // present in the JVM (may happen when embedding) then the same cache
        // will be registered under multiple names
        onameStringCache = register(new StringCache(), "type=StringCache");

        // Register the MBeanFactory
        MBeanFactory factory = new MBeanFactory();
        factory.setContainer(this);
        onameMBeanFactory = register(factory, "type=MBeanFactory");

        // Register the naming resources
        globalNamingResources.init();

        // Populate the extension validator with JARs from common and shared
        // class loaders
        if (getCatalina() != null) {
            ClassLoader cl = getCatalina().getParentClassLoader();
            // Walk the class loader hierarchy. Stop at the system class loader.
            // This will add the shared (if present) and common class loaders
            while (cl != null && cl != ClassLoader.getSystemClassLoader()) {
                if (cl instanceof URLClassLoader) {
                    URL[] urls = ((URLClassLoader) cl).getURLs();
                    for (URL url : urls) {
                        if (url.getProtocol().equals("file")) {
                            try {
                                File f = new File (url.toURI());
                                if (f.isFile() &&
                                        f.getName().endsWith(".jar")) {
                                    ExtensionValidator.addSystemResource(f);
                                }
                            } catch (URISyntaxException e) {
                                // Ignore
                            } catch (IOException e) {
                                // Ignore
                            }
                        }
                    }
                }
                cl = cl.getParent();
            }
        }
        // Initialize our defined Services
        for (int i = 0; i < services.length; i++) {
            services[i].init();
        }
    }
折叠 
```

重点代码在最后，循环调用了Service组件的init方法。

再来看StandardServer的startInternal方法

```java
@Override
    protected void startInternal() throws LifecycleException {

        fireLifecycleEvent(CONFIGURE_START_EVENT, null);
        setState(LifecycleState.STARTING);

        globalNamingResources.start();

        // Start our defined Services
        synchronized (servicesLock) {
            for (int i = 0; i < services.length; i++) {
                services[i].start();
            }
        }
    }
```

也是循环调用了Service组件的start方法。这边的Service组件就是在从conf/server.xml中解析出来的StandardService对象，查看下这个类的继承体系：

```java
LifecycleBase (org.apache.catalina.util)
    LifecycleMBeanBase (org.apache.catalina.util)
        StandardService (org.apache.catalina.core)
```

我们发现这个类继承体系和StandardServer是一样的。其实我们再观察的仔细一点会发现从conf/server.xml解析胡来的类的继承体系都是一样的。所以我们调用这些类的init和start方法最后还是会调用到他们的initInternal和startInternal方法。

## 4. StandardService的initInternal和startInternal方法[#](https://www.cnblogs.com/54chensongxia/p/13236745.html#4-standardservice的initinternal和startinternal方法)

先看下StandardService的initInternal方法

```java
@Override
    protected void initInternal() throws LifecycleException {

        super.initInternal();
        //调用engine的initInternal方法，这个方法中也没做特别重要的操作，只是做了一个getReal操作
        if (engine != null) {
            engine.init();
        }

        //StandardThreadExecutor的initInternal方法中没没干什么事情
        // Initialize any Executors
        for (Executor executor : findExecutors()) {
            if (executor instanceof JmxEnabled) {
                ((JmxEnabled) executor).setDomain(getDomain());
            }
            executor.init();
        }

        // Initialize mapper listener
        //这步也没做什么重要操作
        mapperListener.init();

        // Initialize our defined Connectors
        // 连接器主键的初始化，主要是检查连接器的protocolHandler的主键，并将其初始化.
        synchronized (connectorsLock) {
            for (Connector connector : connectors) {
                connector.init();
            }
        }
    }
```

看了上面的代码，觉得Tomcat源码逻辑还是很清晰的。之前在分析Tomcat组件的文章中讲到Service组件是有Connector组件、engine组件和一个可选的线程池组成。上面的代码中正好对应了这三个组件的初始化话。

Connector组件和engine组件的初始化又会触发他们各自子组件的初始化，所以StandardService的initInternal方法会触发Tomcat下各类组件的初始化。这边大致记录下各个组件初始化话的顺序：

- engine组件初始化：engine组件初始化没做什么特别的操作，也没触发它的子组件（Host、Context和Wrapper组件的初始化），所以这步比较简单;
- Executor组件的初始化：没有触发其他组件初始化；
- Mapper组件初始化：mapper组件初始化也没干什么重要的操作，也没触发其他子组件初始化；
- Connector组件初始化：检查连接器的protocolHandler的子组件，并**触发其初始化**；
- ProtocolHandler组件初始化：**触发Endpoint组件初始化**，Endpoint类才是接收转化请求的真正的类；

然后再看StandardService的startInternal方法

```java
protected void startInternal() throws LifecycleException {

        if(log.isInfoEnabled())
            log.info(sm.getString("standardService.start.name", this.name));
        setState(LifecycleState.STARTING);

        // Start our defined Container first
        if (engine != null) {
            synchronized (engine) {
                engine.start();
            }
        }

        synchronized (executors) {
            for (Executor executor: executors) {
                executor.start();
            }
        }

        mapperListener.start();

        // Start our defined Connectors second
        synchronized (connectorsLock) {
            for (Connector connector: connectors) {
                // If it has already failed, don't try and start it
                if (connector.getState() != LifecycleState.FAILED) {
                    connector.start();
                }
            }
        }
    }
```

逻辑依然很清楚，StandardService会依次触发各个子组件的start方法。

- Engine组件的start：Engine组件的start方法组要作用还是触发了Host组件的start方法，具体代码见

  ```java
  protected synchronized void startInternal() throws LifecycleException {  
    
      // Start our subordinate components, if any  
      if ((loader != null) && (loader instanceof Lifecycle))  
          ((Lifecycle) loader).start();  
      logger = null;  
      getLogger();  
      if ((manager != null) && (manager instanceof Lifecycle))  
          ((Lifecycle) manager).start();  
      if ((cluster != null) && (cluster instanceof Lifecycle))  
          ((Lifecycle) cluster).start();  
      Realm realm = getRealmInternal();  
      if ((realm != null) && (realm instanceof Lifecycle))  
          ((Lifecycle) realm).start();  
      if ((resources != null) && (resources instanceof Lifecycle))  
          ((Lifecycle) resources).start();  
    
      // 找出Engine的子容器，也就是Host容器
      Container children[] = findChildren();  
      List<Future<Void>> results = new ArrayList<Future<Void>>();  
      //利用线程池调用Host的start方法
      for (int i = 0; i < children.length; i++) {  
          results.add(startStopExecutor.submit(new StartChild(children[i])));  
      }  
    
      boolean fail = false;  
      for (Future<Void> result : results) {  
          try {  
              result.get();  
          } catch (Exception e) {  
              log.error(sm.getString("containerBase.threadedStartFailed"), e);  
              fail = true;  
          }  
    
      }  
      if (fail) {  
          throw new LifecycleException(  
                  sm.getString("containerBase.threadedStartFailed"));  
      }  
    
      // Start the Valves in our pipeline (including the basic), if any  
      if (pipeline instanceof Lifecycle)  
          ((Lifecycle) pipeline).start();  
      setState(LifecycleState.STARTING);  
      // Start our thread  
      threadStart();  
    
  } 
  折叠 
  ```

- Host组件的start：经过前面介绍，我们知道Host组件的start方法最后还是会调用自己startInternal方法；

- Context组件的start:触发Wrapper的start，加载filter、Servlet等；

- Wrapper组件的start:

这边我们重点看下StandardContext的startInternal，这个方法干的事情比较多：

```java
 protected synchronized void startInternal() throws LifecycleException {

        if(log.isDebugEnabled())
            log.debug("Starting " + getBaseName());

        // Send j2ee.state.starting notification
        if (this.getObjectName() != null) {
            Notification notification = new Notification("j2ee.state.starting",
                    this.getObjectName(), sequenceNumber.getAndIncrement());
            broadcaster.sendNotification(notification);
        }

        setConfigured(false);
        boolean ok = true;

        // Currently this is effectively a NO-OP but needs to be called to
        // ensure the NamingResources follows the correct lifecycle
        if (namingResources != null) {
            namingResources.start();
        }

        // Post work directory
        postWorkDirectory();

        // Add missing components as necessary
        if (getResources() == null) {   // (1) Required by Loader
            if (log.isDebugEnabled())
                log.debug("Configuring default Resources");

            try {
                setResources(new StandardRoot(this));
            } catch (IllegalArgumentException e) {
                log.error(sm.getString("standardContext.resourcesInit"), e);
                ok = false;
            }
        }
        if (ok) {
            resourcesStart();
        }

        if (getLoader() == null) {
            WebappLoader webappLoader = new WebappLoader(getParentClassLoader());
            webappLoader.setDelegate(getDelegate());
            setLoader(webappLoader);
        }

        // An explicit cookie processor hasn't been specified; use the default
        if (cookieProcessor == null) {
            cookieProcessor = new Rfc6265CookieProcessor();
        }

        // Initialize character set mapper
        getCharsetMapper();

        // Validate required extensions
        boolean dependencyCheck = true;
        try {
            dependencyCheck = ExtensionValidator.validateApplication
                (getResources(), this);
        } catch (IOException ioe) {
            log.error(sm.getString("standardContext.extensionValidationError"), ioe);
            dependencyCheck = false;
        }

        if (!dependencyCheck) {
            // do not make application available if dependency check fails
            ok = false;
        }

        // Reading the "catalina.useNaming" environment variable
        String useNamingProperty = System.getProperty("catalina.useNaming");
        if ((useNamingProperty != null)
            && (useNamingProperty.equals("false"))) {
            useNaming = false;
        }

        if (ok && isUseNaming()) {
            if (getNamingContextListener() == null) {
                NamingContextListener ncl = new NamingContextListener();
                ncl.setName(getNamingContextName());
                ncl.setExceptionOnFailedWrite(getJndiExceptionOnFailedWrite());
                addLifecycleListener(ncl);
                setNamingContextListener(ncl);
            }
        }

        // Standard container startup
        if (log.isDebugEnabled())
            log.debug("Processing standard container startup");


        // Binding thread
        ClassLoader oldCCL = bindThread();

        try {
            if (ok) {
                // Start our subordinate components, if any
                Loader loader = getLoader();
                if (loader instanceof Lifecycle) {
                    ((Lifecycle) loader).start();
                }

                // since the loader just started, the webapp classloader is now
                // created.
                setClassLoaderProperty("clearReferencesRmiTargets",
                        getClearReferencesRmiTargets());
                setClassLoaderProperty("clearReferencesStopThreads",
                        getClearReferencesStopThreads());
                setClassLoaderProperty("clearReferencesStopTimerThreads",
                        getClearReferencesStopTimerThreads());
                setClassLoaderProperty("clearReferencesHttpClientKeepAliveThread",
                        getClearReferencesHttpClientKeepAliveThread());
                setClassLoaderProperty("clearReferencesObjectStreamClassCaches",
                        getClearReferencesObjectStreamClassCaches());
                setClassLoaderProperty("skipMemoryLeakChecksOnJvmShutdown",
                        getSkipMemoryLeakChecksOnJvmShutdown());

                // By calling unbindThread and bindThread in a row, we setup the
                // current Thread CCL to be the webapp classloader
                unbindThread(oldCCL);
                oldCCL = bindThread();

                // Initialize logger again. Other components might have used it
                // too early, so it should be reset.
                logger = null;
                getLogger();

                Realm realm = getRealmInternal();
                if(null != realm) {
                    if (realm instanceof Lifecycle) {
                        ((Lifecycle) realm).start();
                    }

                    // Place the CredentialHandler into the ServletContext so
                    // applications can have access to it. Wrap it in a "safe"
                    // handler so application's can't modify it.
                    CredentialHandler safeHandler = new CredentialHandler() {
                        @Override
                        public boolean matches(String inputCredentials, String storedCredentials) {
                            return getRealmInternal().getCredentialHandler().matches(inputCredentials, storedCredentials);
                        }

                        @Override
                        public String mutate(String inputCredentials) {
                            return getRealmInternal().getCredentialHandler().mutate(inputCredentials);
                        }
                    };
                    context.setAttribute(Globals.CREDENTIAL_HANDLER, safeHandler);
                }

                // Notify our interested LifecycleListeners
                fireLifecycleEvent(Lifecycle.CONFIGURE_START_EVENT, null);

                // Start our child containers, if not already started
                for (Container child : findChildren()) {
                    if (!child.getState().isAvailable()) {
                        child.start();
                    }
                }

                // Start the Valves in our pipeline (including the basic),
                // if any
                if (pipeline instanceof Lifecycle) {
                    ((Lifecycle) pipeline).start();
                }

                // Acquire clustered manager
                Manager contextManager = null;
                Manager manager = getManager();
                if (manager == null) {
                    if (log.isDebugEnabled()) {
                        log.debug(sm.getString("standardContext.cluster.noManager",
                                Boolean.valueOf((getCluster() != null)),
                                Boolean.valueOf(distributable)));
                    }
                    if ( (getCluster() != null) && distributable) {
                        try {
                            contextManager = getCluster().createManager(getName());
                        } catch (Exception ex) {
                            log.error("standardContext.clusterFail", ex);
                            ok = false;
                        }
                    } else {
                        contextManager = new StandardManager();
                    }
                }

                // Configure default manager if none was specified
                if (contextManager != null) {
                    if (log.isDebugEnabled()) {
                        log.debug(sm.getString("standardContext.manager",
                                contextManager.getClass().getName()));
                    }
                    setManager(contextManager);
                }

                if (manager!=null && (getCluster() != null) && distributable) {
                    //let the cluster know that there is a context that is distributable
                    //and that it has its own manager
                    getCluster().registerManager(manager);
                }
            }

            if (!getConfigured()) {
                log.error(sm.getString("standardContext.configurationFail"));
                ok = false;
            }

            // We put the resources into the servlet context
            if (ok)
                getServletContext().setAttribute
                    (Globals.RESOURCES_ATTR, getResources());

            if (ok ) {
                if (getInstanceManager() == null) {
                    javax.naming.Context context = null;
                    if (isUseNaming() && getNamingContextListener() != null) {
                        context = getNamingContextListener().getEnvContext();
                    }
                    Map<String, Map<String, String>> injectionMap = buildInjectionMap(
                            getIgnoreAnnotations() ? new NamingResourcesImpl(): getNamingResources());
                    setInstanceManager(new DefaultInstanceManager(context,
                            injectionMap, this, this.getClass().getClassLoader()));
                }
                getServletContext().setAttribute(
                        InstanceManager.class.getName(), getInstanceManager());
                InstanceManagerBindings.bind(getLoader().getClassLoader(), getInstanceManager());
            }

            // Create context attributes that will be required
            if (ok) {
                getServletContext().setAttribute(
                        JarScanner.class.getName(), getJarScanner());
            }

            // Set up the context init params
            mergeParameters();

            // Call ServletContainerInitializers
            for (Map.Entry<ServletContainerInitializer, Set<Class<?>>> entry :
                initializers.entrySet()) {
                try {
                    entry.getKey().onStartup(entry.getValue(),
                            getServletContext());
                } catch (ServletException e) {
                    log.error(sm.getString("standardContext.sciFail"), e);
                    ok = false;
                    break;
                }
            }

            // Configure and call application event listeners
            if (ok) {
                if (!listenerStart()) {
                    log.error(sm.getString("standardContext.listenerFail"));
                    ok = false;
                }
            }

            // Check constraints for uncovered HTTP methods
            // Needs to be after SCIs and listeners as they may programmatically
            // change constraints
            if (ok) {
                checkConstraintsForUncoveredMethods(findConstraints());
            }

            try {
                // Start manager
                Manager manager = getManager();
                if (manager instanceof Lifecycle) {
                    ((Lifecycle) manager).start();
                }
            } catch(Exception e) {
                log.error(sm.getString("standardContext.managerFail"), e);
                ok = false;
            }

            // Configure and call application filters
            if (ok) {
                if (!filterStart()) {
                    log.error(sm.getString("standardContext.filterFail"));
                    ok = false;
                }
            }

            // Load and initialize all "load on startup" servlets
            if (ok) {
                if (!loadOnStartup(findChildren())){
                    log.error(sm.getString("standardContext.servletFail"));
                    ok = false;
                }
            }

            // Start ContainerBackgroundProcessor thread
            super.threadStart();
        } finally {
            // Unbinding thread
            unbindThread(oldCCL);
        }

        // Set available status depending upon startup success
        if (ok) {
            if (log.isDebugEnabled())
                log.debug("Starting completed");
        } else {
            log.error(sm.getString("standardContext.startFailed", getName()));
        }

        startTime=System.currentTimeMillis();

        // Send j2ee.state.running notification
        if (ok && (this.getObjectName() != null)) {
            Notification notification =
                new Notification("j2ee.state.running", this.getObjectName(),
                                 sequenceNumber.getAndIncrement());
            broadcaster.sendNotification(notification);
        }

        // The WebResources implementation caches references to JAR files. On
        // some platforms these references may lock the JAR files. Since web
        // application start is likely to have read from lots of JARs, trigger
        // a clean-up now.
        getResources().gc();

        // Reinitializing if something went wrong
        if (!ok) {
            setState(LifecycleState.FAILED);
        } else {
            setState(LifecycleState.STARTING);
        }
    }
折叠 
```

上面的代码有4处重点：调用ServletContainerInitializers、启用Listener、启用Filter和启用startup的Servlet。这个和我们平时对Tomcat启动流程的认知是一致的。

到这里整个Container组件（包括Engine、Host、Context和Wrapper组件）的start方法调用就结束了。接下来是Connector和Mapper组件的start。

```java
//MapperListenner的startInternal
public void startInternal() throws LifecycleException {

        setState(LifecycleState.STARTING);

        Engine engine = service.getContainer();
        if (engine == null) {
            return;
        }

        findDefaultHost();

        addListeners(engine);

        Container[] conHosts = engine.findChildren();
        for (Container conHost : conHosts) {
            Host host = (Host) conHost;
            if (!LifecycleState.NEW.equals(host.getState())) {
                // Registering the host will register the context and wrappers
                registerHost(host);
            }
        }
    }
```

以上方法的主要作用是将Host组件和域名映射起来。

最后看下Connector组件的start：

```java
protected void startInternal() throws LifecycleException {

        // Validate settings before starting
        if (getPortWithOffset() < 0) {
            throw new LifecycleException(sm.getString(
                    "coyoteConnector.invalidPort", Integer.valueOf(getPortWithOffset())));
        }

        setState(LifecycleState.STARTING);

        try {
            //促发protocolHandler组件的start，最后促发endpoint组件的start
            //触发endpoint时会建立exceutor线程池，默认的话核心线程数10，最大线程数200
            //建立poller线程，最大是2个线程，如果你机器cpu的核数小于2的话就建立1个
            //建立accetpor线程，默认是1个（可以看看Acceptor这个类的源代码，了解下怎么接收请求的）
            protocolHandler.start();
        } catch (Exception e) {
            throw new LifecycleException(
                    sm.getString("coyoteConnector.protocolHandlerStartFailed"), e);
        }
    }
```

通过以上一些列复杂的调用过程，最终执行完所有在server.xml里配置的节点的实现类中initInternal和startInternal方法。上面提到的org.apache.catalina.core.StandardServer、org.apache.catalina.core.StandardService、org.apache.catalina.connector.Connector、org.apache.catalina.core.StandardEngine、org.apache.catalina.core.StandardHost、org.apache.catalina.core.StandardContext等等组件的这两个方法都会调用到。

至此，Tomcat已经能开始响应浏览器发过来的请求了。至于具体的Tomcat响应请求流程会在后续博客中介绍。

## 5. 总结[#](https://www.cnblogs.com/54chensongxia/p/13236745.html#5-总结)

看了整个启动流程，虽然逻辑是比较清楚的，但是流程比较上，所以有必要做下总结：

- step1：Bootstrap作为整个Tomcat主启动类，最主要的功能是创建Catalina对象，并调用它的load和start方法；

- step2：Catalina的load方法的作用主要是解析conf/server.xml，生成StandardServer对象（此时生成StandardServer对象中已经包含了各种子组件，比如StandardService、StandardEngine等），再触发StandardServer的init方法；Catalina的start方法又触发了StandardServer的start方法；

- step3：StandardServer的init方法和start方法会依次触发各个子组件的initInternal和startInternal方法。大致的触发顺序是：

  Engine组件的initInternal（这边要注意的是Engine组件并没有触发它的子组件Host、Context和Wrapper的initInternal）-->Executor组件initInternal（处理请求的工作线程池）-->Mapper组件初始化（mapper组件初始化也没干什么重要的操作，也没触发其他子组件初始化）-->Connector组件初始化（检查连接器的protocolHandler的子组件，并**触发其初始化**）-->ProtocolHandler组件初始化(**触发Endpoint组件初始化**)

 Engine组件的startInternal（主要作用是触发Host组件的start）-->Host组件的startInternal（主要作用是触发Context组件的startInternal）-->Contextz组件的startInternal（加载调用ServletContainerInitializers、加载Listener、加载filtr和startup的Servlet，并且触发Wrapper组件的startInternal）-->Wrapper组件的startInternal（加载映射Servlet）-->Mapper组件的startInternal（将域名和Host组件映射起来）-->Connector组件的startInternal（protocolHandler组件的start，最后促发endpoint组件的start）

[![img](https://img2020.cnblogs.com/blog/1775037/202007/1775037-20200704220716365-1370663428.png)](https://img2020.cnblogs.com/blog/1775037/202007/1775037-20200704220716365-1370663428.png)

## 参考[#](https://www.cnblogs.com/54chensongxia/p/13236745.html#参考)

- [Tomcat详细知识点](https://blog.csdn.net/m0_38060977/article/details/104100839)
- [Tomcat知识贴汇总](https://blog.csdn.net/m0_38060977/category_9686479.html)