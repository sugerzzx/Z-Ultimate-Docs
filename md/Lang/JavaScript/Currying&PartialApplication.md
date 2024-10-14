# Currying&PartialApplication

[Currying](https://en.wikipedia.org/wiki/Currying)

[Partial_application](https://en.wikipedia.org/wiki/Partial_application)

[What is the difference between currying and partial application?](https://stackoverflow.com/questions/218025/what-is-the-difference-between-currying-and-partial-application)

[柯里化（Currying）](https://zh.javascript.info/currying-partials)

柯里化是将接受多个参数的函数转换为一系列函数，这些函数每个都接受一个参数。

部分应用是指固定一个函数的一个或多个参数，产生另一个参数数较小的函数的过程。部分应用可以通过柯里化来实现。

## javascript 中实现 currying

一种高级的柯里化实现

```javascript
function curry(fn) {
  return function curried(...args) {
    if ((args.length > fn, length)) {
      return fn.apply(this, args);
    } else {
      return function (...moreArgs) {
        return curried.apply(this, args.concat(moreArgs));
      };
    }
  };
}
```

用例

```javascript
function add(a, b, c) {
  return a + b + c;
}

let curriedAdd = curry(add);

console.log(curriedAdd(1, 2, 3)); // 6，仍然可以被正常调用
console.log(curriedAdd(1)(2, 3)); // 6，对第一个参数的柯里化
console.log(curriedAdd(1)(2)(3)); // 6，全柯里化
```

## javascript 中实现 partial application

使用`bind`方法来实现 partial application。

```javascript
function add(x, y, z) {
  return x + y + z;
}

const addFive = add.bind(null, 5); // 固定第一个参数 x 为 5
console.log(addFive(3, 4)); // 12
```

手动部分应用一些参数，返回一个新的函数。

```javascript
function add(x, y, z) {
  return x + y + z;
}

const addFive = (y, z) => add(5, y, z); // 固定第一个参数 x 为 5

// 与上面的箭头函数等价
function addFive(y, z) {
  return add(5, y, z);
}

console.log(addFive(3, 4)); // 12
```

手动封装部分应用函数

```javascript
function partial(fn, ...presetArgs) {
  return (...laterArgs) => fn(...presetArgs, ...laterArgs);
}

const add = (x, y, z) => x + y + z;
const addFive = partial(add, 5); // 部分应用第一个参数
console.log(addFive(3, 4)); // 12
```

自定义柯里化函数

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return (...moreArgs) => curried(...args, ...moreArgs);
    }
  };
}

const add = (x, y, z) => x + y + z;
const curriedAdd = curry(add);

const addFive = curriedAdd(5); // 部分应用第一个参数
console.log(addFive(3, 4)); // 12
```
