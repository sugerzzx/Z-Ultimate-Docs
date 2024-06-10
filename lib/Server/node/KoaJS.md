# KoaJS

👉 [doc-cn](https://koa.bootcss.com/)

👉 [doc-en](https://koajs.com/)

👉 [gitHub](https://github.com/demopark/koa-docs-Zh-CN)

## KoaJS

KoaJS 是一个基于 NodeJS 的 Web 开发框架，它的特点是轻量、灵活、可扩展。KoaJS 的核心是中间件（Middleware），它提供了一种优雅的方法来编写 Web 服务器。

## KoaJS 的中间件机制

KOA 的中间件机制可以理解为一种洋葱圈模型。每个中间件可以看成一层洋葱圈,请求从外到内,一次流经每个中间件,而响应则从内到外,一次流经每个中间件。
可以采用两种不同的方法来实现中间件：

- async function
- common function

这里拿 `async` 函数举例,它接收 ctx 和 next 两个参数:

```ts
// 第一个中间件
app.use(async (ctx: Koa.Context, next: Koa.Next) => {
  // ...
  await next();
  // ...
});

// 第二个中间件
app.use(async (ctx: Koa.Context, next: Koa.Next) => {
  // ...
  await next();
  // ...
});
```

当一个请求进入时,会从第一个中间件开始执行,执行到 await next() 时会暂停当前中间件,并进入下一个中间件。当最后一个中间件执行完毕后,会按相反的顺序返回,并继续执行上一个中间件中 `await next()` 之后的代码。

其实这就是栈的结构,每个中间件都是一个栈帧,当一个中间件执行完毕后,会从栈中弹出,并继续执行上一个中间件中 `await next()` 之后的代码。

## KoaJS Hello World

```ts
import Koa from "koa";
const app: Koa<Koa.DefaultState, Koa.DefaultContext> = new Koa(); // 创建 Koa 实例,类型为一个泛型

/* 注册中间件 */
app.use(async ctx:Koa.Context => { // Koa.Context 是 Koa的上下文对象
  ctx.body = "Hello World"; // 设置响应体
});

app.listen(3000);
```

上面的代码中，我们使用 `app.use` 方法注册了一个中间件，这个中间件的作用是设置响应体为 `Hello World`，我们可以看到 `app.use` 方法**接收一个函数作为参数，这个函数就是中间件**，它的参数是一个上下文对象，我们可以通过这个上下文对象来获取请求和响应的信息，比如请求体、响应体等。

这样，当我们访问 `http://localhost:3000` 时，就会返回 `Hello World`。

## 使用 KoaJS 开发 Web 服务器

### 安装 KoaJS

```shell
npm install koa @types/koa --save // ts
```

### 在 src/index.ts 中创建 Koa 实例

```ts
// src/app/index.ts
import Koa from "koa";
const app: Koa<Koa.DefaultState, Koa.DefaultContext> = new Koa();

app.use(async ctx:Koa.Context => {
  ctx.body = "Hello World";
});

app.listen(3000);
```

### 添加路由

#### 安装 koa-router

```bash
npm install koa-router @types/koa-router --save
```

#### 创建路由

```ts
// src/router/someRoute.ts
import Router from "koa-router";
import { Context } from "koa";

// 创建路由实例
const router: Router<any, {}> = new Router({ prefix: "/something" }); // prefix: '/user'表示该路由下的所有路由都会加上前缀/something

// 注册路由
router.get("/", async ctx:Context => {
  ctx.body = "Hello SomeThing";
});

// 导出路由
export const userRoutes = router.routes();
```

#### 注册路由

```ts
// src/app/index.ts
// ...

const app: Koa<Koa.DefaultState, Koa.DefaultContext> = new Koa();

app.use(userRoutes); // 注册路由

app.listen(3000);
```

这样在我们访问 `http://localhost:3000` 时，就会返回 `Hello World`，访问 `http://localhost:3000/something` 时，就会返回 `Hello SomeThing`。

同时，可以把 router.post()中的回调单独拆分到一个 controller 中，这样代码更加清晰。

比如这里有一个用户路由，包含登录和注册两个接口，我们可以把这两个接口的回调分别放到两个 controller 中。

```ts
// src/router/someController.ts
// ...
class UserController {
  async register(ctx: Context) {
    // 注册
    // ...
  }
  async login(ctx: Context) {
    // 登录
    // ...
  }
}
export const { register, login } = new UserController(); // 导出实例化后的对象
```

### koa-body 中间件

koa-body 中间件可以用来解析请求体，它支持解析 JSON、表单、文本等格式的请求体。

```shell
npm install koa-body --save
```

```ts
// src/app/index.ts
//...

const app: Koa<Koa.DefaultState, Koa.DefaultContext> = new Koa();

app.use(koaBody()); // 注册 koa-body 中间件
app.use(userRoutes);

/// ...
app.listen(3000);
```

假如我们要获取请求体中的 name 字段，可以这样做：

```ts
// src/router/someController.ts
// ...
class SomeController {
  async getSometing(ctx: Context) {
    const { name } = ctx.request.body; // 获取请求体中的 name 字段
    // const { name } = ctx.params; // params通过ctx.params获取
    console.log(name);
    // ...
  }
}
```

### 用户登录与注册模块

[Sequlize](./Sequelize.md)

### 错误处理

[JS 错误处理](https://zh.javascript.info/try-catch)

Koa 中的错误处理有多种方式：

#### 1. 使用 try...catch 捕获错误，搭配 ctx.throw() 主动抛出错误

```ts
// src/app/index.ts
// ...
// 错误处理中间件要放在最前面
app.use(async (ctx: Context, next: Next): Promise<void> => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message,
    };
  }
});

// 其余中间件
// ...
```

```ts
// src/router/someController.ts
// ...
class SomeController {
  async getSometing(ctx: Context): Promise<void> {
    const { name } = ctx.request.body; // 获取请求体中的 name 字段
    if (!name) {
      ctx.throw(400, "name is required", { code: 10001 }); // 主动抛出错误
      // 此处不需要 return，因为 ctx.throw() 会中断代码执行
    }
    // 或者使用ctx.assert()
    ctx.assert(name, 400, "name is required", { code: 10001 }); // 当 name 为 false 时，主动抛出错误
    try {
      const res = await SomeModel.findOne({ where: { name } });
      // ...
    } catch (error) {
      ctx.throw(500, "server error", { code: 10002, error }); // 主动抛出错误
    }
    // ...
  }
}
```

拆分后的错误处理中间件：

```ts
// src/app/errorHandler.ts
import { Context, Next } from "koa";

export const errorHandler = async (ctx: Context, next: Next): Promise<void> => {
  try {
    await next();
  } catch (err) {
    ctx.status = error.status || error.statusCode || 500;
    ctx.body = {
      code: error.code || 99999,
      message: error.code ? error.message : "服务器错误", // 如果没有code,则该错误为服务器错误，此时不要返回错误细节，防止泄露服务器信息
      result: "",
    };
  }
};
```

补充：如果采用这种错误处理有一个缺陷，`try`中不能再包含其他 `ctx.throw()`，因为其会被`catch`捕获，导致错误处理中间件无法捕获到错误，比如下面的例子实际返回的是 500 错误。

```ts
// src/router/someController.ts
// ...
try {
  const res = await SomeModel.findOne({ where: { name } });
  // ...
  if (!res) {
    ctx.throw(400, "name is required", { code: 10001 }); // 这个错误会直接被其外层的catch捕获，导致错误处理中间件无法捕获到错误,实际返回的是500错误
  }
} catch (error) {
  ctx.throw(500, "server error", { code: 10002, error }); // 主动抛出错误
}
```

#### 2. 使用 Koa 的 `error` 事件侦听器：，使用 `ctx.app.emit()` 提交错误事件

```ts
// src/app/index.ts
// ...
// 错误处理中间件要放在最前面
app.on("error", (err, ctx) => {
  console.error(err.error || err.message || err); // 打印错误信息
  ctx.status = err.statusCode || err.status || 500;
  ctx.body = {
    code: err.code || 99999,
    message: error.code ? error.message : "服务器错误",
    request: "",
  };
});
```

```ts
// src/router/someController.ts
// ...
class SomeController {
  async getSometing(ctx: Context): Promise<void> {
    const { name } = ctx.request.body; // 获取请求体中的 name 字段
    if (!name) {
      ctx.app.emit("error", { code: 10001, message: "name is required", statusCode: 400 }, ctx); // 提交错误事件并中止后续业务逻辑
      return; // 此处需要 return，因为 ctx.app.emit() 不会中断代码执行
    }
    try {
      const res = await SomeModel.findOne({ where: { name } });
      // ...
    } catch (error) {
      ctx.app.emit("error", { code: 10002, message: "server error", error }, ctx); // 提交错误事件
    }
    // ...
  }
}
```

这样不管是**客户端错误**还是**可人为捕获的程序异常**又或者是**不可人为捕获的错误**，都会被统一处理。

### 信息的加密存储

[Bcrypt](./Bcrypt.md)
