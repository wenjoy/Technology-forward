更新一波关于夏令时的

1. moment 是很好的处理了夏令时的，但是要注意传入的时区
`moment().tz('America/New_York')`
和
`moment.tz('America/New_York')`是不一样的。
前者是转换时区，后者是真的改变时区
如果直接`moment()`则用默认时区，也就是 runtime 的时区，在浏览器就是系统的时区。
2. `America/New_York` 本来是西五区，从 3月 8 日 02：00 开始实行夏令时，手表调快一个小时，也就是说 3 月 8 日的 02：00 就等于 3 月 8 日的 03：000

```
a=moment.tz('2020-03-08 02:00', 'America/New_York')
-> Moment {_isAMomentObject: true, _i: "2020-03-08 02:00", _f: "YYYY-MM-DD HH:mm", _isUTC: true, _pf: {…}, …}
b=moment.tz('2020-03-08 03:00', 'America/New_York')
-> Moment {_isAMomentObject: true, _i: "2020-03-08 03:00", _f: "YYYY-MM-DD HH:mm", _isUTC: true, _pf: {…}, …}
 a.format()
 "2020-03-08T03:00:00-04:00"
 b.format()
 "2020-03-08T03:00:00-04:00"
 b.diff(a)/3600000
 0
```
大白话就是在跨夏令时的时间段内，duration 也少了一个小时，莫名其妙的😂
3. js Native 的 `getTimeOffset()`也是考虑到了夏令时的，改变你的电脑时区，然后在 3.8 前后调用这个方法就能看到区别
4. 又想到点其他的，safari 用 new Date()的时候，严格要求 ISO8601 的格式，`yyyy-` 否则就死给你看，给你报错`Invalid date`

----update----

昨天遇到个问题，在 Jenkins 上跑 UT 的时候挂掉了，但在本地是一切顺利。查看 log 发现是 snapshot 不匹配，diff 的地方是个 date string。同事有提出是因为`new Date`的时候没有传入时区。结果传入时区`new Date('2019-01-01T00:00:00.000Z')`还是不对，遂研究了一翻，记录于此。

首先大谬之处在于，`new Date` 的时候是不接受时区的。想要改变时区的话，在 nodejs 中，可以通过改变环境变量`process.env.TZ`来办到。

在 jest 中可以通过 jest 的配置来改变，其实还是通过`process.env.TZ`,见[2]。

[1]掘金找到一篇文章详细的介绍了时区的一些概念，很有用。总结一下，GMT 格林威治时间，已经不推荐了,现在推荐的是我们大家耳熟能详的 UTC，时间协调时，支持闰秒。DST是夏令时。

最后整理一下 Date 的方法，参考[3]    

1.`new Date()` 接受一个 datestring，这个的格式标准有两种
`1995-12-17T03:24:00` **ISO 8601** Extended Format
T “T” appears literally in the string, to indicate the beginning of the time element.
`December 17, 1995 03:24:00` IETF-compliant **RFC 2822** timestamps 
其中，如果只传入日期`YYYY-MM-DD`会导致被认为是 UTC，这个容易引起误解.   

2.各种 toString 方法
`new Date('1970-01-01 00:00:00')`    
`toString()` "Thu Jan 01 1970 08:00:00 GMT+0800 (China Standard Time)"  
  
`toDateString()` Thu Jan 01 1970    

`toTimeString()` 08:00:00 GMT+0800 (China Standard Time)    

`.toLocaleString('ko-KR', {timeZone: 'UTC'})`  1970. 1. 1. 오전 12:00:00    

以上每个都有个`locale`版本的  
 
`toGMTString()` Thu, 01 Jan 1970 00:00:00 GMT
`toISOString()` 1970-01-01T00:00:00.000Z
`toUTCString()` Thu, 01 Jan 1970 00:00:00 GMT

3. 三个静态方法
`Date.UTC()`
`Date.now()`
`Date.parse()`
这三个都返回一个距 unix 计时纪元的时间，毫秒级

## Reference
1. [时区与JS中的Date对象
](https://juejin.im/post/5d23ef766fb9a07ea5681378)
2. [How do I set a timezone in my Jest config?](https://stackoverflow.com/questions/56261381/how-do-i-set-a-timezone-in-my-jest-config)
3. [Date.prototype MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString)xxxx段落引用