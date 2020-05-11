## html and browser
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

### 3. script defer/async prefetch and preload
    1. defer
        1. script load will wait html parsing finished.
        2. not work for script without src
        3. the script still part of document, DomContentLoad trigger after script loaded and pared.
    2. async
        1. script load will parallel with html parsing
        2. once load completed ,will parse and block html parse
        3. typically used for AD and google analyse js
        4. looks it is treated as resources like image, `DomContentLoad` will not wait this script, but `load` will wait it.
    3. prefetch download without run script
    4. preload download then run script

![comparing](https://user-gold-cdn.xitu.io/2018/2/7/1616fd1a181ab854?imageslim)

    refer: [Scripts: async, defer](https://javascript.info/script-async-defer)

### 4. image hide and whether resource load
    1. `display: none` no download
    2. `visibility: hide` will download
#### 5. `onload` `onDomContentLoad`  
onload -- all resources including: image, font .etc loading complete  
onDomContentLoad -- DOM load and parsing complete
## css
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
## js
1. closure
    1. returned function can access the inner variable
2. prototype
    1. in js, every object has `__proto__` refer to prototype object
    1. all instances refer to one same prototype
3. scope and context
    1. function scope visible in whole function
    2. inner defined function can access variable of outer, but no vice versa
    3. context is `this`
          1. in method, this is the object
          2. in function this global 
          3. function used as construct, this is the new Object
          4. arrow function don't has this, it's this is parent's this in fact.
          5. using `apply, call, bind` can change this
4. data type
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
5. event loop
    1. micro task
        1. promise
    2. macro task
        2. setTimeout
6. Garbage collect
    1. reference

## http
1. code specification
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
2. cache
    1. `cache-control`: no-cache
    2. `expired-date`
    3. `E-tag`
3. methods
    1. get idempotent
    2. put
4. https
5. http2

## frameworks
### react
1. hooks

## DSA
### sort
1. bubble
2. insert
3. select
4. quick
5. merge
6. shell
### link table

## java
## mysql