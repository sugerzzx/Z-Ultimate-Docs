# 在 Javascript 中检查数据类型

[A complete guide to check data types in JavaScript](https://www.zhenghao.io/posts/js-data-type)

## 1. 使用 typeof 操作符

对于基础数据类型以及函数`function`，`typeof`操作符可以很好的区分。

```javascript
typeof 1; // number
typeof "hello"; // string
typeof true; // boolean
typeof undefined; // undefined
typeof function () {}; // function
```

但是对于`null`和除了`function`以外的内建对象，`typeof`操作符无法区分。

```javascript
typeof null; // object

typeof {}; // object
typeof []; // object
```

## 2. 使用 instanceof 操作符

`instanceof`操作符可以用来检查一个对象是否是一个类的实例。所以`instanceof`可以很好地检查对象的类型，但是无法检查基础数据类型。

```javascript
[] instanceof Array; // true
(() => {}) instanceof Function; // true

1 instanceof Number; // false
```

## 3. 使用 Object.prototype.toString 方法

[ECMA: Object.prototype.toString()](https://262.ecma-international.org/6.0/#sec-object.prototype.tostring)

`Object.prototype.toString`方法返回一个表示对象的字符串，可以很好地区分对象的类型。

```javascript
Object.prototype.toString.call({}); // "[object Object]"
Object.prototype.toString.call(1); // "[object Number]"
Object.prototype.toString.call("1"); // "[object String]"
Object.prototype.toString.call(true); // "[object Boolean]"
Object.prototype.toString.call(new String("string")); // "[object String]"
Object.prototype.toString.call(function () {}); // "[object Function]"
Object.prototype.toString.call(null); //"[object Null]"
Object.prototype.toString.call(undefined); //"[object Undefined]"
Object.prototype.toString.call(/123/g); //"[object RegExp]"
Object.prototype.toString.call(new Date()); //"[object Date]"
Object.prototype.toString.call([]); //"[object Array]"
Object.prototype.toString.call(document); //"[object HTMLDocument]"
Object.prototype.toString.call(window); //"[object Window]
```
