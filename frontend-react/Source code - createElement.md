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

作者：小水妹儿
链接：https://juejin.im/post/5dd0001cf265da0ba5279c2e
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

ref : 
1. [React.createElement源码分析](https://juejin.im/post/5dd0001cf265da0ba5279c2e)