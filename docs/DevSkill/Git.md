# Git

## 1. Git / 准备工作

### 1.1 Git 下载

> [Git 官网](https://git-scm.com/)

### 1.2 Git 安装

> [Git 安装教程](https://www.runoob.com/git/git-install-setup.html)

### 1.3 打开 Git Bash

> 在工作文件夹下，右键选择 Git Bash Here，或者在任意文件夹下，右键选择 Git Bash Here，再 cd 到工作文件夹下
> 也可以在 VSCode 中打开终端，选择 Git Bash

### 1.4 配置 Git

配置用户名，便于别人知道是谁提交的

```shell
git config --global user.name "Your Name"
```

配置邮箱,便于别人联系你

```shell
git config --global user.email "
```

查看配置信息

```shell
git config --list
```

---

## 2. 通过实际操作学习 Git

> 在此之前确保在正确的文件夹下打开了 Git Bash

**初始化仓库**

```shell
git init
```

> 会在当前目录下生成一个 .git 的隐藏文件夹，这个文件夹是 Git 用来跟踪管理版本的，
> 一般不要修改这个文件夹中的内容，否则会导致仓库损坏

**创建一个 .md 文件，模拟一个项目**

```shell
echo "版本1" > Project.md # 创建一个 Project.md 文件，并写入 "版本1"
```

**查看状态**

```shell
git status # 查看状态

# 输出为:
On branch master # 当前所处分支

No commits yet # 没有提交

# 未跟踪的文件:
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        text.md

nothing added to commit but untracked files present (use "git add" to track)
```

**添加文件到暂存区**

```shell
git add Project.md # 添加文件到暂存区
git add . # 添加所有文件到暂存区
```

**查看状态**

```shell
git status # 查看状态

# 输出为:
On branch master # 当前所处分支

No commits yet # 没有提交

# 要提交的变更:
Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   text.md
```

**提交到本地仓库**

```shell
git commit -m "message" # 提交到本地仓库
```

> -m 后面的内容是提交的说明，可以随意写，但是最好写清楚这次提交的内容

**查看提交日志**

```shell
git log # 查看提交日志
# 输出为:
# hash值,作者,日期,提交说明
commit 9abada884a25f01b0068df5481ac632528f2d2dd (HEAD -> master) # HEAD -> master 表示当前所处分支
Author: sugerzzxDeskTop <sugerzzx@gmail.com>
Date:   Wed May 24 11:51:01 2023 +0800

    message # 提交说明
```

**创建.gitignore 文件，忽略不需要提交的文件**

```shell
touch .gitignore # 创建.gitignore文件
```

**在.gitignore 文件中添加需要忽略的文件**

```shell
echo "node_modules" >> .gitignore # 在.gitignore文件中添加需要忽略的文件
```

**复制远程仓库**

```shell
git clone https://gitee.com/sugerzzx/something.git
```

> 会在当前目录下生成一个 something 文件夹，里面包含了远程仓库的所有内容

**查看远程仓库**

```shell
git remote -v # 查看远程仓库
```

**提交到远程仓库**

```shell
git push
```

> 会提示输入用户名和密码或者 token

**拉取远程仓库**

```shell
git pull
```

**拉取到暂存区**

```shell
git fetch
```

> 与 git pull 的区别是，git pull 会直接拉取到工作区，而 git fetch 会拉取到暂存区

**查看分支**

```shell
git branch
```

> 输出为: \* master # 当前所处分支

**创建分支**

```shell
git branch dev # 创建 dev 分支
```

**切换分支**

```shell
git checkout dev # 切换到 dev 分支
```

**合并分支**

```shell
git merge dev # 合并 dev 分支到当前分支
```

**删除分支**

```shell
git branch -d dev # 删除 dev 分支
```

**创建并切换分支**

```shell
git checkout -b dev # 创建并切换到 dev 分支
```

**查看分支合并图**

```shell
git log --graph # 查看分支合并图
```

---
