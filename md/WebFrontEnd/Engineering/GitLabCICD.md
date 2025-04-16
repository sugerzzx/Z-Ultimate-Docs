# GitLab CI/CD

[Use CI/CD to build your application](https://docs.gitlab.com/topics/build_your_application/)

## 为什么即使设置好了 Project runners，任务却一直处于 stuck 状态？

[This job is stuck, because the project doesn't have any runners online assigned to it. Go to Runners page](https://stackoverflow.com/questions/53370840/this-job-is-stuck-because-the-project-doesnt-have-any-runners-online-assigned)

因为 runner 设置了 tag，而 job 没有设置 tag，需要在 runner 设置中勾选`Run untagged jobs`，或者在 job 中设置 tag。

## 在 `windows` 平台使用 gitlab runner，且设置 `powershell` 作为 executor 时，执行任务时遇到乱码报错

### 解决方法

[在 windows 系统中，开启 `utf-8` 编码支持](https://exploratory.io/note/exploratory/Enabling-UTF-8-on-Windows-hYc3yWL0)

### 原因

**以下回答来自于 ChatGPT:**

这个问题的根源在于 Windows 系统默认使用的是传统的代码页（如 CP1252、CP936 等），而 GitLab Runner（以及使用 PowerShell 的部分环境）通常期望使用 UTF-8 编码。当两边编码不匹配时，就会导致输出内容出现乱码或错误信息。

下面详细解释这个过程：

#### 1. Windows 默认编码与传统代码页

- **传统代码页**：Windows 在没有特殊设置时，通常使用系统区域对应的传统代码页。这些代码页对于某些语言（如简体中文）是经过优化的，但它们并不是通用的 Unicode 标准，这就会在包含多种语言字符时出现问题。
- **编码不匹配**：当程序（比如 GitLab Runner 或 PowerShell 脚本）以 UTF-8 格式输出字符，而 Windows 的控制台使用其他编码时，系统在解释这些字节流时会出错，从而产生乱码。

### 2. PowerShell 与 GitLab Runner 期望 UTF-8

- **现代工具的标准**：许多现代开发工具和脚本越来越倾向于使用 UTF-8，因为它能够覆盖全球大部分语言字符集。而 GitLab Runner 配置时，如果执行器（如 PowerShell）输出的内容中包含 UTF-8 编码字符，而系统却按照其他代码页进行解释，就会导致字符显示错误。
- **错误与乱码现象**：在这种不匹配的情况下，错误信息中的非 ASCII 字符（例如中文）就会出现乱码的现象，从而影响调试和日志分析。

#### 3. 开启“使用 Unicode UTF-8 提供全球语言支持”选项的作用

- **系统级统一编码**：该选项实质上是将系统的默认编码改为 UTF-8（代码页 65001）。也就是说，开启后，Windows 控制台、命令行以及绝大多数程序将按照 UTF-8 编码进行文本的输入和输出。
- **消除编码矛盾**：当系统强制使用 UTF-8 后，程序（如 GitLab Runner 和 PowerShell）输出的字符就可以被正确解析，从而避免了因编码不一致产生的乱码问题。
- **提升兼容性**：UTF-8 是一种面向全球化设计的编码方式，通过统一编码标准，可以消除不同语言环境下可能出现的兼容性问题，确保输出结果在不同设备和平台上都能正确显示。

#### 总结

启用 “使用 Unicode UTF-8 提供全球语言支持” 后，系统会以 UTF-8 为默认编码方式，从而与 GitLab Runner 和 PowerShell 等工具期望的编码格式一致，防止了由于代码页不匹配而导致的乱码问题和相关报错。这种设置确保了文本数据在不同系统组件之间的一致性和正确解析。

这种问题的出现和解决方案，可以看作是一种编码兼容性的调试过程，确保环境中所有环节都使用统一的编码格式，从而避免了一系列潜在的字符解释问题。
