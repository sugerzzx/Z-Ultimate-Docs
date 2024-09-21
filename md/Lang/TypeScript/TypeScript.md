# TypeScript

[官方文档](https://www.typescriptlang.org/zh/docs/handbook/typescript-in-5-minutes.html)

[TypeScript 入门教程](https://ts.xcatliu.com/)

## 自定义工具类型

[Creating Types from Types](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)

### 替换类型中的属性

```typescript
export type ReplaceFieldType<T, K extends keyof T, NewType> = {
  [P in keyof T]: P extends K ? NewType : T[P];
};
```

或者：

```typescript
type Replace<T, K extends keyof T, V> = Omit<T, K> & { [P in K]: V };
```

### 提取类型中的泛型

```typescript
export type ExtractGenericType<T> = T extends infer U ? U : T;
```

```typescript
type Example1 = ExtractGenericType<Promise<string>>; // string
type Example2 = ExtractGenericType<Array<number>>; // number
type Example3 = ExtractGenericType<Set<boolean>>; // boolean
type Example4 = ExtractGenericType<string>; // string
type Example5 = ExtractGenericType<number>; // number
```
