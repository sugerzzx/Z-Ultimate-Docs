# js 事件循环

事件循环是 JavaScript 中的一种运行时机制，它协调调用栈和任务队列之间的交互，确保代码能够以非阻塞的方式执行。

Javascript 是一门同步的单线程语言，即其在某一时刻只能执行一件事情，无论前一个过程需要多长时间完成，后一个过程都必须等待，这会导致程序或页面的阻塞。为了避免阻塞，Javascript 通过将操作转移给运行时环境来实现异步操作，例如浏览器环境中的 Web API 和 Node.js 环境中的 C++ API。当这些异步操作被完成时，相应的回调函数会被入队至任务队列，事件循环会不断检查调用栈是否为空，如果为空，它将从任务队列中出队第一个可运行的任务，放入调用栈中执行。

[The Difference in Event Loop between JavaScript and Node.js](https://wearecommunity.io/communities/aep-js-community/articles/2893?utm_source=article_from_collection&utm_medium=wearecommunity&utm_campaign=open_article_from_collection)

[A Complete Visual Guide to Understanding the Node.js Event Loop](https://www.builder.io/blog/visual-guide-to-nodejs-event-loop)

## Event loops in the HTML standard

_[To coordinate events, user interaction, scripts, rendering, networking, and so forth, user agents must use event loops as described in this section. Each agent has an associated event loop, which is unique to that agent.](https://html.spec.whatwg.org/multipage/webappapis.html#definitions-3)_

### task queues | 任务队列

_An event loop has one or more task queues. A task queue is a set of tasks._

事件循环包含一个或多个任务队列，每个队列中都有一组待执行的任务。
任务队列被描述为集合而不是队列，因为事件循环处理模型不是按照队列的方式处理任务。相反，它从所选队列中抓取第一个可运行的任务，而不是按照队列的顺序逐个出队任务。

_Tasks encapsulate algorithms that are responsible for such work as:_

任务封装了负责以下工作的算法：

1. **事件（Events）**：

   - 事件的分发（dispatching）通常由一个专用的任务完成。这意味着当事件发生时，例如点击事件、键盘事件等，浏览器会调用相应的事件处理程序，并将事件对象传递给它。
   - 并非所有事件都是通过任务队列分发的，许多事件在其他任务执行过程中分发。

2. **解析（Parsing）**：

   - HTML 解析器处理一或多个字节并解析出标记（tokens），然后处理任何生成的标记。这通常是一个任务，用于解析 HTML 内容并将其转换为 DOM 结构。

3. **回调（Callbacks）**：

   - 调用回调函数通常由一个专用的任务完成。例如，当定时器到期时，浏览器会调用相应的回调函数来执行定时器任务。

4. **资源使用（Using a resource）**：

   - 当算法获取资源时，如果获取是以非阻塞方式进行的，则一旦资源的一部分或全部可用，资源的处理就会由一个任务来执行。这通常涉及对获取的资源进行处理和使用。

5. **对 DOM 操作的响应（Reacting to DOM manipulation）**：
   - 一些元素具有在对 DOM 进行操作时触发的任务，例如将元素插入文档时。这些任务通常用于处理与 DOM 操作相关的工作，例如更新页面布局或触发其他事件。

任务是浏览器中执行各种工作的算法的封装。它们负责处理事件分发、解析 HTML、调用回调函数、使用资源以及对 DOM 操作的响应等各种任务。

_Formally, a task is a struct which has:_

1. **任务的形式定义**：

   - 任务被形式化定义为一个结构，其中包含以下几个字段：
     - 步骤（Steps）：指定了任务要执行的工作的一系列步骤。
     - 来源（Source）：任务的来源，用于对相关任务进行分组和序列化。
     - 文档（Document）：与任务关联的文档对象，如果任务不在窗口事件循环中，则为 null。
     - 脚本评估环境设置对象集合（Script Evaluation Environment Settings Object Set）：用于跟踪任务执行期间的脚本评估环境设置的对象集合。
   - 可运行的任务是指其文档要么是 null，要么是完全活动的。

2. **任务源和任务队列的概念**：

   - 任务源用于在标准中区分逻辑上不同类型的任务，以便用户代理能够区分它们。
   - 任务队列由用户代理用于在给定的事件循环中汇总任务源。
   - 每个事件循环中的每个任务源必须与一个特定的任务队列关联。

3. **示例**：
   - 用户代理可以为鼠标和键盘事件分配一个任务队列，为其他任务源分配另一个任务队列。然后，用户代理可以根据事件循环处理模型的规定，在绝大多数时间内优先处理键盘和鼠标事件，以保持界面响应性，但不会让其他任务队列被饿死。这样的设置保证了用户代理永远不会以任何一种任务源的事件顺序处理事件。

任务源和任务队列的概念有助于用户代理将不同类型的任务进行分组和处理，并且在事件循环中协调它们的执行，从而保证了整个系统的稳定性和性能。

### microtask queue | 微任务队列

_The microtask queue is not a task queue._

尽管微任务队列也包含一组待执行的任务，但它不是任务队列的一种形式。
微任务队列是一种特殊的队列，它在每个事件循环迭代的末尾被执行。微任务队列中的任务具有比任务队列中的任务更高的优先级，并且在执行完当前事件循环迭代中的所有宏任务后立即执行

### processing model

[Processing model](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)

## The Node.js Event Loop

_[The event loop is what allows Node.js to perform non-blocking I/O operations — despite the fact that JavaScript is single-threaded — by offloading operations to the system kernel whenever possible.](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick#what-is-the-event-loop)_

### Event Loop 工作原理

逐步理解 Node.js 启动过程及其事件循环如何工作：

1. **初始化:** 当启动 Node.js 应用程序时，它首先会初始化一些内部变量和设置，例如全局对象和模块系统。

2. **处理输入脚本:** 接下来，Node.js 会处理您提供的脚本文件。该脚本可能会包含同步和异步代码。

   - **同步代码:** 同步代码会一行一行地执行，直到完成。在此期间，事件循环会阻塞，不会处理任何其他任务。

   - **异步代码:** 异步代码不会阻塞事件循环。相反，它会将任务委托给其他线程 (例如，操作系统线程) 来处理，然后继续执行后续代码。当异步操作完成时，它会将结果放入事件队列中，通知事件循环进行处理。

3. **事件循环:** 处理完输入脚本后，Node.js 就进入了主循环，即事件循环。事件循环是一个不断运行的程序，它会一直执行以下操作，直到进程退出：

   - **检查事件队列:** 事件队列是一个存储待处理任务的列表。这些任务可能是来自完成的异步操作的回调函数，也可能是使用 `setTimeout` 或 `setInterval`之类的函数 schedulers 的计时器回调函数。

   - **处理队列中的任务:** 事件循环会依次处理队列中的任务，遵循先进先出 (FIFO) 的原则。对于每个任务，它都会调用相应的回调函数来执行相应的操作。

   - **非阻塞 I/O:** 当遇到需要等待外部操作 (例如，网络请求或文件读写) 的 I/O 操作时，Node.js 不会阻塞事件循环。相反，它会将该操作委托给操作系统，然后继续处理其他任务。一旦操作完成，操作系统会通知 Node.js，然后事件循环会将相应的回调函数放入事件队列中以供稍后处理。

   - **空闲阶段:** 如果事件队列为空，并且没有其他待处理的任务，事件循环会进入空闲阶段。在空闲阶段，事件循环会等待 I/O 事件或计时器超时事件的通知。

```
一个简化的事件循环操作顺序流程图
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```

> 每个方块都被称为事件循环中的一个“**阶段**”

每个**阶段**都有一个遵循先进先出 (FIFO) 原则的**回调队列**。事件循环依次处理这些阶段，每个阶段都会先执行该阶段特有的操作，然后依次处理队列中的回调函数，直到队列为空或达到最大回调处理限制。一旦处理完该阶段的队列，事件循环就会进入下一个阶段，继续按照同样的方式执行。

#### 阶段概述

1. **timers（定时器）**：

   - 在这个阶段，执行由 `setTimeout()` 和 `setInterval()` 安排的回调函数。

2. **pending callbacks（挂起回调）**：

   - 在上一个循环迭代中被延迟到下一个循环迭代的 I/O 回调函数被执行。

3. **idle、prepare**：

   - 这两个阶段通常只在内部使用，不对用户代码可见。

4. **poll（轮询）**：

   - 在这个阶段，Node.js 会检索新的 I/O 事件。大多数 I/O 相关的回调函数（除了被定时器安排的、以及 `setImmediate()` 安排的）都会在这个阶段执行。
   - 当没有任何计划的定时器和 `setImmediate()` 回调时，Node.js 将在这里阻塞，等待事件的到来。

5. **check（检查）**：

   - `setImmediate()` 回调函数在这个阶段被调用。

6. **close callbacks（关闭回调）**：
   - 一些关闭事件的回调函数在这个阶段被执行，例如 `socket.on('close', ...)`。

#### process.nextTick

1. **`process.nextTick()` 不是事件循环的一部分**：

   - 尽管 `process.nextTick()` 是异步 API 的一部分，但它并不是严格意义上事件循环的一部分。它是在事件循环的特定阶段之后执行的。

2. **`process.nextTick()` 的执行时机**：

   - 当调用 `process.nextTick()` 时，它的回调函数会在当前**操作**（transition）完成后立即执行，而不受事件循环当前阶段的影响。这个**操作**通常是从底层的 C/C++ 处理程序转换为执行所需的 JavaScript。

3. **`process.nextTick()` 的影响**：
   - 在给定的事件循环阶段中调用 `process.nextTick()` 时，所有传递给 `process.nextTick()` 的回调都会在事件循环继续之前解析。这可能会导致一些问题，因为它允许您通过递归调用 `process.nextTick()` 来“饿死”您的 I/O，这会阻止事件循环进入轮询阶段。
