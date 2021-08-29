# lerna

- [lerna](#lerna)
  - [what is lerna](#what-is-lerna)
    - [link to old knowledge base](#link-to-old-knowledge-base)
      - [classical multirepo](#classical-multirepo)
    - [what is lerna.json](#what-is-lernajson)
    - [commands](#commands)
      - [lerna publish](#lerna-publish)
      - [lerna version](#lerna-version)
      - [lerna bootstrap](#lerna-bootstrap)
      - [lerna changed](#lerna-changed)
      - [lerna link convert](#lerna-link-convert)
    - [life cycle](#life-cycle)
  - [why lerna](#why-lerna)
  - [how to use](#how-to-use)
    - [how to solve the exist issue](#how-to-solve-the-exist-issue)
  - [typical workflow](#typical-workflow)
  - [diver](#diver)
    - [git sub modules](#git-sub-modules)
    - [package.json dig deeper](#packagejson-dig-deeper)
    - [.npmrc](#npmrc)
  - [compare](#compare)
    - [Previous](#previous)
    - [Now](#now)
  - [FAQ](#faq)
  - [Refs:](#refs)

## what is lerna
Lerna is a tool that optimizes the workflow around managing multi-package repositories with git and npm.

### link to old knowledge base
#### classical multirepo 

### what is lerna.json
[see this](https://github.com/lerna/lerna#lernajson)

### commands

#### lerna publish
push to registry

#### lerna version
like `npm version`

#### lerna bootstrap
`npm install`  
symlink  
`npm run prepublish`  
`npm run prepare`  

#### lerna changed
list local changes

#### lerna link convert
Most devDependencies can be pulled up to the root of a Lerna repo with lerna link convert
Note that devDependencies providing "binary" executables that are used by npm scripts still need to be installed directly in each package where they're used.

### life cycle

## why lerna
1. making changes across many repositories is messy
2. difficult to track,
3. testing across repositories becomes complicated very quickly.

## how to use
1. `lerna init`
create 
```
lerna-repo/
  packages/
  package.json
  lerna.json
```
2. `lerna create {package_name}`
```
lerna create @pm/components
lerna create --loglevel=debug -y @pm/aui
lerna create --loglevel=debug -y @pm/cui

```
3. `lerna add {npm_name}`
```
lerna add lodash
lerna add react --scope @pm/components
lerna add @pm/components --scope @pm/au
```
4.

### how to solve the exist issue


## typical workflow

## diver
### git sub modules
### package.json dig deeper
### .npmrc

## compare

### Previous 
如果你要维护两个package。分别为module-1,module-2。module-1是依赖module-2的。如果module-2有修改，需要发布。那么你的工作有这些。

修改module-2版本号，发布。
修改module-1的依赖关系，修改module-1的版本号，发布。

这还仅仅只有两个package,如果依赖关系更复杂，大家可以想想发布的工作量有多大。

### Now

|Advantage | Downside|
|--|--|
|||

## FAQ
1. what is lerna?
2. what is yarn workspace  
    Workspaces are an optional feature used by monorepos to split a large project into semi-independent subprojects, each one listing their own set of dependencies. The workspaces field is a list of glob patterns that match all directories that should become workspaces of your application.
  [workspace](https://classic.yarnpkg.com/en/docs/cli/workspace)
  [intro, useless?](https://yarnpkg.com/features/workspaces)
  [config workspace](https://yarnpkg.com/configuration/manifest#workspaces)
3. name conversion of `@scope/module`  
    [it's called scoped package](https://docs.npmjs.com/misc/scope)
4. why no `lerna.json` in jest github
   using yarn workspace

## Refs:
1. [What Is a Monorepo?](https://www.perforce.com/blog/vcs/what-monorepo#:~:text=A%20monorepo%20(mono%20repository)%20is,it%20easier%20to%20refactor%20code.)
2. [lerna管理前端模块最佳实践](https://juejin.im/post/5a989fb451882555731b88c2)
3. [使用lerna管理大型前端项目](https://www.jianshu.com/p/2f9c05b119c9)
```
使用lerna管理项目时，可以选择两种模式。
默认的为固定模式(Fixed mode)，当使用lerna init命令初始化项目时，就默认为固定模式，也可以使用 lerna init --independent 命令初始化项目，这个时候就为独立模式(Independent mode)。
固定模式中，packages下的所有包共用一个版本号(version)，会自动将所有的包绑定到一个版本号上(该版本号也就是lerna.json中的version字段)，所以任意一个包发生了更新，这个共用的版本号就会发生改变。
独立模式允许每一个包有一个独立的版本号，在使用lerna publish命令时，可以为每个包单独制定具体的操作，同时可以只更新某一个包的版本号。此种模式时，lerna.json中的version字段指定为independent即可。
```
4. [an practice project step by step](https://medium.com/hy-vee-engineering/creating-a-monorepo-with-lerna-yarn-workspaces-cf163908965d)
5. [introduce independent mode](https://samhogy.co.uk/2018/08/lerna-independent-mode-with-semver.html)
6. [基于 Lerna 管理 packages 的 Monorepo 项目最佳实践](https://mp.weixin.qq.com/s/NlOn7er0ixY1HO40dq5Gag)
7. [lerna-wizard](https://github.com/webuniverseio/lerna-wizard)
8. [Guide to Monorepos for Front-end Code](https://www.toptal.com/front-end/guide-to-monorepos)

1. no build use alias
2. export refs issue