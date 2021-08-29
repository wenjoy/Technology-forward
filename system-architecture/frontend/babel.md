# babel

Don't misunderstand babel. It's a compiler not a bundler. bundler is webpack or rollup.
[Babel doesn't bundle dependencies by default. You'll need to use a module bundler like rollup](https://stackoverflow.com/questions/39471896/how-to-compile-all-included-files-into-one-using-babel)
[monorepo babel config in webpack](https://juejin.im/post/5d2d3f2be51d454fbe24a734)

what is `@babel/preset-env` `@babel/preset-react` `@babel/preset-typescript`

preset is assembled plugins see [this](https://babeljs.io/docs/en/next/presets#creating-a-preset)

`@babel/preset-typescript` only have `@babel/plugin-transform-typescript` for now

`@babel/preset-react` have:

    @babel/plugin-syntax-jsx
    @babel/plugin-transform-react-jsx
    @babel/plugin-transform-react-display-name

if `process.env.NODE_ENV` or `BABEL_ENV` is `development`, these plugins will be added:

    @babel/plugin-transform-react-jsx-self
    @babel/plugin-transform-react-jsx-source

`@babel/preset-env` is a little complicated, will check `BrowsersList` in `.browserslistrc` or `package.json`'s `browserslist` field to determine what plugins include, see [this](https://babeljs.io/docs/en/next/babel-preset-env)


## plugins
Like many other compilers babel runs in 3 stages: parsing, transforming, and printing.

some Plugin do parse work, some do transform work, some do print work. Sometime it reflect on name

- Plugins run before Presets.
- Plugin ordering is first to last.
- Preset ordering is reversed (last to first).It is important to remember that with presets, the order is reversed. 

Both plugins and presets can have options specified by wrapping the name and an options object in an array inside your config.

see [this](https://babeljs.io/docs/en/next/plugins#syntax-plugins)

### commonly used Plugins
`@babel/plugin-syntax-dynamic-import` Working with Webpack and @babel/preset-env
`@babel/plugin-transform-runtime` Babel have `corejs` and `polyfill` to enable some syntax, for `extends` it will appear in multi places, it's a waste, this plugin cant optimize it, see [this](https://babeljs.io/docs/en/babel-plugin-transform-runtime)
`babel-preset-react-app` see [this](https://www.npmjs.com/package/babel-preset-react-app)