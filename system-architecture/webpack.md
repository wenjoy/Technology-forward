# Webpack

Can't resolve './useOnClickOutside'
明明路径是对的，webpack 就是报错, 原来是 resolve 配置的问题.
previously I always cant understand what this filed `resolve` for, recently I figure out `tsconfig.json` `paths` issue, I now understand, it is used to handle when `import` or `require` appears, means it's a module resolve, the mechanism is like node resolve module process
see [this](https://webpack.docschina.org/configuration/resolve/) and [this](https://webpack.docschina.org/concepts/module-resolution/)

