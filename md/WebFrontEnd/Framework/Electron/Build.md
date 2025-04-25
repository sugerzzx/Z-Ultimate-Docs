# electron-builder 打包出错

## 下载 winCodeSign 失败

在 docker 中使用 electron-builder 打包时，出现报错：

```bash
✓ built in 8.12s
• electron-builder version=26.0.12 os=3.10.0-1160.119.1.el7.x86_64
• artifacts will be published if draft release exists reason=CI detected
• loaded configuration file=/builds/zhouzixuan/qince-print/electron-builder.yml
• skipped dependencies rebuild reason=npmRebuild is set to false
• packaging platform=win32 arch=x64 electron=35.1.2 appOutDir=dist/win-unpacked
• downloading url=https://npmmirror.com/mirrors/electron/v35.1.2/electron-v35.1.2-win32-x64.zip size=120 MB parts=8
• downloaded url=https://npmmirror.com/mirrors/electron/v35.1.2/electron-v35.1.2-win32-x64.zip duration=11.277s
• updating asar integrity executable resource executablePath=dist/win-unpacked/勤策易商贸远程打印.exe
⨯ Get "https://github.com/electron-userland/electron-builder-binaries/releases/download/winCodeSign-2.6.0/winCodeSign-2.6.0.7z": dial tcp 20.205.243.166:443: connect: connection timed out
```

在 linux 服务器上 ping github 或者 20.205.243.166，可以 ping 通的
而且本地的 windows 机器上打包不会报错，且断网情况下也能打包，为什么？

### 原因分析

1. **electron-builder 默认会下载 winCodeSign 工具**，用于 Windows 下的代码签名，即使没有配置签名证书。
2. **本地 Windows 打包不会报错**，是因为本地已经缓存了 winCodeSign 工具，断网也能用缓存。
3. **Linux/Docker 环境没有缓存**，每次都要联网下载，且有些云服务器或 Docker 环境对 GitHub 的 HTTPS 访问有特殊限制（如 SNI、TLS、代理等），导致超时。
4. **ping 通不代表 HTTPS 能正常访问**，有可能是被防火墙、代理或 Docker 网络策略拦截了 443 端口的实际流量。

### 解决办法

#### 1. 跳过 winCodeSign 下载

如果你**不需要 Windows 代码签名**，可以在 electron-builder.yml 或 package.json 里明确关闭：

```yaml
win:
  sign: false
```

或者在 `build:win` 命令后加参数：

```sh
electron-builder --win --config.win.sign=false
```

但是当你的应用有以下需求时，建议不要关闭：

- 面向普通用户分发的正式产品，建议必须签名。
- 需要用 Electron autoUpdater 自动更新功能，必须签名。
- 需要提升用户信任度、减少安全警告时。
- 在企业、政府、教育等对安全有要求的环境下

##### 2. 检查 Docker 网络和代理

确保 Docker 容器内能用 curl/wget 访问该地址：

```sh
curl -v https://github.com/electron-userland/electron-builder-binaries/releases/download/winCodeSign-2.6.0/winCodeSign-2.6.0.7z
```

如果 curl 也超时，说明是 Docker 网络或公司代理问题。

如果在服务器命令行中能访问，但在 Docker 容器内不能访问，可能是 Docker 没有正确的 DNS、代理或网络配置，导致无法访问外部 HTTPS 资源。

```json
// /etc/docker/daemon.json
{
  "dns": ["8.8.8.8", "114.114.114.114"]
}
```

## 构建产物过大时，上传产物失败

```bash
Saving cache for successful job
00:01
Creating cache default-protected...
./electron-cache: found 2 matching artifact files and directories
Archive is up to date!
Created cache
Uploading artifacts for successful job
00:07
Uploading artifacts...
dist/: found 82 matching artifact files and directories
ERROR: Uploading artifacts as "archive" to coordinator... 413 Request Entity Too Large  id=583 responseStatus=413 Request Entity Too Large status=413 token=glcbt-64
FATAL: too large
ERROR: Job failed: exit code 1
```

### 解决办法

1. 更改 GitLab CI/CD 的最大上传限制

[Maximum artifacts size](https://docs.gitlab.com/administration/settings/continuous_integration/#maximum-artifacts-size)

2. 如果使用的是 electron-builder 打包，建议使用命令行查看打包后的文件大小以及检查以下 electron-builder 配置中的 files 配置项，是否有不必要的文件被打包进去了，比如 CI/CD 的缓存目录、node_modules、.git、.idea 等等。

```bash
ls -lhR dist/win-unpacked
```

[eledtron-builder files 配置项](https://www.electron.build/configuration#files)
