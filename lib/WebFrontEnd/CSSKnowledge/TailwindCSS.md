# Tailwindcss

👉 [A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.](https://tailwindcss.com/)

👉 [tailwindcssCn](https://www.tailwindcss.cn/)

## 实用 TaiwindCss 类名

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

- 问题 1：

  通常，在使用 Tailwind CSS 时，当我们通过 props 传递类名合并样式时，我们需要在组件中拼接类名。这样会导致代码冗余，可读性差。为了解决这个问题，我们可以使用一个工具函数来帮助我们拼接类名。

  ```tsx
  function mergeClassNames(...classNames: string[]) {
    return classNames.filter(Boolean).join(" ");
  }
  ```

  但是，这个函数只能拼接字符串，无法处理数组。为了解决这个问题，我们可以使用 clsx 库。

  [clsx](https://github.com/lukeed/clsx#readme) 是一个用于合并类名的工具库，它可以处理字符串、数组、对象等多种类型的类名。使用 clsx 后，我们可以更方便地拼接类名。

- 问题 2:

  在 Tailwind CSS 中，合并的类名可能不会像预期那样渲染，虽然传入的类名可能看起来在已有样式之后，会覆盖已有样式，甚至可能在页面中已经生效，但是当我们重启开发服务器，类名会按照字母顺序被重新排序，传入的样式顺序在已有样式之前，导致其反而被覆盖。为了解决这个问题，我们可以使用 tailwind-merge 库。

  [tailwind-merge](https://github.com/dcastil/tailwind-merge)

  ▶ [为什么使用 tailwind-merge](https://www.youtube.com/watch?v=tfgLd5ZSNPc)

结合 clsx 和 tailwind-merge，我们可以实现一个更加方便的合并类名的工具函数。

```ts
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

```tsx
import { cn } from "./utils";

export default function Button({ children, className }) {
  return <button className={cn("bg-blue-500", "text-white", className)}>{children}</button>;
}
```

▶ [cn() - Every Tailwind Coder Needs It (clsx + twMerge)](https://www.youtube.com/watch?v=re2JFITR7TI)

## Mistakes

### 不要根据 state 生成具有动态值的 Tailwind CSS 类名

▶ [Avoid This Tailwind Mistake (Dynamic Classes)](https://www.youtube.com/watch?v=guh9qzxkb1o)

👉 [Class detection in-depth](https://tailwindcss.com/docs/content-configuration#class-detection-in-depth)

👉 [Dynamic class names](https://www.tailwindcss.cn/docs/content-configuration#dynamic-class-names)

在 React 中,使用 Tailwind CSS 时,想根据 state 生成具有动态值的样式名是不可行的。使用比如`className={p-[${state}]}` 这样的写法是无效的。因为 Tailwind CSS 是基于构建时的静态分析，它会在构建时使用正则表达式来提取每个可能成为类名的字符串，`p-[${state}]` 并不会在样式表中生成对应的类名。
