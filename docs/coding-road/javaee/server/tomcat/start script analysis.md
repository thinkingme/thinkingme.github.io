# [Tomcat 的启动脚本startup.bat 源码简析](https://www.cnblogs.com/54chensongxia/p/13234398.html)

Tomcat是一款我们平时开发过程中最常用到的Servlet容器。本系列博客会记录Tomcat的整体架构、主要组件、IO线程模型、请求在Tomcat内部的流转过程以及一些Tomcat调优的相关知识。

力求达到以下几个目的：

- 更加熟悉Tomcat的工作机制，工作中遇到Tomcat相关问题能够快速定位，从源头来解决；
- 对于一些高并发场景能够对Tomcat进行调优；
- 通过对Tomcat源码的分析，吸收一些Tomcat的设计的理念，应用到自己的软件开发过程中。

------

Tomcat的启动和停止是通过startup.bat和shutdown.bat这两个脚本实现的。本篇博客就分析下这两个脚本的主要执行流程。

## 1. startup.bat脚本分析[#](https://www.cnblogs.com/54chensongxia/p/13234398.html#1-startupbat脚本分析)

```bash
//关闭命令自身输出
@echo off
//setlocal命令表示，这边对环境变量的修改只对当前脚本生效
setlocal
//检查CATALINA_HOME这个环境变量有没设置，如果有设置就使用设置的环境变量
//如果没设置，将CATALINA_HOME设置成当前目录。
//检测%CATALINA_HOME%\bin\catalina.bat这个脚本存不存在，不存在整合脚本结束，报错
rem Guess CATALINA_HOME if not defined
set "CURRENT_DIR=%cd%"
if not "%CATALINA_HOME%" == "" goto gotHome
set "CATALINA_HOME=%CURRENT_DIR%"
if exist "%CATALINA_HOME%\bin\catalina.bat" goto okHome
cd ..
set "CATALINA_HOME=%cd%"
cd "%CURRENT_DIR%"
:gotHome
if exist "%CATALINA_HOME%\bin\catalina.bat" goto okHome
echo The CATALINA_HOME environment variable is not defined correctly
echo This environment variable is needed to run this program
goto end
:okHome
//准备启动脚本
set "EXECUTABLE=%CATALINA_HOME%\bin\catalina.bat"

rem Check that target executable exists
if exist "%EXECUTABLE%" goto okExec
echo Cannot find "%EXECUTABLE%"
echo This file is needed to run this program
goto end
:okExec
//拼接catalina.bat这个脚本的命令行参数
rem Get remaining unshifted command line arguments and save them in the
set CMD_LINE_ARGS=
:setArgs
if ""%1""=="""" goto doneSetArgs
set CMD_LINE_ARGS=%CMD_LINE_ARGS% %1
shift
goto setArgs
:doneSetArgs
//执行catalina.bat这个脚本,执行start,并添加命令行参数
call "%EXECUTABLE%" start %CMD_LINE_ARGS%

:end

折叠 
```

整个startup.bat脚本很简单，**根据CATALINA_HOME检测catalina.bat是否存在，不存在的话就报错，存在的话拼接命令行参数然后执行catalina.bat这个脚本**。CATALINA_HOME这个环境变量的取值逻辑如下图所示：

[![img](https://img2020.cnblogs.com/blog/1775037/202007/1775037-20200704110458058-1023895656.png)](https://img2020.cnblogs.com/blog/1775037/202007/1775037-20200704110458058-1023895656.png)

如果环境变量设置了CATALINA_HOME，则直接使用环境变量设置的值作为Tomcat安装目录。假如未设置环境变量CATALINA_HOME，则以当前目录作为CATALINA_HOME。此时，如果%CATALINA_HOME%\bin\catalina.bat存在，则批处理或命令行当前目录作为CATALINA_HOME。假如%CATALINA_HOME%\bin\catalina.bat不存在，则把当前目录的上一级目录作为CATALINA_HOME，然后再判断%CATALINA_HOME%\bin\catalina.bat是否存在。如果存在，则上一级目录就是CATALINA_HOME；否则，提示找不到CATALINA_HOME环境变量并结束执行。

我们可以看出来，正真执行的脚本是catalina.bat这个脚本，那为什么还要整个startup.bat脚本呢？

其实这个startup.bat脚本就是提供给使用者用来修改的，我们可以在其中设置JAVA_HOME，CATALINA_HOME等环境变量，但我们并不需要深入到较为复杂的catalina.bat脚本中，这正是startup.bat脚本的真正用意所在。

我们知道，软件设计模式中有一个重要的原则就是开闭原则，即我们可以允许别人扩展我们的程序，但在程序发布后，我们拒绝任何修改，因为修改会产生新的Bug，使得我们已经Bug-free的程序又要重新测试。开闭原则是面向对象世界中的一个非常重要的原则，我们可以把这个原则从Java类扩展至源代码级别。startup脚本就是要求用户不要修改catalina.bat脚本，这是符合软件设计思想的。我们如果想要彻底贯彻这个重要的软件设计原则，可以写一个新脚本tomcat.bat，脚本内容大致如下：

```bash
set JAVA_HOME=C:\Program Files\Java\jdk1.5.0_09
set CATALINA_HOME=C:\carl\it\tomcat_research\jakarta-tomcat-5.0.28   
call %CATALINA_HOME%\bin\startup.bat  
```

这个tomcat.bat文件可以存放在任何目录并能执行，并且不需要修改tomcat自带的任何脚本及其它环境变量，这就彻底贯彻了开闭原则。

## 2. catalina.bat脚本简析[#](https://www.cnblogs.com/54chensongxia/p/13234398.html#2-catalinabat脚本简析)

当startup脚本完成环境变量的设置后，就开始调用catalina.bat脚本来启动Tomcat。**Catalina脚本的主要任务是根据环境变量和不同的命令行参数，拼凑出完整的java命令，调用Tomcat的主启动类org.apache.catalina.startup.Bootstrap来启动Tomcat**。

```bash
@echo off
rem ---------------------------------------------------------------------------
rem Start/Stop Script for the CATALINA Server
rem
rem Environment Variable Prerequisites
rem
rem   Do not set the variables in this script. Instead put them into a script
rem   setenv.bat in CATALINA_BASE/bin to keep your customizations separate.
rem
rem   WHEN RUNNING TOMCAT AS A WINDOWS SERVICE:
rem   Note that the environment variables that affect the behavior of this
rem   script will have no effect at all on Windows Services. As such, any
rem   local customizations made in a CATALINA_BASE/bin/setenv.bat script
rem   will also have no effect on Tomcat when launched as a Windows Service.
rem   The configuration that controls Windows Services is stored in the Windows
rem   Registry, and is most conveniently maintained using the "tomcatXw.exe"
rem   maintenance utility, where "X" is the major version of Tomcat you are
rem   running.
rem
rem   CATALINA_HOME   May point at your Catalina "build" directory.
rem
rem   CATALINA_BASE   (Optional) Base directory for resolving dynamic portions
rem                   of a Catalina installation.  If not present, resolves to
rem                   the same directory that CATALINA_HOME points to.
rem
rem   CATALINA_OPTS   (Optional) Java runtime options used when the "start",
rem                   "run" or "debug" command is executed.
rem                   Include here and not in JAVA_OPTS all options, that should
rem                   only be used by Tomcat itself, not by the stop process,
rem                   the version command etc.
rem                   Examples are heap size, GC logging, JMX ports etc.
rem
rem   CATALINA_TMPDIR (Optional) Directory path location of temporary directory
rem                   the JVM should use (java.io.tmpdir).  Defaults to
rem                   %CATALINA_BASE%\temp.
rem
rem   JAVA_HOME       Must point at your Java Development Kit installation.
rem                   Required to run the with the "debug" argument.
rem
rem   JRE_HOME        Must point at your Java Runtime installation.
rem                   Defaults to JAVA_HOME if empty. If JRE_HOME and JAVA_HOME
rem                   are both set, JRE_HOME is used.
rem
rem   JAVA_OPTS       (Optional) Java runtime options used when any command
rem                   is executed.
rem                   Include here and not in CATALINA_OPTS all options, that
rem                   should be used by Tomcat and also by the stop process,
rem                   the version command etc.
rem                   Most options should go into CATALINA_OPTS.
rem
rem   JPDA_TRANSPORT  (Optional) JPDA transport used when the "jpda start"
rem                   command is executed. The default is "dt_socket".
rem
rem   JPDA_ADDRESS    (Optional) Java runtime options used when the "jpda start"
rem                   command is executed. The default is localhost:8000.
rem
rem   JPDA_SUSPEND    (Optional) Java runtime options used when the "jpda start"
rem                   command is executed. Specifies whether JVM should suspend
rem                   execution immediately after startup. Default is "n".
rem
rem   JPDA_OPTS       (Optional) Java runtime options used when the "jpda start"
rem                   command is executed. If used, JPDA_TRANSPORT, JPDA_ADDRESS,
rem                   and JPDA_SUSPEND are ignored. Thus, all required jpda
rem                   options MUST be specified. The default is:
rem
rem                   -agentlib:jdwp=transport=%JPDA_TRANSPORT%,
rem                       address=%JPDA_ADDRESS%,server=y,suspend=%JPDA_SUSPEND%
rem
rem   JSSE_OPTS       (Optional) Java runtime options used to control the TLS
rem                   implementation when JSSE is used. Default is:
rem                   "-Djdk.tls.ephemeralDHKeySize=2048"
rem
rem   LOGGING_CONFIG  (Optional) Override Tomcat's logging config file
rem                   Example (all one line)
rem                   set LOGGING_CONFIG="-Djava.util.logging.config.file=%CATALINA_BASE%\conf\logging.properties"
rem
rem   LOGGING_MANAGER (Optional) Override Tomcat's logging manager
rem                   Example (all one line)
rem                   set LOGGING_MANAGER="-Djava.util.logging.manager=org.apache.juli.ClassLoaderLogManager"
rem
rem   TITLE           (Optional) Specify the title of Tomcat window. The default
rem                   TITLE is Tomcat if it's not specified.
rem                   Example (all one line)
rem                   set TITLE=Tomcat.Cluster#1.Server#1 [%DATE% %TIME%]
rem ---------------------------------------------------------------------------

setlocal

rem Suppress Terminate batch job on CTRL+C
if not ""%1"" == ""run"" goto mainEntry
if "%TEMP%" == "" goto mainEntry
if exist "%TEMP%\%~nx0.run" goto mainEntry
echo Y>"%TEMP%\%~nx0.run"
if not exist "%TEMP%\%~nx0.run" goto mainEntry
echo Y>"%TEMP%\%~nx0.Y"
call "%~f0" %* <"%TEMP%\%~nx0.Y"
rem Use provided errorlevel
set RETVAL=%ERRORLEVEL%
del /Q "%TEMP%\%~nx0.Y" >NUL 2>&1
exit /B %RETVAL%
:mainEntry
del /Q "%TEMP%\%~nx0.run" >NUL 2>&1

//防止用户直接执行catalina.bat这个脚本，再次检测下CATALINA_HOME环境变量
//检测catalina.bat这个脚本存不存在
rem Guess CATALINA_HOME if not defined
set "CURRENT_DIR=%cd%"
if not "%CATALINA_HOME%" == "" goto gotHome
set "CATALINA_HOME=%CURRENT_DIR%"
if exist "%CATALINA_HOME%\bin\catalina.bat" goto okHome
cd ..
set "CATALINA_HOME=%cd%"
cd "%CURRENT_DIR%"
:gotHome

if exist "%CATALINA_HOME%\bin\catalina.bat" goto okHome
echo The CATALINA_HOME environment variable is not defined correctly
echo This environment variable is needed to run this program
goto end
:okHome

//检测CATALINA_BASE是否存在，不存在就设置成和CATALINA_HOME一致
rem Copy CATALINA_BASE from CATALINA_HOME if not defined
if not "%CATALINA_BASE%" == "" goto gotBase
set "CATALINA_BASE=%CATALINA_HOME%"
:gotBase

rem Ensure that neither CATALINA_HOME nor CATALINA_BASE contains a semi-colon
rem as this is used as the separator in the classpath and Java provides no
rem mechanism for escaping if the same character appears in the path. Check this
rem by replacing all occurrences of ';' with '' and checking that neither
rem CATALINA_HOME nor CATALINA_BASE have changed
if "%CATALINA_HOME%" == "%CATALINA_HOME:;=%" goto homeNoSemicolon
echo Using CATALINA_HOME:   "%CATALINA_HOME%"
echo Unable to start as CATALINA_HOME contains a semicolon (;) character
goto end
:homeNoSemicolon

if "%CATALINA_BASE%" == "%CATALINA_BASE:;=%" goto baseNoSemicolon
echo Using CATALINA_BASE:   "%CATALINA_BASE%"
echo Unable to start as CATALINA_BASE contains a semicolon (;) character
goto end
:baseNoSemicolon

rem Ensure that any user defined CLASSPATH variables are not used on startup,
rem but allow them to be specified in setenv.bat, in rare case when it is needed.
set CLASSPATH=

//如果%CATALINA_BASE%\bin\setenv.bat存在，执行setenv.bat这个脚本,不存在
//执行%CATALINA_HOME%\bin\setenv.bat这个脚本来设置环境变量
rem Get standard environment variables
if not exist "%CATALINA_BASE%\bin\setenv.bat" goto checkSetenvHome
call "%CATALINA_BASE%\bin\setenv.bat"
goto setenvDone
:checkSetenvHome
if exist "%CATALINA_HOME%\bin\setenv.bat" call "%CATALINA_HOME%\bin\setenv.bat"
:setenvDone

//如果%CATALINA_HOME%\bin\setclasspath.bat存在，执行setclasspath.bat，这个脚本的主要作用是检测
//JAVA_HOME有没有正确设置
rem Get standard Java environment variables
if exist "%CATALINA_HOME%\bin\setclasspath.bat" goto okSetclasspath
echo Cannot find "%CATALINA_HOME%\bin\setclasspath.bat"
echo This file is needed to run this program
goto end
:okSetclasspath
call "%CATALINA_HOME%\bin\setclasspath.bat" %1
if errorlevel 1 goto end

//将bootstrap.jar加入classpath
rem Add on extra jar file to CLASSPATH
rem Note that there are no quotes as we do not want to introduce random
rem quotes into the CLASSPATH
if "%CLASSPATH%" == "" goto emptyClasspath
set "CLASSPATH=%CLASSPATH%;"
:emptyClasspath
set "CLASSPATH=%CLASSPATH%%CATALINA_HOME%\bin\bootstrap.jar"

//设置CATALINA_TMPDIR=%CATALINA_BASE%\temp
if not "%CATALINA_TMPDIR%" == "" goto gotTmpdir
set "CATALINA_TMPDIR=%CATALINA_BASE%\temp"
:gotTmpdir

//将tomcat-juli.jar加入classpath
rem Add tomcat-juli.jar to classpath
rem tomcat-juli.jar can be over-ridden per instance
if not exist "%CATALINA_BASE%\bin\tomcat-juli.jar" goto juliClasspathHome
set "CLASSPATH=%CLASSPATH%;%CATALINA_BASE%\bin\tomcat-juli.jar"
goto juliClasspathDone
:juliClasspathHome
set "CLASSPATH=%CLASSPATH%;%CATALINA_HOME%\bin\tomcat-juli.jar"
:juliClasspathDone

//如果没有设置JSSE_OPTS，JSSE_OPTS="-Djdk.tls.ephemeralDHKeySize=2048"
//再将JAVA_OPTS设置成"JAVA_OPTS=%JAVA_OPTS% %JSSE_OPTS%"
if not "%JSSE_OPTS%" == "" goto gotJsseOpts
set JSSE_OPTS="-Djdk.tls.ephemeralDHKeySize=2048"
:gotJsseOpts
set "JAVA_OPTS=%JAVA_OPTS% %JSSE_OPTS%"

rem Register custom URL handlers
rem Do this here so custom URL handles (specifically 'war:...') can be used in the security policy
set "JAVA_OPTS=%JAVA_OPTS% -Djava.protocol.handler.pkgs=org.apache.catalina.webresources"

//将日志配置文件设置成logging.properties
if not "%LOGGING_CONFIG%" == "" goto noJuliConfig
set LOGGING_CONFIG=-Dnop
if not exist "%CATALINA_BASE%\conf\logging.properties" goto noJuliConfig
set LOGGING_CONFIG=-Djava.util.logging.config.file="%CATALINA_BASE%\conf\logging.properties"
:noJuliConfig

//配置默认的LOGGING_MANAGER
if not "%LOGGING_MANAGER%" == "" goto noJuliManager
set LOGGING_MANAGER=-Djava.util.logging.manager=org.apache.juli.ClassLoaderLogManager
:noJuliManager

rem ----- Execute The Requested Command ---------------------------------------

echo Using CATALINA_BASE:   "%CATALINA_BASE%"
echo Using CATALINA_HOME:   "%CATALINA_HOME%"
echo Using CATALINA_TMPDIR: "%CATALINA_TMPDIR%"
if ""%1"" == ""debug"" goto use_jdk
echo Using JRE_HOME:        "%JRE_HOME%"
goto java_dir_displayed
:use_jdk
echo Using JAVA_HOME:       "%JAVA_HOME%"
:java_dir_displayed
echo Using CLASSPATH:       "%CLASSPATH%"

set _EXECJAVA=%_RUNJAVA%
set MAINCLASS=org.apache.catalina.startup.Bootstrap
set ACTION=start
set SECURITY_POLICY_FILE=
set DEBUG_OPTS=
set JPDA=

if not ""%1"" == ""jpda"" goto noJpda
set JPDA=jpda
if not "%JPDA_TRANSPORT%" == "" goto gotJpdaTransport
set JPDA_TRANSPORT=dt_socket
:gotJpdaTransport
if not "%JPDA_ADDRESS%" == "" goto gotJpdaAddress
set JPDA_ADDRESS=localhost:8000
:gotJpdaAddress
if not "%JPDA_SUSPEND%" == "" goto gotJpdaSuspend
set JPDA_SUSPEND=n
:gotJpdaSuspend
if not "%JPDA_OPTS%" == "" goto gotJpdaOpts
set JPDA_OPTS=-agentlib:jdwp=transport=%JPDA_TRANSPORT%,address=%JPDA_ADDRESS%,server=y,suspend=%JPDA_SUSPEND%
:gotJpdaOpts
shift
:noJpda

if ""%1"" == ""debug"" goto doDebug
if ""%1"" == ""run"" goto doRun
if ""%1"" == ""start"" goto doStart
if ""%1"" == ""stop"" goto doStop
if ""%1"" == ""configtest"" goto doConfigTest
if ""%1"" == ""version"" goto doVersion

echo Usage:  catalina ( commands ... )
echo commands:
echo   debug             Start Catalina in a debugger
echo   debug -security   Debug Catalina with a security manager
echo   jpda start        Start Catalina under JPDA debugger
echo   run               Start Catalina in the current window
echo   run -security     Start in the current window with security manager
echo   start             Start Catalina in a separate window
echo   start -security   Start in a separate window with security manager
echo   stop              Stop Catalina
echo   configtest        Run a basic syntax check on server.xml
echo   version           What version of tomcat are you running?
goto end

:doDebug
shift
set _EXECJAVA=%_RUNJDB%
set DEBUG_OPTS=-sourcepath "%CATALINA_HOME%\..\..\java"
if not ""%1"" == ""-security"" goto execCmd
shift
echo Using Security Manager
set "SECURITY_POLICY_FILE=%CATALINA_BASE%\conf\catalina.policy"
goto execCmd

:doRun
shift
if not ""%1"" == ""-security"" goto execCmd
shift
echo Using Security Manager
set "SECURITY_POLICY_FILE=%CATALINA_BASE%\conf\catalina.policy"
goto execCmd

:doStart
shift
if "%TITLE%" == "" set TITLE=Tomcat
set _EXECJAVA=start "%TITLE%" %_RUNJAVA%
if not ""%1"" == ""-security"" goto execCmd
shift
echo Using Security Manager
set "SECURITY_POLICY_FILE=%CATALINA_BASE%\conf\catalina.policy"
goto execCmd

:doStop
shift
set ACTION=stop
set CATALINA_OPTS=
goto execCmd

:doConfigTest
shift
set ACTION=configtest
set CATALINA_OPTS=
goto execCmd

:doVersion
%_EXECJAVA% -classpath "%CATALINA_HOME%\lib\catalina.jar" org.apache.catalina.util.ServerInfo
goto end


:execCmd
rem Get remaining unshifted command line arguments and save them in the
set CMD_LINE_ARGS=
:setArgs
if ""%1""=="""" goto doneSetArgs
set CMD_LINE_ARGS=%CMD_LINE_ARGS% %1
shift
goto setArgs
:doneSetArgs

rem Execute Java with the applicable properties
if not "%JPDA%" == "" goto doJpda
if not "%SECURITY_POLICY_FILE%" == "" goto doSecurity

//一般情况下都会执行到这个脚本语句
%_EXECJAVA% %LOGGING_CONFIG% %LOGGING_MANAGER% %JAVA_OPTS% %CATALINA_OPTS% %DEBUG_OPTS% -classpath "%CLASSPATH%" -Dcatalina.base="%CATALINA_BASE%" -Dcatalina.home="%CATALINA_HOME%" -Djava.io.tmpdir="%CATALINA_TMPDIR%" %MAINCLASS% %CMD_LINE_ARGS% %ACTION%
goto end
:doSecurity
%_EXECJAVA% %LOGGING_CONFIG% %LOGGING_MANAGER% %JAVA_OPTS% %CATALINA_OPTS% %DEBUG_OPTS% -classpath "%CLASSPATH%" -Djava.security.manager -Djava.security.policy=="%SECURITY_POLICY_FILE%" -Dcatalina.base="%CATALINA_BASE%" -Dcatalina.home="%CATALINA_HOME%" -Djava.io.tmpdir="%CATALINA_TMPDIR%" %MAINCLASS% %CMD_LINE_ARGS% %ACTION%
goto end
:doJpda
if not "%SECURITY_POLICY_FILE%" == "" goto doSecurityJpda
%_EXECJAVA% %LOGGING_CONFIG% %LOGGING_MANAGER% %JAVA_OPTS% %JPDA_OPTS% %CATALINA_OPTS% %DEBUG_OPTS% -classpath "%CLASSPATH%" -Dcatalina.base="%CATALINA_BASE%" -Dcatalina.home="%CATALINA_HOME%" -Djava.io.tmpdir="%CATALINA_TMPDIR%" %MAINCLASS% %CMD_LINE_ARGS% %ACTION%
goto end
:doSecurityJpda
%_EXECJAVA% %LOGGING_CONFIG% %LOGGING_MANAGER% %JAVA_OPTS% %JPDA_OPTS% %CATALINA_OPTS% %DEBUG_OPTS% -classpath "%CLASSPATH%" -Djava.security.manager -Djava.security.policy=="%SECURITY_POLICY_FILE%" -Dcatalina.base="%CATALINA_BASE%" -Dcatalina.home="%CATALINA_HOME%" -Djava.io.tmpdir="%CATALINA_TMPDIR%" %MAINCLASS% %CMD_LINE_ARGS% %ACTION%
goto end

:end

折叠 
```

总结下catalina.bat的整个执行流程：

- 检查并设置CATALINA_HOME环境变量，检测%CATALINA_HOME%\bin\catalina.bat这个脚本是否存在，不存在直接报错；
- 检测CATALINA_BASE是否存在，不存在就设置成和CATALINA_HOME一致；
- 如果%CATALINA_BASE%\bin\setenv.bat这个脚本存在，执行setenv.bat这个脚本,不存在的话执行%CATALINA_HOME%\bin\setenv.bat这个脚本来设置环境变量，都不存在继续往下执行；
- 如果%CATALINA_HOME%\bin\setclasspath.bat存在，执行setclasspath.bat，这个脚本的主要作用是检测
  JAVA_HOME有没有正确设置；
- 将bootstrap.jar加入classpath；
- 设置CATALINA_TMPDIR=%CATALINA_BASE%\temp；
- 将tomcat-juli.jar加入classpath；
- 如果没有设置环境变量JSSE_OPTS，默认设置JSSE_OPTS="-Djdk.tls.ephemeralDHKeySize=2048"
  再将JAVA_OPTS设置成"JAVA_OPTS=%JAVA_OPTS% %JSSE_OPTS%"
- 通过LOGGING_CONFIG变量，将日志配置文件设置成%CATALINA_BASE%\conf\logging.properties
- 配置默认的LOGGING_MANAGER；
- 拼写java执行命令。

拼接命令的代码主要是下面这段：

```bash
%_EXECJAVA% %LOGGING_CONFIG% %LOGGING_MANAGER% %JAVA_OPTS% %CATALINA_OPTS% %DEBUG_OPTS% -classpath "%CLASSPATH%" -Dcatalina.base="%CATALINA_BASE%" -Dcatalina.home="%CATALINA_HOME%" -Djava.io.tmpdir="%CATALINA_TMPDIR%" %MAINCLASS% %CMD_LINE_ARGS% %ACTION%
```

通过这段代码我们可以看到Tomcat在启动的时候配置了哪些参数。我们执行下面的命令：

```bash
startup.bat arg1 arg2
```

实际执行的命令如下：

```bash
"start "Tomcat" "C:\Program Files\Java\jdk1.8.0_73\bin\java.exe" -Djava.util.logging.config.file="D:\software\tomcat-64\apache-tomcat-9.0.0.M21-windows-x64 (1)\apache-tomcat-9.0.0.M21\conf\logging.properties" -Djava.util.logging.manager=org.apache.juli.ClassLoaderLogManager  "-Djdk.tls.ephemeralDHKeySize=2048" -Djava.protocol.handler.pkgs=org.apache.catalina.webresources   -classpath "D:\software\tomcat-64\apache-tomcat-9.0.0.M21-windows-x64 (1)\apache-tomcat-9.0.0.M21\bin\bootstrap.jar;D:\software\tomcat-64\apache-tomcat-9.0.0.M21-windows-x64 (1)\apache-tomcat-9.0.0.M21\bin\tomcat-juli.jar" -Dcatalina.base="D:\software\tomcat-64\apache-tomcat-9.0.0.M21-windows-x64 (1)\apache-tomcat-9.0.0.M21" -Dcatalina.home="D:\software\tomcat-64\apache-tomcat-9.0.0.M21-windows-x64 (1)\apache-tomcat-9.0.0.M21" -Djava.io.tmpdir="D:\software\tomcat-64\apache-tomcat-9.0.0.M21-windows-x64 (1)\apache-tomcat-9.0.0.M21\temp" org.apache.catalina.startup.Bootstrap arg1 arg2 start"
```

上面命令中开头的start Tomcat的意思是重新开启一个叫tomcat的窗口执行Java命令。

> 我们看到上面的代码中，有个jpda模式，它是Java平台调试体系结构，可以提供很方便的远程调试，一般情况下我们不会用到这个模式。如果我们想启动这个模式的话可以执行catalina.bat jpda start这个命令。这个模式下我们可以对另外的环境变量JPDA_OPTS进行配置。

## 3. 关于配置的一些建议[#](https://www.cnblogs.com/54chensongxia/p/13234398.html#3-关于配置的一些建议)

通过上面的脚本，我们可以看到在启动过程中我们可以配置很多环境变量。

- CATALINA_HOME：可以不配置，默认使用安装目录；
- CATALINA_BASE：建议不要自己配置，不配置的话会自动配置成和CATALINA_HOME一致；
- CATALINA_OPTS：可以配置；
- CATALINA_TMPDIR：建议不要自己配置，默认%CATALINA_BASE%\temp；
- JAVA_OPTS：可以配置；
- JSSE_OPTS：不建议自己配置，默认值-Djdk.tls.ephemeralDHKeySize=2048；
- LOGGING_CONFIG：建议不要自己配置，这个配置用于配置日志的配置文件，默认会使用LOGGING_CONFIG="-Djava.util.logging.config.file=%CATALINA_BASE%\conf\logging.properties"
- LOGGING_MANAGER：建议不要自己配置，默认会使用LOGGING_MANAGER="-Djava.util.logging.manager=org.apache.juli.ClassLoaderLogManager"

**通过上面介绍我们发现大多数配置都不需要我们自己进行配置，一般情况下我们只需要配置CATALINA_OPTS和JAVA_OPTS这两个配置选项就可以了。这两个参数都可以配置Java运行时所需的一些参数，下面给出两个列子。**

在startup脚本中添加配置：

```bash
//windows
set JAVA_OPTS=-server -Xms1024m -Xmx2048m -XX:PermSize=256m -XX:MaxPermSize=512m
//Linux
JAVA_OPTS="-server -Dfile.encoding=UTF-8 -Xms=512m -Xmx1024m -XX:PermSize=128m -XX:MaxPermSize=256m"
```

## 4. shutdown.bat脚本分析[#](https://www.cnblogs.com/54chensongxia/p/13234398.html#4-shutdownbat脚本分析)

```bash
setlocal

rem Guess CATALINA_HOME if not defined
set "CURRENT_DIR=%cd%"
if not "%CATALINA_HOME%" == "" goto gotHome
set "CATALINA_HOME=%CURRENT_DIR%"
if exist "%CATALINA_HOME%\bin\catalina.bat" goto okHome
cd ..
set "CATALINA_HOME=%cd%"
cd "%CURRENT_DIR%"
:gotHome
if exist "%CATALINA_HOME%\bin\catalina.bat" goto okHome
echo The CATALINA_HOME environment variable is not defined correctly
echo This environment variable is needed to run this program
goto end
:okHome

set "EXECUTABLE=%CATALINA_HOME%\bin\catalina.bat"

rem Check that target executable exists
if exist "%EXECUTABLE%" goto okExec
echo Cannot find "%EXECUTABLE%"
echo This file is needed to run this program
goto end
:okExec

rem Get remaining unshifted command line arguments and save them in the
set CMD_LINE_ARGS=
:setArgs
if ""%1""=="""" goto doneSetArgs
set CMD_LINE_ARGS=%CMD_LINE_ARGS% %1
shift
goto setArgs
:doneSetArgs
//这边是关键
call "%EXECUTABLE%" stop %CMD_LINE_ARGS%

:end
```

我们可以发现shutdown.bat的逻辑和startup.bat的逻辑是一样的，也是先设置CATALINA_HOME，拼接命令行参数，不一样是最后执行的是catalina.bat stop。

这边还是有必要来分析下Tomcat的关闭原理的。我们知道，Tomcat中的工作线程都是demo线程，如果没有一个主线程的话那么Tomcat会立即停止运行的。（前台线程死亡后，demo线程会自动消失。）那么Tomcat是在哪里启动的这个主线程的呢？**通过代码跟踪，我们发现是StandardServer这个类的await方法创建了这个主线程，这个线程hold了Tomcat程序不停止**。

```java
public void await() {
        // Negative values - don't wait on port - tomcat is embedded or we just don't like ports
        if (getPortWithOffset() == -2) {
            // undocumented yet - for embedding apps that are around, alive.
            return;
        }
        //
        if (getPortWithOffset() == -1) {
            try {
                awaitThread = Thread.currentThread();
                while(!stopAwait) {
                    try {
                        Thread.sleep( 10000 );
                    } catch( InterruptedException ex ) {
                        // continue and check the flag
                    }
                }
            } finally {
                awaitThread = null;
            }
            return;
        }

        // Set up a server socket to wait on
        try {
            awaitSocket = new ServerSocket(getPortWithOffset(), 1,
                    InetAddress.getByName(address));
        } catch (IOException e) {
            log.error(sm.getString("standardServer.awaitSocket.fail", address,
                    String.valueOf(getPortWithOffset()), String.valueOf(getPort()),
                    String.valueOf(getPortOffset())), e);
            return;
        }

        try {
            awaitThread = Thread.currentThread();

            // Loop waiting for a connection and a valid command
            while (!stopAwait) {
                ServerSocket serverSocket = awaitSocket;
                if (serverSocket == null) {
                    break;
                }

                // Wait for the next connection
                Socket socket = null;
                StringBuilder command = new StringBuilder();
                try {
                    InputStream stream;
                    long acceptStartTime = System.currentTimeMillis();
                    try {
                        socket = serverSocket.accept();
                        socket.setSoTimeout(10 * 1000);  // Ten seconds
                        stream = socket.getInputStream();
                    } catch (SocketTimeoutException ste) {
                        // This should never happen but bug 56684 suggests that
                        // it does.
                        log.warn(sm.getString("standardServer.accept.timeout",
                                Long.valueOf(System.currentTimeMillis() - acceptStartTime)), ste);
                        continue;
                    } catch (AccessControlException ace) {
                        log.warn("StandardServer.accept security exception: "
                                + ace.getMessage(), ace);
                        continue;
                    } catch (IOException e) {
                        if (stopAwait) {
                            // Wait was aborted with socket.close()
                            break;
                        }
                        log.error("StandardServer.await: accept: ", e);
                        break;
                    }

                    // Read a set of characters from the socket
                    int expected = 1024; // Cut off to avoid DoS attack
                    while (expected < shutdown.length()) {
                        if (random == null)
                            random = new Random();
                        expected += (random.nextInt() % 1024);
                    }
                    while (expected > 0) {
                        int ch = -1;
                        try {
                            ch = stream.read();
                        } catch (IOException e) {
                            log.warn("StandardServer.await: read: ", e);
                            ch = -1;
                        }
                        // Control character or EOF (-1) terminates loop
                        if (ch < 32 || ch == 127) {
                            break;
                        }
                        command.append((char) ch);
                        expected--;
                    }
                } finally {
                    // Close the socket now that we are done with it
                    try {
                        if (socket != null) {
                            socket.close();
                        }
                    } catch (IOException e) {
                        // Ignore
                    }
                }

                // Match against our command string
                boolean match = command.toString().equals(shutdown);
                if (match) {
                    log.info(sm.getString("standardServer.shutdownViaPort"));
                    break;
                } else
                    log.warn("StandardServer.await: Invalid command '"
                            + command.toString() + "' received");
            }
        } finally {
            ServerSocket serverSocket = awaitSocket;
            awaitThread = null;
            awaitSocket = null;

            // Close the server socket and return
            if (serverSocket != null) {
                try {
                    serverSocket.close();
                } catch (IOException e) {
                    // Ignore
                }
            }
        }
    }
折叠 
```

StandardServer默认监听的端口是8005端口（注意这个端口和Connector组件监听端口的区别），当发现监听到的连接的输入流中的内容与默认配置的值匹配（该值默认为字符串SHUTDOWN）则跳出循环。否则该方法会一直循环执行下去。所以只要没人向8005端口发送shutdown，这个线程就会一直运行，其他的守护线程也就不会消失。

当然我们可以将StandardServer的监听端口设置成-1（SpringBoot中内嵌的Tomcat就是这么做的），此时Tomcat不会再监听具体的端口，主线程会每10秒睡眠一次，知道我们手动将stopAwait设置为true。

知道了这个原理，我们只要将这个主线程结束掉，整个Tomcat程序就结束了。通过上面的分析，可以有两种方式来关闭Tomcat：

- 通过shutdown.bat脚本，这个脚本最终会调用到Catalina的stopServer方法，这个方法中创建了一个Socket，并向StandardServer监听的端口发送了一个shutdown命令，主线程接收到后就退出了，其他守护线程也随之结束；

如果我们将server.xml配置文件修改成：

```xml
<Server port="8005" shutdown="GET /SHUTDOWN HTTP/1.1"> 
```

这样直接在浏览器中输入http://localhost:8005/SHUTDOWN就可以关闭Tomcat了。

- 另外的一种方式就是直接调用StandardServer的stop方法。