# Tailwindcss

## 你可能不知道的 TaiwindCss 类名

### 1. inset-x-0

设置 left 和 right 为 0

```css
.inset-x-0 {
  left: 0;
  right: 0;
}
```

### 2. antialiased

设置字体抗锯齿

```css
.antialiased {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### 3. container

在 Tailwind CSS 中,container 类是用于控制内容最大宽度的一个 utility 类。
container 类的主要作用有:

1. 设置最大宽度,避免内容过宽
   container 类默认会设置一个最大宽度(例如 1200px),可以避免页面内容过于宽广,影响阅读。
2. 自动水平居中
   使用 container 后,内容会自动居中,不需要额外使用 margin: 0 auto 来实现。
3. 响应式断点
   container 在不同断点下有不同的最大宽度,可以实现响应式布局。
4. 页面布局结构
   容器类常用于页面整体布局结构的组织,定义内容区域的范围。
   常见用法是将导航、主内容、页脚等放入不同的 container 内。
5. 定制最大宽度
   可以配置 container 的最大宽度或断点来实现自定义布局。

```css
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}
```

### 4. h-fit

在 Tailwind CSS 中,h-fit 是一个非常有用的 utility class,它的作用是设置元素的高度自适应内容大小。
h-fit 的全称是 height: fit-content,它的主要特性包括:

- 高度自动调整为内容的高度,而不是被父元素或固定高度限制。
- 内容溢出时,会允许元素的高度增大来照顾内容。
- 当内容高度小于最小高度时,会保持最小高度不变。
- 对内置的显示类型如 flex、grid 容器很友好。
  使用 h-fit 的常见场景:
- 自动适应内容高度的卡片或面板
- 显示额外内容的下拉模块
- 需要基于内容动态调整高度的元素
  相比固定高度,h-fit 可以建立更好的响应式布局。相比 height:auto,它对布局和溢出更友好。

```css
.h-fit {
  height: fit-content;
}
```

### space 和 gap

在 Tailwind CSS 中,space 和 gap 是两个非常有用的 utility class,它们的作用是设置元素的间距。

- space 用于设置内边距和外边距,包括水平和垂直方向。

- gap 用于设置网格布局的间距,包括水平和垂直方向。

## Utils 工具函数

### cn 函数

1. 接收任意数量的 class 参数,使用 clsx 把它们组合成一个字符串。clsx 来自 clsx 库,可以把数组、对象、字符串类型的 class 合并成一个字符串。
2. 然后使用 twMerge 函数进行处理。twMerge 来自 tailwind-merge 库,它可以合并像 Tailwind CSS 这样的使用动态前缀的类名。
3. 最后返回处理后的类名字符串，如此，不需要手写样式字符串拼接,也能处理动态样式前缀。

```js
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## react 中 tailwind 无法根据 state 生成动态样式

在 React 中,使用 Tailwind CSS 时,想根据 state 生成动态样式是不可行的。使用比如`className={p-[${state}]}` 这样的写法是无效的。因为 Tailwind CSS 是基于构建时的静态分析,无法在运行时动态生成样式。这时只能使用*css 变量*或者*行内样式*来动态修改样式。
