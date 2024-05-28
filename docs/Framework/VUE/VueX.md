# VueX

## 0.组件之间的通信方式

### 1. props/$emit

> 父组件通过 props 向子组件传递数据，子组件通过 $emit 向父组件传递数据

### 2. \$parent/\$children/\$refs/\$root

> 通过 \$parent/\$children 可以访问父组件/子组件实例,通过 \$refs 可以访问子组件/HTML 元素,通过 \$root 可以访问根组件实例,不推荐

### 3. \$attrs/$listeners

> \$attrs/\$listeners 是 Vue 2.4.0 新增的属性，用于父组件向子组件传递数据，子组件通过 $listeners 监听父组件传递的事件

### 4. provide/inject

> provide/inject 是 Vue 2.2.0 新增的 API，用于父组件向后代组件传递数据，后代组件通过 inject 注入数据,父组件可以提供一个方法，后代组件可以通过这个方法修改父组件的数据，但是自己的数据不会改变，想要修改自己的数据,需要设置一个新的变量来接收父组件的数据，然后修改这个变量的值

在父子间中

```js
provide() {
  return {
    msgToGrandChild: this.msg,
    changeMsg: (newVal) => {
      this.msg = newVal;
    }
  }
},
```

在后代组件中

```js
inject: ['msgToGrandChild', 'changeMsg'],
methods: {
  changeMsgFromGrandChild(newVal) {
    this.changeMsg(newVal);
  }
}
```

### 5. eventBus

> eventBus 是 Vue 的一个实例，可以通过它进行事件的监听和触发，常用于非父子组件之间的通信

在 main.js 中

```js
// 创建了一个全局的事件总线，所有的组件都可以使用它来进行事件的监听和触发
Vue.prototype.$bus = new Vue();
```

在组件中

```js
// 触发事件
this.$bus.$on("event", () => {});
// 监听事件
this.$bus.$emit("event");
```

### 6. vuex

> vuex 是 Vue 的状态管理器，可以实现组件之间的数据共享

## 1. 介绍

> Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它可以解决""多个组件共享状态""的问题，并且提供了一种"集中式"存储管理应用的"所有组件的状态"的方式。Vuex 允许我们在应用的任何地方使用这些状态，并且可以在开发过程中方便地进行调试。

## 2. 安装

```shell
npm install vuex@3 --save // vue2中要安装vuex3
```

## 3.配置

```js
// src/store/index.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 存储数据
    count: 0,
  },
  mutations: {
    // 直接修改数据
    add(state) {
      state.count++;
    },
  },
  actions: {
    // 间接修改数据
    add({ commit }) {
      commit("add");
    },
  },
  getters: {
    // 计算属性
    showNum(state) {
      return "当前最新的数量是【" + state.count + "】";
    },
  },
  // 模块化
  modules: {},
});
```

## 4.使用

```js
// main.js
import store from "./store";

new Vue({
  el: "#app",
  render: h => h(App),
  store,
});
```

```html
<!-- App.vue -->
<template>
  <div id="app">
    <p>{{ $store.state.count }}</p>
    <button @click="add">+</button>
  </div>
</template>
<script>
  export default {
    methods: {
      add() {
        this.$store.commit("add");
      },
    },
  };
</script>
```

## 5.核心概念

### 1.state

> state 是存储数据(状态)的地方，类似于组件中的 data，用于存储组件中需要共享的数据

```js
state: {
  count: 0,
}
```

在组件中使用

```js
this.$store.state.count; // 获取数据/状态
```

尽管你可以直接访问和修改 store.state

```js
this.$store.state.count = 1;
```

但是这只是一个单向操作，当 state 中的数据发生变化时，组件不会重新渲染，所以不推荐这样做

### 2.mutations

> mutations 用于直接修改 state 中的数据，不能包含异步操作，不能包含逻辑代码。
> [为什么必须是同步函数?](https://v3.vuex.vuejs.org/zh/guide/mutations.html#mutation-%E5%BF%85%E9%A1%BB%E6%98%AF%E5%90%8C%E6%AD%A5%E5%87%BD%E6%95%B0)

```js
mutations: {
  add(state) {
    state.count++;
  },
  setCount(state, val) {
    state.count = val;
  },
}
```

在组件中使用

```js
this.$store.commit("add");
this.$store.commit("setCount", 10);
```

### 3.actions

> actions 用于间接修改 state 中的数据，它可以包含异步操作，一般用于发送请求，然后调用 mutations 中的方法修改 state 中的数据。

Action 类似于 mutation，不同在于：

Action 提交的是 mutation，而不是直接变更状态。
Action 可以包含任意异步操作。

```js
actions: {
  // { commit } 是store对象解构
  add({ commit }) {
    commit("add");
  },
  // 或者使用context对象,context是一个与 store 实例具有相同方法和属性的对象
  add(context) {
    context.commit("add");
  },
  setCount({ commit }, val) {
    // 模拟异步操作
    setTimeout(() => {
      // 调用mutations中的方法
      commit("setCount", val);
    }, 1000);

    // 也可以直接调用mutations中的方法
    // commit("setCount", val);
  },
}
```

在组件中使用

```js
this.$store.dispatch("add");
this.$store.dispatch("setCount", 10);
```

### 4.getters

> getters 用于对 store 中的数据进行加工处理形成新的数据，类似于组件中的 computed

```js
getters: {
  showNum(state) {
    return "当前最新的数量是【" + state.count + "】";
  },
}
```

在组件中使用

```js
this.$store.getters.showNum;
```

### 5.modules

> modules 用于将 store 分割成模块，每个模块拥有自己的 state、mutations、actions、getters，类似于组件中的 components

```js
modules: {
  a: {
    namespaced: true, // 开启命名空间,将mutations、actions、getters都变成模块的局部变量
    state: {
      count: 0,
    },
    getters: {
      showNum(state) {
        return "当前最新的数量是【" + state.count + "】";
      },
    },
    mutations: {
      changeCount(state, val) {
        state.count = val;
      },
    },
    actions: {
      changeCount({ commit }, val) {
        setTimeout(() => {
          commit("changeCount", val);
        }, 1000);
      },
    },
  },
  b: {
    state: {},
    mutations: {},
    actions: {},
    getters: {},
  },
}
```

在组件中使用

```js
// a模块
this.$store.state.a.count;
// 加了命名空间后在调用mutations、actions、getters时需要加上模块名
this.$store.getters["a/showNum"];
this.$store.commit("a/add", 10);
this.$store.dispatch("a/add", 10);

// b模块
this.$store.state.b.count;
// 未加命名空间时可以直接调用mutations、actions、getters
this.$store.getters.showNum;
this.$store.commit("add", 10);
this.$store.dispatch("add", 10);
```

## 6.模块化

> 当项目越来越大时，store 中的数据会越来越多，这时候就需要对 store 进行模块化，将 store 分割成模块，每个模块拥有自己的 state、mutations、actions、getters

### 1.目录结构

> 在 src/store 目录下创建 modules 文件夹，用于存放模块，每个模块都是一个 js 文件

```shell
├── src
│   ├── store
│   │   ├── index.js
│   │   ├── modules
│   │   │   ├── moduleA.js
```

### 2.配置

```js
// src/store/modules/moduleA.js
export default {
  state: {},
  mutations: {},
  actions: {},
  getters: {},
};
```

```js
// src/store/index.js
import Vue from "vue";
import Vuex from "vuex";
import moduleA from "./modules/moduleA";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    a: moduleA,
  },
});
```

## 7.辅助函数

> Vuex 提供了 mapState、mapMutations、mapActions、mapGetters 这几个辅助函数，可以帮助我们在组件中快速的访问到 store 中的数据或者方法

### 1.mapState 和 mapGetters

> mapState 和 mapGetters 用于获取 store 中的数据

```js
// src/store/index.js
export default new Vuex.Store({
  state: {
    count: 0,
  },
  getters: {
    showNum(state) {
      return "当前最新的数量是【" + state.count + "】";
    },
  },
});
```

```html
<!-- App.vue -->
<template>
  <div id="app">
    <p>{{ count }}</p>
    <p>{{ showNum }}</p>
  </div>
</template>
<script>
  import { mapState, mapGetters } from "vuex";

  export default {
    computed: {
      ...mapState(["count"]),
      ...mapGetters(["showNum"]),
    },
  };
</script>
```

> 通过实现一个自定义 mapState 函数了解 mapState 的原理

```html
<!-- App.vue -->
<template>
  <div id="app">
    <p>{{ count }}</p>
    <p>{{ showNum }}</p>
  </div>
</template>
<script>
  // 一个自定义mapState函数,参数是一个数组，数组中的每一项都是state中的属性名，返回一个对象，对象中的每一项都是一个函数，函数返回state中的属性值，用到了闭包
  function myMapState(arr) {
    const obj = {};
    arr.forEach(key => {
      obj[key] = function () {
        return this.$store.state[key];
      };
    });
    // 此时，obj的值为{count: ƒ}
    return obj;
  }

  export default {
    computed: {
      ...myMapState(["count"]),
      // 相当于
      // count: function () {
      //   return this.$store.state.count;
      // },
      ...mapGetters(["showNum"]),
    },
  };
</script>
```

### 2.mapMutations 和 mapActions

> mapMutations 和 mapActions 用于获取 store 中的方法

```js
// src/store/index.js
export default new Vuex.Store({
  mutations: {
    add(state) {
      state.count++;
    },
  },
  actions: {
    add({ commit }) {
      commit("add");
    },
  },
});
```

```html
<!-- App.vue -->
<template>
  <div id="app">
    <p>{{ count }}</p>
    <button @click="add">+</button>
  </div>
</template>
<script>
  import { mapState, mapMutations } from "vuex";

  export default {
    computed: {
      ...mapState(["count"]),
    },
    methods: {
      ...mapMutations(["add"]),
      // 相当于
      // add: function () {
      //   this.$store.commit("add");
      // },
    },
  };
</script>
```
