# TSConfig

[TSConfig](https://www.typescriptlang.org/tsconfig)

## Lib 选项

[Lib](https://www.typescriptlang.org/tsconfig/#lib)

在 ts 项目中，我们可以通过 lib 选项来指定 ts 项目中可以使用的库文件，以提供更好的类型检查。

```json
{
  "compilerOptions": {
    "lib": ["es5", "es6", "dom"]
  }
}
```

比如在运行在 node 环境中的项目，在安装了 `@types/node` 的情况下，若不指定 `lib` 选项， 使用 `fetch` 时，当查看其类型时，会出现两个定义：

- nodejs 环境中的定义
  ![node](/TypeScript/definition1.png)

- dom 环境中的定义
  ![dom](/TypeScript/definition2.png)

当你尝试在 `fetch` 的 `options` 中传入 `dispatcher` 属性时，会出现错误提示，提示“dispatcher”不在类型“RequestInit”中：

![dom](/TypeScript/ts-error.png)

这是由于类型检查默认使用了 `lib` 中的所有库文件，包括 `dom`，而 `dispatcher` 属性并不在 `dom` 所定义的 `RequestInit` 中。

当我们指定 `lib` 选项为 `["esnext"]` 时(确保数组内没有 `"dom"` )，再次查看 `fetch` 的类型，就只有一个定义了，且传入 `dispatcher` 属性时会提供正确的类型检查。
