# Intro

## Dom 和 虚拟 Dom

由于在一个页面中，有很多的 DOM 元素，如果每次数据更新都直接操作 DOM，那么会产生很大的性能问题，所以 Vue 采用了虚拟 DOM 的方式来解决这个问题。

```html
<div>Hello</div>
=> { tag: 'div', children:[text:'Hello'] }
```

虚拟 DOM 是一个纯 JS 对象，它描述了一个 DOM 节点的信息，包括标签名、属性、子元素等，当数据发生变化时，会生成一个新的虚拟 DOM，然后和旧的虚拟 DOM 进行比较，找出差异，然后将差异更新到真实的 DOM 上。
