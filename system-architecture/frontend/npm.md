# NPM

## NPM
## I want to know about every detail of package.json

### `files`  
`directories`  
1. `.npmignore` ~= `.gitignore`
2. files ignored will not in tarball when execute `npm pack` or `npm publish`
3. that's would be trick i.e. `dist` usually in `.gitignore`, but it does need to be bundled in when npm publish
4. u can maintain a similar file list in `.npmignore`
5. u can specialize `files` and `directories` like a white list from ignore
[what is files and directories](https://stackoverflow.com/questions/40795836/how-do-you-use-the-files-and-directories-properties-in-package-json)

### `license`  
1. ISC (Internet Systems Consortium)
    1.1 ISC许可证是一种开放源代码许可证，在功能上与两句版的BSD许可证相同。
2. BSD (Berkeley Software Distribution)
    2.1 尊重代码作者的著作权
    2.2 允许使用者修改和重新发布代码，也允许使用或在BSD代码上开发商业软件发布和销售，因此是对商业集成很友好的协议
3. MIT (Massachusetts Institute of Technology) License
    3.1 作者只想保留版权,而无任何其他了限制。也就是说，你必须在你的发行版里包含原许可协议的声明
    3.2 The practical differences between the 2-clause BSD license and the MIT license are marginal[BSD VS MIT](https://opensource.stackexchange.com/questions/217/what-are-the-essential-differences-between-the-bsd-and-mit-licences)


### version conflict
create sub directory  
    node_modules
    |_ A
    |_ alpha @v1.0
    |_ B
        |_ node_modules
            |_ alpha @v2.0
see [How npm install Works Internally](https://dev.to/shree_j/how-npm-works-internally-4012)
[npm3 works](http://npm.github.io/how-npm-works-docs/npm3/how-npm3-works.html)

### peer dependency
When develop plugin, such as `less-loader`, will need a `less` version, and user who use `less-loader` may also specify `less` as his dependency. `less-loader` should use `peerDependency`.  
[yarn and npm handle peerDependency](https://zhuanlan.zhihu.com/p/237532427)


## yarn
### .yarnrc
1. `yarn-path`
Instructs yarn to defer to another Yarn binary for execution. Useful if you want to bundle Yarn into your repository and have everyone use the same version for consistency.

## yarn berry
issues open:close = 157/527 bugs: 51/355
1. can't be resolved to a satisfying range
   cause: `npmRegistryServer` config wrong url
2. The nearest package directory doesn't seem to be part of the project declared at /Users/georgexie
   https://github.com/yarnpkg/berry/issues/1050