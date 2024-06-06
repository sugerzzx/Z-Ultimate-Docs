# 什么是 Nginx?

Nginx 是一个高性能的 HTTP 和反向代理服务器，也是一个 IMAP/POP3/SMTP 服务器。有了 Nginx，你便可以在一台服务器上运行多个 Web 应用，而每个 Web 应用都监听于不同的端口，Nginx 服务器则负责根据用户的访问域名，将请求反向代理到相应的 Web 应用上。

# 使用 Nginx 部署你的第一个静态网站

## 1. 安装及 SSL 证书配置见[ExpressOnServer](./ExpressOnServer.md)

## 2. 上传你的静态网站

在我们初次配置好 Nginx 时，访问域名便能看到一个来自 Nginx 官方的欢迎页面，这是因为 Nginx 配置默认的静态文件目录是`/var/www/html`，我们只需要将我们的静态网站上传到这个目录下即可。

你也可以去 `/etc/nginx/sites-available/default` 中修改默认的静态文件目录。

```
# ...
root /var/www/html; # 修改这里的路径
# ...
```

修改之后，重启 Nginx 服务即可。

```bash
sudo service nginx restart
```

这时，当你访问域名时，便能看到你的静态网站了。

## 3. 配置 Nginx 反向代理

由于在网页中发请求时有跨域的限制，所以我们需要配置 Nginx 反向代理，将请求转发到我们的后端服务器上。

假设我们的后端服务器地址为`http://localhost:8000`，我们需要在 Nginx 的配置文件中添加以下配置：

```conf
server {
  listen 80; # 监听的端口，一般为 80，即 http 默认端口
  server_name example.com; # 你的服务器域名

  location / {
    proxy_pass http://localhost:8000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }
}
```

配置完成后，重启 Nginx 服务即可。

```bash
sudo service nginx restart
```

同时，在后端服务器中，我们需要配置 CORS，允许来自 Nginx 服务器的跨域请求。

以 Koa 为例，我们需要在`src/app/index.ts`中添加以下代码：

```ts
// ...
app.use((ctx: Koa.Context, next: Koa.Next) => {
  res.header("Access-Control-Allow-Origin", "http://***.***.**.**"); // 你的服务器 IP
  // ...
  await next();
});
```

这时，你的网页上的所有请求便会通过 Nginx 监听的`example.com`域名转发到后端服务器上了。
