# 数据库基础知识

常识

## I/Obuff问题：

通常操作系统往磁盘里取数据时，会一次性取出4K大小的数据（一页），这个大小根据配置可能不同。因此在应用层数据的设置里，也会按照这个规则来进行设计。

减少io调用来减少占用带宽。

![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\csbasic\2023-02-27-08-55-40-image.png)

## 索引

防止全盘扫描，会建立索引加快查询

## 数据库表很大，会怎么影响增删改查效率？

有索引：增删改变慢

查询速度：小量查询的话影响不大，大量查询就会受带宽大小影响，因为表过大，io次数也会增加。

## 数据库排名网站

https://db-engines.com/en/ranking

[DB-Engines Ranking - popularity ranking of database management systems](https://db-engines.com/en/ranking)

## mmap和sendfile零拷贝

![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\csbasic\2023-02-28-10-09-28-image.png)

* mmap

为了减少用户态内核态拷贝过程的互相切换。mmap是用户空间和内核空间共享的一块区域。

```c
void *mmap(void *addr, size_t length, int prot, int flags,
                  int fd, off_t offset);
```
