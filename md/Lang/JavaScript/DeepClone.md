# DeepClone

[对象引用和复制](https://zh.javascript.info/object-copy)

[MDN:深拷贝](https://developer.mozilla.org/zh-CN/docs/Glossary/Deep_copy)

A deep copy of an object is a copy whose properties do not share the same references (point to the same underlying values) as those of the source object from which the copy was made.

对象的深拷贝是指拷贝得到的副本的属性与其拷贝的源对象的属性不共享相同的引用（指向相同的底层值）的副本。

## 如何深拷贝一个对象

如果一个 JavaScript 对象可以被序列化（**可被序列化的对象**指的是那些没有包含循环引用、函数、特殊类型对象（比如 `Map`、`Set`、`Date`、`RegExp` 等）以及不能转化为 JSON 格式的数据类型的对象。换句话说，只有满足 JSON 格式标准的数据结构才能被有效地序列化和反序列化。），则可以使用使用 `JSON.stringify()` 将该对象转换为 JSON 字符串，然后使用 `JSON.parse()` 将该字符串转换回（全新的）JavaScript 对象：

```javascript
let ingredients_list = ["noodles", { list: ["eggs", "flour", "water"] }];
let ingredients_list_deepcopy = JSON.parse(JSON.stringify(ingredients_list));
```

当遇到循环引用和某些不能被序列化的对象时，可以使用 `structuredClone` 方法

## 使用 structuredClone 方法

[Deep Cloning Objects in JavaScript, the Modern Way](https://www.builder.io/blog/structured-clone)

[Window: structuredClone() method](https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone)

[The structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)

`structuredClone` 可以：

- 克隆无限嵌套的对象和数组

- 克隆循环引用

- 克隆 `Map`、`Set`、`Date`、`RegExp` 等特殊类型对象

- 传递可转移的对象（`Transferable`）

`structuredClone` 也有一些限制：

- 不能克隆函数，这么做会抛出 `DataCloneError` 异常

- 不能克隆 DOM 节点，这么做会抛出 `DataCloneError` 异常

- 一些对象的某些属性可能会被忽略
