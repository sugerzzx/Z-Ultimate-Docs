# JavaScript

👉 [现代 JavaScript 教程](https://zh.javascript.info/)

👉 [MDN：JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)

👉 [nodejs](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)

## Js 是解释型语言还是编译型语言？

[JavaScript is generally considered an interpreted language, but modern JavaScript engines no longer just interpret JavaScript, they compile it.](https://nodejs.org/en/learn/getting-started/the-v8-javascript-engine#compilation)

JavaScript 通常被认为是一种解释型语言，但是现代 JavaScript 引擎已经不仅仅是解释 JavaScript 代码了，它们对其进行了编译：

1. **解释型语言（Interpreted Language）**：这种语言的代码在运行时逐行被解释器执行，不需要事先编译成机器码。JavaScript 通常被归类为解释型语言，因为它在运行时由浏览器或 Node.js 解释器逐行执行。

2. **编译（Compilation）**：编译是将高级语言代码（如 JavaScript）转换为低级代码（如机器码）的过程。传统上，编译器会在代码执行之前将代码转换为机器码，这样执行时速度更快。编译通常被认为比解释更快，因为编译后的代码直接在计算机上运行，而不需要解释器逐行解释。

3. **现代 JavaScript 引擎（Modern JavaScript Engines）**：主要指浏览器内置的 JavaScript 引擎（如 Chrome 的 V8 引擎、Firefox 的 SpiderMonkey 引擎等）以及 Node.js 中使用的引擎（也通常是 V8）。这些引擎经过了多年的优化和发展，已经不再仅仅解释 JavaScript 代码，而是将其编译成更高效的形式。

### js 如何被编译

1. **即时编译（Just-In-Time Compilation，JIT）**：现代 JavaScript 引擎通常采用 JIT 编译技术。JIT 编译器在运行时分析代码，并将其**部分或全部编译成本地机器码**，以便更快地执行。这使得 JavaScript 代码的执行速度接近于原生的编译语言。

2. **优化技术**：JavaScript 引擎使用各种优化技术来提高代码执行效率，例如内联缓存、逃逸分析、循环优化等。这些技术可以使得 JavaScript 代码在运行时更快地执行，并且更有效地利用计算资源。

3. **多层次编译**：JavaScript 引擎通常采用多层次的编译策略，将 JavaScript 代码从高级别的抽象语法树（AST）逐步转换为低级别的机器码。这种分阶段的编译过程可以更好地适应代码的特征，并生成更优化的机器码。

4. **内存管理优化**：现代 JavaScript 引擎还会对内存管理进行优化，例如使用垃圾回收算法来自动释放不再使用的内存，以减少内存占用和提高性能。
