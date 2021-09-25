# modules

js 诞生之初，没有模块系统。runtime是操作系统的语言几乎都有模块系统，但是js最初设计是运行在浏览器上，所以没有设计模块功能。但奇怪的是，即使是小弟css都有引入模块的功能`@import` 。 前端模块化跟后端不一样的一个地方是，有下载的过程，先由浏览器把文件从服务器下载下来，然后再读入到内存中。不像后端语言，直接把文件读入内存就行。js是通过`<script>`  来下载的。

es module出现之前，社区等不及，自己推出了规范 amd，例如requirejs和玉伯的seajs。后来nodejs出现，推出模块规范commonjs，commonjs的出现大行其道，终于倒逼ecma推出了es module。

## es module 基本使用

```js
// modulea.mjs
//1. named export
export var name = 'laoli'
export const age = 12
// 用var和const，let都可以，效果是一样的，这是新规定的语法，必须得这样写

//moduleb.mjs
import {name, age} from './modulea'

// 2. {}形式
// 报错
var man = {age: 12};
export man;

// 必须这样写就才行
export {
 m
}

// 3. default export
// 其实跟named export一样，只是引擎帮忙指定了default做为模块的接口
var man = {age: 12};
export default man
//equal
export { man as default }

//moduleb.mjs
import man from './modulea' 
//equal
import {default as man} from 'modulea'

```

## 与commonjs的区别

### es module 是静态的

由于`import`是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。

```js
// 报错
import { 'f' + 'oo' } from 'my_module';

// 报错
let module = 'my_module';
import { foo } from module;

// 报错
if (x === 1) {
  import { foo } from 'module1';
} else {
  import { foo } from 'module2';
}
```

CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。请看下面这个模块文件`lib.js`的例子。

```js
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};

// main.js
var mod = require('./lib');

console.log(mod.counter);  // 3
mod.incCounter();
console.log(mod.counter); // 3
```

S6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令`import`，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。

```javascript
// lib.js
export let counter = 3;
export function incCounter() {
  counter++;
}

// main.js
import { counter, incCounter } from './lib';
console.log(counter); // 3
incCounter();
console.log(counter); // 4
```

### esmodule是只读的

`import`命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。

```js
import {a} from './xxx.js'

a = {}; // Syntax Error : 'a' is read-only;
```

### 多次导入，只会执行一次（commonjs也是，这个不是区别，实现不一样）

```js
import { foo } from 'my_module';
import { bar } from 'my_module';

// 等同于
import { foo, bar } from 'my_module';
```

commonjs 是第一次require的时候，在内存中创建了缓冲，后面再require的时候就从内存中取

### `import()`来满足动态引入的需求

1. 返回的是promise

```js
button.addEventListener('click', event => {
  import('./dialogBox.js')
  .then(dialogBox => {
    dialogBox.open();
  })
  .catch(error => {
    /* Error handling */
  })
});
```

2. 可以在statement中使用

```js
if (condition) {
  import('moduleA').then(...);
} else {
  import('moduleB').then(...);
}
```

3. 路径也可以是动态的

```js
import(f())
.then(...);
```

### 依赖的循环引用

[多看看阮一峰老师的这篇](https://es6.ruanyifeng.com/#docs/module-loader#%E5%BE%AA%E7%8E%AF%E5%8A%A0%E8%BD%BD)

## nodejs对es module的支持

以前需要用这个flag `--experimental-module`来运行才支持, Node.js v13.2 版本开始，Node.js 已经默认打开了 ES6 模块支持. 但是有条件，要么文件扩展名要改为`.mjs`, 或者项目的`package.json`文件中，指定`type`字段为`module`。一旦设置了以后，该目录里面的 JS 脚本，就被解释用 ES6 模块。