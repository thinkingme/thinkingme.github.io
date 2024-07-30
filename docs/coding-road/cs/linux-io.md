# linux io演变过程

参考网站

[深入学习IO多路复用 select/poll/epoll 实现原理 - 第一篇_YZF_Kevin的博客-CSDN博客](https://blog.csdn.net/yzf279533105/article/details/129012820)

https://mp.weixin.qq.com/s?__biz=MjM5Njg5NDgwNA==&mid=2247484905&idx=1&sn=a74ed5d7551c4fb80a8abe057405ea5e&scene=21#wechat_redirect

## 前言：

在linux系统中，实际上所有的I/O设备都被抽象为了文件这个概念，一切皆文件，Everything isFile，磁盘、网络数据、终端，甚至进程间通信工具管道pipe等都被当做文件对待。

在了解多路复用select、poll、epoll实现之前，我们先简单回忆复习以下两个概念：

### 5种IO模型的演变历史：

```text
[1]blockingIO - 阻塞IO
[2]nonblockingIO - 非阻塞IO
[3]IOmultiplexing - IO多路复用
[4]signaldrivenIO - 信号驱动IO
[5]asynchronousIO - 异步IO
```

大多数文件系统的默认IO操作都是缓存IO。在Linux的缓存IO机制中，操作系统会将IO的数据缓存在文件系统的页缓存（page cache）。也就是说，数据会先被拷贝到操作系统内核的缓冲区中，然后才会从操作系统内核的缓存区拷贝到应用程序的地址空间中。这种做法的缺点就是，**需要在应用程序地址空间和内核进行多次拷贝，这些拷贝动作所带来的CPU以及内存开销是非常大的**。

至于为什么不能直接让磁盘控制器把数据送到应用程序的地址空间中呢？**最简单的一个原因就是应用程序不能直接操作底层硬件。**

总的来说，IO分两阶段：

1)数据准备阶段

2)内核空间复制回用户进程缓冲区阶段。如下图：

![](https://pic3.zhimg.com/v2-89162cb4d5cc7fe4071ade36d3000d8a_b.jpg)

#### bio

也就是阻塞io模型，这是linux早期的io模型，应用程序使用进程或者线程进行io时，比如调用了read(),如果数据没立即返回，就会阻塞该进程或者线程。当大量读写发生时，就需要创造大量的进程或者线程。一个进程或者线程对应一个文件描述符。

缺点：大量进程线程将会造成资源浪费（内存成本），而且系统调度，线程上下文切换的开销也是巨大的（cpu成本）。

![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\linux-io\2023-02-28-10-33-56-image.png)

#### nio

于是就出现了nio模型，在linux中，我们可以设置端口为NONBLOCK状态来使用。nio与阻塞io的区别在于，nio在当文件描述没有数据时，会直接返回-1，而不会阻塞当前线程，这样我们就可以只使用一个线程或者进程来监听io是否可以读写。

![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\linux-io\2023-02-28-10-40-46-image.png)

#### 多路复用

- 多路: 指的是多个socket网络连接;
- 复用: 指的是复用一个线程；
- 多路复用主要有三种技术：select，poll，epoll。epoll是最新的, 也是目前最好的多路复用技术；

I/O多路复用就是通过一种机制，一个进程可以监视多个描述符，一旦某个描述符就绪（一般是读就绪或者写就绪），能够通知程序进行相应的读写操作。但select，poll，epoll本质上都是同步I/O，因为他们都需要在读写事件就绪后自己负责进行读写，也就是说这个读写过程是阻塞的，而异步I/O则无需自己负责进行读写，异步I/O的实现会负责把数据从内核拷贝到用户空间

## 一、select

```cpp
int select (int n, fd_set *readfds, fd_set *writefds, fd_set *exceptfds, struct timeval *timeout);
```

select 函数监视的文件描述符分3类，分别是writefds、readfds、和exceptfds，当用户process调用select的时候，select会将需要监控的readfds集合拷贝到内核空间（假设监控的仅仅是socket可读），然后遍历自己监控的socket sk，挨个调用sk的poll逻辑以便检查该sk是否有可读事件，遍历完所有的sk后，如果没有任何一个sk可读，那么select会调用schedule_timeout进入schedule循环，使得process进入睡眠。如果在timeout时间内某个sk上有数据可读了，或者等待timeout了，则调用select的process会被唤醒，接下来select就是遍历监控的sk集合，挨个收集可读事件并返回给用户了，相应的伪码如下：

```cpp
int select(
    int nfds,
    fd_set *readfds,
    fd_set *writefds,
    fd_set *exceptfds,
    struct timeval *timeout);
// nfds:监控的文件描述符集里最大文件描述符加1
// readfds：监控有读数据到达文件描述符集合，传入传出参数
// writefds：监控写数据到达文件描述符集合，传入传出参数
// exceptfds：监控异常发生达文件描述符集合, 传入传出参数
// timeout：定时阻塞监控时间，3种情况
//  1.NULL，永远等下去
//  2.设置timeval，等待固定时间
//  3.设置timeval里时间均为0，检查描述字后立即返回，轮询

select服务端伪码
//首先一个线程不断接受客户端连接，并把socket文件描述符放到一个list里。
while(1) {
  connfd = accept(listenfd);
  fcntl(connfd, F_SETFL, O_NONBLOCK);
  fdlist.add(connfd);
}
select函数还是返回刚刚提交的list，应用程序依然list所有的fd，只不过操作系统会将准备就绪的文件描述符做上标识，用户层将不会再有无意义的系统调用开销。
struct timeval timeout;
int max = 0;  // 用于记录最大的fd，在轮询中时刻更新即可
// 初始化比特位
FD_ZERO(&read_fd);
while (1) {
    // 阻塞获取 每次需要把fd从用户态拷贝到内核态
    nfds = select(max + 1, &read_fd, &write_fd, NULL, &timeout);
    // 每次需要遍历所有fd，判断有无读写事件发生
    for (int i = 0; i <= max && nfds; ++i) {
        // 只读已就绪的文件描述符，不用过多遍历
        if (i == listenfd) {
            // 这里处理accept事件
            FD_SET(i, &read_fd);//将客户端socket加入到集合中
        }
        if (FD_ISSET(i, &read_fd)) {
            // 这里处理read事件
        }
    }
}
```

下面的动图能更直观的让我们了解select：

![](https://pic3.zhimg.com/v2-320be0c91e2a376199b1d5eef626758e_b.gif)

通过上面的select逻辑过程分析，相信大家都意识到，select存在三个问题：

> [1] 每次调用select，都需要把被监控的fds集合从用户态空间拷贝到内核态空间，高并发场景下这样的拷贝会使得消耗的资源是很大的。  
> [2] 能监听端口的数量有限，单个进程所能打开的最大连接数有FD_SETSIZE宏定义，其大小是32个整数的大小（在32位的机器上，大小就是3232，同理64位机器上为3264），当然我们可以对宏FD_SETSIZE进行修改，然后重新编译内核，但是性能可能会受到影响，一般该数和系统内存关系很大，具体数目可以`cat /proc/sys/fs/file-max`察看。32位机默认1024个，64位默认2048。

![](https://pic3.zhimg.com/v2-e842f26b011cf5d7cf05cce6b7a8d6e6_b.png)

> [3] 被监控的fds集合中，只要有一个有数据可读，整个socket集合就会被遍历一次调用sk的poll函数收集可读事件：由于当初的需求是朴素，仅仅关心是否有数据可读这样一个事件，当事件通知来的时候，由于数据的到来是异步的，我们不知道事件来的时候，有多少个被监控的socket有数据可读了，于是，只能挨个遍历每个socket来收集可读事件le。

## 二、poll

poll的实现和select非常相似，只是描述fd集合的方式不同。针对select遗留的三个问题中（问题(2)是fd限制问题，问题(1)和(3)则是性能问题），poll只是使用pollfd结构而不是select的fd_set结构，这就解决了select的问题(2)fds集合大小1024限制问题。但poll和select同样存在一个性能缺点就是包含大量文件描述符的数组被整体复制于用户态和内核的地址空间之间，而不论这些文件描述符是否就绪，它的开销随着文件描述符数量的增加而线性增大。

下面是poll的函数原型，poll改变了fds集合的描述方式，使用了pollfd结构而不是select的fd_set结构，使得poll支持的fds集合限制远大于select的1024。poll虽然解决了fds集合大小1024的限制问题，从实现来看。很明显它并没优化大量描述符数组被整体复制于用户态和内核态的地址空间之间，以及个别描述符就绪触发整体描述符集合的遍历的低效问题。poll随着监控的socket集合的增加性能线性下降，使得poll也并不适合用于大并发场景。

```cpp
int poll(struct pollfd *ufds, unsigned int nfds, int timeout);
struct pollfd {
　　int fd;           /*文件描述符*/
　　short events;     /*监控的事件*/
　　short revents;    /*监控事件中满足条件返回的事件*/
};
int poll(struct pollfd *fds, nfds_tnfds, int timeout);

poll服务端实现伪码：
struct pollfd fds[POLL_LEN];
unsigned int nfds=0;
fds[0].fd=server_sockfd;
fds[0].events=POLLIN|POLLPRI;
nfds++;
while {
    res=poll(fds,nfds,-1);
    if(fds[0].revents&(POLLIN|POLLPRI)) {
        //执行accept并加入fds中，nfds++
        if(--res<=0) continue
    }
    //循环之后的fds
    if(fds[i].revents&(POLLIN|POLLERR )) {
        //读操作或处理异常等
        if(--res<=0) continue
    }
}
```

## 三、epoll

![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\linux-io\2023-02-28-10-59-57-image.png)

在linux的网络编程中，很长的时间都在使用select来做事件触发。在linux新的内核中，有了一种替换它的机制，就是epoll。相比于select，epoll最大的好处在于它不会随着监听fd数目的增长而降低效率。如前面我们所说，

1. 在内核中的select实现中，它是采用轮询来处理的，轮询的fd数目越多，自然耗时越多。并且，

2. 在linux/posix_types.h头文件有这样的声明：  #define __FD_SETSIZE 1024  
   表示select最多同时监听1024个fd，当然，可以通过修改头文件再重编译内核来扩大这个数目，但这似乎并不治本。

3. 每次监听的fd需要从用户空间拷贝到内核空间。（epoll使用如上图的共享空间mmap来避免拷贝时用户态内核态的切换）

epoll在linux中：

创建一个epoll的句柄，size用来告诉内核这个监听的数目一共有多大。这个参数不同于select()中的第一个参数，给出最大监听的fd+1的值。需要注意的是，当创建好epoll句柄后，它就是会占用一个fd值，在linux下如果查看/proc/进程id/fd/，是能够看到这个fd的，所以在使用完epoll后，必须调用close()关闭，否则可能导致fd被耗尽。

![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\linux-io\2023-02-28-11-02-30-image.png)

epoll的接口非常简单，一共就三个函数：

- epoll_create：创建一个epoll句柄
- epoll_ctl：向 epoll 对象中添加/修改/删除要管理的连接
- epoll_wait：等待其管理的连接上的 IO 事件

**epoll_create 函数**

```cpp
int epoll_create(int size);
```

- **功能：**该函数生成一个 epoll 专用的文件描述符。
- **参数size:** 用来告诉内核这个监听的数目一共有多大，参数 size 并不是限制了 epoll 所能监听的描述符最大个数，只是对内核初始分配内部数据结构的一个建议。自从 linux 2.6.8 之后，size 参数是被忽略的，也就是说可以填只有大于 0 的任意值。
- **返回值：**如果成功，返回poll 专用的文件描述符，否者失败，返回-1。

epoll_create的源码实现：

```cpp
SYSCALL_DEFINE1(epoll_create1, int, flags)
{
    struct eventpoll *ep = NULL;

    //创建一个 eventpoll 对象
    error = ep_alloc(&ep);
}

//struct eventpoll 的定义
// file：fs/eventpoll.c
struct eventpoll {

    //sys_epoll_wait用到的等待队列
    wait_queue_head_t wq;

    //接收就绪的描述符都会放到这里
    struct list_head rdllist;

    //每个epoll对象中都有一颗红黑树
    struct rb_root rbr;

    ......
}
static int ep_alloc(struct eventpoll **pep)
{
    struct eventpoll *ep;

    //申请 epollevent 内存
    ep = kzalloc(sizeof(*ep), GFP_KERNEL);

    //初始化等待队列头
    init_waitqueue_head(&ep->wq);

    //初始化就绪列表
    INIT_LIST_HEAD(&ep->rdllist);

    //初始化红黑树指针
    ep->rbr = RB_ROOT;

    ......
}
```

其中eventpoll 这个结构体中的几个成员的含义如下：

- **wq：** 等待队列链表。软中断数据就绪的时候会通过 wq 来找到阻塞在 epoll 对象上的用户进程。
- **rbr：** 红黑树。为了支持对海量连接的高效查找、插入和删除，eventpoll 内部使用的就是红黑树。通过红黑树来管理用户主进程accept添加进来的所有 socket 连接。
- **rdllist：** 就绪的描述符链表。当有连接就绪的时候，内核会把就绪的连接放到 rdllist 链表里。这样应用进程只需要判断链表就能找出就绪进程，而不用去遍历红黑树的所有节点了。

**epoll_ctl 函数**

```cpp
int epoll_ctl(int epfd, int op, int fd, struct epoll_event *event); 
```

- **功能：**epoll 的事件注册函数，它不同于 select() 是在监听事件时告诉内核要监听什么类型的事件，而是在这里先注册要监听的事件类型。
- **参数epfd:** epoll 专用的文件描述符，epoll_create()的返回值
- **参数op:** 表示动作，用三个宏来表示：
1. EPOLL_CTL_ADD：注册新的 fd 到 epfd 中；
2. EPOLL_CTL_MOD：修改已经注册的fd的监听事件；
3. EPOLL_CTL_DEL：从 epfd 中删除一个 fd；
- **参数fd:** 需要监听的文件描述符
- **参数event:** 告诉内核要监听什么事件，struct epoll_event 结构如:
- **events****可以是以下几个宏的集合：**
- EPOLLIN ：表示对应的文件描述符可以读（包括对端 SOCKET 正常关闭）；
- EPOLLOUT：表示对应的文件描述符可以写；
- EPOLLPRI：表示对应的文件描述符有紧急的数据可读（这里应该表示有带外数据到来）；
- EPOLLERR：表示对应的文件描述符发生错误；
- EPOLLHUP：表示对应的文件描述符被挂断；
- EPOLLET ：将 EPOLL 设为边缘触发(Edge Trigger)模式，这是相对于水平触发(Level Trigger)来说的。
- EPOLLONESHOT：只监听一次事件，当监听完这次事件之后，如果还需要继续监听这个 socket 的话，需要再次把这个 socket 加入到 EPOLL 队列里
- **返回值：**0表示成功，-1表示失败。

**epoll_wait函数**

```cpp
int epoll_wait(int epfd, struct epoll_event * events, int maxevents, int timeout); 
```

- **功能**：**等待事件的产生，收集在 epoll 监控的事件中已经发送的事件，类似于 select() 调用。
- **参数epfd:** epoll 专用的文件描述符，epoll_create()的返回值
- **参数events:** 分配好的 epoll_event 结构体数组，epoll 将会把发生的事件赋值到events 数组中（events 不可以是空指针，内核只负责把数据复制到这个 events 数组中，不会去帮助我们在用户态中分配内存）。
- **参数maxevents:** maxevents 告之内核这个 events 有多少个 。
- **参数timeout:** 超时时间，单位为毫秒，为 -1 时，函数为阻塞。
- **返回值：**
1. 如果成功，表示返回需要处理的事件数目
2. 如果返回0，表示已超时
3. 如果返回-1，表示失败

```cpp
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <stdio.h>
#include <unistd.h>
#include <errno.h>
#include <fcntl.h>
#include <stdlib.h>
#include <cassert>
#include <sys/epoll.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <string.h>
#include<iostream>
const int MAX_EVENT_NUMBER = 10000; //最大事件数
// 设置句柄非阻塞
int setnonblocking(int fd)
{
    int old_option = fcntl(fd, F_GETFL);
    int new_option = old_option | O_NONBLOCK;
    fcntl(fd, F_SETFL, new_option);
    return old_option;
}

int main(){

    // 创建套接字
    int nRet=0;
    int m_listenfd = socket(PF_INET, SOCK_STREAM, 0);
    if(m_listenfd<0)
    {
        printf("fail to socket!");
        return -1;
    }
    // 
    struct sockaddr_in address;
    bzero(&address, sizeof(address));
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = htonl(INADDR_ANY);
    address.sin_port = htons(6666);

    int flag = 1;
    // 设置ip可重用
    setsockopt(m_listenfd, SOL_SOCKET, SO_REUSEADDR, &flag, sizeof(flag));
    // 绑定端口号
    int ret = bind(m_listenfd, (struct sockaddr *)&address, sizeof(address));
    if(ret<0)
    {
        printf("fail to bind!,errno :%d",errno);
        return ret;
    }

    // 监听连接fd
    ret = listen(m_listenfd, 200);
    if(ret<0)
    {
        printf("fail to listen!,errno :%d",errno);
        return ret;
    }

    // 初始化红黑树和事件链表结构rdlist结构
    epoll_event events[MAX_EVENT_NUMBER];
    int m_epollfd = epoll_create(5);
    if(m_epollfd==-1)
    {
        printf("fail to epoll create!");
        return m_epollfd;
    }



    // 创建节点结构体将监听连接句柄
    epoll_event event;
    event.data.fd = m_listenfd;
    //设置该句柄为边缘触发（数据没处理完后续不会再触发事件，水平触发是不管数据有没有触发都返回事件），
    event.events = EPOLLIN | EPOLLET | EPOLLRDHUP;
    // 添加监听连接句柄作为初始节点进入红黑树结构中，该节点后续处理连接的句柄
    epoll_ctl(m_epollfd, EPOLL_CTL_ADD, m_listenfd, &event);

    //进入服务器循环
    while(1)
    {
        int number = epoll_wait(m_epollfd, events, MAX_EVENT_NUMBER, -1);
        if (number < 0 && errno != EINTR)
        {
            printf( "epoll failure");
            break;
        }
        for (int i = 0; i < number; i++)
        {
            int sockfd = events[i].data.fd;
            // 属于处理新到的客户连接
            if (sockfd == m_listenfd)
            {
                struct sockaddr_in client_address;
                socklen_t client_addrlength = sizeof(client_address);
                int connfd = accept(m_listenfd, (struct sockaddr *)&client_address, &client_addrlength);
                if (connfd < 0)
                {
                    printf("errno is:%d accept error", errno);
                    return false;
                }
                epoll_event event;
                event.data.fd = connfd;
                //设置该句柄为边缘触发（数据没处理完后续不会再触发事件，水平触发是不管数据有没有触发都返回事件），
                event.events = EPOLLIN | EPOLLRDHUP;
                // 添加监听连接句柄作为初始节点进入红黑树结构中，该节点后续处理连接的句柄
                epoll_ctl(m_epollfd, EPOLL_CTL_ADD, connfd, &event);
                setnonblocking(connfd);
            }
            else if (events[i].events & (EPOLLRDHUP | EPOLLHUP | EPOLLERR))
            {
                //服务器端关闭连接，
                epoll_ctl(m_epollfd, EPOLL_CTL_DEL, sockfd, 0);
                close(sockfd);
            }
            //处理客户连接上接收到的数据
            else if (events[i].events & EPOLLIN)
            {
                char buf[1024]={0};
                read(sockfd,buf,1024);
                printf("from client :%s");

                // 将事件设置为写事件返回数据给客户端
                events[i].data.fd = sockfd;
                events[i].events = EPOLLOUT | EPOLLET | EPOLLONESHOT | EPOLLRDHUP;
                epoll_ctl(m_epollfd, EPOLL_CTL_MOD, sockfd, &events[i]);
            }
            else if (events[i].events & EPOLLOUT)
            {
                std::string response = "server response \n";
                write(sockfd,response.c_str(),response.length());

                // 将事件设置为读事件，继续监听客户端
                events[i].data.fd = sockfd;
                events[i].events = EPOLLIN | EPOLLRDHUP;
                epoll_ctl(m_epollfd, EPOLL_CTL_MOD, sockfd, &events[i]);
            }
            //else if 可以加管道，unix套接字等等数据
        }
    }


}
```

如下图，可以帮助我们理解的更加丝滑(/手动狗头)：

![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\select-poll-epoll\2022-11-07-22-04-17-image.png)

![](https://pic2.zhimg.com/v2-70f8e9bc1a028d252c01c32329e49341_b.gif)

## 4 总结

select，poll，epoll都是IO多路复用机制，即可以监视多个描述符，一旦某个描述符就绪（读或写就绪），能够通知程序进行相应读写操作。 但select，poll，epoll本质上都是**同步I/O**，因为他们都需要在读写事件就绪后自己负责进行读写，也就是说这个读写过程是阻塞的，而异步I/O则无需自己负责进行读写，异步I/O的实现会负责把数据从内核拷贝到用户空间。

- select，poll实现需要自己不断轮询所有fd集合，直到设备就绪，期间可能要睡眠和唤醒多次交替。而epoll其实也需要调用epoll_wait不断轮询就绪链表，期间也可能多次睡眠和唤醒交替，但是它是设备就绪时，调用回调函数，把就绪fd放入就绪链表中，并唤醒在epoll_wait中进入睡眠的进程。虽然都要睡眠和交替，但是select和poll在“醒着”的时候要遍历整个fd集合，而epoll在“醒着”的时候只要判断一下就绪链表是否为空就行了，这节省了大量的CPU时间。这就是回调机制带来的性能提升。
- select，poll每次调用都要把fd集合从用户态往内核态拷贝一次，并且要把current往设备等待队列中挂一次，而epoll只要一次拷贝，而且把current往等待队列上挂也只挂一次（在epoll_wait的开始，注意这里的等待队列并不是设备等待队列，只是一个epoll内部定义的等待队列）。这也能节省不少的开销。

|        | select                             | poll                               | epoll                                                         |
| ------ | ---------------------------------- | ---------------------------------- | ------------------------------------------------------------- |
| 性能     | 随着连接数的增加，性能急剧下降，处理成千上万的并发连接数时，性能很差 | 随着连接数的增加，性能急剧下降，处理成千上万的并发连接数时，性能很差 | 随着连接数的增加，性能基本没有变化                                             |
| 连接数    | 一般1024                             | 无限制                                | 无限制                                                           |
| 内存拷贝   | 每次调用select拷贝                       | 每次调用poll拷贝                         | fd首次调用epoll_ctl拷贝，每次调用epoll_wait不拷贝                           |
| 数据结构   | bitmap                             | 数组                                 | 红黑树+链表                                                        |
| 内在处理机制 | 线性轮询                               | 线性轮询                               | epoll_wait监视就绪队列上是否有就绪的fd。fd挂在红黑树，通过事件回调callback，将就绪fd放到就绪队列上 |
| 时间复杂度  | O(n)                               | O(n)                               | O(1)                                                          |

# QA epoll 为什么用红黑树？

> 在 Linux 的设计中有三种典型的 I/O 多路复用模型 select、poll、epoll。
> 
> **select 是一个主动模型，需要线程自己通过一个集合存放所有的 Socket，然后发生 I/O 变化的时候遍历**。在 select 模型下，操作系统不知道哪个线程应该响应哪个事件，而是由线程自己去操作系统看有没有发生网络 I/O 事件，然后再遍历自己管理的所有 Socket，看看这些 Socket 有没有发生变化。
> 
> **poll 提供了更优质的编程接口，但是本质和 select 模型相同**。因此千级并发以下的 I/O，你可以考虑 select 和 poll，但是如果出现更大的并发量，就需要用 epoll 模型。
> 
> **epoll 模型在操作系统内核中提供了一个中间数据结构，这个中间数据结构会提供事件监听注册，存储fd对应的epitem（epoll管理的结点，存储事件等）（红黑树实现）**。因此在高并发 I/O 下，可以考虑 epoll 模型，它的速度更快，开销更小。
