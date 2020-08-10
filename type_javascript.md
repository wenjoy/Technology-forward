# TS & JS

## Node

## misc
`__dirname` is relative to the script executed, no matter where u  type the `node script.js` in command line
`./` is relative to where u  type the `node script.js` in command line

process

## javascript
JavaScript中有2个获取码点（code point）的函数:

`String.prototype.charCodeAt(pos)`  
`String.prototype.codePointAt(pos)`  

codePointAt方法可以直接获取到码点，而使用charCodeAt必须调用两次，从而获取一对码点。两者对应和转换关系，请参见[Unicode与JavaScript](http://www.ruanyifeng.com/blog/2014/12/unicode.html)。

---

## typescript

### Knowledge
1. tuple
no special mark, same as array, just type declaration make it a tuple
```ts
  const tuple:[string, number] = ['test', 123]
```


### FAQ:

1. Type 'string | undefined' is not assignable to type 'string'.
[ non-null assertion](https://stackoverflow.com/questions/54496398/typescript-type-string-undefined-is-not-assignable-to-type-string)
```ts
let name1:string = person.name!; 

```
2. Typescript: TS7006: Parameter 'xxx' implicitly has an 'any' type

it's related to `noImplicitAny` option in `tsconfig.json`, but recommend way is fixing the type declaration than change this option to false

3. global variable or property  

    declare global {
      interface Window {myOwnName: string;}
    }

also see [this](https://mariusschulz.com/blog/declaring-global-variables-in-typescript)

4. `tsx` vs `ts`
tsx support jsx syntax, see [this](https://stackoverflow.com/questions/34224007/is-there-any-downside-to-using-tsx-instead-of-ts-all-the-times-in-typescript)

5. react-responsive does not contain a default export
- using `preset-typescript` of babel instead of `preset-env`
- `yarn install @type/react-responsive`

6. what is `xxx.d.ts`

7 **tsconfig.json**
- it is used by `vscode` and `tsc`
- if `tsc` had specify a file, if will ignore `tsconfig.json` at root of project, u can specify at filed `files` in `tsconfig.json`
- field `paths` is related to resolve module, it's like babel plugin `module-resolve` but doesn't support regex, can use `--traceResolution` to debug, see [this](https://www.tslang.cn/docs/handbook/module-resolution.html)

8. `*.d.ts`
[What are *.d.ts files for?](https://stackoverflow.com/questions/50463990/what-are-d-ts-files-for)
distribution with lib  
u can special in your own project, name convension is `global.d.ts`
如果一个文件有扩展名 .d.ts，这意味着每个根级别的声明都必须以 declare 关键字作为前缀。这有利于让开发者清楚的知道，在这里 TypeScript 将不会把它编译成任何代码，同时开发者需要确保这些在编译时存在。
see [this](https://jkchao.github.io/typescript-book-chinese/typings/ambient.html#%E5%A3%B0%E6%98%8E%E6%96%87%E4%BB%B6)

9. Cannot find module 'react' or its corresponding type declarations.
fuck `deno` extension. disable it! uninstall it!

10. Error when importing untyped JS modules #15031
  https://github.com/digitalbazaar/forge/issues/80

11. 'Form' refers to a value, but is being used as a type here. Did you mean 'typeof Form'?
 https://stackoverflow.com/questions/55576953/useref-refers-to-a-value-but-is-being-used-as-a-type-here/55577071

12. cant use square bracket notation to access object
```ts
const test = {
      abc: 123
    }
    const prop:string ='abc' 
    test[prop]
    //Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ abc: number; }'.
```
using `keyof` see [this](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html)  
`keyof` get all the key of object as type

```ts
interface test {
      abc:number
    }
    const test:test = {
      abc: 123
    }
    const prop:keyof test ='abc' 
    test[prop]
```

13. constant will get a type automatically
```ts
let a = 'hello'; // let a: string
let b:typeof a;
b = 'world' // no error here

const a = 'hello'; //const a: "hello"
let b:typeof a;
b = 'world'// Type '"world"' is not assignable to type '"hello"'
```

books
1. [深入理解 TypeScript](https://jkchao.github.io/typescript-book-chinese/project/compilationContext.html#tsconfig-json)
