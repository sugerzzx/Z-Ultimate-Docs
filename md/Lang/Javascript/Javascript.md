#### 异步 api

在 Node.js 中，异步 API 通常涉及系统内核完成底层任务，比如文件 I/O 操作、网络通信等。Node.js 的 libuv 库会负责管理事件循环和异步操作，以确保高效执行。

> libuv 是一个跨平台的异步 I/O 库，由 C 语言编写，它为事件驱动的编程提供了一个统一的 API。它最初是为 Node.js 而开发的，但现在已经成为了一个独立的项目，并被许多其他软件项目采用。

而在浏览器中，JavaScript 的异步操作通常由浏览器自身的功能和 Web API 支持，比如 XMLHttpRequest、Fetch API 等。这些 API 提供了浏览器环境下执行异步任务的方法，并且浏览器会利用自己的网络堆栈来处理这些操作，而不是直接依赖系统内核。

## Promise

为什么需要 Promise，因为使用回调函数实现的异步编程，在连续执行两个或者多个异步操作时，会出现回调地狱的问题，代码难以维护和阅读。Promise 是一种更优雅的解决方案，它可以更好地处理异步操作，避免回调地狱的问题。

## queueMicrotask 和 prosess.nextTick

`queueMicrotask` 和 `process.nextTick` 都是用于在事件循环中插入微任务（microtask）的方法，它们的作用是在当前事件循环的末尾执行指定的回调函数。

[queueMicrotask 介绍](https://developer.mozilla.org/zh-CN/docs/Web/API/queueMicrotask)
[Microtask_guide 使用](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_DOM_API/Microtask_guide)

[Node 中的 queuemicrotaskcallback](https://nodejs.org/docs/v20.12.1/api/globals.html#queuemicrotaskcallback)
[Node 中的 processnexttickcallback-args](https://nodejs.org/docs/v20.12.1/api/process.html#processnexttickcallback-args)

### queueMicrotask 和 prosess.nextTick 的执行顺序

在 Node.js 中，`process.nextTick` 的优先级高于 `queueMicrotask`，即 `process.nextTick` 的回调函数会在 `queueMicrotask` 的回调函数之前执行。

[Within Node.js, every time the "next tick queue" is drained, the microtask queue is drained immediately after.](https://nodejs.org/docs/latest/api/process.html#when-to-use-queuemicrotask-vs-processnexttick)

```js
// test.js
const { nextTick } = require("node:process");

Promise.resolve().then(() => console.log(2));
queueMicrotask(() => console.log(3));
nextTick(() => console.log(1));
// Output:
// 1
// 2
// 3
```

但是在 esModule 中,情况会有所不同

```js
// test.mjs
Promise.resolve().then(() => console.log(2));
queueMicrotask(() => console.log(3));
process.nextTick(() => console.log(1));
// Output:
// 2
// 3
// 1
```

[stackoverflow 上也有相关提问](https://stackoverflow.com/questions/70518968/process-nexttick-vs-queuemicrotask-in-commonjs-and-esm-what-is-the-execution-or)

解答：

在 Node.js 中，有几个不同的阶段组成了事件循环。其中，主要包括轮询（poll）、检查（check）、关闭（close）等阶段。在轮询阶段中，会处理 I/O 事件，执行定时器等待时间已到的回调，以及执行 `setImmediate()` 添加的任务。而在检查阶段中，会执行 `setImmediate()` 添加的任务。

在上述示例中，当脚本以 ES 模块（ESM）形式运行时，脚本实际上是在微任务阶段执行的，这是因为 ES 模块的执行被放置在一个微任务中。因此，通过 `queueMicrotask()` 添加的微任务会在当前微任务队列中执行，而此时还没有进行下一个事件循环阶段（例如检查阶段）。因此，无论是否还有 `process.nextTick()` 的回调，这些微任务都会优先执行。

然而，当脚本以 CommonJS 形式运行时，脚本的执行是在轮询阶段进行的。在这种情况下，`process.nextTick()` 的回调会在当前轮询阶段执行完毕后立即执行，而微任务则会在下一个事件循环的微任务阶段执行。因此，无论 `queueMicrotask()` 是否有回调，`process.nextTick()` 的回调都会先执行。

这就解释了为什么在上述示例中，以不同的模块加载方式运行时，输出结果会有所不同。

# JS 模块

## ...

# Executable Code and Execution Contexts(可执行代码和执行上下文)

## Agent

[An agent comprises a set of ECMAScript execution contexts, an execution context stack, a running execution context, an Agent Record, and an executing thread. Except for the executing thread, the constituents of an agent belong exclusively to that agent.An agent's executing thread executes algorithmic steps on the agent's execution contexts independently of other age](https://tc39.es/ecma262/#sec-agents)

[Conceptually, the agent concept is an architecture-independent, idealized "thread" in which JavaScript code runs. Such code can involve multiple globals/realms that can synchronously access each other, and thus needs to run in a single execution thread.](https://html.spec.whatwg.org/multipage/webappapis.html#agents-and-agent-clusters)

根据 ECMAScript 的定义和 HTML 标准的描述，可以总结出 "agent" 概念如下：

1. **概念**：

   - "Agent" 是一个抽象的概念，代表了执行 ECMAScript 代码的环境或执行上下文。
   - 在 ECMAScript 中，一个 "agent" 包含了一组 ECMAScript 执行上下文（execution contexts）、执行上下文栈（execution context stack）、正在运行的执行上下文（running execution context）、Agent 记录（Agent Record）以及一个执行线程（executing thread）。
   - 在 HTML 标准中，"agent" 被理解为一个与体系结构无关、理想化的执行线程，用于运行 JavaScript 代码。这个执行线程允许 JavaScript 代码涉及到多个全局对象（globals）或者执行环境（realms），并且能够同步访问彼此。因此，JavaScript 代码需要在单个执行线程中运行。

2. **特点**：
   - 每个 "agent" 是独立的，拥有自己的一组执行上下文、执行上下文栈等，并且这些组成部分只属于该 "agent"。
   - "Agent" 的概念旨在提供一种理想化的、与体系结构无关的执行环境，使得 JavaScript 代码能够在其中运行，包括涉及多个全局对象（globals）或执行环境（realms）的情况。

综上所述，"agent" 概念是 ECMAScript 和 HTML 标准中描述的一种执行环境或执行上下文，它提供了一种理想化的、独立的执行线程，用于运行 JavaScript 代码，并且能够处理多个全局对象或执行环境之间的同步访问。

## Document Collection

[Private Members in JavaScript](https://www.crockford.com/javascript/private.html)
