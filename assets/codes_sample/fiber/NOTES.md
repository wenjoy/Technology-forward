FAQ:
1. typescript Cannot find module '@babel/parser'

      Please add this to your tsconfig.json.

      {
        "compilerOptions": {
          "moduleResolution": "node"
        }
      }
      Since you have specified modules: "es6" on your tsconfig.json. TypeScript Compiler will use Classic module resolution, which unfortunately, does not resolve non-relative imports in node_modules. (docs)

refs: [issue](https://github.com/babel/babel/issues/10237#issuecomment-513028440)

2. can i use union type in place of function overload
```ts
function commit(node: ReactNode | string): HTMLElement {
  let dom
  if (typeof node.type == 'string') {
    dom = document.createTextNode(node)
  } else {
    dom = document.createElement(node.type)
    // error:  Property 'type' does not exist on type 'string'
    // union type must have common interface
  }

  return dom
}

// works
function commit(node: string): HTMLElement 
function commit(node: ReactNode): HTMLElement 
function commit(node): HTMLElement {
  let dom
  if (typeof node.type == 'string') {
    dom = document.createTextNode(node)
  } else {
    dom = document.createElement(node.type)
  }

  return dom
}
```