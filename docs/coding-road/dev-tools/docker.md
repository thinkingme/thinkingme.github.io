# docker问题

## 删除关闭的容器、无用的数据卷和网络

- docker system prune命令可以用于清理磁盘，删除关闭的容器、无用的数据卷和网络，以及dangling镜像(即无tag的镜像)

```undefined
docker system prune
```

```shell
 docker system df
```

## 

```shell
du -sh 
du -h --max-depth=1
```

## 清理docker日志

```shell
#!/bin/sh
echo "======== start clean docker containers logs ========"
logs=$(find /var/lib/docker/containers/ -name *-json.log)
for log in $logs
    do
    echo "clean logs : $log"
    cat /dev/null > $log 
    done
echo "======== end clean docker containers logs ========"
```
