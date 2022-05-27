---
category:
  - Java企业级开发
tag:
  - 辅助工具/轮子
---


# Warp：一款21世纪人用的终端工具

大家好，我是二哥呀！

程序员的一生，用的最多的两个工具，一个是代码编辑器（Code Editor），另外一个就是命令行终端工具（Terminal）。这两个工具对于提高开发效率至关重要。

代码编辑器在过去的 40 年里不断进化，从我上大学敲 Java 代码开始，就经历了 MyEclipse、NetBeans、Eclipse，到如今称王称霸的 Intellij IDEA。

但终端工具，基本上和上个世纪七八十年代差不多。

那本期给大家推荐的这款终端——Warp——绝对会让你大开眼界，用完爱不释手！

>还记得之前给大家推荐的 [Tabby](https://mp.weixin.qq.com/s/HeUAPe4LqqjfzIeWDe8KIg) 吗？是时候喜新厌旧了。


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/warp-e0411889-e506-480f-a719-eba4f2d229b4.png)

Warp，一个超级牛叉的 terminal，号称是 21 世纪的终端，还未正式发布，就获得了两千三百万美元的融资。

>官方网站：[https://www.warp.dev/](https://www.warp.dev/)

Warp 在 GitHub 上也已经开源，目前已经有 2.8k+ 的 star 了。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/warp-17a2270c-3bd1-47eb-a205-b7defde42895.png)

>GitHub 地址：[https://github.com/warpdotdev/Warp](https://github.com/warpdotdev/Warp)


Warp 号称自己“Reinvent the Terminal”，也就是重新定义了终端，用过 vscode 的小伙伴是不是对这句口号似曾相识？

是的，vscode 号称自己“Code editing Redefined”，也就是重新定义了代码编辑器。

### 一、安装 Warp

直接到官网 `warp.dev` 点击「download now」就可以下载最新版了。下载完成后，双击安装包就可以安装了。完成后打开，界面还是非常清爽的。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/warp-188834c7-70b7-4f9c-a817-b4a691625fd1.png)

Warp 支持 GitHub 账户登录。不过，如果你在登录的过程中因为某些原因无法完成跳转，可以通过下面的链接自行解决。

>[https://embiid.blog/post/WARP-does-not-work-after-submitting-an-invite-code/](https://embiid.blog/post/WARP-does-not-work-after-submitting-an-invite-code/)

如果顺利登录，会跳转到这个页面。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/warp-84c0b513-57f3-4ab4-8c77-508c10c923c5.png)

填写一些 Warp 的调查信息后，就会跳转到 Warp 的初始界面。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/warp-304639e9-7554-45b4-a199-e7c0c3b40c33.png)

>需要注意的是，Warp 目前仅支持 macOS 版，Linux 和 Windows 用户还需要等待一段时间。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/warp-a4d43a50-0ad9-4f91-ad4e-c1c0788bb580.png)

其实 macOS 版也是刚刚公测，我这份攻略绝壁是热乎乎的。想要第一时间关注 Warp 版本信息的话，可以戳下图中提到的链接填写自己的邮箱。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/warp-f622d505-b136-4b9d-95c5-a6872e1423e1.png)

### 二、使用 Warp

Warp 解决的第一个痛点，就是减少配置、方便输入、优化输出，并且增加常用命令的自动提示。

**1）智能提示**

普通的终端在你键入 tab 的时候，是这样提示的，就是简单地帮你罗列下。


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/warp-078017c6-a872-466a-8aa2-f202c9371493.png)

而 Warp 就非常的时髦，会给你滚动可选的列表形式展示出来。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/warp-4e205289-d8c4-49a9-90ba-08aef8beb627.png)

Warp 的智能提示也更加“智能化”，它会猜测你下一步的命令到底输入什么。

比如说我的工作目录下有一个 README.md 的文件，那当我输入 `echo '沉默王二' >>`的时候它会把 `README.md` 提示在后面。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/warp-8948ab59-3ce8-4b04-80a5-ecd7663e1034.png)

**2）智能记忆**

Warp 会记录上一次执行的命令，在顶部会有一个提示的按钮，当你点击的时候，它会自动滚动到上一个命令执行的位置。

点击「clear」之前。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/warp-6055bfaa-a146-4cf8-a6f4-aa493dbfa60b.png)

点击「clear」之后。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/warp-181dff97-bd6f-4c41-94c8-8e9ac5567460.png)

**3）区域选择**

传统的终端，在复制区域命令和输出结果的时候需要全部手动选择，而 Warp 是可以点选的，之后可以通过右键菜单进行复制粘贴（可以选择只复制命令或者输出，也可以都选），非常方便。


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/warp-23c0a936-2371-4cf4-acf1-555bceecac44.png)

**4）历史命令**

传统的终端在通过 up-down 键选择历史命令的时候，一次只能提示一个命令。而 Warp 会把历史命令做成一个滚动的可以选择的列表。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/warp-da43dca3-d8d1-43ad-9308-f8ec1c2b871b.png)


**5）命令导航**

同时按下 Ctrl+Shift+R 可以打开命令导航，Warp 集成了很多工具的命令导航。比如说我们要执行 `git reset` 命令，那么到底格式什么，应该怎么执行，Warp 都提示的非常到位。


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/warp-b9a4fd3f-24b2-4f6a-8a70-58fa1b313df3.png)

这让我想起了 macOS 的效率工具 Alfred，可以搜索任何你想要的命令。

**6）AI 植入**

Warp 还提供了 AI 智能搜索，快捷键可以在 setting→keyboard shortcuts 中找得到，键入 AI 关键字即可。

可调整为自己喜欢的快捷键。我目前设置的是 `Ctrl+shift+>`。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/warp-04300bc5-5d0d-494b-955c-1d270133227a.png)

比如说我问它“how many lines were changed in the last 2 commits?”

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/warp-871e51e9-c2ac-4ecb-bfcb-ff339f05bd61.png)

Warp 解决的第二个痛点是增加协作功能。不过由于我目前没有邀请其他用户参与，还无法使用共享功能，后面有小伙伴体验的话，可以通过我分享的链接下载试一波。

>https://app.warp.dev/referral/25KR3Y

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/warp-d8952a84-a0a7-4c3d-b237-87cdc997bb4c.png)

### 三、配置 Warp

输入 Command+P 快捷键可以打开 Warp 的命令面板。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/warp-369d16f6-f897-4c9f-bbea-631d561e145b.png)

键入 `sett` 关键字就可以打开配置页。

比如说在「Appearance」选项卡里可以设置 Warp 的主题、字体，以及紧凑型模式。

大概有十多种主题可选，比如说这个女生非常喜欢的粉色系。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/warp-6b5dbf4c-7bb0-4926-b9e9-b64333cc2ed8.png)

更多主题可以到 GitHub 仓库的 theme 页。

>[https://github.com/warpdotdev/themes](https://github.com/warpdotdev/themes)

至于快捷键配置，如果不确定有哪些快捷键可以尝试，直接点击 Warp 顶部的这个温馨提示「welcome tips」就可以了。


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/warp-aa785da8-bb39-4851-97f5-b7f8baaccf34.png)


### 四、总结

最后总结一波吧。

这波着实属于尝鲜了，市面上应该还木有 Warp 终端的普及安利文章，我这期应该属于大姑娘坐花轿———头一回。

害，登录折腾了好久，原因我就不多说了，小伙伴们自行体会哈。反正我是没被劝退。

幸好是没放弃，所以才体验到了 Warp 的强大之处，真的是改变了我对终端 terminal 的认知——太特喵的炫酷了！

这个过程就有点陶渊明《桃花源记》里那句“初极狭，复行数十步，豁然开朗”的赶脚。

喜欢的小伙伴一定要尝试一把，你会来感谢我的。好了，这期就先聊到这吧，毕竟 Warp 刚公测，后面有机会再来给大家详细地说。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png)
