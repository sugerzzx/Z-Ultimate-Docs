# VueRouter

## 1. 安装

```shell
npm install vue-router@3 # Vue2中要指定为版本3
```

## 2. 使用

### 2.1. 在`main.js`中导入路由并使用

```js
// 导入路由
import VueRouter from "vue-router";
// 注册路由
Vue.use(VueRouter);
// 创建路由对象
const router = new VueRouter({
  // routes数组中的每一个对象就是一条路由规则，每一个路由规则都是一个对象
  routes: [
    {
      // path表示路径,当浏览器地址栏中的地址和path匹配成功，就会展示component中的组件.'/':表示根路径，当浏览器地址栏中的地址为根路径时，默认展示此组件
      path: "/",
      // component表示组件，这个组件就是路由规则所匹配到的组件，这个组件会展示到router-view中
      component: RouterHome,
    },
    {
      path: "/about",
      // 懒加载，当路由被访问的时候才加载对应组件
      // component: () => import("./components/RouterAbout.vue"),
    },
    // meta表示元数据，可以在路由规则中添加任意的数据，可以在组件中通过this.$route.meta获取
    meta: {
      title: "首页",
      permissions: ["admin", "user"]
    }
  ],
});
```

> 也可以新建 router 文件夹再新建 router.js 专门存放上面代码然后导出 router 对象

### 2.2 在你的导航 Navi 中，如`App.vue`中使用`<router-link>`标签实现跳转交互和`<router-view>`标签实现页面呈现

```html
<!-- router-link是vue-router提供的组件，用于路由跳转，to属性指定跳转的路径，类似于a标签的href属性和小程序的navigator组件-->
<router-link to="/">Home</router-link>

<!-- router-view是vue-router提供的组件，用于显示当前路由组件-->
<router-view></router-view>
```

### 2.3 使用其他标签通过`this.$router`的相关方法实现跳转

```html
<button @click="navi('/')">To Where</button> // 通过点击事件触发navi方法
```

```js
methods: {
  navi(path) {
    // 路由跳转
    // this.$router.push(path)
    // 路由替换
    // this.$router.replace(path)
    // 解决路由重复点击报错的问题
    if (this.$route.path !== path) {
    this.$router.push(path)
    }
    //或者
    // this.$router.push(path).catch(err => err)
  }
}
```

- `push`方法会在"路由链"末尾添加当前`path`，可以通过浏览器右上角点击后退

- `replace`方法会替换当前`path`，不会在"路由链"末尾添加当前`path`，也就是说，通过`replace`方法跳转后，浏览器右上角点击后退，不会回到当前`path`，而是回到上一个`path`

## 3. 路由传参(动态路由匹配)

### 3.1 参数的传递

#### 1.1 VueRouter 配置

- 通过 `params` 传参

  ```js
  {
    // 动态路由，:id表示占位符，可以匹配任意字符，匹配到的字符会被赋值给id，id可以在组件中通过this.$route.params.id获取，也可以在组件中通过props接收
    path: "/test1/:id",
    component: RouterTest1,
    // props: true表示开启props接收路由参数。
    props: true,
  },
  ```

- 通过`query`传参

  ```js
  {
    // query传参，?后面的参数就是query传参，可以传多个参数，参数之间用&隔开，可以在组件中通过this.$route.query获取，也可以在组件中通过props接收，
    path: "/test2",
    component: RouterTest2,
  },
  ```

#### 1.2 在导航页面中

```html
<!-- 通过 params 传参 -->
<router-link to="'/test1/' + params">To Where</router-link>
<!-- 通过 query 传参 -->
<router-link to="/test2?name=zs&age=18">To Where</router-link>
<!-- 或者使用了编程式导航: this.$router.push("/test1/" + params) -->
```

### 3.2 参数的接收(在对应的组件中)

```js
// 通过 this.$route.params.id获取路由参数
this.$route.params.id;
// 通过 this.$route.query获取路由参数
this.$route.query;
```

```js
// 当使用了 props 接收路由参数后，路由参数就不会再通过 this.$route.params.id获取，而是通过props接收
props: ["id"],
// 通过props接收路由参数
const id = this.id
```

## 4. 二级路由

### 4.1 VueRouter 配置

> 要在嵌套的出口中渲染组件，需要在 VueRouter 的参数中使用 children 配置

```js
{
  path: "/nest",
    component: Nest,
      // 二级路由
      children: [
        {
          // 子路由不加 / ，表示相对路径，路由时需要完整路径，加 / 会被当作根路径,路由时无须设置嵌套的路径，如果为空，表示默认子路由
          path: "",
          component: Children1,
        },
        {
          path: "/children2",
          component: RouterAboutContact,
        },
      ],
},
```

### 4.2 导航

```html
<router-link to="/nest/">To Where</router-link>
<router-link to="/children2">To Where</router-link>
```

## 5. 重定向

### 5.1 VueRouter 配置

> 这里的配置实现了当用户以/index 的路径访问时，自动跳转到/home 的路径

```js
{
   path: "/index",
   // 重定向
   redirect: "/home",
},
```

> 重定向的目标也可以是一个命名的路由：

```js
const router = new VueRouter({
  routes: [{ path: "/a", redirect: { name: "foo" } }],
});
```

> 甚至是一个方法，动态返回重定向目标：

```js
const router = new VueRouter({
  routes: [
    {
      path: "/a",
      rediract: to => {
        // 方法接收目标路由作为参数
        // return 至重定向的字符串路径/路径对象
      },
    },
  ],
});
```

**注意导航守卫并没有应用在跳转路由上，而仅仅应用在其目标上。为 /a 路由添加一个 beforeEnter 守卫并不会有任何效果。**

## 6. 路由守卫

### 6.1 全局守卫

```js
// 全局前置守卫
router.beforeEach((to, from, next) => {
  // to:即将要进入的目标路由对象
  // from:当前导航即将要离开的路由对象
  // next:调用该方法后，才能进入下一个钩子
  // next()进入下一个钩子，next('/path')进入指定的钩子
  next();
});
// 全局后置守卫
router.afterEach((to, from) => {
  // to:即将要进入的目标路由对象
  // from:当前导航即将要离开的路由对象
});
```

### 6.2 路由独享守卫

```js
{
   path: "/page",
   component: RouterTest1,
   // 路由独享守卫
   beforeEnter: (to, from, next) => {
      next()
   },
},
```

### 6.3 组件内守卫

```js
export default {
   // 组件内守卫的钩子函数和全局守卫的钩子函数一样，只不过是在组件内部定义的
   beforeRouteEnter(to, from, next) {
      // 在路由进入前调用
      next()
   },
   beforeRouteUpdate(to, from, next) {
      // 在当前路由改变，但是该组件被复用时调用
      // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
      next()
   },
   beforeRouteLeave(to, from, next) {
      // 在当前路由离开时调用
      next()
   },
},
```

## 7. Nprogress 使用

> Nprogress 是一个第三方插件，用于实现进度条效果，与路由守卫配合使用，可以实现路由跳转时的进度条效果。[Nprogress 官方](https://github.com/rstacruz/nprogress)

### 7.1 安装

```
npm install nprogress --save
```

### 7.2 使用

```js
// 导入
import Nprogress from "nprogress";
// 导入样式
import "nprogress/nprogress.css";
// 配置
Nprogress.configure({
  // 是否显示进度条的小圆圈
  showSpinner: false,
});
// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 开启进度条
  Nprogress.start();
  next();
});
// 全局后置守卫
router.afterEach((to, from) => {
  // 关闭进度条
  Nprogress.done();
});
```

## 8. 路由懒加载

> 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。

### 8.1 VueRouter 配置

```js
{
   path: "/about",
   // 懒加载，当路由被访问的时候才加载对应组件
   component: () => import("./components/RouterAbout.vue"),
},
```

### 8.2 把组件按组分块

有时候我们想把某个路由下的所有组件都打包在同个异步块 (chunk) 中。只需要使用 命名 chunk (opens new window)，一个特殊的注释语法来提供 chunk name (需要 Webpack > 2.4)。

```js
const Foo = () => import(/* webpackChunkName: "group-foo" */ "./Foo.vue");
const Bar = () => import(/* webpackChunkName: "group-foo" */ "./Bar.vue");
const Baz = () => import(/* webpackChunkName: "group-foo" */ "./Baz.vue");
```

## 9. 路由缓存

> 当我们在使用 VueRouter 时，每次切换路由时，都会重新创建组件，这样会导致组件中的数据被重置，为了解决这个问题，我们可以使用 VueRouter 的缓存机制，来缓存组件，这样就不会重新创建组件，也就不会导致组件中的数据被重置了，就像小程序中的 TabBar 页面一样。

### 9.1 在 router-view 标签之外包裹一个 keep-alive 标签并设置 include 属性

> include 属性表示要缓存的组件，可以是一个字符串，也可以是一个数组，字符串表示要缓存的组件的 name 属性值，数组表示要缓存的组件的 name 属性值的数组,name 一定是组件的 name 属性,而不是路由的 name 属性

```html
<keep-alive :include="['home']">
  <router-view></router-view>
</keep-alive>
```

### 9.2 `activated` 和 `deactivated`

> 由于在 keep-alive 中缓存了该组件，所以当组件切换时，不会重新渲染，所以 created 只会执行一次，所以需要使用 activated，deactivated，这两个钩子函数是 keep-alive 提供的，当组件被激活时，会执行 activated，当组件被停用时，会执行 deactivated

```js
activated() {
   console.log("activated");
},
deactivated() {
   console.log("deactivated");
},
```

## 10. 路由元信息

定义路由的时候可以配置 meta 字段：

```js
routes: [
    {
      path: "/"
      component: RouterHome,
      // meta表示元数据，可以在路由规则中添加任意的数据，可以在组件中通过this.$route.meta获取,也可通过在路由守卫中获取
      meta: {
        title: "首页",
        permissions: ["admin", "user"]
      }
    },
]
```

> 一个展示在全局导航守卫中检查元字段的例子：

```js
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.loggedIn()) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next(); // 确保一定要调用 next()
  }
});
```

## 11. 路由模式

> VueRouter 提供了两种路由模式，hash 模式和 history 模式，默认为 hash 模式，hash 模式的 url 中会有一个 # 号，history 模式的 url 中没有 # 号，history 模式需要后端的支持，否则会出现 404 错误

### 1. hash 模式

```js
const router = new VueRouter({
  mode: "hash",
  routes,
});
```

### 2. history 模式

```js
const router = new VueRouter({
  mode: "history",
  routes,
});
```
