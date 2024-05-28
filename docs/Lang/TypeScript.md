# TypeScript

[官方文档](https://www.typescriptlang.org/zh/docs/handbook/typescript-in-5-minutes.html)
[TypeScript 入门教程](https://ts.xcatliu.com/)

## 基础

### 1. TypeScript 是什么

- TypeScript 是 JavaScript 的超集，它可以编译成纯 JavaScript。

- TypeScript 可以在编译时进行代码检查，它能够在编译阶段（而不是程序运行时）就发现大部分错误，这对于开发大型应用时能够提供效率。

### 2. TypeScript 的安装和编译

#### 2.1 安装

```shell
npm install -g typescript
```

#### 2.2 初始化

```shell
tsc --init
```

```json
{
  "compilerOptions": {
    "target": "es2016", // 指定 ECMAScript 目标版本
    "module": "commonjs", // 指定模块化类型
    "rootDir": "./src", // 指定源文件目录
    "outDir": "./dist", // 指定输出目录
    "noEmitOnError": true // 在发生错误时不生成编译文件
  }
}
```

#### 2.3 编译

```shell
tsc hello.ts
```

## TypeScript 的数据类型

### 1. JavaScript 的数据类型

- 七种原始数据类型：

  - Number
  - BigInt
  - String
  - Boolean
  - Null
  - Undefined
  - Symbol

- 一种非原始数据类型

  - Object

### 2. TypeScript 的新增类型

除了 JavaScript 的数据类型外，TypeScript 还提供了以下数据类型：

- 元组类型（Tuple）
- 枚举类型（Enum）
- 任意类型（Any）
- null 和 undefined
- void 类型
- never 类型

_要注意避免使用过多的 any 类型，any 类型会导致 TypeScript 失去静态类型检查的意义，即变成了'anyscript'。_

### 3. TypeScript 中的常用数据类型

#### 3.1 布尔类型（boolean）

```typescript
let flag: boolean = true;
```

#### 3.2 数字类型（number）

```typescript
let num: number = 123;
```

#### 3.3 字符串类型（string）

```typescript
let str: string = "this is ts";
```

> 大写的`String`, `Number`, 和 `Boolean`是合法的，但它们指的是一些特殊的内置类型，在您的代码中很少会出现(比如`String`：表示 JavaScript 中的 `String` 对象类型，它拥有一些额外的方法和属性)。请始终使用小写的 string、number 或 boolean 来表示类型。

#### 3.4 数组类型（array）

```typescript
// 第一种定义数组的方式
let arr: number[] = [1, 2, 3];
// 第二种定义数组的方式
let arr2: Array<number> = [1, 2, 3];
```

#### 6.3.5 对象类型（object）

```typescript
let obj: object = { name: "TSC" };
```

#### 6.3.6 元组类型（tuple）

> 元组类型属于数组的一种，可以指定数组中每个元素的类型，和 Python 中的元组类似,Python 中的元组也是属于数组的一种,但是元组中的元素类型可以不一样

```typescript
let arr: [number, string] = [123, "this is ts"];
```

```python
arr = (123, "this is py")
```

#### 6.2.7 枚举类型（enum）

> 枚举类型用于定义数值集合

```typescript
enum Flag {
  success = 1,
  error = -1,
}
let s: Flag = Flag.success;
let e: Flag = Flag.error;
console.log(s); // 1
console.log(e); // -1
```

#### 6.2.8 任意类型（any）

> 任意类型用于表示允许赋值为任意类型

```typescript
let num: any = 123;
num = "str";
```

#### 6.2.9 null 和 undefined

> null 和 undefined 是其他类型的子类型，可以赋值给其他类型的变量

```typescript
let num: number;
console.log(num); // undefined

let num2: undefined;
console.log(num2); // undefined

let num3: number | undefined;
console.log(num3); // undefined

let num4: number | null | undefined;
console.log(num4); // undefined
```

#### 6.2.10 void 类型

> void 类型表示没有任何类型，一般用于定义方法的时候方法没有返回值

```typescript
function run(): void {
  console.log("run");
}

run();
```

#### 6.2.11 never 类型

> never 类型表示的是那些永不存在的值的类型，例如：抛出异常或者根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型

```typescript
let a: never;
a = (() => {
  throw new Error("错误");
})();
```

### 7. TypeScript 中的函数

#### 7.1 函数的定义

```typescript
// 函数声明法
function run(): string {
  return "run";
}

// 匿名函数
let run2 = function (): number {
  return 123;
};
```

### 7.2 TypeScript 中定义方法传参

```typescript
function getInfo(name: string, age: number): string {
  return `${name} --- ${age}`;
}

getInfo("TSC", 18);
```

### 7.3 没有返回值的方法

```typescript
function run(): void {
  console.log("run");
  //   void表示没有返回值, 也可以返回undefined
  return undefined;
}
```

### 7.4 方法可选参数

```typescript
function getInfo(name: string, age?: number): string {
  if (age) {
    return `${name} --- ${age}`;
  } else {
    return `${name} --- 年龄保密`;
  }
}

getInfo("TSC");
```

### 7.5 默认参数

```typescript
function getInfo(name: string, age: number = 20): string {
  if (age) {
    return `${name} --- ${age}`;
  } else {
    return `${name} --- 年龄保密`;
  }
}

getInfo("TSC");
```

### 7.6 剩余参数

```typescript
function sum(...result: number[]): number {
  let sum = 0;
  for (let i = 0; i < result.length; i++) {
    sum += result[i];
  }
  return sum;
}

sum(1, 2, 3, 4, 5);
```

### 7.7 函数重载

> 重载是方法名字相同，而参数不同，返回类型可以相同也可以不同

```typescript
function getInfo(name: string): string;
function getInfo(age: number): string;
function getInfo(str: any): any {
  if (typeof str === "string") {
    return `我叫：${str}`;
  } else {
    return `我的年龄是：${str}`;
  }
}

getInfo("TSC"); // 我叫：TSC
getInfo(18); // 我的年龄是：18
```

## 8. TypeScript 中的类

### 8.1 类的定义

```typescript
class Person {
  name: string; // 属性，前面省略了 public 关键词
  constructor(name: string) {
    // 构造函数，实例化类的时候触发的方法
    this.name = name;
  }
  run(): void {
    console.log(this.name);
  }
}

let p = new Person("TSC");
p.run();
```

### 8.2 类的继承

```typescript
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  run(): string {
    return `${this.name}在运动`;
  }
}
```

### 8.3 类的修饰符

> 类的修饰符，typescript 里面定义属性的时候给我们提供了三种修饰符

- public：公有，在类里面、子类、类外面都可以访问
- protected：保护类型，在类里面、子类里面可以访问，在类外部没法访问
- private：私有，在类里面可以访问，子类、类外部都没法访问

```typescript
class Person {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
  run(): string {
    return `${this.name}在运动`;
  }
}
```
