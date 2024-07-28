# Object&Class

## Object

👉 [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

## Class

### Definition

[类是用于**创建对象的模板**，JS 中的类**建立在原型之上**，类实际上是“特殊的函数”](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes)

[使用类：类可以看作是已有的原型继承机制的一种抽象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_classes#%E5%85%AC%E5%85%B1%E5%AD%97%E6%AE%B5)

### 类的定义

类有两种定义方式：类表达式和类声明。

### 字段

类字段与对象属性相似，不属于变量，所以我们不需要使用诸如 const 一类的关键字去声明它们。

#### 公共字段

公共字段使得实例可以获得属性

### 方法

方法被定义在类实例的原型上并且被所有实例共享

```js
class A {
  testMethod() {
    console.log("testMethod");
  }
}

console.log(A.prototype.testMethod); // [Function: testMethod]
```

[箭头函数不能用作方法,因为它们没有自己的 `this`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions#%E4%B8%8D%E8%83%BD%E7%94%A8%E4%BD%9C%E6%96%B9%E6%B3%95)

但是可以作为字段添加到类中，且可以保证 `this` 始终指向类的实例（或者类本身，对于静态字段）：

```js
class C {
  a = 1;
  autoBoundMethod = () => {
    console.log(this.a);
  };
}

const c = new C();
c.autoBoundMethod(); // 1
const { autoBoundMethod } = c;
autoBoundMethod(); // 1
// 如果这是普通方法，此时应该是 undefined
```

原因：

Arrow functions differ in their handling of `this`: they inherit `this` from the parent scope at the time they are defined.

Because a class's body has a `this` context, arrow functions as class fields close over the class's `this` context, and the `this` inside the arrow function's body will correctly point to the instance (or the class itself, for static fields). However, because it is a closure, not the function's own binding, the value of `this` will not change based on the execution context.

> 类字段是在实例（instance）上定义的，而不是在原型（prototype）上定义的，因此每次创建实例都会创建一个新的函数引用并分配一个新的闭包，这可能会导致比普通非绑定方法更多的内存使用。

## 继承和原型链

[In programming, inheritance refers to passing down characteristics from a parent to a child so that a new piece of code can reuse and build upon the features of an existing one. JavaScript implements inheritance by using objects. Each object has an internal link to another object called its prototype. That prototype object has a prototype of its own, and so on until an object is reached with null as its prototype. By definition, null has no prototype and acts as the final link in this prototype chain. It is possible to mutate any member of the prototype chain or even swap out the prototype at runtime, so concepts like static dispatching do not exist in JavaScript.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

> 符号 `someObject.[[Prototype]]` 用于标识 `someObject` 的原型。内部插槽 `[[Prototype]]` 可以通过 `Object.getPrototypeOf()` 和 `Object.setPrototypeOf()` 函数来访问。这个等同于 JavaScript 的非标准但被许多 JavaScript 引擎实现的属性 `__proto__` 访问器。它不应与函数的 `func.prototype` 属性混淆，后者指定在给定函数被用作构造函数时分配给所有对象实例的 `[[Prototype]]`。

### Function: prototype

[The prototype data property of a Function instance is used when the function is used as a constructor with the new operator. It will become the new object's prototype.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/prototype)

类是一种特殊的函数，所以由类构造的对象的原型是类的 `prototype` 属性。

```js
const a = {};
Object.getPrototypeOf(a) === Object.prototype; // true
```

几乎所有的 JavaScript 对象最终都继承自 `Object.prototype` 。
