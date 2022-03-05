# IOC and DI

依赖注入就是控制反转的一个例子

> 那么 IoC 和 DI 有什么关系？其实它们是同一个概念的不同角度描述，由于控制反转的概念比较含糊（可能只是理解为容器控制对象这一个层面，很难让人想到谁来维护依赖关系），所以 2004 年大师级人物 Martin Fowler 又给出了一个新的名字：**“依赖注入”，相对 IoC 而言，“依赖注入” 明确描述了被注入对象依赖 IoC 容器配置依赖对象**。

掘金这篇文章很好的解释了这个概念[了不起的 IoC 与 DI](https://juejin.cn/post/6861749411362373639#heading-3)

Angular 和 nestjs里大量运用了这个思想，可以 去玩这两个库来加深对这个思想的理解

还有这篇文章解释了前端里怎么运用这个思想[前端中的 IoC 理念](https://juejin.cn/post/6844903750843236366)

了不起的JavaScript中卷讲了回调函数就是控制反转的一个例子。

我的理解是：

```js
//app.js
function getSystem(host) {
  return host === 'jd.com' ? 'jingdong' : 'tianmao'
}
//对于这个getSystem来说，如果被调用，控制权在system手里, get system这个过程中如果要做什么事都得修改getSystem内部代码
//如果像这样，回调
function getSystemt(host, callback) {
  callback()
  return host === 'jd.com' ? 'jingdong' : 'tianmao')
}
//控制权一部分就在调用者手里，get system这个过程中如果要做什么事, 调用者可以传不同的callback
```

