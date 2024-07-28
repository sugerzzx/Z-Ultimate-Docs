# 一：VUE2 响应式原理

## 1. 基本概念

### 1.1 MVVM 模式

_MVVM 是 Model-View-ViewModel 的缩写,是一种软件架构模式。它是后端 MVC 架构模式的衍生模式,主要应用于前端开发。_

> Model:模型层,数据
> View:视图层,UI
> ViewModel:连接视图和数据的中间件,做数据绑定,实现了 View 和 Model 的解耦
>
> > 解耦是软件工程中的一个重要概念,是指使系统中的各个模块或组件之间的依赖关系最小化,独立性最大化,便于模块的重构和维护的一种设计思想。

**但其实 VUE2 并不是严格的 MVVM 模式，因为 VUE2 中的 ViewModel 并不是真正的 ViewModel，而是 <a href="#Observer">Observer</a>。**

### 1.2 Object.defineProperty()方法

_`Object.defineProperty()`是 ES5 中的方法,会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象，并且可以定义特定描述符，如_

```js
Object.defineProperties(obj, 'a' {
  value: 37, // 定义了obj对象的a属性值为37
  writable: true // 定义了obj对象的a属性为可写
  enumerable: true // 定义了obj对象的a属性为可枚举
  configurable: true // 定义了obj对象的a属性为可配置
})
```

> 并且，`Object.defineProperty()`方法定义的属性，在默认情况下，不可修改，不可枚举，不可配置(不可删除)。

_除了这些描述，`Object.defineProperty()`方法还可以定义 get 和 set 方法,在访问属性时会触发 get 方法,在设置属性时会触发 set 方法_

```js
let obj = {};
Object.defineProperty(obj, "a", {
  get() {
    console.log("get");
  },
  set(val) {
    console.log("set");
  },
});
console.log(obj.a); // get undefined，因为get方法没有返回值，所以是undefined
obj.a = 1; // set
```

> 注意：get 和 set 方法与 value 和 writable 不能同时存在，否则会报错，因为 get 和 set 方法本质上就是是用来代替 value 和 writable 的。

### 1.3 Object.defineProperty()方法实现页面更新以及响应式原理

```html
<div id="app">{{a}}</div>
<!-- 假设这里是Vue,则页面在渲染时会触发obj.a的get方法 -->

<script>
  let obj = {};
  let temp = "";
  Object.defineProperty(obj, "a", {
    get() {
      console.log("get");
      return temp;
    },
    set(val) {
      // val来自于obj.a = 1的1
      console.log("set");
      temp = val;
      document.getElementById("app").innerHTML = val;
    },
  });
  obj.a = 1; // set
  document.getElementById("app").innerHTML = obj.a; // get
  console.log(obj.a); // get 1
</script>
```

> 通过上面的代码，我们可以看到，当页面加载时，会触发 obj.a 的 get 方法，然后将 temp 的值赋给 div 的 innerHTML，当我们给 obj.a 赋值时，会触发 set 方法，然后将值赋给 temp，然后将 temp 的值赋给 div 的 innerHTML，这样就实现了页面的更新。

### 1.4 Object.defineProperty()方法的封装(defineReactive)

> 由于 temp(下面将改成 val) 变量属于全局变量， 其值可以被直接修改，所以我们需要将 val 变量封装起来，这样 val 就属于 get 和 set 方法的局部变量。

```js
function defineReactive(obj, key, val) {
  // let val;
  // 其实这里定义val运用了闭包,而且可以直接定义在形参里
  val = val || obj[key]; // 如果val不存在,即obj[key]存在且调用时未传val的值，,则将obj[key]赋值给val
  Object.defineProperty(obj, key, {
    get() {
      return val;
    },
    set(newVal) {
      val = newVal;
    },
  });
}

let obj = {};
defineReactive(obj, "a", 1);
console.log(obj.a); // 1
obj.a = 2;
console.log(obj.a); // 2
```

> 其实，这样赋予了数据收集依赖和派发更新的能力。

## 2. VUE2 响应式的具体实现

### 2.1 响应式入口

<a href="#toBottom">传送到：最后一步</a>

<strong id="new">创建 Vue 实例</strong>

```js
// 创建一个Vue实例
const vm = new Vue({
  el: "#app",
  // 只有根组件的data可以是对象，其他组件的data必须是函数
  data: {
    a: 1,
  },
});
```

**根据 VUE 源码，在 new Vue()时，会调用`this._init()`方法**

```js
funtion Vue(option){
  // ...
  // 执行初始化
  this._init(option)
}
```

**然后调用`initState()`**

```js
// ...
Vue.prototype._init = function (option) {
  const vm = this;
  // ...
  // 初始化状态(State)，包括数据响应式、props、methods、data、computed、watch
  initState(vm);
  // ...
};
```

**在 `initState()`中，会调用`initData()`方法，这个方法就是用来初始化数据的，包括数据响应式。**

```js
function initState(vm) {
  const opts = vm.$options;
  if (opts.data) {
    // ...
    // 初始化数据(Data)
    initData(vm);
  }
  // ...
}
```

**`initData()`方法部分源码：**

```js
function initData(vm: Component) {
  // 获取data
  let data = vm.$options.data;
  // 判断data是否为函数,如果是函数,则调用getData方法,如果不是函数,则直接赋值给vm._data
  data = vm._data = typeof data === "function" ? getData(data, vm) : data || {};
  // ...
  const keys = Object.keys(data);
  const props = vm.$options.props;
  const methods = vm.$options.methods;
  let i = keys.length;
  // 遍历data中的数据,判断是否与methods和props中的数据重名,如果重名,则报错
  while (i--) {
    const key = keys[i];
    if (methods && hasOwn(methods, key)) {
      warn(`Method "${key}" has already been defined as a data property.`, vm);
    }
    if (props && hasOwn(props, key)) {
      warn(`The data property "${key}" is already declared as a prop.`, vm);
    }
    // 如果不是保留字段,则调用proxy方法,将data中的数据代理到vm上，并没有将data中的数据变成响应式
    else if (!isReserved(key)) {
      proxy(vm, `_data`, key);
    }
  }
  // observe data
  // 将data中的数据变成响应式，响应式入口
  observe(data, true /* asRootData */);
}
```

**getData()方法部分源码：**

```js
function getData(data: Function, vm: Component): any {
  // #7573 disable dep collection when invoking data getters
  pushTarget(); // 作用是将window.target赋值为vm
  try {
    return data.call(vm, vm); // data.call(vm, vm)的作用是将data中的this指向vm
  } catch (e) {
    handleError(e, vm, `data()`);
    return {};
  } finally {
    popTarget();
  }
}

function pushTarget(target: ?Watcher) {
  targetStack.push(target);
  Dep.target = target;
}
```

**proxy()方法部分源码：**

```js
// proxy(vm, `_data`, key)
function proxy(target: Object, sourceKey: string, key: string) {
  sharedPropertyDefinition.get = function proxyGetter() {
    // this即target,即vm，所以vm.key = vm._data.key，访问vm.key时，实际上是访问vm._data.key
    return this[sourceKey][key];
  };
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}
```

<a href="#new">传送至：New Vue</a>

> proxy()方法将 data 中的数据代理到 vm 上，即 vm.key = vm.\_data.key，访问 vm.key 时，实际上是访问 vm.\_data.key，这样做的目的是让我们在访问 vm.key 时，不需要加上 vm.\_data，这样就方便了我们的使用，即：我们不用写`this.data.key`而只要写`this.key` 。

**<span id="toBottom">总结：经过一系列函数调用，总算来到了响应式入口，即 observe()函数。</span>**

```js
function observe(value, asRootData) {
  // 如果value不是对象或者是VNode实例，则直接返回,即不处理简单类型
  if (!isObject(value) || value instanceof VNode) {
    return;
  }
  let ob;
  // 如果value有__ob__属性且__ob__是Observer的实例，则直接返回
  if (hasOwn(value, "__ob__") && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else {
    // 如果value是数组或者是纯对象，则调用Observer的构造函数
    ob = new Observer(value);
  }
  // 如果是根数据，则直接返回
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob;
}
```

> 通过上面的代码，我们可以看到，如果 value 不是对象或者是 VNode 实例，则直接返回，即不处理简单类型，如果 value 有\_\_ob\_\_ 属性且 \_\_ob\_\_ 是 Observer 的实例，则直接返回，如果 value 是数组或者是纯对象，则**调用 Observer 的构造函数**，如果是根数据，则直接返回。

---

### 2.2 响应式核心

**在 VUE2 中的响应式原理主要分为三个部分，分别是` Observer`、`Dep` 和 `Watcher`。**

#### 2.2.1 <span id="Observer">Observer</span>

_在 VUE2 中，`Observer` 是一个类，它的作用是将一个正常的 `object` 转换为每个层级的属性都是响应式的 object，这个类的实现主要是通过**递归**和 `Object.defineProperty()`方法来实现的。_

```js
class Observer {
  constructor(value) {
    // this指的是observer的实例,即前文的observe方法中的ob
    this.value = value; // ob.value = 原有数据
    // dep是一个Dep的实例，用来收集依赖
    this.dep = new Dep(); // ob.dep = 用于收集依赖的dep对象
    this.vmCount = 0;
    // def函数将Observer的实例赋值给value的__ob__属性
    def(value, "__ob__", this); // data.__ob__ = this
    // 如果value是数组，则调用observeArray方法
    if (Array.isArray(value)) {
      // ...
      // observeArray方法用来遍历数组，然后将数组中的每个元素都转换为响应式的
      observeArray(value);
    } else {
      // walk方法用来遍历对象的每个属性，然后将每个属性都转换为响应式的
      this.walk(value);
    }
  }
}

// walk方法用来遍历对象的每个属性，然后将每个属性都转换为响应式的
walk(obj) {
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    // defineReactive方法用来将对象的每个属性都转换为响应式的
    defineReactive(obj, keys[i]);
    // defineReactive(obj,'a'),将obj的a属性转换为响应式的
    // defineReactive(obj,'b')，将obj的b属性转换为响应式的
  }
}

// observeArray会遍历数组，然后将数组中的每个元素都转换为响应式的
function observeArray(items) {
  for (let i = 0, l = items.length; i < l; i++) {
    // observe方法用来将数组中的每个元素都转换为响应式的
    observe(items[i]);
  }
}
```

##### 1.1 defineReactive()

_在 VUE2 中，`defineReactive` 是一个函数，它的作用是将对象的每个属性都转换为响应式的，它的实现主要是通过 `Object.defineProperty()`方法来实现的，并且其中包含了递归。_

```js
export function defineReactive(
  obj: Object, // data
  key: string, // 属性名，例如a,b
  val: any, // 中间变量
  customSetter?: ?Function,
  shallow?: boolean
) {
  // 创建一个Dep的实例，用来收集依赖，每个数据都有一个Dep的实例
  const dep = new Dep();

  // 获取obj的属性描述符
  const property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }

  // 拿取属性的get和set方法
  const getter = property && property.get;
  const setter = property && property.set;
  // 拿取属性的值
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  // 如果val是对象或者是数组，则递归调用observe方法，将val转换为响应式的
  let childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,

    // get方法用来收集依赖
    get: function reactiveGetter() {
      // 如果属性有getter方法，则调用getter方法，否则直接返回val
      const value = getter ? getter.call(obj) : val;
      // 如果有window.target，则调用dep.depend()方法，用来收集依赖
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value;
    }, // get方法结束

    // set方法用来派发更新
    set: function reactiveSetter(newVal) {
      // 如果属性有getter方法，则调用getter方法，否则直接返回val
      const value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      // 如果新值和旧值相等或者新值和旧值都是NaN，则直接返回
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return;
      }
      if (getter && !setter) return;
      // 如果属性有setter方法，则调用setter方法，否则直接返回val
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      // 如果新值是对象或者是数组，则递归调用observe方法，将新值转换为响应式的
      childOb = !shallow && observe(newVal);
      // 调用dep.notify()方法，通知依赖更新
      dep.notify();
    }, // set方法结束
  });
}
```

**至此，一个属性就具有了收集依赖和派发更新的能力。**

> 在 set 和 get 中为何要借助中间变量 val 呢？因为如果直接使用 `obj[key]`，当读取 `obj[key]`时会返回 `obj[key]`，那么就会再次触发 get 方法，造成无限递归，`set` 同理。

> 由于添加/删除属性时，没有调用 `defineReactive()`方法，所以添加的属性不是响应式的，这也是 Vue2 浅响应的原因，通过 `this.$set()` 方法添加属性弥补这个缺陷.

#### 2.2.2 Dep

_在 VUE2 中，`Dep` 类的作用是收集依赖(`Watcher`)，它的实现主要是通过 `subs` 数组来实现的。_

```js
class Dep {
  constructor() {
    // 用来存放依赖的数组
    this.subs = [];
  }
  // 添加依赖
  addSub(sub) {
    this.subs.push(sub);
  }
  // 移除依赖
  removeSub(sub) {
    remove(this.subs, sub);
  }
  // 收集依赖
  depend() {
    if (window.target) {
      this.addSub(window.target);
    }
  }
  // 通知依赖更新
  notify() {
    // slice()方法复制了一份this.subs的数组，防止在更新时，this.subs的长度发生变化
    const subs = this.subs.slice();
    for (let i = 0; i < subs.length; i++) {
      // 调用每个依赖的update方法
      subs[i].update();
    }
  }
}
```

#### 2.1 remove

_在 VUE2 中，remove 是一个函数，它的作用是移除数组中的某个元素，它的实现主要是通过 splice()方法来实现的。_

```js
function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}
```

#### 2.2.3 Watcher

_在 VUE2 中，`Watcher` 的作用是连接 `Observer` 和 `Dep`。_

```js
class Watcher {
  constructor(vm, expOrFn, cb) {
    // vm是Vue的实例,this指向Watcher的实例
    this.vm = vm;
    // parsePath方法用来解析expOrFn，如果expOrFn是一个函数，则直接返回，如果不是函数，则返回一个函数,expOrFn来自于new Watcher时传入的updateComponent方法
    this.getter = parsePath(expOrFn);
    // cb是回调函数,来自于new Watcher时传入的updateComponent方法
    this.cb = cb;
    this.value = this.get();
  }
  get() {
    window.target = this;
    const vm = this.vm;
    let value = this.getter.call(vm, vm);
    window.target = undefined;
    return value;
  }
  update() {
    // oldValue用来保存旧值,在调用this.cb.call(this.vm, this.value, oldValue)时会用到
    const oldValue = this.value;
    this.value = this.get();
    this.cb.call(this.vm, this.value, oldValue);
  }
}
```

##### 3.1 parsePath

_在 VUE2 中，parsePath 是一个函数，它的作用是将字符串路径转换为数组路径，它的实现主要是通过正则表达式来实现的。_

```js
const bailRE = /[^\w.$]/;

function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }
  const segments = path.split(".");
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return;
      obj = obj[segments[i]];
    }
    return obj;
  };
}
```

# 二：VUE3 响应式原理

## 1. 基本概念

### 1.1 Proxy

_`Proxy`是 ES6 中新增的一个构造函数，它可以用来创建一个代理对象，它的作用是用来拦截对象的操作，比如读取属性、设置属性、删除属性等。_

```js
const obj = {
  a: 1,
};

const proxy = new Proxy(obj, {
  // get方法用来拦截读取属性,target: 目标对象,即obj,key: 属性名
  get(target, key) {
    console.log("get");
    return target[key];
  },
  // set方法用来拦截设置属性
  set(target, key, val) {
    console.log("set");
    target[key] = val;
  },
  // deleteProperty方法用来拦截删除属性
  deleteProperty(target, key) {
    console.log("deleteProperty");
    delete target[key];
  },
});

console.log(proxy.a); // get 1
proxy.a = 2; // set
delete proxy.a; // deleteProperty
```

> 故而,在 vue3 中可以直接删除属性,而不需要使用$delete 方法

### 1.2 Reflect

_`Reflect`是 ES6 中新增的一个对象，它的作用是用来操作对象，它的方法与 Proxy 的方法是一一对应的。_

```js
const obj = {
  a: 1,
};

const proxy = new Proxy(obj, {
  get(target, key) {
    console.log("get");
    return Reflect.get(target, key);
  },
  set(target, key, val) {
    console.log("set");
    return Reflect.set(target, key, val);
  },
  deleteProperty(target, key) {
    console.log("deleteProperty");
    Reflect.deleteProperty(target, key);
  },
});

console.log(proxy.a); // get 1
proxy.a = 2; // set
```

> Reflect 的方法具有更好的性能,因为像 obj.key 这样的操作,在底层会被编译成 Reflect.get(obj, key)这样的操作,所以直接使用 Reflect 的方法,可以减少一次函数调用,提高性能.

---

## 2. VUE3 响应式的具体实现

### 2.1 响应式入口

**在 VUE3 中，响应式入口是 `reactive()`函数。**

```js
function reactive(target) {
  // 如果target不是对象或者是VNode实例，则直接返回
  if (!isObject(target) || target instanceof VNode) {
    return target;
  }
  // 创建一个Proxy的实例
  const observed = new Proxy(target, baseHandlers);
  return observed;
}
```

> 通过上面的代码，我们可以看到，如果 target 不是对象或者是 VNode 实例，则直接返回，如果是对象，则创建一个 Proxy 的实例，然后返回这个实例。

### 2.2 baseHandlers

**在 VUE3 中，baseHandlers 是一个对象，它的作用是用来拦截对象的操作，比如读取属性、设置属性、删除属性等。**

```js
const baseHandlers = {
  // get方法用来拦截读取属性,target: 目标对象,即obj,key: 属性名
  get(target, key) {
    console.log("get");
    // 如果key是__v_isReactive，则直接返回true
    if (key === "__v_isReactive") {
      return true;
    }
    // 如果key是__v_raw，则直接返回target
    if (key === "__v_raw") {
      return target;
    }
    // 如果key是__v_isReadonly，则直接返回false
    if (key === "__v_isReadonly") {
      return false;
    }
    // 如果key是__v_skip，则直接返回true
    if (key === "__v_skip") {
      return true;
    }
    // 如果key是Symbol类型，则直接返回target[key]
    if (typeof key === "symbol") {
      return Reflect.get(target, key);
    }
    // 如果key是内置的Symbol类型，则直接返回target[key]
    if (builtInSymbols.has(key)) {
      return Reflect.get(target, key);
    }
    // 调用get方法，用来收集依赖
    const res = Reflect.get(target, key);
    return res;
  },
  // set方法用来拦截设置属性
  set(target, key, val) {
    console.log("set");
    // 调用set方法，用来派发更新
    const result = Reflect.set(target, key, val);
    return result;
  },
  // deleteProperty方法用来拦截删除属性
  deleteProperty(target, key) {
    console.log("deleteProperty");
    // 调用deleteProperty方法，用来派发更新
    const result = Reflect.deleteProperty(target, key);
    return result;
  },
};
```

### 2.3 effect

**在 VUE3 中，effect 是一个函数，它的作用是用来收集依赖和派发更新。**

```js
function effect(fn, options = {}) {
  // 如果fn是对象，则取出fn中的get方法
  if (fn && typeof fn === "object") {
    fn = fn.get;
  }
  // 创建一个ReactiveEffect的实例
  const effect = createReactiveEffect(fn, options);
  // 如果options.lazy为false，则立即执行effect方法
  if (!options.lazy) {
    effect();
  }
  return effect;
}
```

> 通过上面的代码，我们可以看到，如果 fn 是对象，则取出 fn 中的 get 方法，然后创建一个 ReactiveEffect 的实例，如果 options.lazy 为 false，则立即执行 effect 方法。

### 2.4 createReactiveEffect

**在 VUE3 中，createReactiveEffect 是一个函数，它的作用是创建一个 ReactiveEffect 的实例。**

```js
function createReactiveEffect(fn, options) {
  // 创建一个ReactiveEffect的实例
  const effect = function reactiveEffect(...args) {
    // 如果activeEffect不是ReactiveEffect的实例，则调用run方法
    if (!isEffect(effect)) {
      return options.scheduler ? undefined : fn(...args);
    }
    // 如果activeEffect是ReactiveEffect的实例，则调用run方法
    if (effect.active) {
      return fn(...args);
    }
  };
  // 将options赋值给effect
  effect.options = options;
  // 将effect标记为ReactiveEffect的实例
  effect._isEffect = true;
  // 将effect标记为active
  effect.active = true;
  // 将effect的deps属性赋值为空数组
  effect.deps = [];
  // 将effect的scheduler属性赋值为options.scheduler
  effect.scheduler = options.scheduler;
  return effect;
}
```

### 2.5 run

**在 VUE3 中，run 是一个函数，它的作用是执行 fn 函数，并且收集依赖。**

```js
function run(effect, fn, args) {
  // 如果effect不是ReactiveEffect的实例，则直接执行fn方法
  if (!isEffect(effect)) {
    return fn(...args);
  }
  // 如果effect是ReactiveEffect的实例，则将effect赋值给activeEffect
  if (effect.active) {
    activeEffect = effect;
    return fn(...args);
  }
}
```

### 2.6 track

**在 VUE3 中，track 是一个函数，它的作用是收集依赖。**

```js
function track(target, type, key) {
  // 如果activeEffect不是ReactiveEffect的实例，则直接返回
  if (activeEffect === undefined) {
    return;
  }
  // 将target的depsMap属性赋值给depsMap
  let depsMap = targetMap.get(target);
  // 如果depsMap不存在，则将depsMap赋值为空对象
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  // 将depsMap的get方法赋值给dep
  let dep = depsMap.get(key);
  // 如果dep不存在，则将dep赋值为新的Dep的实例
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }
  // 如果dep中没有activeEffect，则将activeEffect添加到dep中
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect);
    // 将dep添加到activeEffect的deps属性中
    activeEffect.deps.push(dep);
  }
}
```

### 2.7 trigger

**在 VUE3 中，trigger 是一个函数，它的作用是派发更新。**

## ...

---
