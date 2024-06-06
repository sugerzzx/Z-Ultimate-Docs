# Ecahrts

## 1. 安装 Echarts

```shell
npm install echarts --save
```

## 2. 使用 Echarts

[略](https://echarts.apache.org/handbook/zh/get-started/)

## 3. [Vue-ECharts 插件](https://github.com/ecomfe/vue-echarts/blob/main/README.zh-Hans.md)

这个插件可以让我们在 Vue 中更方便的使用 Echarts，使你的 Echarts 与 Vue 的响应式机制结合起来。

---

# Swiper

## 1. 安装 Swiper

_Vue2 中使用的是 vue-awesome-swiper@4.1.1_

```shell
npm install vue-awesome-swiper@4 --save
```

## 2. 在 Vue 中使用 Swiper

> 这是一个带有分页器的 Swiper

```html
<template>
  <!-- options 为 Swiper 的配置项 -->
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 4</swiper-slide>
    <swiper-slide>Slide 5</swiper-slide>
    <swiper-slide>Slide 6</swiper-slide>
    <swiper-slide>Slide 7</swiper-slide>
    <swiper-slide>Slide 8</swiper-slide>
    <swiper-slide>Slide 9</swiper-slide>
    <swiper-slide>Slide 10</swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  // 导入 Swiper, SwiperSlide 组件
  import { Swiper, SwiperSlide } from "vue-awesome-swiper";
  // 导入 Swiper 样式
  import "swiper/css/swiper.css";

  export default {
    name: "swiper-example-pagination",
    title: "Pagination",
    components: {
      Swiper,
      SwiperSlide,
    },
    data() {
      return {
        swiperOption: {
          // Swiper 的配置项,pagination 为分页器
          pagination: {
            // el 为分页器的容器
            el: ".swiper-pagination",
          },
        },
      };
    },
  };
</script>

<style lang="scss" scoped>
  @import "./base.scss";
</style>
```

[更多例子](https://v1.github.surmon.me/vue-awesome-swiper/)

---

# Sass

## 1. 安装 Sass

### 1.1 Vue 中安装

```shell
npm install sass-loader sass --save-dev
```

> 由于 VueCLi 无法识别 sass 语法，所以需要安装 sass-loader 和 sass
> 由于 sass 只作为开发依赖，所以使用--save-dev

### 1.2 React 中安装

```shell
npm install sass  --save-dev
```

> 由于 React 可以识别 sass 语法，所以只需要安装 sass 即可

## 2. 使用 Sass

- 首先在 style 标签中添加 lang 属性

  ```scss
  <style lang="scss"> // 这里就可以使用 scss 语法了
  ···
  </style>
  ```

- 嵌套

  ```scss
  <style lang="scss">
  div {
    color: red;
    span {
      color: blue;
    }
  }
  </style>
  ```

- 定义变量和使用变量

  ```scss
  <style lang="scss">
  // 定义变量
  $color: #114514;
  // 使用变量
  div {
    color: $color;
  }
  </style>
  ```

- 循环

  ```scss
  <style lang="scss">
  @for $i from 1 through 3 {
    .item-#{$i} { width: 2em * $i; }
  }
  </style>
  ```

- ...

  [更多语法](https://sass-lang.com/documentation/)

---

# [Less](https://less.bootcss.com/)

---

# Nprogress

**在隔壁的 [VueRouter.md](../Framework/VUE/VueRouter.md) 中**
[Nprogress 官方](https://github.com/rstacruz/nprogress)

---

# Mockjs（生成随机数据，拦截 Ajax 请求）

## 1. 安装 Mockjs

```shell
npm install mockjs --save-dev
```

## 2. 使用 Mockjs

- 在 src 目录下新建 mock 目录，然后在 mock 目录下新建 mock.js 文件

  ```js
  // 导入 Mockjs
  import Mock from "mockjs";

  // 使用 Mockjs 模拟数据
  Mock.mock("/api/data", {
    data: {
      "list|10": [
        {
          "id|+1": 1,
          name: "@cname",
          "age|18-28": 25,
          address: "@county(true)",
        },
      ],
    },
  });
  ```

- 在 main.js 中导入 mock.js

  ```js
  import "./mock/mock.js";
  ```

- 在需要使用数据的组件中使用 axios 请求数据

  ```js
  axios.get("/api/data").then(res => {
    console.log(res.data);
  });
  ```

3. 更多 Mockjs 语法

[Mockjs 官网](http://mockjs.com/examples.html)

---

# Dotenv

## 1.安装 dotenv(ts)

- 安装 dotenv

  ```shell
  npm install dotenv @types/dotenv --save-dev
  ```

## 2.使用 dotenv

- 在项目根目录下新建 .env 文件

  ```shell
  # .env
  NODE_ENV = "development"
  # NODE_ENV = "production"
  APP_PORT = 8000
  # 开发环境IP
  DEV_HOST = "http://localhost:3000"
  # 生产环境IP
  PROD_HOST = "http://123.456.78.90"
  ```

- 在 src/config/config.dev.ts 中导入 dotenv

  ```ts
  import dotenv from "dotenv";

  dotenv.config();

  const isDevMode = process.env.NODE_ENV === "development";

  const { APP_PORT, DEV_HOST, PROD_HOST } = process.env;

  export const { port, host } = {
    port: APP_PORT || 3000,
    host: isDevMode ? DEV_HOST : PROD_HOST,
  };
  ```

- 在 package.json 中配置环境变量

  ```json
  {
    "scripts": {
      "dev": "set NODE_ENV=development&&tsc&&node dist/main", // windows使用set，linux使用export
      "start": "export NODE_ENV=production&&node dist/main"
    }
  }
  // 如果这样写
  "dev": "set NODE_ENV=development && tsc && node dist/main" // 会使process.env.NODE_ENV为"development "，多了一个空格，导致判断错误
  ```

- 在 main.ts 中使用环境变量

  ```ts
  import { port } from "./config/config";

  console.log(port); // http://localhost:8080
  ```

---

# highlight.js

highlight.js 是一个 JavaScript 语法高亮显示库，它可以高亮显示几十种语言，并且可以通过自定义语言来扩展。

## 1. 安装 [highlight.js](https://www.npmjs.com/package/highlight.js)

```shell
npm install highlight.js --save-dev
```

## 2. 使用 highlight.js

```html
<pre>
  <code class="language-js">console.log('Hello World!')</code>
</pre>
```

```js
import hljs from "highlight.js";
import "highlight.js/styles/github.css"; // 样式文件
onMounted(() => {
  hljs.highlightAll();
});
```

---

# treeify

treeify.js 可以将 JSON 数据转换为树形结构

## 1. 安装 treeify

```shell
npm install treeify --save-dev
```

## 2. 使用 treeify

```js
import treeify from "treeify";

const treeObj = {
  src: {
    assets: {
      "logo.png": null,
    },
    components: {
      "HelloWorld.vue": null,
    },
    "App.vue": null,
    "main.ts": null,
    "shims-vue.d.ts": null,
  },
  public: {
    "favicon.ico": null,
    "index.html": null,
  },
  "package.json": null,
  "tsconfig.json": null,
  "vue.config.js": null,
};

console.log(treeify.asTree(treeObj, true));
```

将会输出如下结果：

```shell
├─ src
│  ├─ assets
│  │  └─ logo.png
│  ├─ components
│  │  └─ HelloWorld.vue
│  ├─ App.vue
│  ├─ main.ts
│  └─ shims-vue.d.ts
├─ public
│  ├─ favicon.ico
│  └─ index.html
├─ package.json
├─ tsconfig.json
└─ vue.config.js
```

结合 fs 模块，可以生成目录的对象，然后使用 treeify 生成目录树

```js
import fs from "fs";
import path from "path";

function directoryToObj(dirPath) {
  const result = {};
  const files = fs.readdirSync(dirPath); // 同步读取文件夹内容, 返回一个包含“指定目录下所有文件名称”的数组对象

  files.forEach(file => {
    const filePath = path.join(dirPath, file); // 拼接文件路径
    const isDirectory = fs.statSync(filePath).isDirectory(); // 判断文件是否为文件夹

    if (isDirectory) {
      result[file] = directoryToObj(filePath); // 递归
    } else {
      result[file] = null; // 文件直接赋值为 null
    }
  });

  return result;
}

// 使用示例
const projectDirectory = "D:\\File\\WorkStation\\Web\\Myproject\\SugerzzxAdmin\\Server\\src";
const objectStructure = directoryToObj(projectDirectory);
console.log(objectStructure);
```
