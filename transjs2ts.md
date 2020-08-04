# Transjs2ts

Can't resolve '../PaymentThemeProvider'

storybook's webpack config `resolve` filed extensions not include `ts` and `tsx`, after add it, works like charming

my convert shell snippet
```bash
find . -name '*.js' |grep -v node_modules|grep -v lib|grep packages|grep -v main.js | xargs rename "s/js/tsx/"
```