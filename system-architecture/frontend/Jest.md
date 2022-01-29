单元测试

以前用的是enzyme，现在想试试[**Testing Library**](https://testing-library.com/)，

感觉这俩一个是黑盒测试，一个是白黑，testing libray这种UT写黑盒，颠覆我认知了

还有观点是UT不要mock，用真的server，我以前对这种嗤之以鼻，现在得认真思考一下这个思路了

FAQ：

1. Jest UT  ReferenceError: React is not defined

   因为用了umi-test@3.5.20，它的源码有这样一段：https://github.com/umijs/umi/blob/master/packages/test/helpers/transformers/javascript.js

   ```js
   const babelJest = require('babel-jest');
   
   module.exports = babelJest.createTransformer({
     presets: [require.resolve('@umijs/babel-preset-umi/node')],
     babelrc: false,
     configFile: false,
   });
   ```

   Tranform 用的是node，而且不读取babel配置文件，属实坑爹。翻边umi官方文档也没有UT相关的（非插件）。

   解决办法就是自定义`jest.config.js` 来覆盖它的transform

   https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object

   因为react17之前，jsx是被编译成`React.createElement()` 所以一直要在开头加一句`import React form 'react'`，在react17之后，则编译成`_jsx()`, 所以不需要加了，但是需要`_jsx`, 这一句`import {jsx as _jsx} from 'react/jsx-runtime';`babel插件会自动加, 需要这么配置：

   ```js
   {
     "presets": [
       ["@babel/preset-react", {
         "runtime": "automatic"
       }]
     ]
   }
   ```

   https://github.com/facebook/jest/issues/11045

   https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html

2. [window.matchMedia is not a function](https://stackoverflow.com/questions/39830580/jest-test-fails-typeerror-window-matchmedia-is-not-a-function)

用了antd，跑UT会遇到这个错。用jest mock这个方法就可以解决报错了。

要注意，`jest.setup.js` 是在root下找的，所以如果root是src，要把它放在src下，否则找不到

`matchMedia` 返回媒体查询到结果，以前只知道这个是css用的，现在才知原来有js API了。返回结果是这样的：

```js
matches: false
media: "(max-width: 600px)"
onchange: null
```

3. 导入less文件报错，因为jest报样式文件当成js了

配置transformer可以解决， 其实就是返回个空，核心代码是这样的：

```js
module.exports = {
  process() {
    return ''
  }
}
```

也有模块可以用[jest-transform-stub](https://www.npmjs.com/package/jest-transform-stub)

jest.config.js

```js
module.exports = {
  rootDir: 'src',
  globals: {
    VEGA_URL: 'fake-vega-url',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  setupFilesAfterEnv: ['./__mock__/jest.setup.js'],
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{js,jsx}', '!**/node_modules/**', '!**/vendor/**'],
  coverageDirectory: '<rootDir>/coverage/',
  coverageThreshold: {
    global: {
      branches: 20,
      functions: 30,
      lines: 50,
      statements: 50,
    },
  },
};
```

jest.setup.js

```js
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
```

