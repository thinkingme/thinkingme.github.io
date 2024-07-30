# crm系统的菜单加载逻辑

## 事件回顾

现场人员遇到需求需要把客户页面底下的客户合并审核页面移动到工作页面底下，他直接修改了菜单文件。然后发现定制的jsp页面一直在加载中

![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\menu\2022-07-20-14-26-05-image.png)

## 首页渲染

既然如此，就顺便研究下菜单加载的逻辑吧。

从登录开始。

在web.xml下面配置有登录的过滤器

![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\menu\2022-07-20-15-59-55-image.png)

这就是登录的过滤

![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\menu\2022-07-20-16-00-19-image.png)

下图代码说明登录的请求被重定向，前端观察也确实如此，这就进入到了主页。

![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\menu\2022-07-20-16-01-44-image.png)

![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\menu\2022-07-20-16-00-45-image.png)

重定向的地址是这个[http://localhost:8080/plug-in/faweb/index.jsp]()，看来这就是梦开始的地方了。

这个jsp里面包含了inc_top.jsp,inc_top渲染了下图这些东西

![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\menu\2022-07-20-16-30-44-image.png)

我们进去看看

![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\menu\2022-07-20-16-08-12-image.png)

打了断点试了下， 确定是这了。那么点击后做了什么处理呢。

观察事件监听器

![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\menu\2022-07-20-16-12-02-image.png)

我们对应的js文件下看看，其实就是会渲染成下面这个请求，target后面加上#号后面的内容，去请求对应的jsp文件。

![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\menu\2022-07-20-16-17-20-image.png)

首页对应的就是下图的也就是plug-in/faweb/wpf/main.jsp文件

![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\menu\2022-07-20-16-19-01-image.png)

![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\menu\2022-07-20-16-23-42-image.png)

好的继续找这个文件。

这文件请求了这个链接

![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\menu\2022-07-20-16-25-57-image.png)

![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\menu\2022-07-20-16-29-28-image.png)

寻找这三个文件即可。这就是首页的渲染。

## 其他菜单渲染

其他的菜单也是类似，我们先找到客户页面的plug-in/faweb/customer/main.jsp文件

为什么首页和其他菜单分开呢，正是因为首页底下的二级菜单渲染和其他的方式不一样。

看下图，其他菜单的渲染方式是向这样从文件中获取

### 获取菜单路径

![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\menu\2022-07-20-16-34-18-image.png)

其实就是com/apex/bss/mod/menu/文件夹底下是处理的java文件

此方法会加载\WEB-INF\classes\config\menu\acl.xmlde 文件

因而菜单信息其实都在这里面。

![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\menu\2022-07-20-16-38-48-image.png)

然后在底下有这么一句

`menu_common.menuUrl(aHash,  $("#IFRMAE_<%=autoId%>", dataContainer));`

这是获取真正路径的方法，进去阅读后可以发现是调用

LiveBos\FormBuilder\plug-in\faweb\common\service.jsp这个文件FormMenuNameGetUrl这个方法

> 最恶心的地方来了

有些是由三级目录的，就比如这个客户关系，他返回的实际上是

![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\menu\2022-07-20-16-55-58-image.png)

这样的，也就是说又去调用了menu页面

我们可以在com/apex/bss/mod/menu/MenuAction.java这里看方法

WEB-INF/view/mod/menu/index.jsp这里看页面

至此整个逻辑就讲完。我们回归主题，为什么会有报错呢。

观察menu/index.jsp页面，看他是怎么渲染三级页面的。发现他不是用IFrame来加载页面的。而是直接将页面整个塞进了一个div框里。这样就导致了问题。

![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\menu\2022-07-20-17-02-11-image.png)

因为如果页面如上图一样，我们有head标签，里面还有script标签的话，这样子是不行的。

所以我们将这个标签删掉，在外层其实已经引入了。

最后加载正常

![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\menu\2022-07-20-17-03-56-image.png)

收工。
