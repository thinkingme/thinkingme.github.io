参考链接：[nginx](https://tengine.taobao.org/nginx_docs/cn/)

# Nginx

- 一个主进程和多个工作进程，工作进程以非特权用户运行；
- [支持](https://tengine.taobao.org/nginx_docs/cn/docs/events.html)的事件机制：kqueue（FreeBSD 4.1+）、epoll（Linux 2.6+）、rt signals（Linux 2.2.19+）、/dev/poll（Solaris 7 11/99+）、event ports（Solaris 10）、select以及poll；
- 众多支持的kqueue特性包括EV_CLEAR、EV_DISABLE（临时禁止事件）、NOTE_LOWAT、EV_EOF，可用数据的数量，错误代码；
- 支持sendfile（FreeBSD 3.1+, Linux 2.2+, Mac OS X 10.5+）、sendfile64（Linux 2.4.21+）和sendfilev（Solaris 8 7/01+）；（零拷贝技术，减少用户态内核态且黄和资源拷贝的技术）
- [文件AIO](https://tengine.taobao.org/nginx_docs/cn/docs/http/ngx_http_core_module.html#aio)（FreeBSD 4.3+, Linux 2.6.22+）；

在 nginx 中，我们可以用如下配置，来根据文件的大小来使用不同的方式：

```
location /video/ {
    sendfile on; 
    aio on;     
    directio 1024m; 
}
```

当文件大小大于 `directio` 值后，使用「异步 I/O + 直接 I/O」，否则使用「零拷贝技术」。

- [DIRECTIO](https://tengine.taobao.org/nginx_docs/cn/docs/http/ngx_http_core_module.html#directio) (FreeBSD 4.4+, Linux 2.4+, Solaris 2.6+, Mac OS X);
- [支持](https://tengine.taobao.org/nginx_docs/cn/docs/http/ngx_http_core_module.html#listen)Accept-filters（FreeBSD 4.1+, NetBSD 5.0+）和 TCP_DEFER_ACCEPT（Linux 2.4+）；
- 10000个非活跃的HTTP keep-alive连接仅占用约2.5M内存；
- 尽可能避免数据拷贝操作。

# Tengine

Tengine是由淘宝网发起的Web服务器项目。它在[Nginx](http://nginx.org/)的基础上，针对大访问量网站的需求，添加了很多高级功能和特性。Tengine的性能和稳定性已经在大型的网站如[淘宝网](http://www.taobao.com/)，[天猫商城](http://www.tmall.com/)等得到了很好的检验。它的最终目标是打造一个高效、稳定、安全、易用的Web平台。

Apache、httpd、IIS、nginx、tengine、openresty

## 对比

### Nginx和Apache的优缺点

#### Nginx相对Apache的优点

* 轻量级，同样起web服务，nginx比apache消耗更少的内存以及资源

* 抗并发，nginx处理请求是异步非阻塞的

* 高度模块化设计，编写模块相对简单

* 社区活跃，生态好

#### Apache相对Nginx的优点

* rewrite，比nginx的强大（用户搜索引擎收录，将url重写成搜索引擎喜欢的格式）

* 模块很多

* 稳定，bug少

Nginx配置简洁

最重要的区别是：apache是同步多进程模型，一个进程对应一个连接，nginx是一个进程可以对应上万连接。
