# 如何使用 VSCode

## 自定义用户代码片段

`文件` ==> `首选项` ==> `配置用户代码片段` ==> 选择一种语言 ==> 输入代码片段

```json
// 以typescriptreact.json为例
{
  "Typescript React Function Component": {
    "prefix": "fc",
    "body": [
      "import { FC } from 'react';",
      "",
      "interface ${TM_FILENAME_BASE/(.)(.*)/${1:/upcase}${2}/}Props {",
      "  $1",
      "}",
      "",
      "const ${TM_FILENAME_BASE/(.)(.*)/${1:/upcase}${2}/}: FC<${TM_FILENAME_BASE/(.)(.*)/${1:/upcase}${2}/}Props> = ({$2}) => {",
      "  return <div>${TM_FILENAME_BASE/(.)(.*)/${1:/upcase}${2}/}</div>",
      "}",
      "",
      "export default ${TM_FILENAME_BASE/(.)(.*)/${1:/upcase}${2}/}"
    ],
    "description": "Typescript React Function Component"
  }
}
```

效果为：当输入`fc`时，会自动补全代码片段

```tsx
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return <div>page</div>;
};

export default page;
```

## 将"使用 VSCode 打开"添加到右键菜单中

安装 VSCode 时，如果忘记勾选将 Code 添加到右键菜单中，可以通过更改注册表的方式，手动将其添加到右键菜单中

```txt
Windows Registry Editor Version 5.00

; 若包含中文请示用 GBK 编码保存
; 安装位置更改为安装时指定的位置
; OpenWithCode 可以更改，比如 vscode

; Open files
[HKEY_CLASSES_ROOT\*\shell\OpenWithCode]
@="通过 Code 打开"
"Icon"="D:\\App\\Microsoft VS Code\\Code.exe,0"

[HKEY_CLASSES_ROOT\*\shell\OpenWithCode\command]
@="\"D:\\App\\Microsoft VS Code\\Code.exe\" \"%1\""

; This will make it appear when you right click ON a folder
; The "Icon" line can be removed if you don't want the icon to appear

[HKEY_CLASSES_ROOT\Directory\shell\OpenWithCode]
@="通过 Code 打开"
"Icon"="\"D:\\App\\Microsoft VS Code\\Code.exe\",0"

[HKEY_CLASSES_ROOT\Directory\shell\OpenWithCode\command]
@="\"D:\\App\\Microsoft VS Code\\Code.exe\" \"%1\""


; This will make it appear when you right click INSIDE a folder
; The "Icon" line can be removed if you don't want the icon to appear

[HKEY_CLASSES_ROOT\Directory\Background\shell\OpenWithCode]
@="通过 Code 打开"
"Icon"="\"D:\\App\\Microsoft VS Code\\Code.exe\",0"

[HKEY_CLASSES_ROOT\Directory\Background\shell\OpenWithCode\command]
@="\"D:\\App\\Microsoft VS Code\\Code.exe\" \"%V\""
```
