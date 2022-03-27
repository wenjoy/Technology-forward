最近在使用表单遇到个一个问题：

进入页面的时候我们一般会请求数据初始化表单，后面就很少会再次请求数据初始化表单了，但是我刚好遇到这个问题，一个列表，每个item是个表单， 点击刷新，这个list里面的表单要全部刷新用最新的数据，已经填了值的就直接丢弃。结果发现刷新后，表单里面的值没有改变，还是编辑填的那个值。

用的是arco组件库，我写了个demo来复现问题：

https://github.com/reproduce-here/arco-form-control-problem

![image-20220327191921104](/Users/wenjoy/workspace/studio/Technology-forward/assets/image-20220327191921104.png)

一开始以为受控组件就是会这样，于是我自己写了一个简单的受控组件，后来才发现是arco的control组件的问题，它只在构造函数里使用一次initialValue，难怪我后面传进去的initialValue不生效呢。

![image-20220327192340707](/Users/wenjoy/workspace/studio/Technology-forward/assets/image-20220327192340707.png)