# React.createElement(
type -> react component/dom name
)
返回的是一个对象
```
 {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,
    // Record the component responsible for creating this element.
    _owner: owner,
  };

```
# ReactDom.render

# React.createContext

# scheduleUPdateOnFiber

```
 function scheduleUpdateOnFiber(fiber, expirationTime) {
      checkForNestedUpdates();
...
```

# 任务调度
# Fiber
- type
- memoizedProps
- pendingProps
- return
# phase
- render
- commit

# 一个最最简单的例子来看 react 的首次渲染
# 一个最简单的例子来看 react 的 update
ref : 
1. [React.createElement源码分析](https://juejin.im/post/5dd0001cf265da0ba5279c2e)