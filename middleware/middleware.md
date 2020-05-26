### redux
an classical example
```javascript
//next === dispatch
const logger = ({dispatch, getState}) => next => action => {
  //do something
   return next(action);
}

const store = createStore(reducers, applyMiddleware(logger));
```

create store source code
```javascript
//pass createStore self to the returned function from applyMiddleware
enhancer(createStore)

```

applyMiddleware source code
```javascript
return createStore => {
  const chain = middlewares.map(middleware => middleware({dispatch, getState}))
  // [next => {},next => {}, next => {}]
  // [a, b, c]
  dispatch = compose(...chain)(store.dispatch)
  // a(b(c(dispatch)))
  // c.next === dispatch
  // b.next === action => {//logger return dispatch(action)}
  // a.next === action => {// b}
  // dispatch === action => {// a}
  // when this dispatch invoke, then a.next invoke, then b.next invoke, one by one ,until call store.dispatch.
  // previous steps is to set up automation, when dispatch trigger , the middlewares trigger like domino.
  return { ...store, dispatch}
}
```

compose source code
`funcs.reduce((a,b) => (...args) => b(a(args)))`
### express
```javascript
const logger = (req, res, next) => {
  next();
}
app.use(logger);
```

`app.use` source code
```javascript
middleware = [a,b,c]

a(req, res, ()=>{b(req, res, ()=>{ c(req, res, ()=>{})})})
```

### koa
```javascript
const logger = async (context, next) => {
  await next()
}
app.use(logger)
```

middleware vs plugin (webpack)

sadly, someone had published such article [redux, koa, express 中间件实现对比解析](https://juejin.im/post/5b9a23a45188255c9c751b07)