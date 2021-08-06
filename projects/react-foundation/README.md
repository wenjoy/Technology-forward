# React Foundation

React based components and widgets.

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

* [Monorepo](#monorepo)
  - [How to work with it](#how-to-work-with-it)
  - [Fixed version](#fixed-version)
  - [Hoist dependencies](#hoist-dependencies)
  - [Hoist dev tools](#hoist-dev-tools)
* [Trunk Based Development](#trunk-based-development)
* [Conventional commits](#conventional-commits)
* [Package Docs](#package-docs)
* [CHANGELOG](#changelog)

## Monorepo

This is a [Monorepo](https://en.wikipedia.org/wiki/Monorepo) managed by [lerna](#https://github.com/lerna/lerna). This way we can easily manage cross-package dependencies, consistent coding style and tooling for all packages, with the benefit that packages can be publish and used independently.

##### How to work with it

When you first time cloned this repo, you need to run below commands to install the root dependencies and let **lerna** create relationship for cross-package dependencies:

```sh
npm install
npm run bootstrap
npm run setup
```

The `npm run bootstrap` is actually triggered `lerna bootstrap` underneath, which will create *symlink* for cross-package dependencies so that you can use the source code of the dependent packages. This is really powerful for the cases which you need to finish a task cross multiple packages. Whenever you installed any package via `npm`, you need to run the *bootstrap* again to rebuild the *symlinks*.

After all these you can go to the directory of the package you want to work on, it just feel as you are working on a regular repo.

> Make sure run `npm run bootstrap` ***EVERYTIME*** after you run `npm install` in any package. Otherwise, some cross-package/hoisted dependencies will missing.

##### Fixed version

This repo adopts the *fixed version* Monorepo approach, which means all packages have same version in a release, even if there is no change for that package in that release. There is a big benefit for this: different packages with the same version indicate that they are developed base on same APIs and dependencies, it will result in clear codes and smaller bundle size for user's projects. Such as the relationship between *react*, *react-dom* and *react-test-renderer*.

##### Hoist dependencies

As of all of the packages in the repo have close relationship with each other, they are developed under same tech essentials, it would be very helpful that hoist the common dependencies to the root of the repo, by doing so we got:

* Easier tech essential dependencies management.
* Consistent tech stack across packages.
* Smaller disk space required.
* Faster build-time package installation.
* Easier to add new sub-package.

**Hoisted common tech libs**

* React
* React-DOM
* core-js polyfills

> Of course sub-package can override these libs, but it is not recommoned.

##### Hoist dev tools

With the same purpose as [hoist dependencies](#hoist-dependencies), hoist common dev tools:

* babel
* webpack
* less
* tsc
* @types
* flow
* eslint
* stylelint
* jest
* enzyme
* faker
* react-test-renderer
* react-styleguidist
* rimraf
* storybook
* docz
* ...

To use hoist *CLI* tools, just specify the relative path in sub-packages' *npm scripts*:

```
../../node_modules/.bin/cli-tool
```

## Trunk Based Development

This project adopts [TBD](https://trunkbaseddevelopment.com/) git flow. Every MR should be based on **master** branch, and they should be releasable.

## Conventional commits

We are following [Conventional Commits](https://conventionalcommits.org/) for **each** commit, please read the instruction carefully. We depends on these commits message to generate `CHANGELOG`.

## Package docs

* [ui](http://fee-doc-01w.dev.activenetwork.com/ui)
* [email-editor](http://fee-doc-01w.dev.activenetwork.com/email-editor)
* [address-editor](http://fee-doc-01w.dev.activenetwork.com/address-editor)
* utils

## CHANGELOG

* [ui](./packages/ui/CHANGELOG.md)
* [utils](./packages/utils/CHANGELOG.md)
* [email-editor](./packages/email-editor/CHANGELOG.md)
* [address-editor](./packages/address-editor/CHANGELOG.md)
