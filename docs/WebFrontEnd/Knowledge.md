<!-- 施工中 -->

# 综合板块

## 1. 介绍一下你对浏览器内核的理解？

> 浏览器内核是指浏览器用于**解析**和**渲染**网页内容的核心部分。它负责将 HTML、CSS 和 JavaScript 等网页元素转化为可视化的网页布局和交互效果,不同浏览器内核之间的差异主要体现在渲染引擎和 JavaScript 引擎的不同实现和特性上。

内核分为两个部分：渲染引擎和 JS 引擎。

1. **渲染引擎**（_Rendering Engine_）：渲染引擎负责解析 HTML、CSS 和其他相关资源，并将它们渲染为可视化的网页。它处理文档的结构和样式，计算元素的位置和尺寸，处理布局和绘制等任务。渲染引擎决定了网页的外观和交互行为。

   常见的渲染引擎包括：

   - WebKit（Safari、Chrome、Opera 等）
   - Trident（Internet Explorer）
   - Gecko（Firefox）
   - Blink（Chrome、Opera 等）

2. **JavaScript 引擎**（_JavaScript Engine_）：JavaScript 引擎负责解析和执行 JavaScript 代码。它将 JavaScript 代码转换为可执行的机器码，并处理脚本中的变量、函数、循环、条件等逻辑。JavaScript 引擎是实现 JavaScript 语言的核心组件，对网页的交互性和动态效果起着重要作用。

   常见的 JavaScript 引擎包括：

   - V8（Chrome、Node.js 等）
   - SpiderMonkey（Firefox）
   - JavaScriptCore（Safari）

## 2. 浏览器的渲染原理

> 浏览器的渲染过程是指浏览器将 HTML、CSS 和 JavaScript 转换为可视化网页的过程。渲染过程分为以下几个步骤：

1. **解析 HTML 标记并构建 DOM 树**：浏览器将字节流转换为字符流，然后将字符流解析为标记，最后将标记解析为 DOM 树。DOM 树是由 DOM 元素及其属性组成的树形结构，它代表了 HTML 文档的结构和内容。DOM 树的构建过程是一个深度遍历过程，DOM 树中的每个节点都是一个对象，这些对象可以通过 JavaScript 来访问和操作。

2. **解析 CSS 标记并构建 CSSOM 树**：浏览器从网络或磁盘读取 CSS 文件，然后解析 CSS 标记并构建 CSSOM 树。CSSOM 树是由 CSS 样式表及其样式组成的树形结构，它代表了 CSS 文档的结构和内容。

3. **将 DOM 树和 CSSOM 树合并为渲染树**：将 DOM 树和 CSSOM 树合并为渲染树。渲染树只包含**需要显示的节点**及其样式信息，渲染树的构建过程是一个深度遍历过程，渲染树中的每个节点都是一个带有视觉属性的矩形，这些矩形称为渲染对象，它是渲染过程的基本单位。

4. **根据渲染树来布局，计算每个节点的位置和大小**：渲染树构建完成后，浏览器会根据渲染树来布局，计算每个节点的位置和大小。布局完成后，浏览器会将渲染树的每个节点都转换为屏幕上的实际像素，这个过程称为绘制。

5. **将像素发送给 GPU，展示在页面上**：绘制完成后，浏览器会将像素发送给 GPU，展示在页面上。

## 前端性能优化

[Web 性能](https://developer.mozilla.org/zh-CN/docs/Web/Performance)

前端性能优化主要是为了提高页面的**加载速度**和**交互响应速度**,从而提升用户体验。它通常包含以下几个方面:
前端性能优化是指通过改进网页或应用程序的加载速度和响应速度，提高用户体验并降低资源消耗的过程。性能优化的目标是使页面更快地显示内容、更快地响应用户操作，从而增加用户的满意度和留存率。

性能优化涉及多个方面，以下是一些常见的优化方向：

1. **网络请求优化：**

   - 使用内容分发网络（CDN）来缓存和加速静态资源的传输。
   - 合并和压缩 CSS 和 JavaScript 文件，减少 HTTP 请求次数。
   - 使用图片压缩和适当的图片格式，如 WebP，以减少图像文件大小。
   - 使用浏览器缓存，减少重复加载相同资源。
   - 使用懒加载延迟加载非关键资源。

2. **代码优化：**

   - 编写高效的 JavaScript 代码，避免不必要的循环和重复操作。
   - 尽量减少 DOM 操作，因为 DOM 操作开销较大。
   - 避免在 JavaScript 中使用同步阻塞的方法，改用异步方式。
   - 使用事件委托来优化事件处理，减少事件监听器数量。

3. **渲染优化：**

   - 将 CSS 放在文档头部，JavaScript 放在底部，以避免阻塞页面渲染。
   - 避免使用 CSS 表达式和复杂的 CSS 选择器，减少渲染时间。
   - 使用 CSS3 硬件加速特性，如 GPU 加速，来优化动画效果的渲染。
   - 使用虚拟列表和虚拟滚动来优化大型列表的渲染性能。

4. **移动端优化：**

   - 使用响应式设计或移动优先设计来适配不同屏幕尺寸。
   - 使用 Viewport 元标签来优化移动端页面的显示。
   - 减少移动端页面的资源大小和数量，以节省用户流量和提高加载速度。

5. **前端构建优化：**

   - 使用打包工具（如 Webpack、Parcel 等）进行代码打包和优化。
   - 使用 Tree-shaking 和代码分割来消除未使用的代码和优化包大小。

6. **性能监测和分析：**

   - 使用浏览器开发者工具来分析页面加载和性能瓶颈。
   - 使用性能监测工具（如 Lighthouse、WebPageTest 等）来评估和改进网站性能。

7. **优化用户交互体验：**

   - 提高页面响应速度，减少用户等待时间。
   - 优化动画和过渡效果，使其更加流畅。
   - 实现预加载和预取，提前加载用户可能需要的资源。

8. **服务端优化：**
   - 优化服务端渲染（SSR）和客户端渲染（CSR）的结合使用，以提高首次加载速度。
   - 对服务端接口进行性能优化，减少响应时间和资源消耗。

要进行前端性能优化，可以遵循以下步骤：

1. **分析和评估：** 使用性能监测工具和浏览器开发者工具分析网页加载性能，找出瓶颈和改进空间。

2. **设定性能目标：** 根据分析结果设定性能优化的目标，如加载时间减少百分之多少或某个交互操作的响应时间应在多少范围内。

3. **优化代码：** 根据评估结果，优化 HTML、CSS 和 JavaScript 代码，减少资源大小和复杂性。

4. **网络请求优化：** 使用 CDN、缓存和懒加载等技术来优化网络请求和资源加载。

5. **渲染优化：** 优化页面渲染流程，减少页面加载时间和交互响应时间。

6. **移动端优化：** 针对移动设备进行优化，提高移动端用户体验。

7. **持续监测和改进：** 定期监测性能，跟踪改进效果，并持续优化页面性能。

综上所述，前端性能优化是一个复杂而又持续的过程，需要综合考虑多个方面，并不断地进行监测和改进。通过优化前端性能，可以提升用户体验，减少用户流失，并为网站或应用的成功提供有力支持。

### 4. 网页的加载速度指标有哪些？

> 网页的加载速度指标主要包括以下几个方面：

1. **首屏加载时间**：指网页首屏内容加载完成所花费的时间。首屏加载时间越短，用户等待的时间就越少，用户体验就越好。

2. **白屏时间**：指浏览器开始加载网页到网页开始显示第一批内容之间的时间。白屏时间越短，用户等待的时间就越少，用户体验就越好。

3. **DOM Ready 时间**：指浏览器将 DOM 解析完成并构建 DOM 树所花费的时间。DOM Ready 时间越短，网页的可交互时间就越早，用户体验就越好。

4. **页面完全加载时间**：指浏览器将 DOM 解析完成、构建 DOM 树、加载并执行 CSS、加载并执行 JavaScript、加载图片等所有资源所花费的时间。页面完全加载时间越短，用户等待的时间就越少，用户体验就越好。

### 5. 网页的运行性能指标有哪些？

> 网页的运行性能指标主要包括以下几个方面：

1. **CPU 占用率**：指 CPU 在执行网页代码时的占用率。CPU 占用率越低，CPU 空闲时间就越多，网页的运行性能就越好。

2. **内存占用率**：指浏览器在执行网页代码时的内存占用率。内存占用率越低，内存空闲时间就越多，网页的运行性能就越好。

3. **页面响应时间**：指网页处理用户输入事件所花费的时间。页面响应时间越短，用户等待的时间就越少，用户体验就越好。

### 6. 网页的加载速度和运行性能有什么区别？

> 网页的加载速度是指网页从开始加载到加载完成所花费的时间，它主要受到网络传输速度和网页本身的大小所影响。网页的运行性能是指网页在浏览器中运行时的性能，它主要受到网页的代码质量和浏览器的性能所影响。

### 7. 网页的加载速度和运行性能有什么关系？

> 网页的加载速度和运行性能都是网页性能的重要指标，它们之间相互影响，相互制约。网页的加载速度越快，网页的运行性能就越好；网页的运行性能越好，网页的加载速度就越快。

### 8. 网页的加载速度和运行性能都受到哪些因素的影响？

> 网页的加载速度和运行性能都受到以下几个方面的影响：

1. **网络传输速度**：指用户的网络带宽。网络传输速度越快，网页的加载速度就越快。

2. **网页本身的大小**：指网页的 HTML、CSS、JavaScript、图片等资源的大小。网页本身的大小越小，网页的加载速度就越快。

3. **网页的代码质量**：指网页的 HTML、CSS、JavaScript 代码的质量。网页的代码质量越高，网页的运行性能就越好。

4. **浏览器的性能**：指浏览器的渲染引擎和 JavaScript 引擎的性能。浏览器的性能越好，网页的运行性能就越好。

### 9. 如何进行前端性能优化？

> 前端性能优化主要包括以下几个方面：

# HTML

## 1.SGML：标准通用标记语言

> SGML 代表**标准通用标记语言**(_Standard Generalized Markup Language_)。定义了创建标准标记语言的规则，它为 HTML、XML 等标记语言奠定了基础，其本身不是一种标记语言。XML、HTML 都是 SGML 的子集、具体应用。

1. SGML 是一种标准通用标记语言，用于定义 XML、HTML 等标记语言的语法规则。
2. 它定义了符号< >包围的标签、不同类型的标签、属性等的书写规范。
3. SGML 本身不是一种标记语言，而是为标记语言定义语法的元语言。
4. XML 和 HTML 都是 SGML 的子集和具体应用。

HTML5 属于 SGML 的扩展和演变，但已经不再严格遵照 SGML 的复杂语法要求，而是沿用 SGML 的基本思想,根据网络环境的变化进行了简化和创新。

## 2.DTD：文档类型定义

> DTD 代表**文档类型定义**(_Document Type Definition_)。DTD 规定了 XML 或 HTML 的特定版本中允许的元素、属性和实体。DTD 可以在文档中直接声明，也可以引用外部的 DTD 文件。

HTML4.01 时代还使用 DTD 进行语法约束,在 HTML5 中则放弃了 DTD,改用简单的<!DOCTYPE html>声明代替。

## 3.DOCTYPE 的作用是什么？标准版模式与兼容模式有什么区别？

```html
<!DOCTYPE html>
```

> DOCTYPE 声明位于文档中的最前面，处于 html 标签之前，声明文档的类型和 DTD 规范，告知浏览器的解析器用什么文档标准解析这个文档，以使浏览器切换到相应的渲染模式。

- 声明文档类型，使浏览器选择相应的渲染模式。
- 在 HTML 4.01 时代，doctype 还链接到 DTD 文件以对文档进行语法校验。

## 4. HTML5 为什么只需要写`<!DOCTYPE html>`？

HTML5 已经不完全基于 SGML，因此不需要对 DTD 进行引用，但是需要 doctype 来规范浏览器的行为。

## 5. 行内元素有哪些？块级元素有哪些？ 空元素有哪些？

1. 行内元素：a、b、span、img、input、strong、select、label、em、button、textarea
2. 块级元素：div、ul、li、dl、dt、dd、p、h1-h6、blockquote
3. 空元素：即系没有内容的 HTML 元素，例如：br、meta、hr、link、input、img

## 6.`link`标签和`@import`的区别是？

```html
<link rel="stylesheet" href="style.css" />
<style>
  @import url("style.css");
</style>
```

1. **位置**：`<link>`标签通常放在文档的`<head>`部分，而`@import` 规则需要放在样式表文件的顶部，且必须位于其他样式规则之前。

2. **加载方式**：`<link>`标签会并行地加载样式表，不会阻塞页面的渲染，而`@import` 规则会在样式表文件被加载和解析完毕后再加载其他资源，这可能会导致页面加载速度较慢。

3. **兼容性**：`<link>`标签在所有浏览器中都被支持，而`@import` 规则在较旧的浏览器中可能不被完全支持。

4. **功能扩展**：`<link>`标签具有更多的功能扩展性。通过设置 rel 属性，可以指定样式表的关系类型，例如 `stylesheet` 表示引入样式表，`alternate stylesheet` 表示备选样式表。此外，还可以使用 `media` 属性来指定适用样式表的媒体类型。`@import` 规则相对简单，不能指定关系类型或媒体类型。

## 8. HTML5 新特性:

1. **语义化标签**:增加了一些新的语义化标签如 header、nav、footer、aside 等,能够更好地描述页面结构。
2. **多媒体标签**:提供了 audio 和 video 标签用于在网页中直接嵌入音频和视频内容。
3. **Canvas 绘图**:提供了 canvas 标签,可以通过 Javascript 来绘制图形。
4. **地理定位**:增加了地理定位功能,可以获取用户的地理位置信息。
5. **本地存储**:增加了 localStorage 和 sessionStorage 用于在浏览器端进行本地存储。
6. **新的表单控件**:如 calendar、date、time、email 等输入类型,还有 placeholder 属性等。
7. **新的输入类型**:如 number、range、search、color 等类型。
8. **新的表单属性**:如 autofocus、required、pattern 等属性。
9. **语义化表单控件**:如 datalist 元素可以与 input 元素配合实现自动完成功能。
10. **表单验证 API**:新增了表单验证的约束验证 API。
11. **跨文档消息传递**:允许跨页面通信。
12. **WebSocket**:支持双向通信,实现了真正的推送。
13. **Server-Sent Events**:服务器可以通过 HTTP 向浏览器推送新信息。
14. **History API**:可以通过 JavaScript 操控浏览器的回退按钮和地址栏。
15. **强大的 JavaScript API**:如 requestAnimationFrame 等高性能 API。

## 9. HTML5 移除了哪些元素？

1. 纯表现的元素：basefont、big、center、font、s、strike、tt、u。
2. 对可用性产生负面影响的元素：frame、frameset、noframes。

## 10. 如何处理 HTML5 新标签的浏览器兼容问题？

1. 对于一些非关键的标签,我们也可以直接使用通用的 div 元素代替,然后利用 CSS 和 JavaScript 赋予 element 特定的样式和行为。或者通过 document.createElement() 方法创建 HTML5 新标签,然后利用 CSS 和 JavaScript 赋予 element 特定的样式和行为。

2. 使用 HTML5 Shiv 或者 Modernizr 等类库来解决浏览器兼容问题。

## 11. 如何区分 HTML 和 HTML5？

1. DOCTYPE 声明：HTML5 中的 DOCTYPE 声明与 HTML4.01 中的不同,HTML5 中的 DOCTYPE 声明不区分大小写,也不需要引入 DTD 文档。

2. 标签：HTML5 中新增了一些标签,如 header、nav、footer、aside、section、article、video、audio、canvas、datalist、command、details、summary、figure、figcaption、mark、meter、progress、time、ruby、rt、rp、wbr 等。

## 12. 什么是渐进增强？

渐进增强是指在 Web 开发中,针对低版本浏览器,先实现基本的功能效果,然后再针对高级浏览器进行效果、交互、追加功能达到更好的用户体验。

# CSS

## 1. 样式权重

> 样式权重是指当多个 CSS 规则作用于同一个元素时,浏览器如何判断使用哪个规则的过程。样式权重通常由选择器的特殊性和位置决定。

1. **选择器的特殊性**：选择器的特殊性是指选择器的优先级,它是一个用于确定样式权重的四元组(a,b,c,d)。其中 a、b、c、d 分别表示内联样式、ID 选择器、类选择器和标签选择器的数量。选择器的特殊性越高,样式权重越高。

2. **位置**：当两个选择器的特殊性相同时,后定义的样式会覆盖先定义的样式。

# JS

## 1. [数据类型](https://zh.javascript.info/types)

> JavaScript 中有八种基本的数据类型，其中七种是原始类型，另外一种是对象类型。

- 七种原始数据类型：
  - `number` 用于任何类型的数字：整数或浮点数，在 ±(253-1) 范围内的整数。
  - `bigint` 用于任意长度的整数。
  - `string` 用于字符串：一个字符串可以包含 0 个或多个字符，所以没有单独的单字符类型。
  - `boolean` 用于 true 和 false。
  - `null` 用于未知的值 —— 只有一个 null 值的独立类型。
  - `undefined` 用于未定义的值 —— 只有一个 undefined 值的独立类型。
  - `symbol` 用于唯一的标识符。
- 以及一种非原始数据类型：
  - `object` 用于更复杂的数据结构。

**我们可以通过 typeof 运算符查看存储在变量中的数据类型。**

- 通常用作 typeof x，但 typeof(x) 也可行。
- 以字符串的形式返回类型名称，例如 "string"。
- typeof null 会返回 "object" —— 这是 JavaScript 编程语言的一个错误，实际上它并不是一个 object。

## [数组](https://zh.javascript.info/array)

### [数组方法](https://zh.javascript.info/array-methods)

- **添加/删除元素**：

  - push(...items) —— 向尾端添加元素，
  - pop() —— 从尾端提取一个元素，
  - shift() —— 从首端提取一个元素，
  - unshift(...items) —— 向首端添加元素，
  - splice(pos, deleteCount, ...items) —— 从 pos 开始删除 deleteCount 个元素，并插入 items。
  - slice(start, end) —— 创建一个新数组，将从索引 start 到索引 end（但不包括 end）的元素复制进去。
  - concat(...items) —— 返回一个新数组：复制当前数组的所有元素，并向其中添加 items。如果 items 中的任意一项是一个数组，那么就取其元素。

- **搜索元素**：

- indexOf/lastIndexOf(item, pos) —— 从索引 pos 开始搜索 item，搜索到则返回该项的索引，否则返回 -1。
- includes(value) —— 如果数组有 value，则返回 true，否则返回 false。
- find/filter(func) —— 通过 func 过滤元素，返回使 func 返回 true 的第一个值/所有值。
- findIndex 和 find 类似，但返回索引而不是值。

- **遍历元素**：

  - forEach(func) —— 对每个元素都调用 func，不返回任何内容。

- **转换数组**：

  - map(func) —— 根据对每个元素调用 func 的结果创建一个新数组。
  - sort(func) —— 对数组进行原位（in-place）排序，然后返回它。
  - reverse() —— 原位（in-place）反转数组，然后返回它。
  - split/join —— 将字符串转换为数组并返回。
  - reduce/reduceRight(func, initial) —— 通过对每个元素调用 func 计算数组上的单个值，并在调用之间传递中间结果。

- **其他**：

  - Array.isArray(value) 检查 value 是否是一个数组，如果是则返回 true，否则返回 false。

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
    return arr.indexOf(item) === index; // indexOf 返回第一个匹配项的索引
  });
  ```

- 使用 for 循环，利用 indexOf

  ```js
  const arr = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) === -1) {
      newArr.push(arr[i]);
    }
  }
  ```

- 使用 for of 循环，includes

  ```js
  const arr = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
  const newArr = [];
  for (let item of arr) {
    if (!newArr.includes(item)) {
      newArr.push(item);
    }
  }
  ```

- 使用 for of 循环，利用对象属性不能重复的特点

  ```js
  const arr = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
  const newArr = [];
  const obj = {};
  for (let item of arr) {
    if (!obj[item]) {
      newArr.push(item);
      obj[item] = 1;
    }
  }
  ```

- 使用 for of 循环，利用 ES6 的 Map

  ```js
  const arr = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
  const newArr = [];
  const map = new Map();
  for (let item of arr) {
    if (!map.has(item)) {
      newArr.push(item);
      map.set(item, 1);
    }
  }
  ```

## [对象](https://zh.javascript.info/object)

### [深拷贝与浅拷贝](https://zh.javascript.info/object-copy)

> 由于对象是引用类型，所以在拷贝对象时，拷贝的是对象的引用，而不是对象本身。因此，当拷贝的引用类型发生改变时，原对象也会发生改变。

- **浅拷贝**：只拷贝对象的第一层属性，如果属性是基本类型，则拷贝其值，如果属性是引用类型，则拷贝其引用。

  - _浅拷贝的一种实现方式：使用 ES6 的 `Object.assign({},obj1,obj2)` 方法或者扩展运算符 `{...obj}`。_

- **深拷贝**：递归地拷贝对象的所有层级属性，拷贝后的对象与原对象完全隔离，互不影响。

  - _深拷贝的一种实现方式：使用 lodash 的 cloneDeep 方法。_
  - 使用`JSON.parse(JSON.stringify(object))`

- **注意**：直接赋值甚至不能被称为拷贝：`obj1 = obj2`。

## [闭包](https://zh.javascript.info/closure#ci-fa-huan-jing)

### 变量作用域

### 词法环境

在 JavaScript 中，每个运行的函数，代码块 `{...}` 以及整个脚本，都有一个被称为 词法环境（Lexical Environment） 的内部（隐藏）的关联对象。

词法环境对象由两部分组成：

1. **环境记录**（Environment Record） —— 一个存储所有局部变量作为其属性（包括一些其他信息，例如 this 的值）的对象。
2. 对 **外部词法环境** 的**引用**，与外部代码相关联。

在创建词法环境时，词法环境虽然会预填充所有变量，但是他们任然处于未初始化状态，即引擎知晓他们的存在，但在使用`let`声明之前，不能引用，但是有一个特例，即函数声明，这也是为什么可以在函数声明之前调用该函数，函数表达式则不行。

### 闭包

- **定义**：闭包（Closure）是指*函数及其词法环境的组合*。更具体地说，闭包是指**一个函数可以记住并使用其外部词法环境中的变量**。

- 为什么所有函数都是闭包的：所有的函数在“诞生”时都会记住创建它们的词法环境，因为所有函数都有名为 `[[Environment]]` 的隐藏属性。

- **闭包的作用**: 1.形成局部作用域，防止变量被篡改 2.在函数外部读取函数内部的变量 3.模块化也是闭包。

- **闭包的缺点**：1.内存泄漏（IE9 以下） 2.性能消耗

- 解决内存泄漏的方法：1.将不再使用的变量设置为 null 2.使用 IIFE（立即执行函数）。

## 进程与线程

### 进程

进程是操作系统中**执行中的程序**的实例。每个进程都有自己的地址空间、内存、数据栈以及其他用于跟踪执行的辅助数据。操作系统管理所有进程的执行，并为这些进程合理的分配系统资源。

### 线程

线程是进程中的一个实体，是被系统独立调度和分派的基本单位，线程自己不拥有系统资源，只拥有一点在运行中必不可少的资源（如程序计数器、一组寄存器和栈），但是它可与同属一个进程的其他的线程共享进程所拥有的全部资源。

### javascript 单线程

JavaScript 是一门单线程的语言，JavaScript 代码的执行过程是从上到下一行一行地执行，因此，如果前面的代码执行时间过长，就会引发页面渲染阻塞，导致页面卡顿，影响用户体验。

## 并发

> 并发（Concurrency）是指在计算机系统中同时执行多个独立的任务或操作。这些任务可以是进程、线程或其他执行单元，它们在一段时间内交替执行，从外部观察来看，好像同时在运行。

实现并发，主要有以下几种方式：

- **多进程并发**：操作系统可以通过进程调度算法(如时间片轮转调度算法),让多个进程在一个 CPU 上并发执行,看似同时运行。每个进程运行一小段时间后,系统会暂停该进程,转而执行其他进程,这样多个进程就可以并发执行了。

- **多线程并发**：一个进程中的多个线程也可以并发执行。同一个进程中的多个线程共享进程的资源,通过 CPU 时间片轮转调度算法可以实现线程的并发执行。

比如在 Java 中，可以通过继承 Thread 类或实现 Runnable 接口来创建线程，然后通过调用 start()方法来启动线程，从而实现并发编程。

而 JavaScript 是一门单线程的语言，它本身不支持多线程，这意味着它一次只能执行一个任务，然而，JavaScript 提供了一些机制来实现并发编程，如异步编程和多线程模拟。

## JS 中的异步编程

JavaScript 基于事件循环（Event Loop）的机制，允许使用回调函数、Promise、async/await 等方式进行异步编程。这样的编程方式允许程序在等待某个任务的完成时，继续执行其他任务，而不会阻塞整个程序的执行。所谓的异步性，即一直非阻塞的执行，任务的执行不会阻塞后续代码的执行。

## [事件循环](https://zh.javascript.info/event-loop)

> 事件循环是 JavaScript 实现**异步编程**的一种解决方案，它是一个执行模型，用于处理队列中的事件。本质是一个 **JavaScript 引擎**在**等待任务**，**执行任务**和**进入休眠状态等待更多任务**这**几个状态之间转换**的**无限循环**。

**宏任务**

> 宏任务是由宿主环境（浏览器或 Node.js）提供的任务，它们的回调函数会被推入消息队列中，等待执行。常见的宏任务包括：

- `setTimeout`、`setInterval`、`setImmediate`（Node.js 环境）等定时器任务。

- `I/O`任务，包括网络请求、文件读写、本地存储等。

- `UI` 渲染任务，包括 DOM 渲染、页面重绘等。

**微任务**

> 微任务是由 JavaScript 自身提供的任务，它们的回调函数会被推入微任务队列中，等待执行。常见的微任务包括：

- `Promise` 的回调函数。

- `MutationObserver` 的回调函数。

- `process.nextTick`（Node.js 环境）。

**执行顺序**

1. 从 宏任务 队列（例如 “script”）中出队（dequeue）并**执行最早的任务**。
2. 执行**所有** 微任务：

   - 当微任务队列非空时：
     - 出队（dequeue）并执行最早的微任务。

3. 如果有变更，则将变更渲染出来。
4. 如果宏任务队列为空，则休眠直到出现宏任务。
5. 转到步骤 1。

## [回调](https://zh.javascript.info/callbacks)

> 回调是一种常见的异步编程技术，它是指将一个函数作为参数传递给另一个函数，并在另一个函数内部调用执行，这个被传递的函数就是回调函数。

## [Promise](https://zh.javascript.info/promise-basics)

> Promise 是一种异步编程技术，它是一个对象，用于表示一个异步操作的最终完成（或失败）及其结果值。

- Promise 对象的状态：

  - `pending`：初始状态，既不是成功，也不是失败状态。
  - `fulfilled`：意味着操作成功完成。
  - `rejected`：意味着操作失败。

- Promise 对象的状态只能从 `pending` 转变为 `fulfilled` 或 `rejected`，不能逆向转换，同时只能转换一次。

Promise 的作用：

- 1. 改善异步编程的可读性和可维护性
     Promise 让异步代码块的执行顺序和调用关系更清晰,避免了回调函数嵌套,解决了回调地狱问题。Promise 代码结构更加简洁,语义更明确。

- 2. 支持链式调用
     Promise 支持链式调用 then 方法,可以更方便地组合使用 Promise,表达异步操作之间的先后关系。

## [async/await](https://zh.javascript.info/async-await#zong-jie)

> async/await 是基于 Promise 的一种语法糖，可以以同步的方式编写异步代码。

- async/await 的作用：

- 1. 简化异步代码:
     async/await 使异步代码看起来像同步代码,避免了回调函数或 promise 的语法,使异步逻辑更清晰易读。

- 2. 错误处理:
     Promise 的错误需要通过 catch 捕获,async/await 可以通过 try/catch 的方式捕获错误,这样更加明确直观。

- 3. 调试友好:
     Debugger 在异步 Promise 中不太友好,而 async/await 就像调试同步代码一样,方便设置断点等。

# Ajax

## 如何根据后端不同的状态码做不同的处理

1. 使用 Switch 语句

2. 使用对象映射

   ```js
   const statusMap = {
     200: () => {
       console.log("请求成功");
     },
     404: () => {
       console.log("请求失败");
     },
   };
   statusMap[status]();
   ```

3. 使用 Map

   ```js
   const statusMap = new Map([
     [200, () => console.log("请求成功")],
     [404, () => console.log("请求失败")],
   ]);
   statusMap.get(status)();
   ```

## 封装 axios

### 取消重复请求，基于 fetch 的 AbortController

```js
let controller = null; // 控制器

instance.interceptors.request.use(
  config => {
    if (controller) {
      controller.abort(); // 如果控制器已存在，取消请求
    } else {
      controller = new AbortController(); // 创建新的
      config.signal = controller.signal; // 传入信号
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  response => {
    controller = null; // 请求结束
    return response;
  },
  error => {
    // console.log(error);
    return Promise.reject(error.response);
  }
);
```

# WX

# VUE

## VUE2

### 1. [VUE2 响应式原理](./VUE/VueReactivity.md)

### 2. v-For 中 key

#### 作用

> 在虚拟 DOM 中，key 会作为节点的标识，用于优化渲染。

#### key 的原理

使用 key 时，当节点的顺序发生变化时，页面不会立即重新渲染，Vue 会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。如果没有为每个节点提供一个唯一的 key 值，Vue 会使用一种**最大限度减少动态元素**并且尽可能的尝试**就地修改/复用相同类型元素**的算法，即会遍历整个列表，查找需要更新的节点，这样做的效率非常低下。

> 所以在使用 key 的时候不要使用 index，因为 index 代表数组的下标，而当数组的顺序发生变化时，index 也会随之发生变化，这样就会导致节点的顺序发生变化时，会导致列表重新渲染，这样就失去了 key 的意义。

### 3. this.$nextTick()

> this.$nextTick() 是 Vue 在更新 DOM 之后异步执行的回调函数，它可以在 DOM 更新后执行一些操作。

- 作用：在下次 DOM 更新循环结束之后执行**延迟回调**，在修改数据之后立即使用这个方法，获取更新后的 DOM。

- 用法：this.$nextTick([callback])

- 用法示例：

  ```html
  <template>
    <div id="example">{{ message }}</div>
  </template>

  <script>
    const app = new Vue({
      el: "#example",
      data: {
        message: "Hello",
      },
    });
    method: {
      updateMessage() {
        this.message = "Hello World";
        console.log(this.$el.innerText); // Hello
        this.$nextTick(function () {
          console.log(this.$el.innerText); // Hello World
        });
      },
    },
  </script>
  ```

浏览器内核，浏览器渲染原理，css 渲染流程，前端性能优化，路由懒加载，
es6 的 map 和 set 的理解以及异同点，闭包的用处
promise，aync/await 的作用
