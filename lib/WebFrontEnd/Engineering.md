# Engineering

前端工程化是指利用工程化的思想和工具来提高前端开发效率、降低维护成本、增强代码质量和团队协作的一种开发方式。前端工程化涵盖了很多方面，包括但不限于：

1. **构建工具**：如 Webpack、Gulp、Grunt 等，用于自动化构建和打包前端资源文件，优化性能和减少手工操作。

2. **模块化开发**：利用模块化规范（如 CommonJS、AMD、ES6 模块）来拆分代码，提高代码复用性和可维护性。

3. **版本控制**：使用 Git 等版本控制工具管理代码的版本，方便团队协作和代码回滚。

4. **代码规范**：通过 ESLint、Prettier 等工具规范代码风格，提高代码质量和可读性。

5. **自动化测试**：编写单元测试、集成测试和端到端测试，保证代码质量和稳定性。

6. **持续集成/部署**：利用 CI/CD 工具自动化构建、测试和部署代码，加快开发周期。

通过前端工程化的方式，开发团队能够更高效地开发和维护前端项目，提高开发质量和团队协作效率。

## Webpack

[Webpack is a static module bundler for modern JavaScript applications](https://webpack.js.org/)

## GulpJs

👉 [gulpjs](https://gulpjs.com/)

Gulp.js 是一个基于 Node.js 的前端构建工具，也被称为任务运行器。它可以帮助你自动化常见的开发任务，如压缩 JavaScript 文件、编译 CSS 预处理器、刷新浏览器等。Gulp.js 使用流（stream）的概念，使得你可以将多个操作连接在一起以创建更高效的构建流程。

Gulp.js 的主要特点包括：

- 易用性：Gulp.js 的 API 简单易用，只需要几个基本的方法就可以完成大部分任务。

- 高效：Gulp.js 使用 Node.js 流，文件在系统中以流的形式传输，这样可以避免了多次读写硬盘，提高了处理效率。

- 强大的插件系统：Gulp.js 有大量的插件可供选择，可以帮助你完成各种任务。

- 灵活：Gulp.js 不提供预定义的构建流程，你可以根据自己的需求自定义任务。

### 利用 Gulp.js 重新组织打包完毕的文件结构及文件名

```javascript
const gulp = require("gulp");
const rename = require("gulp-rename");

const timestamp = new Date().getTime();

gulp.task("rename", function () {
  return gulp
    .src("dist/*.js")
    .pipe(rename({ suffix: `-${timestamp}` }))
    .pipe(gulp.dest("lib"));
});
```

### 利用 Gulp.js 实现 css 插入

```javascript
const cssText = "$cssText";

class CustomElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        ${cssText}
      </style>
      <div>Hello, World!</div>
    `;
  }
}
```

在你的 Gulp.js 配置文件中，你可以使用 `gulp-replace` 插件来替换 `$cssText` 为你的 CSS 文本。

```javascript
const gulp = require("gulp");
const replace = require("gulp-replace");
const fs = require("fs");

const cssText = fs.readFileSync("src/style.css", "utf8");

gulp.task("insert-css", function () {
  return gulp.src("src/index.js").pipe(replace("$cssText", cssText)).pipe(gulp.dest("dist"));
});
```

## Source Map

JavaScript Source Map（JS Source Map）是一个映射文件，它可以将压缩、混淆后的 JavaScript 代码映射回原始的源代码。这样，当在浏览器中调试代码时，即使 JavaScript 代码已经被压缩或混淆，开发者也可以看到原始的源代码，从而更方便地进行调试和错误定位。

在 JavaScript 文件中，通常会有一行注释指向 Source Map 文件，如：`//# sourceMappingURL=/path/to/file.js.map`。

Source Map 文件是一个 JSON 格式的文件，包含了源代码和生成代码之间的位置

## SystemJS

SystemJS 是一个模块加载器，它支持 ES6 模块、AMD、CommonJS 等多种模块规范。SystemJS 可以在浏览器中动态加载模块，支持模块的异步加载和按需加载。
