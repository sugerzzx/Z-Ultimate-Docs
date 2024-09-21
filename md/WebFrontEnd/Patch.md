# patch npm package

在 node 项目中，我们经常会使用 npm 包，但是有时候这些 npm 包的功能不完全符合我们的需求，或者有 bug，这时候我们可以：

1. 在 github 上向包的作者提 issue，希望作者能够修复这个 bug，或者添加新的功能。

2. fork 这个 npm 包的仓库，然后修改代码，提交 pull request，等待作者合并，或者单独发布到 npm 上，也可以直接使用你 fork 的仓库。

3. 在本地的 `node_modules` 中修改这个 npm 包的代码，然后使用 `patch-package` 来生成一个补丁文件，将补丁文件提交到 git 仓库中，这样其他人在 clone 你的项目时，可以通过 `patch-package` 来修复这个 npm 包。

相关讨论：[stackoverflow:How to edit a node module installed via npm?](https://stackoverflow.com/questions/13300137/how-to-edit-a-node-module-installed-via-npm)

## 使用 patch-package

### 安装 `patch-package` :

```bash
npm install patch-package postinstall-postinstall
```

### 修改 npm 包的代码

在 `node_modules` 中找到你要修改的 npm 包，修改代码。

### 生成补丁文件

```bash
npx patch-package <package-name>
```

这会在项目根目录下生成一个`patches`目录，里面包含了所有的补丁文件。

### 在 `package.json` 中添加`postinstall`脚本

```json
{
  "scripts": {
    "postinstall": "patch-package"
  }
}
```

这样每次 `npm install` 时，`patch-package `都会自动运行，修复 npm 包。

### 调试 `node_modules` 中的代码

在修改 `node_modules` 中的代码时，难免遇到一些问题，需要调试，这时可以借助 `npm link` 来调试。

相关讨论：[stackoverflow:vscode debug code in node_modules directory](https://stackoverflow.com/questions/47021083/vscode-debug-code-in-node-modules-directory)

```bash
clone sample-node-module
cd sample-node-module
npm link
cd sample-project
npm link sample-node-module
```
