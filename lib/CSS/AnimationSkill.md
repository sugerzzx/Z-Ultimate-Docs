# Title

## API

### AnimationEvent

#### animationend 事件

监听动画**结束**事件，在动画结束后执行回调

```js
element.addEventListener("animationend", event => {
  // ...
});
```

#### animationstart 事件

监听动画**开始**事件

```js
element.addEventListener("animationstart", event => {
  // ...
});
```

#### animationiteration 事件

监听动画**重复**事件

```js
element.addEventListener("animationiteration", event => {
  // ...
});
```

### Intersection Observer API

## 介绍

传统的 Web 页面中，关于元素位置的计算通常通过显式查询 DOM 状态来实现。这些查询会导致昂贵的重绘和重排(确保最新)，并且经常因为持续轮询这些信息而导致显著的性能开销。

需要计算元素位置的一些常见的场景，包括但不限于：

- 构建自定义的 DOM 和数据的预加载与延迟加载：通过使用这些机制，开发者可以自行实现对 DOM 和数据的自定义加载策略。

- 实现数据绑定的高性能滚动列表：这些列表在移动设备上是一种核心的交互模式，可以加载和呈现数据集的子集。(无限滚动)

- 计算元素可见性： 特别是，报告广告的可见度，以便计算广告收入。这导致许多网站滥用滚动处理程序（导致滚动时的卡顿），同步布局调用读取操作（在 requestAnimationFrame 循环中引起不必要的关键工作），并求助于使用插件的奇特解决方案来计算"真正"的元素可见性（带有插件架构的所有相关开销）。

- 根据用户是否能看到结果来决定是否执行任务或动画进程。

提供了一种异步检测目标元素与祖先元素或 viewport 相交情况变化的方法(垂直方向上)。

使用：

```js
const callback = e => {
  const ratio = e[0].intersectionRatio;
  console.log(ratio);
};
const option = {
  root: null, // 默认为视窗
  threshold: [0, 1.0],
};
const observer = new IntersectionObserver(callback, options); // 创建一个IntersectionObserver 对象，即交叉观测器,当其监听到目标元素的可见部分（的比例）超过了一个或多个阈值（threshold）时，会执行指定的回调函数。
observer.observe(element);
```

### Vue2transition 组件

#### transition 组件的 JavaScript 钩子函数

利用 transition 组件的 JavaScript 钩子函数，可以监听动画的开始、结束、重复事件

### requestAnimationFrame 方法

requestAnimationFrame() 方法告诉浏览器您希望执行动画并请求浏览器在下一次重绘之前调用指定的函数来更新动画。该方法使用一个回调函数作为参数，这个回调函数会在浏览器重绘之前调用。

```js
window.requestAnimationFrame(callback);
```

### Web Animations API

Web Animations API 提供了一种控制 CSS 和 SVG 动画的方法，这些动画可以直接在浏览器中使用，无需任何插件或 JavaScript 库。

```js
const player = element.animate(keyframes, options);
```

### Page Visibility API

Page Visibility API 可以用来检测页面是否可见，以及页面是否被用户停留在后台标签页或者最小化窗口中。

```js
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // ...
  } else {
    // ...
  }
});
```
