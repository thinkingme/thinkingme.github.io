---
category:
  - Java企业级开发
tag:
  - Git
  - gitsubmodule
---

# gitsubmodule 使用

## 背景：

一个项目经过长时间的发展，项目中存在很多冗余代码和重复配置。所以我们可以使用 gitsubmodule 抽离出公共部分，以解决这个问题。

## 步骤:

### 1.分离项目

抽出公共部分，把公共部分放到一个新的项目中。

### 2.使用 git submodule

将所有系统中公共的类库和通用的配置，放到独立的仓库 app-server-platform。因为我们用 git 来管理代码，而 git 本身提倡多 branch，多仓库，所以采用 git submodule 方式，其它项目需要添加 app-server-platform 这个 submodule：

`git submodule add yourGitRepo common`
最后的”common”是自定义的，意思就是在当前的 common 名字来当作 submodule 的 clone。

### 3.克隆含有子模块的项目

如果你 clone 别的带有 submodule 的项目时，默认情况下，当前的 project 并不会把 submodule 的代码都 clone 下来，可以执行：
你必须运行两个命令：`git submodule init` 用来初始化本地配置文件，而 `git submodule update` 则从该项目中抓取所有数据并检出父项目中列出的合适的提交。

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
以下这段一般大家经常会遇到： 当你 clone 项目时，submodule 会以最新的 master 分支上的 commit id 作为本次的 tag 下载，类似一个副本，因为一般大家都是用 submodule，而不是修改它。所以当你的 submodule 需要更新的时候，需要先执行这段代码：

`git submodule foreach git checkout master`
让 submodule 切换到 master 分支了，然后就可以用上面的 submodule pull 来更新了。

### 5.gradle 构建：

鉴于上文对 gradle 优点的描述，我们采用 gradle 来构建。我们的项目最初都是基于 maven 来构建的，从 maven 切换到 gradle 很简单，在项目根目录下，先执行（假设你的机器已经安装了 gradle 环境，一般负责构建的人首次需要安装，开发人员可以不安装）：

`gradle init wrapper`
这样，就会自动生成相关的 gradlew，build.gradle，settings.gradle 等文件和相关目录，并会自动下载对应版本的 gradle binary 包（所以以后不需要安装）。Gradle 会自动识别 Maven 里的配置，并相应的导入进来，有少量部分配置可能需要修改。

注：在已有的 gradle 项目里，尽量使用生成的 gradlew 这个 wrapper，因为它会自动下载对应版本的 Gradle，也就是说团队合作的其他人开发机上是不需要手动安装 Gradle 的，并且 wrapper 也让大家的 Gradle 版本一致，避免问题。

### 6.gradle 脚本修改

上面执行完之后，环境已经准备好了，现在要做的就是修改构建脚本： 因为已经通过 git submodule 把公共项目放到独立目录（common）了，并且它本身也是独立可构建的项目，那么也就是说当前有两个项目了，一个是当前 project，一个是 common 项目，要做的就是告诉 gradle，要多项目构建，编辑 settings.gradle，增加项目配置：
`include "common"`
如果你的 common 项目是多个项目的共同项目，那么可以在 common 项目的 settings.gradle 里面增加 include，比如：
`include "common:xxxx"`
在 build.gradle 里面，增加项目配置：
`compile project(":common:xxxx")`

## 扩展阅读

[Git 工具 - 子模块](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97)
