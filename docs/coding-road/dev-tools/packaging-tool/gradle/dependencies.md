# gradle依赖

## 依赖类型

dependencies DSL标签是标准Gradle API中的一部分，而不是Android Gradle插件的特性，所以它不属于android标签。

依赖有三种方式，如下面的例子：

```
apply plugin: 'com.android.application'

android { ... }

dependencies {
    // Dependency on a local library module
    implementation project(":mylibrary")

    // Dependency on local binaries
    implementation fileTree(dir: 'libs', include: ['*.jar'])

    // Dependency on a remote binary
    implementation 'com.example.android:app-magic:12.3'
}
复制代码
```

### 1. 本地library模块依赖

```
implementation project(":mylibrary")

```

这种依赖方式是直接依赖本地库工程代码的（需要注意的是，mylibrary的名字必须匹配在`settings.gradle`中include标签下定义的模块名字）。

### 2. 本地二进制依赖

```
implementation fileTree(dir: 'libs', include: ['*.jar'])

```

这种依赖方式是依赖工程中的 `module_name/libs/目录下的Jar文件`（注意Gradle的路径是相对于build.gradle文件来读取的，所以上面是这样的相对路径）。

如果只想依赖单个特定本地二进制库，可以如下配置：

```
implementation files('libs/foo.jar', 'libs/bar.jar')

```

### 3. 远程二进制依赖

```
implementation 'com.example.android:app-magic:12.3'

```

上面是简写的方式，这种依赖完整的写法如下：

```
implementation group: 'com.example.android', name: 'app-magic', version: '12.3'

```

`group`、`name`、`version` 共同定位一个远程依赖库。需要注意的点是，`version` 最好不要写成"12.3+"这种方式，除非有明确的预期，因为非预期的版本更新会带来构建问题。远程依赖需要在`repositories`标签下声明远程仓库，例如`jcenter()`、`google()`、`maven`仓库等。

## 依赖配置

目前Gradle版本支持的依赖配置有：`implementation`、`api`、`compileOnly`、`runtimeOnly` 和 `annotationProcessor`，已经废弃的配置有：`compile`、`provided`、`apk`、`providedCompile`。此外依赖配置还可以加一些配置项，例如`AndroidTestImplementation`、`debugApi`等等。

常用的是`implementation`、`api`、`compileOnly`三个依赖配置，含义如下：

| 配置名称                                        | 描述                                                         |
| :---------------------------------------------- | :----------------------------------------------------------- |
| `api`                                           | 与compile对应，功能完全一样，会添加依赖到编译路径，并且会将依赖打包到输出（aar或apk），与implementation不同，这个依赖可以传递，其他module无论在编译时和运行时都可以访问这个依赖的实现，也就是会泄漏一些不应该不使用的实现。举个例子，A依赖B，B依赖C，如果都是使用api配置的话，A可以直接使用C中的类（编译时和运行时），而如果是使用implementation配置的话，在编译时，A是无法访问C中的类的。 |
| `implementation`                                | 与compile对应，会添加依赖到编译路径，并且会将依赖打包到输出（aar或apk），但是在编译时不会将依赖的实现暴露给其他module，也就是只有在运行时其他module才能访问这个依赖中的实现。使用这个配置，可以显著提升构建时间，因为它可以减少重新编译的module的数量。建议，尽量使用这个依赖配置。 |
| `compileOnly`                                   | 与provided对应，Gradle把依赖加到编译路径，编译时使用，不会打包到输出（aar或apk）。这可以减少输出的体积，在只在编译时需要，在运行时可选的情况，很有用。例如lombok |
| `compileOnlyApi`（6.7后添加入java-library插件） | 在compileOnly之上，加上api，表示这是可以被传递的。           |
| `annotationProcessor`                           | 与compile对应，用于注解处理器的依赖配置，这个没用过。        |
| `runtimeOnly`                                   | 与apk对应，gradle添加依赖只打包到APK，运行时使用，但不会添加到编译路径。这个没有使用过。 |
| `testImplementation`                            | 这是您声明用于编译测试的依赖项的地方。                       |
| `testCompileOnly`                               | 这是您声明依赖项的地方，这些依赖项仅在测试编译时需要，但不应泄漏到运行时。这通常包括在运行时发现时被遮蔽的依赖项。 |
| `testRuntimeOnly`                               | 这是您声明依赖项的地方，这些依赖项仅在测试运行时需要，而不是在测试编译时需要。 |
|                                                 |                                                              |

> api/compile 的依赖会被传递，注意有些依赖可能是公共管理版本的

## 查看依赖树

可以查看单个module或者这个project的依赖，通过运行依赖的Gradle任务，如下：

1、`View` -> `Tools Windows` -> `Gradle`（`或者点击右侧的Gradle栏`）；

2、展开 `AppName` -> `Tasks` -> `android`，然后双击运行`AndroidDependencies`。运行完，就会在Run窗口打出依赖树了。

## 如何排除依赖

### **1、dependencies中排除（细粒度）**

```
compile('com.taobao.android:accs-huawei:1.1.2@aar') {
        transitive = true
        exclude group: 'com.taobao.android', module: 'accs_sdk_taobao'
}
```

### **2、全局配置排除**

```
configurations {
    compile.exclude module: 'cglib'
    //全局排除原有的tnet jar包与so包分离的配置，统一使用aar包中的内容
    all*.exclude group: 'com.taobao.android', module: 'tnet-jni'
    all*.exclude group: 'com.taobao.android', module: 'tnet-so'
}
```

### **3、禁用依赖传递**

```
compile('com.zhyea:ar4j:1.0') {
    transitive = false
}

configurations.all {
    transitive = false
}
```

还可以在单个依赖项中使用@jar标识符忽略传递依赖：

```
compile 'com.zhyea:ar4j:1.0@jar'
```

### **4、强制使用某个版本**

如果某个依赖项是必需的，而又存在依赖冲突时，此时没必要逐个进行排除，可以使用`force`属性标识需要进行依赖统一。当然这也是可以全局配置的：

```
compile('com.zhyea:ar4j:1.0') {
    force = true
}

configurations.all {
    resolutionStrategy {
        force 'org.hamcrest:hamcrest-core:1.3'
    }
}
```

### **5、在打包时排除依赖**

先看一个示例：

```
task zip(type: Zip) {
    into('lib') {
        from(configurations.runtime) {
            exclude '*unwanted*', '*log*'
        }
    }
    into('') {
        from jar
        from 'doc'
    }
}
```

代码表示在打zip包的时候会过滤掉名称中包含`“unwanted”`和`“log”`的jar包。这里调用的exclude方法的参数和前面的例子不太一样，前面的参数多是map结构，这里则是一个正则表达式字符串。

也可以使用在打包时调用include方法选择只打包某些需要的依赖项：

```
task zip(type: Zip) {
    into('lib') {
        from(configurations.runtime) {
            include '*ar4j*', '*spring*'
        }
    }
    into('') {
        from jar
        from 'doc'
    }
}
```

主要是使用dependencies中排除和全局配置排除。

