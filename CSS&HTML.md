# CSS & HTML

css 的花样实在太多了，只能一个个拍
::: hljs-right
by wenjoy
:::

## position
### sticky
parent 只能是 visible，否则不生效
top等可以是负值

## width
### fit-content
### max-content
### min-content
### fill-available

----

# DOM API

## window.ActiveElement
the element which got focus

## URL.createObjectURL(blob)
create a url point to memory for special file or blob. For example can create a url for an image in memory and pass to `<img />` src, rather than a remote url
difference between `FileReader.readAsDataURL(file)` and `URL.createObjectURL(blob)` see this [URL.createObjectURL()的使用方法](https://blog.csdn.net/qq_39258552/article/details/84133770)
## size
- scrollHeight
整体高度
- clientHeight
content + padding
- offsetHeight
content + padding + border + scrollbar
- offsetTop
- scrollTop
滚动条的距离