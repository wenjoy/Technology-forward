Nginx是2004年，俄罗斯老哥整的，c语言写的，开源github镜像站点：https://github.com/nginx/nginx

最好在自己电脑上安装一个nginx，方便学习调试，mac下安装启动nginx如下：

1. brew install nginx
2. nginx //运行nging，默认为8080端口
3. nginx -s reload // 重启
4. nginx -s stop //关闭

默认配置文件路径： /usr/local/etc/nginx/nginx.conf

参考链接：https://segmentfault.com/a/1190000016020328

### 配置

配置跨域：https://segmentfault.com/a/1190000012550346

```nginx
location / {  
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
    add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';

    if ($request_method = 'OPTIONS') {
        return 204;
    }
} 
```

简单配置教程参考：https://segmentfault.com/a/1190000023328201

配置转发：https://www.jianshu.com/p/10ecc107b5ee

注意语法，每行后面的分号不能省略

```nginx
        location / {
            root   html;
            index  index.html index.htm;
        }
#如果URL是webapp/common/base/g7s-page-init.js 就转发到#https://resources.g7s.huoyunren.com/webapp/common/base/g7s-page-init.js
        location /webapp {
          proxy_pass https://resources.g7s.huoyunren.com/webapp;
        }
 
```