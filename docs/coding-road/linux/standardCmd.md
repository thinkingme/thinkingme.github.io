## man

- 联机参考手册的接口

> 安装

```shell
yum install man -y
```

> 例子

```shell
man -k exec #打印有关exec命令文档的所有匹配项
man 1p exec  #查看exec的使用方法，以及功能介绍
```

## exec

- exec实用程序应该打开、关闭和/或复制任何重定向作为命令的一部分所指定的文件描述符。

> 例子

```shell
cd /proc/$$/fd  #进入bash进程持有的文件描述符目录
exec 8<> /dev/tcp/www.baidu.com/80 #创建tcp连接 文件描述符8
echo -e 'GET / HTTP/1.0\n' >& 8  #发送数据给百度 -e 代表转义换行   &字符说明8是文件描述符，不是文件
cat 0 <& 8 # 获取8的输出  0代表bash的输入
```
