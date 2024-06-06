# ADB

## adb 命令

adb 全称 Android Debug Bridge，是 Android 平台调试桥，是连接 Android 手机与 PC 端的桥梁，通过 adb 可以管理、操作模拟器和设备，如安装软件、查看设备软硬件参数、系统升级、运行 shell 命令等。

adb 是一个客户端-服务器端程序，其中客户端是你用来操作的电脑，服务器端是 Android 设备。
adb 的常用功能包括：

- 安装、卸载应用程序
- 查看设备信息
- 运行 Shell 命令
- 调试 Android 应用程序

## adb shell 命令

adb shell 是 adb 的一个子命令，它允许你在 Android 设备上运行 Shell 命令。Shell 命令是 Linux 系统下的命令，可以用来执行各种系统操作，如查看文件、创建文件、安装软件等。

adb shell 的常用功能包括：

- 查看文件
- 创建文件
- 安装软件
- 卸载软件
- 运行系统服务
- 执行其他系统操作

## adb 工具安装

安装 Android SDK 中的 **Android SDK Command-line Tools** 后会集成 adb。Android SDK Command-line Tools 包含 adb 工具以及其他用于管理 Android 设备和模拟器的命令行工具。

安装 Android SDK Command-line Tools 后，adb 工具将位于以下目录中：

- Windows：`*\Android\android-sdk\platform-tools`

要使用 adb 工具，需要将 Android SDK Command-line Tools 所在目录添加到系统环境变量中。

在 Windows 中，可以按照以下步骤添加环境变量：

1. 打开“控制面板”，然后单击“系统”。
2. 单击“高级系统设置”，然后单击“环境变量”。
3. 在“系统变量”中，找到“Path”变量，然后单击“编辑”。
4. 在“变量值”框中，添加 Android SDK Command-line Tools 所在目录的路径。
5. 单击“确定”保存更改。

在 Mac 中，可以按照以下步骤添加环境变量：

1. 打开“系统偏好设置”，然后单击“用户与群组”。
2. 单击“当前用户”。
3. 单击“高级”。
4. 单击“环境变量”。
5. 在“键”列表中，单击“PATH”。
6. 在“值”框中，添加 Android SDK Command-line Tools 所在目录的路径。
7. 单击“确定”。

在 Linux 中，可以按照以下步骤添加环境变量：

1. 打开“终端”。
2. 输入以下命令：

```bash
export PATH=$PATH:$HOME/<adb-tool-directory>
```

其中，`<adb-tool-directory>`是 Android SDK Command-line Tools 所在目录。

添加环境变量后，就可以使用 adb 工具了。

## adb 常用命令

### adb devices

`adb devices` 命令用于查看当前连接的 Android 设备。

```bash
adb devices
```

如果设备已连接，将显示设备的序列号。如果设备未连接，将显示空列表。

### adb connect

`adb connect` 命令用于连接 Android 设备。

```bash
adb connect <ip-address>
```

其中，`<ip-address>` 是 Android 设备的 IP 地址。

### adb disconnect

`adb disconnect` 命令用于断开 Android 设备的连接。

```bash
adb disconnect <ip-address>
```

### adb install

`adb install` 命令用于安装应用程序。

```bash
adb install <apk-file>
```

其中，`<apk-file>` 是应用程序的 APK 文件。

### adb push

`adb push` 命令用于将文件从电脑复制到 Android 设备。

```bash
adb push <local-file> <remote-file>
```

其中，`<local-file>` 是电脑上的文件，`<remote-file>` 是 Android 设备上的文件。

### adb pull

`adb pull` 命令用于将文件从 Android 设备复制到电脑。

```bash
adb pull <remote-file> <local-file>
```

### adb shell

`adb shell` 命令用于在 Android 设备上运行 Shell 命令。

```bash
adb shell <shell-command>
```

#### adb shell ls

`adb shell ls` 命令用于查看文件。

```bash
adb shell ls <file>
```

#### adb shell mkdir

`adb shell mkdir` 命令用于创建文件夹。

```bash
adb shell mkdir <directory>
```

#### adb shell rm

`adb shell rm` 命令用于删除文件。

```bash
adb shell rm <file>
```

#### adb shell rmdir

`adb shell rmdir` 命令用于删除文件夹。

```bash
adb shell rmdir <directory>
```

#### adb shell pm clear

`adb shell pm clear` 命令用于清除应用程序的数据。

```bash
adb shell pm clear <package-name>
```

#### adb shell test -d

`adb shell test -d` 命令用于检查文件夹是否存在。

```bash
adb shell test -d <directory>
```

使用以下的命令在 adb shell 中检查文件夹是否存在，如果不存在则创建：

```batch
adb shell "[ -d /path/to/your/folder ] || mkdir -p /path/to/your/folder"
```
