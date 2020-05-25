- [html and browser](#html-and-browser)
    - [1. semantic](#1-semantic)
    - [2. performance optimise](#2-performance-optimise)
      - [network transform](#network-transform)
        - [cache](#cache)
        - [resources](#resources)
      - [page rendering](#page-rendering)
      - [js block](#js-block)
      - [load balance](#load-balance)
      - [practice](#practice)
    - [3. script defer/async](#3-script-deferasync)
    - [4. `<link rel="prefetch / preload">`](#4-link-rel%22prefetch--preload%22)
    - [4. image hide and whether resource load](#4-image-hide-and-whether-resource-load)
      - [5. `onload` `onDomContentLoad`](#5-onload-ondomcontentload)
      - [6. `crossorigin`](#6-crossorigin)
    - [7. browser cache strategy](#7-browser-cache-strategy)
    - [8. browser safety](#8-browser-safety)
    - [9. SEO](#9-seo)
    - [10 H5](#10-h5)
- [css](#css)
- [js](#js)
  - [data type](#data-type)
  - [prototype](#prototype)
  - [closure](#closure)
  - [Garbage collect](#garbage-collect)
  - [memory leak](#memory-leak)
  - [scope and context](#scope-and-context)
  - [event loop](#event-loop)
  - [Promise](#promise)
  - [generator function specification](#generator-function-specification)
  - [strict mode](#strict-mode)
- [network](#network)
    - [http](#http)
      - [1. code specification](#1-code-specification)
      - [2. cookie](#2-cookie)
    - [tcp vs udp](#tcp-vs-udp)
    - [tcp](#tcp)
      - [connect](#connect)
      - [close](#close)
        - [为什么建立连接是三次握手，而关闭连接却是四次挥手呢？](#%e4%b8%ba%e4%bb%80%e4%b9%88%e5%bb%ba%e7%ab%8b%e8%bf%9e%e6%8e%a5%e6%98%af%e4%b8%89%e6%ac%a1%e6%8f%a1%e6%89%8b%e8%80%8c%e5%85%b3%e9%97%ad%e8%bf%9e%e6%8e%a5%e5%8d%b4%e6%98%af%e5%9b%9b%e6%ac%a1%e6%8c%a5%e6%89%8b%e5%91%a2)
- [nodejs](#nodejs)
    - [创建 tcp or http server 遇到哪些问题](#%e5%88%9b%e5%bb%ba-tcp-or-http-server-%e9%81%87%e5%88%b0%e5%93%aa%e4%ba%9b%e9%97%ae%e9%a2%98)
    - [express](#express)
    - [koa](#koa)
    - [双向的流](#%e5%8f%8c%e5%90%91%e7%9a%84%e6%b5%81)
    - [长连接](#%e9%95%bf%e8%bf%9e%e6%8e%a5)
- [frameworks](#frameworks)
    - [react](#react)
      - [hooks](#hooks)
      - [why not change state directly](#why-not-change-state-directly)
      - [SSR](#ssr)
    - [webpack plugin and loader](#webpack-plugin-and-loader)
    - [react native](#react-native)
- [DSA](#dsa)
    - [sort](#sort)
    - [link table](#link-table)
- [java](#java)
- [mysql](#mysql)
- [你实现过的脚本，插件](#%e4%bd%a0%e5%ae%9e%e7%8e%b0%e8%bf%87%e7%9a%84%e8%84%9a%e6%9c%ac%e6%8f%92%e4%bb%b6)

# html and browser
### 1. semantic
    1. friendly to SEO
       - Search engines weigh keyword importance by their placement in the HTML hierarchy. For example, keywords enclosed in an <h1> tag are given more importance than those enclosed in an <p>
    2. better ACCESSIBILITY 
    3. maintenance

    ref: [SEMANTIC HTML FOR MEANINGFUL WEBPAGES](http://seekbrevity.com/semantic-markup-important-web-design/)

### 2. performance optimise
![](https://user-gold-cdn.xitu.io/2018/5/28/163a4d01fdc524f3?imageslim)
#### network transform

##### cache

browser has:
  1. disk cache
  2. memory cache
  `E-tag, Expires`
##### resources
  1. reduce requests
      1. bundle to a large file in http1.1
  2. reduce size
      1. (js,css,html)bundle, compress, uglify
      2. webpack
      3. `Content-encoding: gzip`
      4. image
         1. css sprites
         2. icon font
         3. WebP
      5. chrome devtool -- page speed
  3. improve speed
      1. CDN
#### page rendering

    1. `reflow` -- CPU; `repaint` -- GPU
    2. avoid redundant action that trigger reflow
        1. use class to update style, don't read&write style frequently
        2. use `visibility: hidden`
        3. composite dom then append it once at last or use `display: none` then operate dom
        4. as for <img>, when content loaded, its size will change will cause reflow. so always set size before image content loaded.
    3. reflow and repaint
        1. dom CRUD will trigger reflow
        2. css change will trigger repaint

#### js block
    memory leak
    be careful of closure
#### load balance
    pm2
    nginx

#### practice
    1. use thumbnail in list
    2. list use lazy loading or pagination and virtualized list
    3. first page render speed improvement
        1. don't place all script in <head> because that will block others action
        2. react server render

ref: [网站性能优化实战——从12.67s到1.06s的故事](https://juejin.im/post/5b0b7d74518825158e173a0c#heading-1)

### 3. script defer/async
    1. defer
        1. script load will wait html parsing finished.
        2. not work for script without src
        3. the script still part of document, DomContentLoad trigger after script loaded and pared.
    2. async
        1. script load will parallel with html parsing
        2. once load completed ,will parse and block html parse
        3. typically used for AD and google analyse js
        4. looks it is treated as resources like image, `DomContentLoad` will not wait this script, but `load` will wait it.
### 4. `<link rel="prefetch / preload">`
    1. prefetch 
       1. low priority
       2. for next navigation
    notes: only `prefetch` can be kept about 5mins
    2. preload
        1. for current navigation
        2. as
           - "script",
           - "style",
           - "image",
           - "media",
           -  and "document"
           - font
        3. `as` decode, may high priority
        pre download resource will storage in cache and will not download twice

![comparing](https://user-gold-cdn.xitu.io/2018/2/7/1616fd1a181ab854?imageslim)

    refer: [Scripts: async, defer](https://javascript.info/script-async-defer)
    see: labs/1-1

### 4. image hide and whether resource load
    1. `display: none` will download
    2. `visibility: hide` will download
    3. 'background: url()` will download, but if it's parent set `display: none`, it's will not download

    it's hard to remember, truly test should be `image lazy load` -- when `img` enter view port, set it's src, because as soon as src set, it will download resource, unlike script, it only download when append to document. see: lab 1-2

#### 5. `onload` `onDomContentLoad`  
    onload -- all resources including: image, font .etc loading complete  
    onDomContentLoad -- DOM load and parsing complete

#### 6. `crossorigin`
    当引入跨域的脚本（比如用了 apis.google.com 上的库文件）时，如果这个脚本有错误，因为浏览器的限制（根本原因是协议的规定），是拿不到错误信息的。当本地尝试使用 window.onerror 去记录脚本的错误时，跨域脚本的错误只会返回 Script error
    The crossorigin attribute, valid on the <audio>, <img>, <link>, <script>, and <video>

---

### 7. browser cache strategy

1. memory cache
    `from memory cache` refresh work
    `from disk cache` even if close tab still work
2. service worker cache
3. http cache
    1. force cache 
        |header|value|notes|
        |--|--|--|
        |`Cache-Control`|public <br> private <br> no-cache<br> no-store <br> max-age=60|http 1.1 <br> high priority|
        |`Expires`|date|http 1.0, <br> if these two both exist, not work|
        won't send out request
    2. negotiation cache
        |header|value|notes|
        |--|--|--|
        |`Last-Modified`|date|http 1.0 <br> |
        |`If-Modified-Since`|date|http 1.0|
        |`E-Tag`|uniq string|http 1.1 <br> |
        |`If-None-Match`|uniq string|http 1.1 <br> |
    if force cache is invalid, such as `Cache-Control` or `Expires` not satisfied, will go to negotiation cache.
    ![](https://user-gold-cdn.xitu.io/2018/4/19/162db6359acd19d3?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
    ![](https://user-gold-cdn.xitu.io/2018/4/19/162db635ed5f6d26?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
4. push cache

### 8. browser safety
8.1 xss
    前端输出到页面上都进行转义
8.2 CSRF(Cross-site request forgery)
8.2.1 protect
    1. http header Referer
    2. token
    3. 验证码
   
8.2.2
   SOP(same origin policy) intercept response, request still arrived server, that's why we still need care about CSRF even browser has SOP
8.3 使用 https
8.4 ClickJacking（点击劫持）
8.5 CORS
1. Since browser only stop response, response with `Access-control-allow-origin` can pass through
2. Access-Control-Allow-Credentials设为true时，Access-Control-Allow-Origin 强制不能设为 *.

simply request 
  1. `get` `post` `head`
  2. `Content-Type` 设为 `application/x-www-form-urlencoded、multipart/form-data 或 text/plain`
  3. `Access-Control-Expose-Headers` 
  4. 开发者必须在AJAX请求中打开withCredentials属性,否则，即使服务器同意发送Cookie，浏览器也不会发送

preflight request others   
   1.`Access-Control-Request-Method`   
   2. `Access-Control-Request-Headers`

Notes: 

1. 上面提到的可以防范 CSRF 的例外，就是指预检请求。即使跨域成功请求预检，但真正请求并不能发出去，这就保证了 CSRF 无法成功。

2. 与同域不同，用于跨域的 CORS 请求默认不发送 Cookie 和 HTTP 认证信息，前后端都要在配置中设定请求时带上 cookie。

这就是为什么在进行 CORS 请求时 axios 需要设置 withCredentials: true。

### 9. SEO
    1. google 爬虫可以识别 js？
    2. 百度不可以
    3. 目前 SEO 必须服务端渲染，需要 SSR，SPA 就是 SEO 不友好，根本没有解决
    4. 不要开黄腔，不知道就说不知道

refs: 

[A Tale of Four Caches](https://calendar.perfplanet.com/2016/a-tale-of-four-caches/)

[彻底理解浏览器的缓存机制](https://juejin.im/entry/5ad86c16f265da505a77dca4)

[前端网络安全必修 1 同源策略和CSRF](https://juejin.im/post/5dc8b2c5f265da4d044e41bb)

[跨域资源共享 CORS 详解](https://www.ruanyifeng.com/blog/2016/04/cors.html)

### 10 H5

---

# css
1. bfc
    1. block f context
2. ellipsis / multiple line ellipsis
3. block element vs inline
    1. block occupy while line
    2. block can set `width, height, padding, margin` 
    3. can set `line-height` to align inline element
4. margin collapse
    1. parent `margin-top` will swallow child's
5. flex layout
    1. `flex:1 ` === `flex-basis: 1; flex-shrink: auto, flex-grow: auto`
    2. width will be ignore, min-width determines size

---


# js
##  data type
      1. primitive type
          1. number
          2. string
          3. boolean
          4. function
          5. undefined
          6. null
      2. advanced type
          1. array
          2. object
          3. set/weak set
          4. map/weak map
          5. symbol
## prototype
    1. in js, every object has `__proto__` refer to prototype object
    1. all instances refer to one same prototype
## closure
    1. returned function can access the inner variable
    2. combination of function and it's VO
    3. when function's execution finished, it's variable should be clean, but if closure is composed, those variable will be keep in memory.
    4. 准确的说，是闭包所包含的整个作用域链所引用的 变量对象 中的值不会被清除。
    5. closure will not cause memory leak, see `ref.4`
##  Garbage collect
    1. reference count
    2. mark then clean
        垃圾回收器创建了一个“roots”列表。Roots通常是代码中全局变量的引用。JavaScript中，“window”对象是一个全局变量，被当作root。window对象总是存在，因此垃圾回收器可以检查它和它的所有子对象是否存在（即不是垃圾）
    3. 从2012年起，所有现代浏览器的垃圾回收算法都使用了标记－清除法 ，而不是引用计数法；对于Javascript，JavaScript 1.1（实现在Netscape 3）的垃圾回收算法使用了引用计数法，以后的Javascript版本均使用标记－清除法
    4. 对于 JS 不同类型的数据来说，基本数据类型（string/number/boolean/undefined/null）的值存储在 栈内存 中，引用数据类型（object）的值存储在 堆内存 中，程序代码存储在 文本段 中。
    5. 要说垃圾回收，首先要理解哪些内存是垃圾，有用的内存什么时候变成的垃圾。
        ```
        function fn () {
            let  a = { id: 1 }; 
        };
        fn();
        ```
        我们知道，函数调用存储于栈内存中，由系统（运行时环境）自动分配和回收内存。因此，对于函数 fn ，它执行于栈内存中。

        函数中的局部变量也存储在栈内存中，于是，变量标识符 a 和它的内容也存储在栈内存中。

        然而，a 的内容（值）是一个引用数据类型，它会被存储到堆内存中，而把内存虚拟地址当做值赋给 a。

        当函数执行结束后，根据栈内存管理规则，该函数的执行环境会被从栈内存顶部弹出，于是 a=0x0f00000 被从栈内存清除，接着 fn 从栈内存清除。

        至此程序执行完毕（我们假设该进程还未退出），此时栈内存是干净的（我们可以理解为它是实报实销的，里面的东西用完就扔），但是堆内存中 0x0f00000 位置上还存着一个对象呢，这个对象在之后的程序中永远都不会被访问到，因为这个对象在堆中分配内存时，只把地址告诉了 fn 中的 a，而 a 是函数的局部变量，它并未在 fn 的执行周期中把这个堆地址传给外面，于是 fn 执行完毕后就被永久性清除了，也就是说世界上再也没有人知道 { id: 1 } 这个数据住在哪里，那么这个对象对于当前执行的程序来说，就是没有意义的，但是却占用了程序内存空间，于是被看做了垃圾。（就像 count 为 0 的 i-node 一样）

## memory leak
  1. global variable
  2. setTimeout
  3. dom reference
  4. wrong used closure
## scope and context
1. `global scope` `function scope` `block scope`
2. inner defined function can access variable of outer, but no vice versa
3. scope chain
   when invoke function, it will find variable in current scope, if none, will continue find in outer scope, until to global scope. If still unlucky, will throw error `Uncaught ReferenceError: xxx is not defined`
4. context is `this`

        1. in method, this is the object   
        2. in function this global     
        3. function used as construct, this is the new Object   
        4. arrow function don't has this, it's this is parent's this in fact. It's `that = this` trick in old age;
        5. using `apply, call, bind` can change this
5. 函数的生命周期：

        解释(创建)阶段：

            词法分析
            语法分析
            作用域规则确定

            Variable Object,VO是一个与执行上下文相关的特殊对象，它存储着在上下文中声明的以下内容：
        - 变量 (var, 变量声明);
        - 函数声明 (FunctionDeclaration, 缩写为FD);
        - 函数的形参

        执行阶段：

            创建执行上下文
            执行函数代码
            垃圾回收

            Activation Object, AO对应的是函数执行阶段，当函数被调用执行时，会建立一个执行上下文，该执行上下文包含了函数所需的所有变量，该变量共同组成了一个新的对象就是Activation Object。该对象包含了：

        - 函数的所有局部变量   
        - 函数的所有命名参数
        - 函数的参数集合
        - 函数的this指向

        在函数创建阶段，JS解析引擎进行预解析，会将函数声明提前，同时将该函数放到全局作用域中或当前函数的上一级函数的局部作用域中。

        在函数执行阶段，JS引擎会将当前函数的局部变量和内部函数进行声明提前，然后再执行业务代码，当函数执行完退出时，释放该函数的执行上下文，并注销该函数的局部变量。

        执行上下文在运行时确定，随时可能改变；作用域在定义时就确定，并且不会改变。
        6. function has a `[[scope]]`

## event loop
    1. micro task
        1. promise
    2. macro task
        1. setTimeout
## Promise
   1. implement a Promise manually
    2. `Promise.resolve(1).then(()=>{console.log('1')}).then(()=>{console.log('2')}); Promise.resolve(2).then(()=>{console.log('3')}).then(()=>{console.log('4')});` try to explain
    3. [es6 promise source code](https://github.com/stefanpenner/es6-promise)
    4. [chromium promise source code](https://chromium.googlesource.com/v8/v8/+/3.29.45/src/promise.js?autodive=0/)
    5. [从Google V8引擎剖析Promise实现](https://segmentfault.com/a/1190000019258738)
## generator function specification
    1. generator function can be paused and resume
    2. return an iterator
    3. call iterator's `next` will execute the statement in function
    4. if execution finished (return or no statement left),iterator's `done` return true
## strict mode
    1. `this` in function invoke will be `undefined` not `window`
    2. global variable must declare then used
    3. cant delete variable, but can delete property of object
    4. arguments不再追踪参数的变化
    5. 禁止使用arguments.callee
    6. 函数必须声明在顶层
``` javascript
"use strict";

　　if (true) {

　　　　function f() { } // 语法错误

　　}
```
    7. ES6 module adopt strict mode default

refs:
1. [深入理解JavaScript作用域和作用域链](https://juejin.im/post/5c8290455188257e5d0ec64f)
2. [从JS垃圾回收机制和词源来透视闭包](https://juejin.im/entry/5aebc7a76fb9a07acc119269)
3. [彻底掌握js内存泄漏以及如何避免](https://juejin.im/post/5d5664ebf265da03f3334f13)
4. [how to release closure's memory in javascript?](https://stackoverflow.com/questions/39586546/how-to-release-closures-memory-in-javascript)

---

# network
### http
#### 1. code specification
    1. 200 OK
    2. 300 resource not available temporarily
        1. 301 Not Modified
        2. 302 Found
        3. 304 
    3. 400 Bad Request
        1. 401 Unauthorized
        2. 404 Not Found
        3. 409 conflict
    4. 500 server error
3. methods
    1. get idempotent
    2. put
4. https
5. http2
#### 2. cookie
定义于RFC2109
|property|value|
|--|--|
|name||
|value|no semicolon, comma, and space|
|domain||
|path||
|Expires/max-age||
|httpOnly|`document.cookie` cant access|
|secure|if only https|
1. cookie 有跨域保护，所以浏览其他网站不会泄露你的 cookie，但是 xss 脚本可以获取你的 cookie

2. server 用 `set-cookie` 来设置 cookie
 当用户从http://a.com发起http://b.com的请求也会携带上Cookie，而从http://a.com携带过来的Cookie称为第三方Cookie。
为了防止CSRF（Cross-site request forgrey）攻击，可以使用SameSite属性。

Set-Cookie: CookieName=CookieValue; SameSite=Lax; Set-Cookie: CookieName=CookieValue; SameSite=Strict;

strict：浏览器在任何跨域请求中都不会携带Cookie，这样可以有效的防御CSRF攻击，但是对于有多个子域名的网站采用主域名存储用户登录信息的场景，每个子域名都需要用户重新登录，造成用户体验非常的差。
lax：相比较strict，它允许从三方网站跳转过来的时候使用Cookie。

### tcp vs udp
### tcp 
#### connect
“3次握手”的作用就是双方都能明确自己和对方的收、发能力是正常的
#### close
##### 为什么建立连接是三次握手，而关闭连接却是四次挥手呢？
这是因为服务端在LISTEN状态下，收到建立连接请求的SYN报文后，把ACK和SYN放在一个报文里发送给客户端。而关闭连接时，当收到对方的FIN报文时，仅仅表示对方不再发送数据了但是还能接收数据，己方是否现在关闭发送数据通道，需要上层应用来决定，因此，己方ACK和FIN一般都会分开发送。

因为TCP是全双工通信的 
  （1）第一次挥手     因此当主动方发送断开连接的请求（即FIN报文）给被动方时，仅仅代表主动方不会再发送数据报文了，但主动方仍可以接收数据报文。    
   （2）第二次挥手     被动方此时有可能还有相应的数据报文需要发送，因此需要先发送ACK报文，告知主动方“我知道你想断开连接的请求了”。这样主动方便不会因为没有收到应答而继续发送断开连接的请求（即FIN报文）。   
     （3）第三次挥手    被动方在处理完数据报文后，便发送给主动方FIN报文；这样可以保证数据通信正常可靠地完成。发送完FIN报文后，被动方进入LAST_ACK阶段（超时等待）。   
     （4）第四挥手    如果主动方及时发送ACK报文进行连接中断的确认，这时被动方就直接释放连接，进入可用状态。

# nodejs
### 创建 tcp or http server 遇到哪些问题
### express
### koa
### 双向的流
### 长连接

# frameworks
### react
#### hooks
#### why not change state directly
would cause not render[Why Not To Modify React State Directly](https://daveceddia.com/why-not-modify-react-state-directly/)
#### SSR
### webpack plugin and loader
### react native
todo: [react-native](https://levelup.gitconnected.com/wait-what-happens-when-my-react-native-application-starts-an-in-depth-look-inside-react-native-5f306ef3250f)

# DSA
### sort
|title| average | best | worst| stability|
|--|--|--|--|--|
| bubble | O($N^2$)| O(N) | O($N^2$)| Y |
| insert | O($N^2$)| O(N) | O($N^2$)| Y |
| select | O($N^2$)| O(N) | O($N^2$)| N |
| shell | O($N^{1.3}$)| O(N) | O($N^2$)| Y |
| merge | O($\ Nlog_2N$)| O($\ Nlog_2 N$) | O($\ Nlog_2 N$)| Y |
| quick | O(N$\ log_2 N$)| O($\ Nlog_2 N$) | O($N^2$)| N |
### link table

# java
# mysql

ref: 
1. [markdown 数学公式Latex语法](https://juejin.im/post/5af93ec6518825428b38e7f4)


# 你实现过的脚本，插件