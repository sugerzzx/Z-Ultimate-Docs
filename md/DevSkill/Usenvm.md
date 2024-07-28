# Nvm

## 介绍

Nvm 是一个 node 版本管理工具，可以让你在同一台机器上安装多个版本的 node，并且可以在不同的项目中使用不同的 node 版本。

## 使用

```bash
# 查看可用的 node 版本
nvm list available

# 安装最新版本的 node
nvm install node

# 安装指定版本的 node
nvm install 16.0.0

# 查看已安装的 node 版本
nvm list

# 切换 node 版本
nvm use 16.0.0

# 卸载 node 版本
nvm uninstall 16.0.0
```

切换 node 版本并不会导致 npm 源的变化

# Nrm

## 介绍

Nrm 是一个 npm 源管理工具，可以让你在同一台机器上切换不同的 npm 源。

## 安装

```bash
npm install -g nrm
```

## 使用

```bash
# 查看可用的 npm 源
nrm ls

# 切换 npm 源
nrm use taobao

# 添加 npm 源
nrm add taobao https://registry.npm.taobao.org/

# 删除 npm 源
nrm del taobao

# 测试 npm 源速度
nrm test taobao
```

# rimraf

## 介绍

rimraf 是一个用来删除文件的工具，可以删除文件夹、文件夹下的所有文件、文件夹下的所有文件和文件夹。

## 安装

```bash
npm install -g rimraf
```

## 使用

```bash
# 快速删除当前目录下的 node_modules 文件夹
rimraf node_modules
```
