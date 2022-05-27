---
category:
  - Java企业级开发
tag:
  - Git
  - gitsubmodule
---
# gitsubmodule使用

## 背景：

一个项目经过长时间的发展，项目中存在很多冗余代码和重复配置。所以我们可以使用gitsubmodule抽离出公共部分，以解决这个问题。

## 步骤:

### 1.分离项目
抽出公共部分，把公共部分放到一个新的项目中。
### 2.使用git submodule
将所有系统中公共的类库和通用的配置，放到独立的仓库app-server-platform。因为我们用git来管理代码，而git本身提倡多branch，多仓库，所以采用git submodule方式，其它项目需要添加app-server-platform这个submodule：

`git submodule add yourGitRepo common`
最后的”common”是自定义的，意思就是在当前的common名字来当作submodule的clone。

### 3.克隆含有子模块的项目
如果你clone别的带有submodule的项目时，默认情况下，当前的project并不会把submodule的代码都clone下来，可以执行：
你必须运行两个命令：git submodule init 用来初始化本地配置文件，而 git submodule update 则从该项目中抓取所有数据并检出父项目中列出的合适的提交。
```shell
$ git submodule init
Submodule 'DbConnector' (https://github.com/chaconinc/DbConnector) registered for path 'DbConnector'
$ git submodule update
Cloning into 'DbConnector'...
remote: Counting objects: 11, done.
remote: Compressing objects: 100% (10/10), done.
remote: Total 11 (delta 0), reused 11 (delta 0)
Unpacking objects: 100% (11/11), done.
Checking connectivity... done.
Submodule path 'DbConnector': checked out 'c3f01dc8862123d317dd46284b05b6892c7b29bc'
```
现在 DbConnector 子目录是处在和之前提交时相同的状态了。

不过还有更简单一点的方式。 如果给 git clone 命令传递 `--recurse-submodules` 选项，它就会自动初始化并更新仓库中的每一个子模块， 包括可能存在的嵌套子模块。

```shell
$ git clone --recurse-submodules https://github.com/chaconinc/MainProject
Cloning into 'MainProject'...
remote: Counting objects: 14, done.
remote: Compressing objects: 100% (13/13), done.
remote: Total 14 (delta 1), reused 13 (delta 0)
Unpacking objects: 100% (14/14), done.
Checking connectivity... done.
Submodule 'DbConnector' (https://github.com/chaconinc/DbConnector) registered for path 'DbConnector'
Cloning into 'DbConnector'...
remote: Counting objects: 11, done.
remote: Compressing objects: 100% (10/10), done.
remote: Total 11 (delta 0), reused 11 (delta 0)
Unpacking objects: 100% (11/11), done.
Checking connectivity... done.
Submodule path 'DbConnector': checked out 'c3f01dc8862123d317dd46284b05b6892c7b29bc'
```
如果你已经克隆了项目但忘记了 `--recurse-submodules`，那么可以运行 `git submodule update --init` 将 git submodule init 和 git submodule update 合并成一步。如果还要初始化、抓取并检出任何嵌套的子模块， 请使用简明的 `git submodule update --init --recursive`。

### 4.更新子模块
`git submodule foreach git pull`
以下这段一般大家经常会遇到： 当你clone项目时，submodule会以最新的master分支上的commit id作为本次的tag下载，类似一个副本，因为一般大家都是用submodule，而不是修改它。所以当你的submodule需要更新的时候，需要先执行这段代码：

`git submodule foreach git checkout master`
让submodule切换到master分支了，然后就可以用上面的submodule pull来更新了。
### 5.gradle构建：
鉴于上文对gradle优点的描述，我们采用gradle来构建。我们的项目最初都是基于maven来构建的，从maven切换到gradle很简单，在项目根目录下，先执行（假设你的机器已经安装了gradle环境，一般负责构建的人首次需要安装，开发人员可以不安装）：

`gradle init wrapper`
这样，就会自动生成相关的gradlew，build.gradle，settings.gradle等文件和相关目录，并会自动下载对应版本的gradle binary包（所以以后不需要安装）。Gradle会自动识别Maven里的配置，并相应的导入进来，有少量部分配置可能需要修改。

注：在已有的gradle项目里，尽量使用生成的gradlew这个wrapper，因为它会自动下载对应版本的Gradle，也就是说团队合作的其他人开发机上是不需要手动安装Gradle的，并且wrapper也让大家的Gradle版本一致，避免问题。

### 6.gradle脚本修改
上面执行完之后，环境已经准备好了，现在要做的就是修改构建脚本： 因为已经通过git submodule把公共项目放到独立目录（common）了，并且它本身也是独立可构建的项目，那么也就是说当前有两个项目了，一个是当前project，一个是common项目，要做的就是告诉gradle，要多项目构建，编辑settings.gradle，增加项目配置：
`include "common"`
如果你的common项目是多个项目的共同项目，那么可以在common项目的settings.gradle里面增加include，比如：
`include "common:xxxx"`
在build.gradle里面，增加项目配置：
`compile project(":common:xxxx")`

## 扩展阅读
[Git 工具 - 子模块](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97)



