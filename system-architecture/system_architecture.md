# System architecture

## front end system

### tool chain

#### webpack
#### babel
#### husky
#### eslint
#### git
#### commit lint

### framework

#### react
why don't use css or less. use styled component or tailwind:  
Sometimes we need to dynamic set height or scroll.For example, a component behavior different between pc and mobile, in mobile it have to scroll top absolute 20px more. If the style file is beyond js, we can't keep, i.e. the dynamic height, on same page. When u change style(which has been referenced in js), you will not realize that it may break something. We can also get dom's real height, which is not suggested in react.
#### redux
#### angular
#### ember
#### vue

## what problem we have

### create layout
### async data flow
#### changelog release

## how to solve them with tool


## WCAG
A (lowest), AA (mid range), and AAA (highest)
[W3C Recommendation - Web Content Accessibility Guidelines (WCAG) 2.0](https://www.w3.org/TR/2008/REC-WCAG20-20081211/#text-equiv)
[about tabindex](https://developers.google.com/web/fundamentals/accessibility/focus/using-tabindex)
`tab` can focus on element which are focusable, add `tabindex` can let unfocusable element(`<div> <span> <p>`) get focus when tap `tab`.  
`<a>` without `href` cannot be focusable  
[Why would an `a` tag need `tabindex=0`?](https://stackoverflow.com/questions/30740226/why-would-an-a-tag-need-tabindex-0)

`aria-labeledby=[id]` 指定某个元素作为 `aria-label`? 什么使用场景呢？

## Ideas
### try to create a github project to dissect  most popular project structure