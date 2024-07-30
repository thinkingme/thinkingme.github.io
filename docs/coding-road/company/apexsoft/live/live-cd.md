# live-cd

## 配置文件

具体看这个链接

https://live5.apexsoft.com.cn/#/livecd/create-app

```yml
├── livecd                              # 部署包规定文件夹 必须
│   ├── conf                            # 应用服务和应用信息的配置文件夹 必须
│   │   ├── vm.options                  # jvm启动参数 java服务建议添加
│   │   ├── update.log                  # 更新日志  
│   │   ├── package-info.properties     # 应用信息 例如：应用名、版本、日志存放路径 必须
│   │   └── config                      # 例如springboot服务的配置文件
│   │       ├── application.yml         
│   │       ├── application-prod.yml
│   │       ├── bootstrap.yml
│   │       └── cert
│   │           ├── ca.pem
│   │           ├── server.pem
│   │           └── client.pem              
│   └── bin                             #应用启停脚本文件夹 必须
│       ├── startup.sh                  #启动脚本 需要输出服务的pid
│       └── shutdown.sh                 #关闭脚本 根据pid去关闭
│       └── install.sh                  #部署安装脚本 部署时会执行该初始化脚本 可选
│       └── uninstall.sh                #卸载时会执行该脚本 可选
│       └── ping.sh                     #检查应用状态脚本 可选 该脚本返回结果格式： 如果应用进程运行中 echo pid  如果应用没有在进程聊表中可以报错或者echo一个负数
│       
│   
└── server.jar     
```

逻辑就是要制作livecd这个文件夹

当上传应用的时候，会从把这个包的文件读取出来。读取各种数据存到H2数据库里。

当我们在工作空间空创建应用的时候会根据这些数据创建应用，部署的时候，会将配置文件复制到部署包中。

比如我们部署electricsearch，部署包长这样

![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\live-cd\2023-03-24-16-47-52-image.png)

但是我们部署后，部署目录里长这样

![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\live-cd\2023-03-24-16-48-36-image.png)

他会将livecd文件夹下的内容复制到外头来。也就是可以通过这样自定义启动脚本什么的。

### 配置文件优先级

![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\live-cd\2023-03-24-16-51-00-image.png)

这三种配置来源都会存到数据库中

当选了本地环境配置，再选别的配置，会丢失当前本地环境配置修改的内容，

因为在切换回本地环境配置的时候，他会读取当前的配置写入。

![](C:\My%20Space\Soft%20Project\Hui%20Ge\coding-road\images\live-cd\2023-03-24-16-53-01-image.png)

在保存后，我们进行部署，他会按优先级，将这些配置写入到部署目录中，优先级高的覆盖优先级低的。同时部署的时候会备份，备份文件存在部署目录旁。

因此日志，数据之类的不要放到部署目录中，因为太大，备份会很耗时。可以放到部署目录外头。
