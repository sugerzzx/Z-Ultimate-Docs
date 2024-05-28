# 一：初识 Vue3，并对比 Vue2

[Vue3 官方文档](https://cn.vuejs.org/)

## 1. 如何创建一个应用

```js
// Vue2
import Vue from "vue";
import App from "./App.vue";

new Vue({
  // render作用：将App组件渲染到页面上
  render: h => h(App),
}).$mount("#app");
```

> Vue2 中的 Vue 是一个构造函数，通过 new Vue() 创建一个 Vue 实例，然后通过 $mount 方法或者 el 属性将 Vue 实例挂载到页面上。

```js
// Vue3
import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");
```

> Vue3 中的 Vue 是一个对象，通过 createApp() 创建一个 Vue 实例，然后通过 且只能通过 mount 方法将 Vue 实例挂载到页面上。

> 为什么不再需要 render 函数？因为 Vue3 中的 template 会被编译成带有 Block tree 的 render 函数。
>
> > Block tree ：块树，是一个树形结构，每个节点都是一个 Block，Block 是一个组件的渲染逻辑，Block tree 是一个组件的渲染逻辑树。

## 2. data 选项

```js
// Vue2
new Vue({
  data: {
    msg: "hello",
  },
});

// Vue3
createApp({
  data() {
    return {
      msg: "hello",
    };
  },
});
```

> Vue2 中的 data 选项可以是一个对象，也可以是一个函数，但是如果是一个函数，那么这个函数只能是根组件的 data 选项，其他组件的 data 选项必须是一个对象。

> Vue3 中的 data 选项只能是一个函数，而且这个函数必须返回一个对象。

## 3. 响应式原理/监听

> Vue2 中的响应式原理是通过 Object.defineProperty() 来实现的，而且只能监听对象中已经存在的属性，如果需要监听新增的属性，那么需要通过 Vue.set() 来实现。
> Vue3 中的响应式原理是通过 Proxy 来实现的，可以监听对象中不存在的属性，也可以监听数组中的索引和 length 属性。
>
> > 即 Vue2 默认是浅度监听，Vue3 默认是深度监听。

> 因此 Vue2 为数组提供了 7 个变异方法(push、pop、shift、unshift、splice、sort、reverse)，而 Vue3 只提供了 3 个变异方法(push、pop、shift)，Vue3 可以直接通过索引修改数组中的元素。

# 二：组合式 Api

> Vue3 保留了 Vue2 中的选项式 Api，新增了组合式 Api,但是不能将两者混用。

## 1. 为什么选择组合式 Api

> 组合式 Api 可以更加灵活的组合逻辑，而且可以更加方便的复用逻辑,更加适合大型项目。

## 2. 对比组合式 Api 和 选项式 Api

```js
// 选项式 Api
export default {
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    handleClick() {
      this.count++;
    },
  },
  mounted() {
    console.log("mounted");
  },
};
```

```js
// 组合式 Api
import { ref, onMounted } from "vue";
export default {
  // setup()是组合式api的入口
  setup() {
    // setup中的数据默认是非响应式的，如果想要让数据是响应式的，那么需要使用ref函数包装一下,而不需要响应式的数据可以不用ref函数包装,节约了性能
    const count = ref(0);
    const handleClick = () => {
      // ref函数包装的数据，如果想要修改数据，那么需要通过.value来修改
      count.value++;
    };
    onMounted(() => {
      console.log("mounted");
    });

    // setup函数必须返回一个对象,这个对象中的属性和方法会被暴露给模板,而不需要渲染的变量可以不用返回,节约了性能
    return {
      count,
      handleClick,
    };
  },
};
```

> 可以看到,组合式 Api 将 data、methods、mounted 等选项拆分成了独立的函数，这样就可以更加灵活的组合这些函数，而且可以更加方便的复用这些函数。

## 3 组合式 Api(响应式核心)

[官方](https://cn.vuejs.org/api/)

### 3.1 ref()

> ref() 方法来允许我们创建可以使用*任何值类型*的响应式 ref，将传入参数的值包装为一个带 .value 属性的 ref 对象。

```js
// 普通数据
const count = ref(0);

// 对象
const obj = ref({ name: "bar" });
```

> ref 函数返回的对象中的 value 属性是一个响应式的数据，如果想要修改 value 属性的值，那么需要通过 value 属性来修改,但是由于当 ref 在模板中作为顶层属性被访问时，它们会被自动“解包”，所以不需要使用 .value。

> ref 函数可以接收一个参数，这个参数可以是一个普通的数据，也可以是一个对象，如果是一个对象，那么 ref 函数会将这个对象转换成一个响应式的对象，即会用 reactive() 自动转换它的 .value。

```js
// 普通数据
count.value++;

// 对象
obj.value.name = "foo";
```

```html
<!-- 普通数据 -->
<div>{{count}}</div>

<!-- 对象 -->
<div>{{obj.name}}</div>
```

### 3.2 reactive()

> reactive 函数可以将一个普通的对象转换成一个响应式的对象，返回的是一个 Proxy 代理对象，这个代理对象会拦截对象中的所有属性的读取和修改操作。

```js
const obj = { name: "bar" };
const proxy = reactive({ name: "bar" });
```

> reactive 函数返回的对象是一个响应式的对象，如果想要修改这个对象中的属性，那么直接修改即可,而且这个对象和原始对象是不相等的。

```js
proxy.name = "foo";
console.log(obj.name, proxy.name); // foo foo

// 代理对象和原始对象不是全等的
console.log(proxy === raw); // false
```

**reactive 的局限性**

1. reactive 函数只能将对象转换成一个响应式的对象，如果想要将一个普通的数据转换成一个响应式的数据，那么需要使用 ref 函数。

2. 因为 Vue 的响应式系统是通过属性访问进行追踪的，因此我们必须始终保持对该响应式对象的相同引用。这意味着我们不可以随意地“替换”一个响应式对象，因为这将导致对初始引用的响应性连接丢失:

   ```js
   const obj = reactive({ name: "bar" });

   // 这样会丢失响应性连接
   obj = { name: "foo" };
   ```

   同时这也意味着当我们将响应式对象的属性赋值或解构至本地变量时，或是将该属性传入一个函数时，我们会失去响应性：

   ```js
   const obj = reactive({ name: "bar" });

   // 这样会丢失响应性
   const { name } = obj;
   const [name] = obj;
   const name = obj.name;
   callSomeFunction(obj.name);
   const getName = obj => {
     return obj.name;
   };
   ```

   其实这里需要用到<a href="#toRef">toRef()</a>

### 3.3 computed()

> computed 函数可以创建一个计算属性，可以接收一个函数作为参数，computed 函数返回的是一个 ref 对象，这个 ref 对象中的 value 属性才是计算属性的值。

```js
const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`;
});

// 计算属性的值
console.log(fullName.value); // bar foo
```

> computed 函数也可以接收一个对象，那么这个对象中的 get 和 set 属性会作为计算属性的 getter 和 setter 函数。

```js
const fullName = computed({
  get() {
    return `${firstName.value} ${lastName.value}`;
  },
  set(value) {
    const arr = value.split(" ");
    firstName.value = arr[0];
    lastName.value = arr[1];
  },
});
```

### 3.4 watch()

#### 3.4.1 基本

> watch 函数可以监听一个响应式的数据，当这个响应式的数据发生变化时，会执行回调函数。

```js
//组合式 Api
watch(count, (newValue, oldValue) => {
  console.log(newValue, oldValue);
});

// 选项式 Api
watch: {
  count(newValue, oldValue) {
    console.log(newValue, oldValue);
  },
}
```

#### 3.4.2 侦听数据源类型

> 在组合式 Api 中，watch 的第一个参数可以是不同形式的“数据源”：它可以是一个 ref (包括计算属性)、一个响应式对象、一个 getter 函数、或多个数据源组成的数组，但不可以是一个对象的属性值：

```js
// ref
watch(count, (newValue, oldValue) => {
  console.log(newValue, oldValue);
});

// 响应式对象，如果监听的是对象，默认深度监听
watch(obj, (newValue, oldValue) => {
  console.log(newValue, oldValue);
});

// 错误的写法，因为这里相当于监听的是一个String类型的值
watch(obj.name, (newValue, oldValue) => {
  console.log(newValue, oldValue);
});

// 取而代之，使用一个返回该属性的 getter 函数，且不会触发对obj的深度监听
watch(
  () => obj.name,
  (newValue, oldValue) => {
    console.log(newValue, oldValue);
  }
);

// 多个数据源组成的数组
watch([() => obj.name, count], ([newName, newCount], [oldName, oldCount]) => {
  console.log(name, count, oldName, oldCount);
});
```

> 在选项式 Api 中，watch 选项也支持把键设置成用 . 分隔的路径：

```js
export default {
  watch: {
    // 注意：只能是简单的路径，不支持表达式。
    "some.nested.key"(newValue) {
      // ...
    },
  },
};
```

#### 3.4.3 深度监听

_在**组合式 Api** 中，直接给 watch() 传入一个响应式对象，会隐式地创建一个深层侦听器，即：该回调函数在所有嵌套的变更时都会被触发：_

```js
const obj = reactive({
  name: "bar",
  attr: {
    count: 0,
  },
});

watch(obj, (newValue, oldValue) => {
  // 在嵌套的属性变更时触发
  // 注意：`newValue` 此处和 `oldValue` 是相等的
  // 因为它们是同一个对象！
});

obj.attr.count++; // 触发上述的侦听器回调
```

_相比之下，一个返回响应式对象的 getter 函数，只有在返回不同的对象时，才会触发回调：_

```js
watch(
  () => obj.attr.count,
  () => {
    // 仅当 obj.attr.count 被替换时触发
  }
);
```

_你也可以给上面这个例子显式地加上 deep 选项，强制转成深层侦听器_

```js
watch(
  () => obj.attr.count,
  (newValue, oldValue) => {
    // 注意：`newValue` 此处和 `oldValue` 是相等的
    // *除非* obj.attr.count 被整个替换了
  },
  { deep: true }
);
```

> **注意**:深度侦听需要遍历被侦听对象中的所有嵌套的属性，当用于大型数据结构时，开销很大。因此请只在必要时才使用它，并且要留意性能。

_而在**选项式 Api** 中，wacth 默认总是浅层的_

```js
export default {
  watch: {
    someObject: {
      handler(newValue, oldValue) {
        // 注意：在嵌套的变更中，
        // 只要没有替换对象本身，
        // 那么这里的 `newValue` 和 `oldValue` 相同
      },
      deep: true,
    },
  },
};
```

#### 3.4.4 即时回调的侦听器

_通过传入 immediate: true 选项来强制侦听器的回调立即执行_

```js
watch(
  () => obj.attr.count,
  (newValue, oldValue) => {
    console.log(newValue, oldValue);
  },
  { immediate: true }
);
```

### 3.5 watchEffect()

> watchEffect 函数可以监听一个响应式的数据，当这个响应式的数据发生变化时，会执行回调函数，和 watch 函数的区别是，watchEffect 函数不需要指定监听的数据源，它会自动追踪响应式数据的变化，如果响应式数据发生变化，那么就会执行回调函数，且是立即执行的。

```js
const count = ref(0);
watchEffect(() => {
  console.log(count.value);
});
```

### 3.6 readonly()

> readonly 接受一个对象 (不论是响应式还是普通的) 或是一个 ref，返回一个原值的只读代理。

```js
const original = reactive({ count: 0 });

const copy = readonly(original);

watchEffect(() => {
  // 用来做响应性追踪
  console.log(copy.count);
});

// 更改源属性会触发其依赖的侦听器
original.count++;

// 更改该只读副本将会失败，并会得到一个警告
copy.count++; // warning!
```

_通过 readonly() 和 shallowReadonly() 创建的代理都是只读的，因为他们是没有 setter 的。_

## 4. 组合式 Api(响应式进阶)

### 4.1 shallowRef()

> shallowRef 是 ref() 的浅层作用形式，用于创建一个响应式的 ref 对象，但是它不会递归地将其嵌套的属性转换为响应式对象。

```js
const state = shallowRef({ count: 1 });

// 不会触发更改
state.value.count = 2;

// 会触发更改
state.value = { count: 2 };
```

### 4.2 shallowReactive()

> shallowReactive 是 reactive() 的浅层作用形式，用于创建一个响应式的对象，但是它只会对对象的第一层属性进行响应式处理，而不会对嵌套的对象进行处理。这意味着，如果你修改了嵌套对象的属性，那么 Vue 不会检测到这个变化。

```js
const shallowObj = shallowReactive({
  foo: 1,
  nested: {
    bar: 2,
  },
});

// 更改状态自身的属性是响应式的
state.foo++;

// 不是响应式的
state.nested.bar++;
```

### 4.2 shallowReadonly()

> shallowReadonly()只会将对象的第一层属性转换为只读的响应式对象，而不会递归地将所有嵌套属性都转换为只读的响应式对象。而 readonly()会递归地将所有嵌套属性都转换为只读的响应式对象。

```js
const shallowObj = shallowReadonly({
  foo: 1,
  nested: {
    bar: 2,
  },
});

// 更改状态自身的属性会失败，控制台给予警告
state.foo++;

// 可以通过,但是不具有响应式，因为shallowReadonly函数返回的对象本身不是响应式的
state.nested.bar++;
```

### 4.3 toRaw()

> toRaw() 可以返回由 reactive()、readonly()、shallowReactive() 或者 shallowReadonly() 创建的代理对应的原始对象。

```js
const original = { foo: 1 };
const obj = reactive(original);

console.log(obj === original); // false
console.log(toRaw(obj) === original); // true
```

### 4.4 markRaw()

> markRaw() 可以标记一个对象，使其永远不会转换为代理，返回对象本身。

```js
const foo = markRaw({});
console.log(isReactive(reactive(foo))); // false

// 也适用于嵌套在其他响应性对象
const bar = reactive({ foo });
console.log(isReactive(bar.foo)); // false
```

## 5.其他组合式 Api

### 5.1 isRef()

> isRef 函数可以判断一个数据是否是一个 ref 对象，如果是 ref 对象，那么返回 true，否则返回 false。

```js
const count = ref(0);
isRef(count); // true
```

### 5.2 isProxy()

> isProxy 函数可以判断一个数据是否是一个 Proxy 代理对象，如果是 Proxy 代理对象，那么返回 true，否则返回 false。

```js
const obj = reactive({ name: "bar" });
isProxy(obj); // true
```

### 5.3 isReactive()

> isReactive 函数可以检查一个对象是否是由 reactive() 或 shallowReactive() 创建的代理,而不是是否具有响应性，比如 ref 函数创建的对象。

```js
const obj = reactive({ name: "bar" });
isReactive(obj); // true
// 响应式的对象也是一个Proxy代理对象
isProxy(obj); // true
```

### 5.4 isReadonly()

> isReadonly 函数可以判断一个数据是否是一个只读的数据，如果是只读的数据，那么返回 true，否则返回 false。

```js
const obj = reactive({ name: "bar" });
const readonlyObj = readonly(obj);
isReadonly(readonlyObj); // true

// 只读的对象也是一个Proxy代理对象
isProxy(readonlyObj); // true
```

### 5.5 <span id="toRef">toRef()</span>

> 由于直接从 obj 中解构的 name 属性是非响应式的，所以需要使用 toRef 函数将 name 属性转换成一个 ref 对象，这样解构出来的 name 属性才是响应式的。

```js
const obj = reactive({ name: "bar" });
const { name } = obj; // 虽然可以在模板中使用name，但是name是非响应式的
const name = toRef(obj, "name");
```

### 5.6 toRefs()

> toRefs 函数可以将一个响应式的对象转换成一个普通的对象，这个普通的对象中的所有属性都是 ref 对象，这样就可以在模板中使用解构的方式来使用响应式的对象中的属性了。

```js
const obj = reactive({ name: "bar" });
const obj2 = toRefs(obj);
```

### 5.7 unref()

> 如果参数是 ref，则返回内部值，否则返回参数本身。这是 val = isRef(val) ? val.value : val 计算的一个语法糖。

```js
const count = ref(0);

console.log(unref(count)); // 0

console.log(unref(1)); // 1
```

# 三：Vue3 中的生命周期

[Vue3 中的生命周期](https://cn.vuejs.org/api/)

# 四：Vite

## 1. 官网：[Vite](https://cn.vitejs.dev/)

## 2. 小疑惑

**npm init vue@latest 和 npm create vite@latest 创建的基于 Vite 打包工具的 Vue3 项目有什么不同?**

1. npm init vue@latest 是 Vue 官方提供的命令，用于初始化一个 Vue3 项目，基于的打包工具是 Vite。而 npm create vite@latest 则是 Vite 官方提供的命令，用于初始化一个基于 Vite 打包工具的项目，其中包含了多种模板，包括 Vue3 模板。因此，两个命令的功能类似，但是提供者不同，且 npm create vite@latest 提供了更多的模板选择。

2. 在使用 npm init vue@latest 命令创建项目时，会询问是否需要添加 Vue Router 和 Pinia，而 npm create vite@latest 则不会。如果需要在使用 npm create vite@latest 创建的项目中使用 Vue Router 或 Pinia，需要手动安装相应的依赖。

> 因此，想要方便的搭建 Vue 项目，可以使用 npm init vue@latest 命令，如果想要更加灵活的搭建项目，可以使用 npm create vite@latest 命令。

# 五：Pinia

## 1. 安装

```js
npm install pinia
```

## 2. [使用 Pinia](https://pinia.vuejs.org/zh/)

# 六：组合式函数

## 1. 官网：[组合式函数](https://cn.vuejs.org/guide/reusability/composables.html)
