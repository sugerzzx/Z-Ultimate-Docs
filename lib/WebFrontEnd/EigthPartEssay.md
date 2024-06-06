# 前端面试八股文

## 杂项

### 从输入网址到页面展示发生了什么

- DNS 解析：将域名解析为 IP 地址

- TCP 连接：三次握手建立连接

- 发送 HTTP 请求

- 服务器处理请求并返回 HTTP 报文

- 浏览器解析渲染页面

- 断开连接：四次挥手断开连接

### 常用的服务器状态码

- 200：请求成功

- 301：永久重定向

- 302：临时重定向

- 304：资源未修改

- 400：请求错误

- 401：未授权

- 403：禁止访问

- 404：资源未找到

- 500：服务器错误

### 实现拖拽上传

- 使用 input [type="file"] 实现

```html
<input type="file" />
```

```js
document.querySelector("input").addEventListener("change", e => {
  const file = e.target.files[0]; // 获取上传的文件
  console.log(file);
});
```

- 使用 drag 事件实现

**口述**：拖拽上传的原理是监听容器的 dragenter、dragover、dragleave、drop 事件，当拖拽进入容器时，需要阻止默认事件，阻止冒泡，过程中还可以改变容器的背景颜色，当拖拽放置时，除了阻止默认事件，阻止冒泡，需要通过事件的 dataTransfer.files 获取拖拽的文件。

```html
<div class="container">
  <div class="upload"></div>
</div>
```

```css
.container {
  position: relative;
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
}

.upload {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.upload:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.upload:active {
  background-color: rgba(0, 0, 0, 0.2);
}
```

```js
const upload = document.querySelector(".upload");

// 拖拽进入
upload.addEventListener("dragenter", e => {
  e.preventDefault();
  e.stopPropagation();
  upload.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
});

// 拖拽在容器上移动
upload.addEventListener("dragover", e => {
  e.preventDefault();
  e.stopPropagation();
});

// 拖拽离开容器
upload.addEventListener("dragleave", e => {
  e.preventDefault();
  e.stopPropagation();
  upload.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
});

// 拖拽放置
upload.addEventListener("drop", e => {
  e.preventDefault();
  e.stopPropagation();
  upload.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
  const file = e.dataTransfer.files[0]; // 获取拖拽的文件
  console.log(file);
});
```

### 移动端适配

在<meta>标签中设置 viewport，通过设置 initial-scale、maximum-scale、minimum-scale、user-scalable 等属性来控制缩放，通过设置 width=device-width 来控制布局视口的宽度，通过设置 target-densitydpi 来控制设备像素比。

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, target-densitydpi=device-dpi" />
```

### localStorage 和 sessionStorage 和 cookie 的区别

- localStorage 和 sessionStorage 都是以 key-value 的形式存储数据，但是 localStorage 存储的数据没有过期时间，sessionStorage 存储的数据在会话结束时会被清除。

- cookie 是服务器发送给浏览器的一小段信息，浏览器会将这些信息保存在本地，下次请求同一网站时会将这些信息发送给服务器，cookie 有过期时间，可以设置失效时间。

```js
// cookie
document.cookie = "name=hello; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
// path是cookie的有效路径，如果不设置，默认为当前页面路径
```

### title 和 h1 的区别，b 和 strong 的区别，i 和 em 的区别

- title 是网页的标题，显示在浏览器的标签页上，h1 是网页的一级标题，是页面的主要标题。对于 SEO 来说，title 是最重要的，搜索引擎会根据 title 来判断网页的主题，h1 是次要的。

- b 和 strong 都是加粗文本，但是 b 是表现层面的加粗，strong 是语义层面的加粗，阅读器会重读 strong 的内容。

- i 和 em 都是斜体文本，但是 i 没有实际含义，em 有强调效果。

### img 的 title 和 alt 的区别

- title 是图片的标题，鼠标悬浮在图片上时显示，alt 是图片的描述，当图片无法显示时显示，添加 alt 属性可以优化 SEO，阅读器会读取 alt 属性的内容。

## CSS

### 1. CSS 盒模型

- 标准盒模型(content-box)：width = content

- IE 盒模型(border-box)：width = content + padding + border

### 2. CSS 选择器

- 基础选择器：id、class、tag、\*

- 组合选择器：后代选择器、子代选择器、相邻兄弟选择器、通用兄弟选择器

- 伪类选择器：:hover、:active、:focus、:first-child、:last-child、:nth-child(n)、:nth-last-child(n)、:nth-of-type(n)、:nth-last-of-type(n)、:first-of-type、:last-of-type、:only-child、:only-of-type、:empty、:not(selector)

- 伪元素选择器：::before、::after、::first-letter、::first-line、::selection

### 3. CSS 优先级

- !important > 行内样式 > ID 选择器 > 类选择器 > 标签选择器 > 通配符选择器 > 继承(inherit) > 浏览器默认属性

### 4. CSS 布局

- 传统布局：流式布局、定位布局、浮动布局

- flex 布局：弹性布局，一维布局，适合于移动端

- grid 布局：网格布局，二维布局，适合于 PC 端

### 5. CSS 动画

- transition：过渡动画，需要触发某个事件才会执行，只能定义开始状态和结束状态，中间状态不能定义

- animation：关键帧动画，不需要触发某个事件就会执行，可以定义多个关键帧，每个关键帧都可以定义自己的样式

- transform：变形动画，可以定义平移、旋转、缩放、倾斜等动画

### 6. CSS 三栏布局及实现方式

- 两栏布局：左定宽，右自适应

  - flex

    ```html
    <div class="container">
      <div class="left"></div>
      <div class="right"></div>
    </div>
    ```

    ```css
    .container {
      display: flex;
    }

    .left {
      width: 200px;
    }

    .right {
      flex: 1;
    }
    ```

  - position

    ```css
    .left {
      position: absolute;
      left: 0;
      top: 0;
      width: 200px;
    }

    .right {
      margin-left: 200px;
    }
    ```

  - float

    ```css
    .left {
      float: left;
      width: 200px;
    }

    .right {
      margin-left: 200px;
    }
    ```

  - table

    ```css
    .container {
      display: table;
    }

    .left {
      display: table-cell;
      width: 200px;
    }

    .right {
      display: table-cell;
      width: calc(100% - 200px);
    }
    ```

- 三栏布局：左右定宽，中间自适应

  - flex

    ```html
    <div class="container">
      <div class="left"></div>
      <div class="center"></div>
      <div class="right"></div>
    </div>
    ```

    ```css
    .container {
      display: flex;
    }

    .left {
      width: 200px;
    }

    .center {
      flex: 1;
    }

    .right {
      width: 200px;
    }
    ```

  - float

    ```html
    <div class="container">
      <div class="left"></div>
      <div class="right"></div>
      <div class="center"></div>
    </div>
    ```

    ```css
    .left {
      float: left;
      width: 200px;
    }

    .right {
      float: right;
      width: 200px;
    }
    .center {
      margin: 0 200px;
      /* 或者触发BFC */
      /* overflow: hidden; */
    }
    ```

  - table 布局

    ```css
    .container {
      display: table;
    }

    .left {
      display: table-cell;
      width: 200px;
    }

    .center {
      display: table-cell;
    }

    .right {
      display: table-cell;
      width: 200px;
    }
    ```

  - 双飞翼布局

    ```html
    <div class="container">
      <div class="center">
        <div class="inner"></div>
      </div>
      <div class="left"></div>
      <div class="right"></div>
    </div>
    ```

    ```css
    .center {
      float: left;
      width: 100%;
    }

    .inner {
      margin: 0 200px;
    }

    .left {
      float: left;
      width: 200px;
      margin-left: -100%;
    }

    .right {
      float: left;
      width: 200px;
      margin-left: -200px;
    }
    ```

### 7. CSS 水平垂直居中

- 绝对定位 + 负边距

```html
<div class="container">
  <div class="center"></div>
</div>
```

```css
.container {
  position: relative;
}
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  margin-top: -50px;
  margin-left: -50px;
}
```

- 绝对定位 + transform

```css
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  transform: translate(-50%, -50%);
}
```

- 绝对定位 + calc

```css
.container {
  position: relative;
}

.center {
  width: 100px;
  height: 100px;
  position: absolute;
  top: calc(50% - 50px);
  left: calc(50% - 50px);
}
```

- 绝对定位 + margin:auto

```css
.container {
  position: relative;
}

.center {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 100px;
  height: 100px;
}
```

- flex 布局

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

- grid 布局 + place-items

```css
.container {
  display: grid;
  place-items: center; /* 相当于设置了 align-items 和 justify-items */
}
```

- grid 布局 + justify-self + align-self

```css
.container {
  display: grid;
}

.center {
  justify-self: center;
  align-self: center;
}
```

- grid 布局 + margin:auto

```css
.container {
  display: grid;
}

.center {
  margin: auto;
  width: 100px;
  height: 100px;
}
```

- line-height 布局

```css
.container {
  line-height: 200px;
  text-align: center;
}
```

- table 布局

```css
.container {
  width: 100vw;
  height: 100vh;
  display: table-cell;
  vertical-align: middle; /* 垂直居中 */
  text-align: center;
}
```

### 图片居中

- background-position: center center

- 和盒子处理方法类似

### 8. 实现加载动画

- 使用 animation 实现

```html
<div class="container">
  <div class="loading"></div>
</div>
```

```css
.container {
  position: relative;
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  margin-top: -50px;
  margin-left: -50px;
  border: 10px solid #ccc;
  border-top-color: #f00;
  border-radius: 50%;
  animation: loading 1s linear infinite;
}

@keyframes loading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

### BFC

- BFC 是块级格式化上下文，是一个独立的渲染区域，内部元素的布局不会影响到外部元素。

- BFC 的触发条件：根元素、float 为非 none、position、overflow 为非 visiable、display: inline-block、display: table-cell、display: table-caption、display: flex、display: inline-flex

### 清除浮动

- 给父元素添加 overflow: hidden

- 给父元素添加伪元素，设置 clear: both

### reset.css 和 normalize.css 的区别

- reset.css 是重置样式，将所有的样式重置为默认样式，normalize.css 是保留有价值的默认样式，保持了跨浏览器的一致性。

### dispay:none 和 visibility:hidden 的区别

- dispay:none 会让元素从文档流中消失，不占据空间，visibility:hidden 不会让元素从文档流中消失，占据空间。

### 重绘和回流

- 重绘：当盒子的位置、大小以及其他属性，例如颜色、字体大小等都没有发生改变，浏览器不需要重新计算元素的几何属性，只需要找到视口内的所有元素，然后重新绘制他们。

- 回流：当盒子的位置、大小以及其他属性发生改变，浏览器需要重新计算元素的几何属性，然后再将计算的结果绘制出来。

## JavaScript

### 闭包

- **定义**：闭包（Closure）是指*函数及其词法环境的组合*。更具体地说，闭包是指**一个函数可以记住并使用其外部词法环境中的变量**。

- 为什么所有函数都是闭包的：所有的函数在“诞生”时都会记住创建它们的词法环境，因为所有函数都有名为 `[[Environment]]` 的隐藏属性。

- **闭包的作用**: 1.形成局部作用域，防止变量被篡改 2.在函数外部读取函数内部的变量 3.模块化也是闭包。

- **闭包的缺点**：1.内存泄漏（IE9 以下） 2.性能消耗

- 解决内存泄漏的方法：1.将不再使用的变量设置为 null 2.使用 IIFE（立即执行函数）。

### 延迟加载

- defer：延迟加载，等到 DOM 完全加载后执行，多个 defer 脚本按照加载顺序执行

- async：异步加载，加载完成后立即执行，多个 async 脚本不保证按照加载顺序执行

### js 和 ES6 的区别

js 是 javascript 的简称，是一种脚本语言，ES6 是 ECMAScript6 的简称，是 javascript 语言的规范。

### ES6 新特性

let、const；解构赋值；箭头函数；模板字符串；对象扩展；类；模块化；Promise；async/await(ES7)；Set、Map；Symbol；Proxy；Reflect；Iterator；Generator；Decorator；

### let,const,var 的区别

- let 和 const 是块级作用域，var 是函数作用域

- var 可以重复声明，let 和 const 不可以

### js 数据类型有哪些，如何判断数据类型

- Number、String、Boolean、Null、Undefined、Symbol、BigInt、Object

- typeof、instanceof、Object.prototype.toString.call()

- 数组还可以用 Array.isArray()方法，Array.prototype.isPrototypeOf()

- 对象还可以使用 Object.prototype.isPrototypeOf()

### null 和 undefined 的区别

- null 是一个特殊的值，用于明确表示一个变量没有值或为空。

- undefined 表示变量未定义或访问对象上不存在的属性。

- null 会被隐式转换为 0，undefined 会被隐式转换为 NaN。

### 数组方法

- `push()`：向数组末尾添加一个或多个元素，并返回新的长度

- `pop()`：删除数组最后一个元素，并返回该元素的值

- `shift()`：删除数组第一个元素，并返回该元素的值

- `unshift()`：向数组开头添加一个或多个元素，并返回新的长度

- `splice()`：向数组中添加或删除元素，并返回被删除的元素

- `slice()`：返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝

- `concat()`：用于合并两个或多个数组，不会改变现有的数组，而是返回一个新数组

- `join()`：将数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串

- `reverse()`：将数组中元素的位置颠倒，并返回该数组

- `sort()`：对数组的元素进行排序，并返回该数组

- `indexOf()`：返回数组中第一个与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1

- `lastIndexOf()`：返回指定元素在数组中的最后一个的索引，如果不存在则返回 -1

- `forEach()`：对数组的每个元素执行一次给定的函数

- `map()`：创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果

- `filter()`：创建一个新数组，其包含通过所提供函数实现的测试的所有元素

- `every()`：测试数组的所有元素是否都通过了指定函数的测试

- `some()`：测试数组中的某些元素是否通过由提供的函数实现的测试

- `reduce()`：对数组中的每个元素执行一个由您提供的 reducer 函数（升序执行），将其结果汇总为单个返回值

- `reduceRight()`：对数组中的每个元素（从右到左，升序执行）执行一个由您提供的 reducer 函数，将其结果汇总为单个返回值

### 数组中的最大值

- `Math.max(...arr)`

### 数组去重

- 使用 Set

  ```js
  const arr = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
  const newArr = [...new Set(arr)];
  ```

- 使用 filter

  ```js
  const arr = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
  const newArr = arr.filter((item, index) => {
    return arr.indexOf(item) === index;
  });
  ```

- 对象数组去重

  ```js
  const arr = [
    { id: 1, name: "张三" },
    { id: 2, name: "李四" },
    { id: 3, name: "王五" },
    { id: 1, name: "张三" },
    { id: 2, name: "李四" },
    { id: 3, name: "王五" },
  ];
  const obj = {};
  const newArr = arr.reduce((prev, cur) => {
    obj[cur.id] ? "" : (obj[cur.id] = true && prev.push(cur));
    return prev;
  }, []);
  ```

### 对象的迭代

- `for...in`：遍历对象自身的和继承的可枚举属性（不含 Symbol 属性），如果属性整数或者可以直接转换为字符串，则按照索引升序排列。（可枚举表示可以通过 for...in 遍历到）

- `Object.keys(obj)`：返回一个数组，包含对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）。

- `Object.getOwnPropertyNames(obj)`：返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性，不可枚举表示不能通过 for...in 遍历到，比如 toString）。

- `Object.getOwnPropertySymbols(obj)`：返回一个数组，包含对象自身的所有 Symbol 属性

- `Reflect.ownKeys(obj)`：返回一个数组，包含对象自身的所有属性，不管属性名是 Symbol 或字符串，也不管是否可枚举

### 原型链

- **定义**：每个对象都有一个原型对象，对象以其原型为模板，从原型继承方法和属性，原型对象也可能有原型，这样一层一层，就构成了原型链。

- **作用**：当读取对象的属性时，如果对象本身没有这个属性，那么就会去它的原型对象中找，如果还没有，就去原型的原型找，一直找到最顶层为止。

- **原型链的终点**：Object.prototype.\_\_proto\_\_ === null

### new 操作符做了什么

- 创建一个空对象，作为将要返回的对象实例

- 将这个空对象的原型，指向构造函数的 prototype 属性

- 将这个空对象赋值给函数内部的 this 关键字（改变 this 指向）

- 开始执行构造函数内部的代码，对返回值进行判断，如果是值类型，返回创建的对象，如果是引用类型，就返回这个引用类型的对象

### 防抖和节流

- 防抖是把多次操作合并为最后一次操作，节流是如果距离上次触发事件不足一定时间，则忽略。

```js
function debounce(fn, delay) {
  let timer = null;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}
```

```js
function throttle(fn, delay) {
  let timee = null;
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, arguments);
        timer = null;
      }, delay);
    }
  };
}
```

### call、apply、bind 的区别

- call 和 apply 都是改变函数的 this 指向，call 的参数是一个一个传递的，apply 的参数是一个数组，bind 是返回一个新的函数，不会立即执行。

## Vue

### 1. vue 双向绑定原理

- Vue2 的双向绑定原理是基于数据劫持和发布订阅模式的，通过 Object.defineProperty()来劫持数据对象中的各个属性的 setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。

- Vue3 的双向绑定原理是基于 Proxy 的，Proxy 是 ES6 中新增的功能，可以直接监听对象而非属性，可以直接监听数组的变化，返回一个新的对象，可以直接通过新的对象修改原来的对象。

### Vue2 中检测数组变化的限制和解决方法

- 由于在 vue2 中，没有使用 definPropoty 对数组进行劫持（defineProperty 会遍历数组的每一项，对每一项进行 defineProperty，这样性能开销很大），所以 vue2 中无法检测到数组的变化，vue2 中对数组的变化进行了重写，重写了数组的 7 个方法，这 7 个方法会触发数组的更新，这 7 个方法是：push、pop、shift、unshift、splice、sort、reverse。

- vue3 中使用 Proxy 对数组进行劫持，可以直接监听数组的变化。

### 2. vue 生命周期

- beforeCreate：实例刚在内存中被创建出来，此时，还没有初始化好 data 和 methods 属性

- created：实例已经在内存中创建 OK，此时 data 和 methods 已经创建 OK，此时还没有开始编译模板

- beforeMount：此时已经完成了模板的编译，但是还没有挂载到页面中

- mounted：此时，已经将编译好的模板，挂载到了页面指定的容器中显示

- beforeUpdate：状态更新之前执行此函数， 此时 data 中的状态值是最新的，但是界面上显示的 数据还是旧的，因为此时还没有开始重新渲染 DOM 节点

- updated：实例更新完毕之后调用此函数，此时 data 中的状态值 和 界面上显示的数据，都已经完成了更新，界面已经被重新渲染好了！

- beforeDestroy：实例销毁之前调用。在这一步，实例仍然完全可用。

- destroyed：Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器都会被移除，所有的子实例也会被销毁。

- 如果组件使用 keep-alive,还有 actived 和 deactived 钩子函数

### Vue2 中组件的 data 为什么必须是函数，而实例中的 data 可以是对象？

- 组件是可以复用的，当组件被复用的时候，data 必须是一个函数，因为函数是可以被复用的，而对象是引用类型，会被共享，会造成数据污染。

### 3. vue-router 路由模式

- hash 模式：使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。

- history 模式：使用 HTML5 History Interface 中新增的 pushState() 和 replaceState() 方法来完成 URL 跳转而无须重新加载页面。

### 4. vue-router 路由守卫

- 全局守卫：router.beforeEach(to, from, next)、router.beforeResolve(to, from, next)、router.afterEach((to, from) => {})

- 路由独享守卫：beforeEnter(to, from, next) {}

- 组件内守卫：beforeRouteEnter(to, from, next) {}、beforeRouteUpdate(to, from, next) {}、beforeRouteLeave(to, from, next) {}

### 5. vue-router 路由懒加载

- 在路由配置中使用 component: () => import('@/views/xxx.vue')

### 6. vue-router 路由组件按组分块

- 在路由配置中使用 `component: () => import(/* webpackChunkName: "group-user" */ './UserDetails.vue')`

### 6. vuex 状态管理

- state：存储状态

- getters：对 state 中的状态进行加工处理形成新的状态

- mutations：同步修改 state 中的状态

- actions：异步修改 state 中的状态

- modules：将 store 分割成模块

### 7. vue3.0 新特性

- 性能提升：重写虚拟 DOM，重写 diff 算法，优化打包体积和运行时性能

- Composition API：提供了一种逻辑复用的方式，更好的组织组件的逻辑

- Fragment、Teleport、Suspense：更好的支持多个根节点、更好的支持弹窗组件、更好的支持异步组件

- TypeScript：提供了完整的 TypeScript 支持

- 其他：全局 API 提供了更多的配置项，更好的支持 TypeScript，更好的支持 JSX，更好的支持 HMR

### diff 算法

- diff 算法是用来比较两个虚拟 DOM 的，将前后两个虚拟 DOM 的差异应用到真实 DOM 上，减少 DOM 操作，提高性能。

## React

### 1. JSX

- JSX 是 JavaScript 的语法扩展，类似于模板语言，但它具有 JavaScript 的全部功能，jsx 表示一个对象，babel 会将 jsx 编译成 React.createElement() 函数调用，React.createElement() 函数会返回一个对象，这个对象描述了我们希望在屏幕上看到的内容。
