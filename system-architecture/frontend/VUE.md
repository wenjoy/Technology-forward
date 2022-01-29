

### Vue instance

#### data

#### method

#### computed

1. 使用了getter和setter api

2. 计算属性是基于它们的响应式依赖进行缓存的。如果message没有发生改变，reversMessage的getter就不会执行

```js
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
    fullName: {
    // getter
      get: function () {
        return this.firstName + ' ' + this.lastName
      },
      // setter
      set: function (newValue) {
        var names = newValue.split(' ')
        this.firstName = names[0]
        this.lastName = names[names.length - 1]
      }
  	}
  }
})
```

#### watch

需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。

```vue
<script>
var watchExampleVM = new Vue({
  el: '#watch-example',
  data: {
    question: '',
    answer: 'I cannot give you an answer until you ask a question!'
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    question: function (newQuestion, oldQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.debouncedGetAnswer()
    }
  },
}
</script>
```

[example of watch](https://cn.vuejs.org/v2/guide/computed.html#侦听器)



### Life cycle

### Component

#### Props

#### 全局组件

```js
// 定义一个名为 button-counter 的新组件
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  
  //template 属性要求带有编译环境的vue版本，否则会报错
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
```



#### 局部组件

```vue
new Vue({
  el: '#app',
  components: {
    'component-a': ComponentA,
    'component-b': ComponentB
  }
})
```



#### 动态组件

```vue
<component v-bind:is="currentTabComponent"></component>

<!-- 失活的组件将会被缓存！-->
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```



#### 异步组件

```vue
Vue.component(
  'async-webpack-example',
  // 这个动态导入会返回一个 `Promise` 对象。
  () => import('./my-async-component')
)

//局部组件
new Vue({
  // ...
  components: {
    'my-component': () => import('./my-async-component')
  }
})
```

### [基础组件的自动化全局注册](https://cn.vuejs.org/v2/guide/components-registration.html#基础组件的自动化全局注册)

### Syntax

Template syntax

##### [插值](https://cn.vuejs.org/v2/guide/syntax.html#插值)

1. 文本

   ```vue
   <span>Message: {{ msg }}</span>
   ```

   

2. raw html

   ```vue
   <p>Using v-html directive: <span v-html="rawHtml"></span></p>
   ```

   

3. arrtribute

   ```vue
   <div v-bind:id="dynamicId"></div>
   ```

   Note：支持表达式

##### [指令](https://cn.vuejs.org/v2/guide/syntax.html#指令)

指令 (Directives) 是带有 `v-` 前缀的特殊 attribute。

| [`v-if`](https://cn.vuejs.org/v2/guide/conditional.html#v-if) | <h1 v-if="awesome">Vue is awesome!</h1> <br /><h1 v-else>Oh no 😢</h1> | `v-if` 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建 |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`v-show`](https://cn.vuejs.org/v2/guide/conditional.html#v-show) | <h1 v-show="ok">Hello!</h1>                                  | `v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。 |
| v-for                                                        | <div v-for="(value, name) in object">   {{ name }}: {{ value }} </div> |                                                              |
| v-model                                                      | <input v-model="message" placeholder="edit me"> <p>Message is: {{ message }}</p> | [修饰符](https://cn.vuejs.org/v2/guide/forms.html#修饰符)<br /><br />`.lazy` `.trim` `.number` <br />用于表单元素`input` 等 |
| v-on                                                         | <div id="example-1">   <button v-on:click="counter += 1">Add 1</button>   <p>The button above has been clicked {{ counter }} times.</p> </div> |                                                              |
| V-slot                                                       | 只能用于template，插槽使用                                   |                                                              |
| v-once                                                       | 在这种情况下，你可以在根元素上添加 `v-once` attribute 以确保这些内容只计算一次然后缓存起来 |                                                              |



##### 参数

`:` 来表示

```vue
<a v-bind:href="url">...</a> // 参数为attribute的name
<a v-on:click="doSomething">...</a> //参数为绑定事件的name
```



##### 动态参数

`[]` 类似对象的动态属性名，2.6.0开始增加

```vue
<a v-on:[eventName]="doSomething"> ... </a>
```

Note：只能是字符串，`null`表示移除事件，不能有单引号或者空格，否则报错

##### 修饰符

```vue
<form v-on:submit.prevent="onSubmit">...</form> //对于触发的事件调用 event.preventDefault()
```



##### 缩写

```vue
<a v-bind:href="url">...</a> === <a :href="url">...</a>
<a v-on:click="doSomething">...</a> === <a @click="doSomething">...</a>
```



##### v-bind对class和style 有着专门的贴心的语法糖

其值甚至可是对象或者数组

##### Slot

在组件的template中使用，会被组件的"children"（类比react的children）替换，比react强的地方在于可以支持多个

###### example

```vue
// usage 
<navigation-link url="/profile">
  Your Profile
</navigation-link>

// in template of component navigation-link
<a
  v-bind:href="url"
  class="nav-link"
>
  <slot>这里面的内容是默认的，如果使用的地方没有制定，就fallback</slot>
</a>
// 匿名的只能有一个，具名的可以有多个，上面匿名的是简写，等价于
<navigation-link url="/profile">
  <template v-slot:header>
      Your Profile
  </template>
</navigation-link>

// in template of component navigation-link
<a
  v-bind:href="url"
  class="nav-link"
> 
  <slot name="header">这里面的内容是默认的，如果使用的地方没有制定，就fallback</slot>
</a>

```

###### 作用域

定义slot的地方，template，跟组件是同一级的，所以是访问不到组件内部的变量的。一般来说slot的需求是组件接受外部定义好的内容，然后组件内部制定slot插在哪里。这是一次依赖反转。组件内部定义接口，使用组件的地方实现具体的内容。使用方不关心组件内部细节，所以也不必要使用组件内部数据。

但是有时候，外部想要访问组件的内部的数据。vue支持这种，相当于反转再反转。两次反转和直接在组件内部实现的有细微的差别。写法如下：

```vue
<span>
  <slot v-bind:user="user">
    {{ user.lastName }}
  </slot>
</span>

<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>
</current-user>

// 也可以是es6的语法
<current-user v-slot="{ user: person }">
  {{ person.firstName }}
</current-user>
```

###### 动态slot名

```vue
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>
</base-layout>
```

第一次反转，把组件内部的数据和结构都交给外部控制，组件本身只控制插槽渲染的位置。第二次反转，只把结构控制交出去，数据定义由组件内部掌握。

###### 缩写

`v-slot`替换为字符 `#`

```vue
//default 不能省略
<current-user #default="{ user }">  {{ user.firstName }} </current-user>
```

### 高级

#### mixin

全局和局部，同组件，有覆盖的优先级问题

#### 自定义指令

同样是组件那样的统一范式，有5个钩子函数

```vue
 Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```

#### 函数式组件

```vue
Vue.component('my-component', {
  functional: true,
  // Props 是可选的
  props: {
    // ...
  },
  // 为了弥补缺少的实例
  // 提供第二个参数作为上下文
  render: function (createElement, context) {
    // ...
  }
})
```

#### 插件

使用

```vue
// 用 Browserify 或 webpack 提供的 CommonJS 模块环境时
var Vue = require('vue')
var VueRouter = require('vue-router')

// 不要忘了调用此方法
Vue.use(VueRouter)
```

定义

Vue.js 的插件应该暴露一个 `install` 方法：

```vue
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或 property
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}
```

#### **单文件组件**



### 其他

#### ref

this.$root

this.$parent

this.$refs

#### 依赖注入

react 的 context？

#### Hooks呢？

### 响应式API

fef 和 reactive的区别

ref = reactive({value: 1})

reactive 只能接受引用类型变量





#### 递归组件