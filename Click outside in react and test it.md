最近在项目中，为一个功能写 UT 的时候，写得特别难受。该功能是点击一个⚙，会出现一个 panel。该 panel 要求点击任何其他地方即关闭。原作者实现是在 document 里绑定了一个 mousedown事件。因为我们是 react 框架，且采用了 hooks，所以在写 UT 的时候，遇到几个问题。当时感觉这里实现是不是有问题，引入了副作用，测试写起来比较复杂。遂有此篇文章。
## How to write UT to cover these code
虽然费了点手脚，但还是写完了测试。过程中也对几个此前不太扎实的地方夯实了一下。下面是过程记录：
1. simulate 
我的第一思路是通过触发 mousedown事件来覆盖测试。然而，并不能。首先事件是绑定在 document 上的，enzyme 挂载并不是在 document 上，根本无法触发 document 上的事件。去查了 enzyme 的文档，原来`mount`开一接受第二个参数。
其中`{attachTo: document.body} or { hydrateIn: document.body}` 可以把组件挂载在 document 中。试了一下，果然，还是不能触发。看来这条路比较难走，决定换个思路。
2. mock
第二个思路是把 `addEventListener` mock 掉。我先写了
```
jest.mock('document', () => {
	addEventListener: jest.fn()
}
```
然后 jest 就抱怨了，不能找到`module document`。这波刚好纠正了我对 jest.mock 的一个误解。`jest.mock`是用来模块第三方模块的，npm module 或者你项目里 module。而 document 是 global variable。翻阅了一下文档，找到了`jest.spyOn`.

```
const spy = jest.spyOn(document, 'addEventListener');
...
spy.mockRestore();
```
It worked but new problem occured.
待测试代码是这样的
```
 if (triggerRef.current && triggerRef.current.contains(e.target)) {
      setModalState(!modalState);
    } else if (modalRef.current && !modalRef.current.contains(e.target)) {
      setModalState(false);
      onClose({ startHour: currentScrollTime, displayInterval: currentStep });
    }
```
起初，我给 target的是
`spy.mock.calls[0][1]({ target: '' });`
结果报错，containes 必须接受一个 node。
本来想试着把 useRef 或者 ref 的内容 mock 掉，绕开 `Node.contains`，打算用 `jest.mock`来只 mock 掉 react 库里的 useRef。google 了很久，并没有发现这样的方法。后来想了一下，虽然可能用 tricky 的手段可以实现这个目的，但react 内部应该是会依赖 useRef 的真正实现的，mock了也会出问题。
于是转换思路，修改了一下

```
 const tirggerDom = wrapper
      .find('[data-test-id="calendarSettingsTrigger"]')
      .getDOMNode();

 spy.mock.calls[0][1]({ target: tirggerDom })
```
这次目标达成. 并且 get 一个 enzyme 的知识点：
`getDOMNode` 方法，可以返回 wrapper 的 dom 节点。

不过react又开始抱怨
```
 When testing, code that causes React state updates should be wrapped into act(...):
```
看了一下 react 文档，并没有完全弄清楚这样做有什么意义。
```
 act(() => {
      spy.mock.calls[0][1]({ target: tirggerDom });
    });
```
## Inplements of Click outside to Close
写完测试后，我开始思考为什么要在 document 上绑定事件，不能通过该其他方式实现吗？一开始想到的是添加一个全屏的透明 modal。
google 了一下发现这篇文章[1]，看来 document 上绑定事件是主流实现。但是这样会导致 UT 很难写。
--![image.png](0)

~~issues if inplement with modal~~
~~1. sidebar hover and click cann't keep~~
~~2. if keep, can't close modal~~
~~3. z-index management~~

----

Reference:
1. [从 Dropdown 的 React 实现中学习到的
](https://juejin.im/post/5bb1812a6fb9a05d082a3361)
