# Jest

## FAQ
1. /Users/georgexie/workspace/projects/active/payment-manager-ui-app/node_modules/checkout-ui-widget/es/widgets/orderSummaryWidget.js:1
    ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,global,jest){import renderWidget from './components/renderWidget';
                                                                                             ^^^^^^
    SyntaxError: Cannot use import statement outside a module

jest default can't support es6 `import` syntax. In this error, the third party lib `checkout-ui-widget` didn't supply a compiled es5 js file, just a es6 file with `import` syntax. For such circumstance, jest need to convert them to es5 js file through babel.

check the `jest.config.js` I found this:
```js
 transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
    '^.+\\.module\\.(css|less)$',
  ],
```
it means jest don't need to compile or convert any files in `node_modules`, assume them all es5 js file. we need to change it to partly compile some files it's `checkout-ui-widget`
```js
transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\](?!checkout-ui).+\\.(js|jsx|ts|tsx)$',
    '^.+\\.module\\.(css|less)$',
  ],
```
Then it works like charming.
In this, I used some advanced regex, see [[../regex.md]]