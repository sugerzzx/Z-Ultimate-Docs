# Nginx

Nginx 是一个高性能的 HTTP 和反向代理服务器，也是一个 IMAP/POP3/SMTP 服务器。有了 Nginx，你便可以在一台服务器上运行多个 Web 应用，而每个 Web 应用都监听于不同的端口，Nginx 服务器则负责根据用户的访问域名，将请求反向代理到相应的 Web 应用上。

## Download(Ubuntu)

在 Ubuntu 系统上安装 Nginx 需要经过几个步骤，包括安装必要的先决条件、导入 Nginx 的官方签名密钥、设置 Nginx 软件包的 APT 源，以及安装 Nginx 软件包。以下是详细的翻译和解释：

### 1. 安装先决条件

首先，你需要安装一些必要的软件包，它们包括`curl`、`gnupg2`、`ca-certificates`、`lsb-release`和`ubuntu-keyring`。这些软件包帮助你管理证书、下载和验证软件包，以及获取系统的版本信息。

```bash
sudo apt install curl gnupg2 ca-certificates lsb-release ubuntu-keyring
```

### 2. 导入 Nginx 官方签名密钥

接下来，你需要导入 Nginx 官方的签名密钥，这样`apt`可以验证下载的软件包的真实性。以下命令将下载 Nginx 的签名密钥并将其存储在指定位置：

```bash
curl https://nginx.org/keys/nginx_signing.key | gpg --dearmor \
    | sudo tee /usr/share/keyrings/nginx-archive-keyring.gpg >/dev/null
```

- `curl https://nginx.org/keys/nginx_signing.key`：使用`curl`下载 Nginx 的签名密钥文件。
- `gpg --dearmor`：将密钥文件从装甲 ASCII 格式转换为二进制格式。
- `sudo tee /usr/share/keyrings/nginx-archive-keyring.gpg`：使用`sudo`权限将转换后的密钥文件写入指定路径。

### 3. 验证密钥文件

为了确保下载的密钥文件是正确的，可以使用以下命令进行验证：

```bash
gpg --dry-run --quiet --no-keyring --import --import-options import-show /usr/share/keyrings/nginx-archive-keyring.gpg
```

- `--dry-run`：模拟密钥的导入过程，而不实际进行导入。
- `--quiet`：抑制大部分输出，只显示必要信息。
- `--no-keyring`：不将密钥导入到默认的密钥环中。
- `--import --import-options import-show`：显示密钥的详细信息。

输出结果应该包含以下指纹信息：

```plaintext
pub   rsa2048 2011-08-19 [SC] [expires: 2024-06-14]
      573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62
uid                      nginx signing key <signing-key@nginx.com>
```

如果指纹信息不同，请删除文件并重新下载。

### 4. 设置 APT 源

为了能够安装 Nginx，需要设置 APT 源。以下命令将设置稳定版本的 Nginx 软件包源：

```bash
echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] \
http://nginx.org/packages/ubuntu `lsb_release -cs` nginx" \
    | sudo tee /etc/apt/sources.list.d/nginx.list
```

- `deb`：指明要添加的 APT 源。
- `[signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg]`：指定用于验证软件包的密钥文件。
- `http://nginx.org/packages/ubuntu`：Nginx 软件包的下载地址。
- `` `lsb_release -cs` ``：动态获取 Ubuntu 的版本代号。
- `sudo tee /etc/apt/sources.list.d/nginx.list`：将输出写入到`nginx.list`文件中。

如果你想使用 Nginx 的主线版本（最新的开发版本），请使用以下命令：

```bash
echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] \
http://nginx.org/packages/mainline/ubuntu `lsb_release -cs` nginx" \
    | sudo tee /etc/apt/sources.list.d/nginx.list
```

### 5. 设置仓库优先级

为了确保系统优先使用 Nginx 的官方软件包而不是 Ubuntu 仓库中的软件包，你需要设置软件包的优先级。使用以下命令：

```bash
echo -e "Package: *\nPin: origin nginx.org\nPin: release o=nginx\nPin-Priority: 900\n" \
    | sudo tee /etc/apt/preferences.d/99nginx
```

- `Package: *`：指定所有软件包。
- `Pin: origin nginx.org`：优先使用来自`nginx.org`的源。
- `Pin: release o=nginx`：指定发布源的标识。
- `Pin-Priority: 900`：设置优先级为 900，通常高于默认仓库。

### 6. 更新 APT 缓存并安装 Nginx

最后，更新 APT 缓存并安装 Nginx：

```bash
sudo apt update
sudo apt install nginx
```

- `sudo apt update`：更新软件包列表，确保 APT 获取最新的包信息。
- `sudo apt install nginx`：安装 Nginx。

### 总结

通过这些步骤，你可以在 Ubuntu 系统上顺利安装 Nginx。你将能够使用 Nginx 的官方软件包，并确保安装过程中的安全性和可靠性。这些步骤包括设置必要的软件包、导入官方签名密钥、配置 APT 源和优先级，以及最终安装 Nginx。

## 使用 Nginx 部署你的一个静态网站

[Beginner’s Guide](https://nginx.org/en/docs/beginners_guide.html)

### 找到你的 Nginx 配置文件

The way nginx and its modules work is determined in the configuration file. By default, the configuration file is named `nginx.conf` and placed in the directory `/usr/local/nginx/conf`, `/etc/nginx`, or `/usr/local/etc/nginx`.

配置文件的位置取决于你的 Nginx 安装方式，一般在`/etc/nginx/nginx.conf`。

### 配置 Nginx 以提供静态网站

```conf
server {
    listen       80;
 	 	location / {
        root   /data/www; # 你的网站根目录
   			index  index.html index.htm; # 默认首页
    }
}
```

### 配置 Nginx 反向代理

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
