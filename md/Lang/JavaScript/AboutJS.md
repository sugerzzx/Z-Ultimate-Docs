# JavaScript

👉 [现代 JavaScript 教程](https://zh.javascript.info/)

👉 [MDN：JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)

👉 [nodejs](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)

## Js 是解释型语言还是编译型语言？

[JavaScript is generally considered an interpreted language, but modern JavaScript engines no longer just interpret JavaScript, they compile it.](https://nodejs.org/en/learn/getting-started/the-v8-javascript-engine#compilation)

[What's in an Interpretation?](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch1.md#whats-in-an-interpretation)

JavaScript 通常被认为是一种解释型语言，但是现代 JavaScript 引擎已经不仅仅是解释 JavaScript 代码了，它们对其进行了编译：

1. **解释型语言（Interpreted Language）**：这种语言的代码在运行时逐行被解释器执行，不需要事先编译成机器码。JavaScript 通常被归类为解释型语言，因为它在运行时由浏览器或 Node.js 解释器逐行执行。

2. **编译（Compilation）**：编译是将高级语言代码（如 JavaScript）转换为低级代码（如机器码）的过程。传统上，编译器会在代码执行之前将代码转换为机器码，这样执行时速度更快。编译通常被认为比解释更快，因为编译后的代码直接在计算机上运行，而不需要解释器逐行解释。

3. **现代 JavaScript 引擎（Modern JavaScript Engines）**：主要指浏览器内置的 JavaScript 引擎（如 Chrome 的 V8 引擎、Firefox 的 SpiderMonkey 引擎等）以及 Node.js 中使用的引擎（也通常是 V8）。这些引擎经过了多年的优化和发展，已经不再仅仅解释 JavaScript 代码，而是将其编译成更高效的形式。

### 现代 js 为何被认为是编译型语言

#### 1. **JS 代码经过解析和编译阶段**

- 现代 JavaScript 引擎会对源代码进行解析（parsing）并生成抽象语法树（AST），然后将其转换为一种优化的中间字节码（或二进制形式），并交由虚拟机（VM）执行。这一过程类似于编译型语言中先通过解析生成中间表示，再生成最终可执行代码的做法。

#### 2. **编译后的优化**

- 在 JS 引擎解析源代码并生成字节码后，JS 引擎通常会进行多次 JIT（即时编译）优化。这种优化将字节码转化为更加高效的代码，减少执行时的性能开销。这种 JIT 优化过程和传统编译型语言的编译过程类似，都是在代码执行之前对其进行优化。

#### 3. **JS 的静态错误检测**

- JavaScript 通过解析阶段（解析代码为 AST）来捕捉静态错误（如语法错误）。这种错误在代码执行前就能被发现，这与传统的解释型语言不同，解释型语言通常是在执行时才发现错误。

#### 4. **JS 执行方式的多次转换**

- JavaScript 引擎将源代码转换为 AST、字节码，再通过 JIT 编译器进行进一步优化，最终才交给虚拟机执行。这一多步的处理流程和传统编译型语言的流程相似——先经过编译，最终才执行。

所以，现代 js 不像传统的解释型语言那样是逐行解释执行的，而是经过解析、编译（转为字节码或其他中间表示）并经过优化后才执行。因此，尽管 JavaScript 最终并不生成独立的二进制可执行文件，但其执行模型在本质上与编译型语言更为相似。

### js 如何被编译

1. **即时编译（Just-In-Time Compilation，JIT）**：现代 JavaScript 引擎通常采用 JIT 编译技术。JIT 编译器在运行时分析代码，并将其**部分或全部编译成本地机器码**，以便更快地执行。这使得 JavaScript 代码的执行速度接近于原生的编译语言。

2. **优化技术**：JavaScript 引擎使用各种优化技术来提高代码执行效率，例如内联缓存、逃逸分析、循环优化等。这些技术可以使得 JavaScript 代码在运行时更快地执行，并且更有效地利用计算资源。

3. **多层次编译**：JavaScript 引擎通常采用多层次的编译策略，将 JavaScript 代码从高级别的抽象语法树（AST）逐步转换为低级别的机器码。这种分阶段的编译过程可以更好地适应代码的特征，并生成更优化的机器码。

4. **内存管理优化**：现代 JavaScript 引擎还会对内存管理进行优化，例如使用垃圾回收算法来自动释放不再使用的内存，以减少内存占用和提高性能。
