# TS & JS

## Node

## misc
`__dirname` is relative to the script executed, no matter where u  type the `node script.js` in command line
`./` is relative to where u  type the `node script.js` in command line

process

## basic
JavaScript中有2个获取码点（code point）的函数:

`String.prototype.charCodeAt(pos)`  
`String.prototype.codePointAt(pos)`  

codePointAt方法可以直接获取到码点，而使用charCodeAt必须调用两次，从而获取一对码点。两者对应和转换关系，请参见[Unicode与JavaScript](http://www.ruanyifeng.com/blog/2014/12/unicode.html)。

## typescript
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
