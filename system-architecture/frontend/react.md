## FAQ
1. I encounter a problem:  

```js
<Form fields={fields} ref={this.formRef}>
          <Row fluid justify='between'>
            <Col span={5} onDoubleClick={this.triggerEditMode}>
              <VField
                name='name'
                static={edit ? undefined : true}
                component={TextInput}
                placeholder={i18n('widget.organization.GLCode.content.item.name.placeHolder')}
                rules="max:100"
                required/>
            </Col>
```
and this is VField

```js
 const WrappedField = ({ component, forwardRef, ...rest }, context) => {
    const { name } = rest;
    const { aauiFormStore: store } = context;
    const fieldState = store.getState()[name] || {};
    ...
    WrappedField.propTypes = propTypes;
    WrappedField.contextTypes = FormStorePropTypes;
    WrappedField.displayName = `WrappedField(${getDisplayName(WrappedField)})`;
```
It try to access `aauiFormStore`, and it does make it. I cant see anywhere cant pass it into.

I do some google got [this](https://hashnode.com/post/what-are-contexttypes-and-proptypes-and-how-do-you-use-them-in-your-react-apps-cirzy87uy00ln5j53nmu3z024). It said `contextTypes` is required or else, `context` will get empty object.

But still not found will the context passed into, keep looking, I found something in the top level `Form` component:

```js
constructor(props, context) {
    super(props, context);

    // Sync the `this.state` and `this.store.currentState`
    this.parentStore = props[aauiFormStore] || context[aauiFormStore];
    this.state = this.getInitState();
    this.initStore(props);
  }

  getChildContext() {
    return {
      [aauiFormStore]: this.store
    };
  }
```

the `getChildContext` method play a critical role. And it's a deprecated api see [here](https://zh-hans.reactjs.org/docs/legacy-context.html)

    通过给 MessageList（context 的生产者）添加 childContextTypes 和 getChildContext，React 自动向下传递信息，子树上的所有组件（在这个例子中是 Button）可以通过定义 contextTypes 来访问 context。

    如果 contextTypes 没有被定义，context 就会是个空对象。