<!-- 常用CSS样式收集 -->

# 媒体查询适应字体

```css
/* 超小型设备（电话，600px 及以下） */
@media only screen and (max-width: 600px) {
  html {
    font-size: 16px;
  }
}

/* 小型设备（纵向平板电脑和大型手机，600 像素及以上） */
@media only screen and (min-width: 600px) {
  html {
    font-size: 24px;
  }
}

/* 中型设备（横向平板电脑，768 像素及以上） */
@media only screen and (min-width: 768px) {
  html {
    font-size: 30px;
  }
}

/* 大型设备（笔记本电脑/台式机，992px 及以上） */
@media only screen and (min-width: 992px) {
  html {
    font-size: 40px;
  }
}

/* 超大型设备（大型笔记本电脑和台式机，1200px 及以上） */
@media only screen and (min-width: 1200px) {
  html {
    font-size: 40px;
  }
}
```

# 伪元素技巧

## 1. 伪元素的使用

伪元素是指在 CSS 中使用 `::` 语法来为元素的某个部分设置样式，它可以在元素的前面或者后面添加额外的内容。

伪元素的语法如下：

```css
::pseudo-element {
  property: value;
}
```

伪元素的使用场景：

- 为元素的某个部分设置样式
- 为元素添加额外的内容

## 2. 伪元素的分类

伪元素分为单冒号和双冒号两种，单冒号的伪元素是 CSS2 中的写法，双冒号的伪元素是 CSS3 中的写法。

CSS2 中的伪元素：

- `:first-letter`：选择元素的第一个字母
- `:first-line`：选择元素的第一行
- `:before`：在元素之前添加内容
- `:after`：在元素之后添加内容

CSS3 中的伪元素：

- `::selection`：选择元素中被用户选取的部分
- `::first-letter`：选择元素的第一个字母
- `::first-line`：选择元素的第一行
- `::before`：在元素之前添加内容
- `::after`：在元素之后添加内容

## 3. 伪元素的使用技巧

### 3.1. 伪元素的使用技巧一：清除浮动

伪元素可以用来清除浮动，它的原理是在浮动元素的父元素上设置 `::after` 伪元素，然后清除浮动。

```css
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
```

### 3.2. 伪元素的使用技巧二：实现三角形

伪元素可以用来实现三角形，它的原理是在元素上设置 `::before` 或者 `::after` 伪元素，然后设置 `border` 属性。

```css
.triangle {
  width: 0;
  height: 0;
  border-width: 20px;
  border-style: solid;
  border-color: transparent transparent red transparent;
}
```

### 3.3. 伪元素的使用技巧三：实现图标

伪元素可以用来实现图标，它的原理是在元素上设置 `::before` 或者 `::after` 伪元素，然后设置 `content` 属性。

```css
.icon {
  width: 20px;
  height: 20px;
  background: url("icon.png");
  content: "";
}
```

### 3.4. 伪元素的使用技巧四：实现单行文本溢出省略

伪元素可以用来实现单行文本溢出省略，它的原理是在元素上设置 `::after` 伪元素，然后设置 `content` 属性。

```css
.ellipsis {
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

### 3.5. 伪元素的使用技巧五：实现多行文本溢出省略

伪元素可以用来实现多行文本溢出省略，它的原理是在元素上设置 `::after` 伪元素，然后设置 `content` 属性。

```css
.ellipsis {
  width: 100px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
```

### 3.6. 伪元素的使用技巧六：实现半透明边框

伪元素可以用来实现半透明边框，它的原理是在元素上设置 `::after` 伪元素，然后设置 `box-shadow` 属性。

```css
.border {
  width: 100px;
  height: 100px;
  background: red;
  position: relative;
}

.border::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: inset 0 0 0 10px rgba(0, 0, 0, 0.5);
}
```

### 3.7. 伪元素的使用技巧七：实现自定义滚动条

伪元素可以用来实现自定义滚动条，它的原理是在元素上设置 `::after` 伪元素，然后设置 `box-shadow` 属性。

```css
.scrollbar {
  width: 100px;
  height: 100px;
  overflow: auto;
}

.scrollbar::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.scrollbar::-webkit-scrollbar-thumb {
  background: red;
}
```

### 3.8. 伪元素的使用技巧八：实现自定义复选框

伪元素可以用来实现自定义复选框，它的原理是在元素上设置 `::before` 或者 `::after` 伪元素，然后设置 `content` 属性。

```css
.checkbox {
  width: 20px;
  height: 20px;
  background: url("checkbox.png");
  content: "";
}
```

### 3.9. 伪元素的使用技巧九：实现自定义单选框

伪元素可以用来实现自定义单选框，它的原理是在元素上设置 `::before` 或者 `::after` 伪元素，然后设置 `content` 属性。

```css
.radio {
  width: 20px;
  height: 20px;
  background: url("radio.png");
  content: "";
}
```

### 3.10. 伪元素的使用技巧十：实现自定义开关

伪元素可以用来实现自定义开关，它的原理是在元素上设置 `::before` 或者 `::after` 伪元素，然后设置 `content` 属性。

```css
.switch {
  width: 40px;
  height: 20px;
  background: url("switch.png");
  content: "";
}
```

### 3.11. 伪元素的使用技巧十一：实现自定义滑块

伪元素可以用来实现自定义滑块，它的原理是在元素上设置 `::before` 或者 `::after` 伪元素，然后设置 `content` 属性。

```css
.range {
  width: 100px;
  height: 20px;
  background: url("range.png");
  content: "";
}
```

### 3.12. 伪元素的使用技巧十二：实现自定义下拉框

伪元素可以用来实现自定义下拉框，它的原理是在元素上设置 `::before` 或者 `::after` 伪元素，然后设置 `content` 属性。

```css
.select {
  width: 100px;
  height: 20px;
  background: url("select.png");
  content: "";
}
```

### 3.13. 伪元素的使用技巧十三：实现自定义滑动条

伪元素可以用来实现自定义滑动条，它的原理是在元素上设置 `::before` 或者 `::after` 伪元素，然后设置 `content` 属性。

```css
.range {
  width: 100px;
  height: 20px;
  background: url("range.png");
  content: "";
}
```

### 3.14. 伪元素的使用技巧十四：实现自定义进度条

伪元素可以用来实现自定义进度条，它的原理是在元素上设置 `::before` 或者 `::after` 伪元素，然后设置 `content` 属性。

```css
.progress {
  width: 100px;
  height: 20px;
  background: url("progress.png");
  content: "";
}
```

### 3.15. 伪元素的使用技巧十五：实现自定义计数器

伪元素可以用来实现自定义计数器，它的原理是在元素上设置 `::before` 或者 `::after` 伪元素，然后设置 `content` 属性。

```css
.counter {
  width: 100px;
  height: 20px;
  background: url("counter.png");
  content: "";
}
```

### 3.16. 伪元素的使用技巧十六：实现自定义箭头

伪元素可以用来实现自定义箭头，它的原理是在元素上设置 `::before` 或者 `::after` 伪元素，然后设置 `content` 属性。

```css
.arrow {
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-bottom-color: red;
  content: "";
}
```

### 3.17. 伪元素的使用技巧十七：实现自定义三角形

伪元素可以用来实现自定义三角形，它的原理是在元素上设置 `::before` 或者 `::after` 伪元素，然后设置 `border` 属性。

```css
.triangle {
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-bottom-color: red;
  content: "";
}
```

### 3.18. 伪元素的使用技巧十八：实现自定义扇形

伪元素可以用来实现自定义扇形，它的原理是在元素上设置 `::before` 或者 `::after` 伪元素，然后设置 `border` 属性。

```css
.sector {
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-bottom-color: red;
  content: "";
}
```

### 3.19. 伪元素的使用技巧十九：实现自定义菱形

伪元素可以用来实现自定义菱形，它的原理是在元素上设置 `::before` 或者 `::after` 伪元素，然后设置 `border` 属性。

```css
.rhombus {
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-bottom-color: red;
  content: "";
}
```

### 3.20. 伪元素的使用技巧二十：实现自定义梯形

伪元素可以用来实现自定义梯形，它的原理是在元素上设置 `::before` 或者 `::after` 伪元素，然后设置 `border` 属性。

```css
.trapezoid {
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-bottom-color: red;
  content: "";
}
```

### 3.21. 伪元素的使用技巧二十一：实现自定义平行四边形

伪元素可以用来实现自定义平行四边形，它的原理是在元素上设置 `::before` 或者 `::after` 伪元素，然后设置 `border` 属性。

```css
.parallelogram {
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-bottom-color: red;
  content: "";
}
```

### 3.22. 伪元素的使用技巧二十二：实现自定义五角星

伪元素可以用来实现自定义五角星，它的原理是在元素上设置 `::before` 或者 `::after` 伪元素，然后设置 `border` 属性。

```css
.star {
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-bottom-color: red;
  content: "";
}
```

# css 变量

## 1. 什么是 CSS 变量

CSS 变量是指在 CSS 中使用 `--` 语法来定义的变量，它可以在全局范围内使用。

CSS 变量的语法如下：

```css
--variable-name: variable-value;
```

CSS 变量的使用场景：

- 在全局范围内使用

## 2. CSS 变量的使用技巧

### 2.1. CSS 变量的使用技巧一：定义变量

CSS 变量可以用来定义变量，它的原理是在根元素上设置 `--variable-name` 变量，然后在子元素上使用 `var(--variable-name)` 来引用变量。
