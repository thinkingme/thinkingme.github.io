# 亿级流量多级缓存解决方案

## 常见服务器可以承受的qps

1. tomcat 300左右

2. nginx 官网说明5w

3. 对于十万级QPS流量的Web应用，如果流量增长到百万级，可以对
   接入层Nginx进行横向扩展，甚至可以引入LVS进行负载均衡。

## 削峰

### 划分域名

down.qq.com

games.qq.com

### CDN

各地缓存静态文件  
