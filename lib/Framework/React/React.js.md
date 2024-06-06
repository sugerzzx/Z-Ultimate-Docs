# React

## UI

### React 渲染机制

React 的渲染机制是其核心之一，理解这个机制对于有效地使用 React 是至关重要的。React 通过 Virtual DOM 来管理和优化对真实 DOM 的操作，这是其渲染机制的核心概念之一。下面是 React 的渲染机制的基本原理：

1. **Virtual DOM（虚拟 DOM）：** Virtual DOM 是 React 的核心概念之一。它是一个轻量级的 JavaScript 对象树，用来表示真实 DOM 的层次结构。当状态发生变化时，React 并不直接操作真实的 DOM，而是先在内存中构建一个新的 Virtual DOM 树，然后通过比较新旧 Virtual DOM 树的差异（称为协调），找出需要更新的部分，最后只更新实际发生变化的部分到真实 DOM 中。

2. **Reconciliation（协调）：** React 通过一种称为协调的过程来比较新旧 Virtual DOM 树的差异。它会逐层比较两棵树的节点，找出需要更新的部分。React 使用一种称为“Diff 算法”的优化技术来尽可能地减少比较的次数和更新的操作，从而提高性能。

3. **组件更新：** 当组件的状态或属性发生变化时，React 会触发重新渲染。React 会调用组件的 render() 方法来计算组件的新的 Virtual DOM 表示，并与旧的 Virtual DOM 进行比较。如果有变化，则 React 会更新实际的 DOM 来反映这些变化。

4. **批处理更新：** React 会将多个状态更新合并成一个批处理操作，从而减少不必要的渲染。例如，如果多次连续调用了 setState()，React 会将这些更新合并成一个单独的更新操作，以减少渲染的次数。

5. **异步更新：** 在大多数情况下，React 会将状态更新操作放入一个队列中，然后在适当的时机进行批量处理和更新。这样可以提高性能，并确保更新的一致性。例如，React 可以将多个状态更新操作合并成一个批处理更新，或者在浏览器空闲时执行更新操作。

总的来说，React 的渲染机制通过 Virtual DOM 和协调技术实现了高效的 DOM 更新，从而提高了应用程序的性能和用户体验。理解 React 的渲染机制有助于开发者编写更高效、更可靠的 React 应用程序。

### react 是如何将 jsx 编译成 dom 的

当编写 React 应用程序时，通常会使用 JSX（JavaScript XML）来描述 UI 的结构。JSX 看起来像是 HTML，但实际上是 JavaScript 的语法扩展，它允许你在 JavaScript 中直接编写 XML 格式的代码，这样可以更直观、更易读地描述 UI 结构。

然而，浏览器无法直接理解 JSX，因此在编译过程中，JSX 会被转换成普通的 JavaScript 代码，这个过程被称为 JSX 编译。在 React 中，通常会使用 Babel 来进行 JSX 的编译。Babel 是一个 JavaScript 编译器，可以将高级 JavaScript 代码转换成低级的 JavaScript 代码，使得它们能够在不同的环境中运行。

下面是 JSX 编译的基本步骤：

1. **解析：** 首先，Babel 会将 JSX 代码解析成抽象语法树（AST），这个过程类似于将普通的 JavaScript 代码解析成 AST。

2. **转换：** 接下来，Babel 会对 AST 进行转换，将 JSX 元素转换成对应的 JavaScript 函数调用。例如，将 `<div>` 元素转换成 `React.createElement('div', ...)`。

3. **生成：** 最后，Babel 会将转换后的 JavaScript 代码生成为可执行的 JavaScript 代码，这样浏览器就可以理解并执行这段代码了。

在 React 应用程序中，当 JSX 代码被编译成普通的 JavaScript 代码后，React 会根据这些代码来创建 Virtual DOM 对象。然后，React 使用 Virtual DOM 来管理和渲染 UI，最终将 UI 渲染到实际的 DOM 上。这个过程发生在组件被渲染时，以及在状态或属性发生变化时需要更新组件时。

总的来说，JSX 编译是将 JSX 代码转换成普通的 JavaScript 代码的过程，这样可以让浏览器理解和执行 JSX 代码，并且在 React 应用程序中通过 Virtual DOM 实现高效的 UI 渲染。

### 保持组件纯粹

在 React 中，“Keeping Components Pure”指的是保持组件的纯净性或纯函数性。纯函数是指在相同的输入下始终返回相同的输出，并且不产生副作用的函数。

在 React 中，建议尽可能地编写纯净的组件。这意味着组件的渲染结果仅由它的 props 和 state 决定，而不受其他因素影响。这样做有几个好处：

1. **可预测性和可维护性：** 纯净的组件更容易理解，因为它们的行为完全取决于输入，而不受外部因素影响。这使得在组件中发现错误和调试变得更加容易。

2. **性能优化：** React 使用 Virtual DOM 进行高效的 DOM 更新。纯净的组件可以更容易地进行优化，因为它们的渲染结果更可预测，React 可以更有效地进行比较和更新 DOM。

3. **可重用性：** 纯净的组件更容易被复用，因为它们的行为不依赖于外部状态。这使得组件更加灵活，可以在不同的上下文中使用。

为了保持组件的纯净性，你应该避免在组件内部进行以下操作：

- 直接修改 props 或 state
- 发起网络请求或执行其他副作用操作
- 使用全局变量
- 直接操作 DOM

相反，你应该在 render() 函数中根据 props 和 state 来计算组件的渲染结果，并尽量避免在生命周期方法之外进行任何操作。这样可以确保组件的行为是可预测的，并且更容易进行测试和调试。

## Hook

### useState

`useState Hook` 提供了两个功能：

1. State 变量 用于保存渲染间的数据。
2. State setter 函数 更新变量并触发 React 再次渲染组件。

#### React Hooks: not magic, just arrays

"React Hooks: not magic, just arrays" 是对 React Hooks 工作原理的一种简洁的描述。这句话的意思是，React Hooks 并不是通过某种神秘的机制工作的，它们实际上是通过数组来管理和跟踪状态和副作用的。

当你在组件中使用`useState`或`useEffect`等 Hook 时，React 会在内部为这些 Hook 创建一个数组。每个 Hook 调用都会有一个对应的位置（索引）在这个数组中。这就是为什么 Hook 的调用顺序和次数在每次渲染中都必须保持一致的原因。如果你在条件语句或循环中调用 Hook，可能会打乱这个顺序，导致错误。

例如，当你这样使用`useState`时：

```javascript
const [count, setCount] = useState(0);
const [text, setText] = useState("hello");
```

React 在内部可能会有这样一个数组：`[0, 'hello']`，第一个元素对应`count`，第二个元素对应`text`。当你调用`setCount`或`setText`时，React 会知道要更新数组中的哪个元素。

所以，React Hooks 并不神秘，它们只是使用了数组来管理和跟踪状态和副作用。

这个例子没有使用 React，但它让你了解 useState 在内部是如何工作的：

```jsx
let componentHooks = [];
let currentHookIndex = 0;

// useState 在 React 中是如何工作的（简化版）
function useState(initialState) {
  let pair = componentHooks[currentHookIndex];
  if (pair) {
    // 这不是第一次渲染
    // 所以 state pair 已经存在
    // 将其返回并为下一次 hook 的调用做准备
    currentHookIndex++;
    return pair;
  }

  // 这是我们第一次进行渲染
  // 所以新建一个 state pair 然后存储它
  pair = [initialState, setState];

  function setState(nextState) {
    // 当用户发起 state 的变更，
    // 把新的值放入 pair 中
    pair[0] = nextState;
    updateDOM();
  }

  // 存储这个 pair 用于将来的渲染
  // 并且为下一次 hook 的调用做准备
  componentHooks[currentHookIndex] = pair;
  currentHookIndex++;
  return pair;
}

function Gallery() {
  // 每次调用 useState() 都会得到新的 pair
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  // 这个例子没有使用 React，所以
  // 返回一个对象而不是 JSX
  return {
    onNextClick: handleNextClick,
    onMoreClick: handleMoreClick,
    header: `${sculpture.name} by ${sculpture.artist}`,
    counter: `${index + 1} of ${sculptureList.length}`,
    more: `${showMore ? "Hide" : "Show"} details`,
    description: showMore ? sculpture.description : null,
    imageSrc: sculpture.url,
    imageAlt: sculpture.alt,
  };
}

function updateDOM() {
  // 在渲染组件之前
  // 重置当前 Hook 的下标
  currentHookIndex = 0;
  let output = Gallery();

  // 更新 DOM 以匹配输出结果
  // 这部分工作由 React 为你完成
  nextButton.onclick = output.onNextClick;
  header.textContent = output.header;
  moreButton.onclick = output.onMoreClick;
  moreButton.textContent = output.more;
  image.src = output.imageSrc;
  image.alt = output.imageAlt;
  if (output.description !== null) {
    description.textContent = output.description;
    description.style.display = "";
  } else {
    description.style.display = "none";
  }
}

let nextButton = document.getElementById("nextButton");
let header = document.getElementById("header");
let moreButton = document.getElementById("moreButton");
let description = document.getElementById("description");
let image = document.getElementById("image");
let sculptureList = [
  {
    name: "Homenaje a la Neurocirugía",
    artist: "Marta Colvin Andrade",
    description:
      "Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.",
    url: "https://i.imgur.com/Mx7dA2Y.jpg",
    alt: "A bronze statue of two crossed hands delicately holding a human brain in their fingertips.",
  },
  {
    name: "Floralis Genérica",
    artist: "Eduardo Catalano",
    description:
      "This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.",
    url: "https://i.imgur.com/ZF6s192m.jpg",
    alt: "A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens.",
  },
  {
    name: "Eternal Presence",
    artist: "John Woodrow Wilson",
    description:
      'Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as "a symbolic Black presence infused with a sense of universal humanity."',
    url: "https://i.imgur.com/aTtVpES.jpg",
    alt: "The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity.",
  },
  {
    name: "Moai",
    artist: "Unknown Artist",
    description: "Located on the Easter Island, there are 1,000 moai, or extant monumental statues, created by the early Rapa Nui people, which some believe represented deified ancestors.",
    url: "https://i.imgur.com/RCwLEoQm.jpg",
    alt: "Three monumental stone busts with the heads that are disproportionately large with somber faces.",
  },
  {
    name: "Blue Nana",
    artist: "Niki de Saint Phalle",
    description:
      "The Nanas are triumphant creatures, symbols of femininity and maternity. Initially, Saint Phalle used fabric and found objects for the Nanas, and later on introduced polyester to achieve a more vibrant effect.",
    url: "https://i.imgur.com/Sd1AgUOm.jpg",
    alt: "A large mosaic sculpture of a whimsical dancing female figure in a colorful costume emanating joy.",
  },
  {
    name: "Ultimate Form",
    artist: "Barbara Hepworth",
    description:
      "This abstract bronze sculpture is a part of The Family of Man series located at Yorkshire Sculpture Park. Hepworth chose not to create literal representations of the world but developed abstract forms inspired by people and landscapes.",
    url: "https://i.imgur.com/2heNQDcm.jpg",
    alt: "A tall sculpture made of three elements stacked on each other reminding of a human figure.",
  },
  {
    name: "Cavaliere",
    artist: "Lamidi Olonade Fakeye",
    description: "Descended from four generations of woodcarvers, Fakeye's work blended traditional and contemporary Yoruba themes.",
    url: "https://i.imgur.com/wIdGuZwm.png",
    alt: "An intricate wood sculpture of a warrior with a focused face on a horse adorned with patterns.",
  },
  {
    name: "Big Bellies",
    artist: "Alina Szapocznikow",
    description:
      "Szapocznikow is known for her sculptures of the fragmented body as a metaphor for the fragility and impermanence of youth and beauty. This sculpture depicts two very realistic large bellies stacked on top of each other, each around five feet (1,5m) tall.",
    url: "https://i.imgur.com/AlHTAdDm.jpg",
    alt: "The sculpture reminds a cascade of folds, quite different from bellies in classical sculptures.",
  },
  {
    name: "Terracotta Army",
    artist: "Unknown Artist",
    description:
      "The Terracotta Army is a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. The army consisted of more than 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses.",
    url: "https://i.imgur.com/HMFmH6m.jpg",
    alt: "12 terracotta sculptures of solemn warriors, each with a unique facial expression and armor.",
  },
  {
    name: "Lunar Landscape",
    artist: "Louise Nevelson",
    description:
      "Nevelson was known for scavenging objects from New York City debris, which she would later assemble into monumental constructions. In this one, she used disparate parts like a bedpost, juggling pin, and seat fragment, nailing and gluing them into boxes that reflect the influence of Cubism’s geometric abstraction of space and form.",
    url: "https://i.imgur.com/rN7hY6om.jpg",
    alt: "A black matte sculpture where the individual elements are initially indistinguishable.",
  },
  {
    name: "Aureole",
    artist: "Ranjani Shettar",
    description:
      'Shettar merges the traditional and the modern, the natural and the industrial. Her art focuses on the relationship between man and nature. Her work was described as compelling both abstractly and figuratively, gravity defying, and a "fine synthesis of unlikely materials."',
    url: "https://i.imgur.com/okTpbHhm.jpg",
    alt: "A pale wire-like sculpture mounted on concrete wall and descending on the floor. It appears light.",
  },
  {
    name: "Hippos",
    artist: "Taipei Zoo",
    description: "The Taipei Zoo commissioned a Hippo Square featuring submerged hippos at play.",
    url: "https://i.imgur.com/6o5Vuyu.jpg",
    alt: "A group of bronze hippo sculptures emerging from the sett sidewalk as if they were swimming.",
  },
];

// 使 UI 匹配当前 state
updateDOM();
```

#### batching in React

React 通过一种叫做“事务”（Transaction）的机制来实现状态更新的批处理。**事务机制可以确保在事件处理函数中的所有代码都运行完毕后再处理状态更新**，从而避免不必要的重复渲染和提高性能。

当事件处理函数中调用 `setState()` 来更新组件的状态时，React 并不会立即进行状态更新，而是将状态更新操作放入一个待处理的队列中。随后，React 会在适当的时机（通常是在当前 JavaScript 执行栈执行完毕后）开始处理这个队列中的状态更新操作。

具体来说，React 在执行状态更新时会进行以下操作：

1. **收集更新操作：** 当调用 `setState()` 时，React 会将更新操作（即状态的变化）收集起来，并将它们放入一个待处理的队列中。

2. **事务处理：** 在合适的时机，React 会启动一个事务（Transaction），在事务中会批量处理队列中的状态更新操作。这个过程确保了在同一个事务中，所有的更新操作都被一起处理，而不是分散到不同的 JavaScript 执行栈中。

3. **调度更新：** 一旦状态更新被调度，React 会重新渲染受影响的组件，并将新的状态应用到实际的 DOM 中。这个过程通过协调算法来比较新旧状态，确定哪些组件需要更新，并最终更新实际的 DOM。

通过这种批处理的方式，React 可以尽量减少不必要的重复渲染，提高性能，并确保更新的一致性。同时，这种机制也确保了事件处理函数中的所有代码都执行完毕后再处理状态更新，避免了在更新过程中出现意外的情况。

### useRef

`useRef` Hook 用于在函数组件中创建一个可变的引用。它返回一个包含 `current` 属性的对象，该属性可以存储任意值，并且在组件的多次渲染之间保持不变。

## TODO

直接嵌套的子组件会随父组件 re-render 而 re-render,但是通过 children 传递的子组件不会随父组件 re-render 而 re-render
