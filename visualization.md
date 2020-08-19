## plans

- infrastructure 2h
  - 1h set up ,add two simple controllers
- spider script 4h
- crud 2h
- basic chart 4h
  - 2h compare react chart library and front end react scaffold library nextjs vs gatsby
- Chernoff face 8h

## knowledge
### compare visualize library
| name                                                 | age   | stars | demo | activity  | brand | issues | watches | highlight    | language |
| ---------------------------------------------------- | ----- | ----- | ---- | --------- | ----- | ------ | ------- | ------------ | -------- |
| [recharts](https://github.com/recharts/recharts)     | 5 yrs | 14.6k | N    | days ago  | N     | 152    | 193     | d3           | ts       |
| [victory](https://github.com/FormidableLabs/victory) | 5 yrs | 8.2k   | Y    | days ago     | N     | 170    | 119     | react native | js       |
| [nivo](https://github.com/plouc/nivo)                | 4 yrs | 7.4k   | Y    | days ago             | N     | 216    | 85      | ssr          | js       |
| [react-vis](https://github.com/uber/react-vis)       | 5 yrs | 7.3k   | Y    | month ago | uber  | 257    | 2.1k    | --           | js       |

recharts deprecate for no demo; victory deprecate for complex usage and i don't have requirement of native; nivo win for concise and friendly example. react-vis haven't try, as a back-up;

## troubles
1. try to use nest's recommendations: `Alternatively, to install the TypeScript starter project with Git`
  `git clone https://github.com/nestjs/typescript-starter.git project`
  1.1 it's slow, I try to set proxy, `https_proxy` env, but not work.That's barely for `curl`. I should adapt this way for git `git config --global http.proxy http://proxyUsername:proxyPassword@proxy.server.com:port`[git proxy](https://gist.github.com/evantoli/f8c23a37eb3558ab8765)
  1.2 it will have many git commits in this way, it's ugly
  1.3 even use `--dept=1` sallow clone, sill have problem, ugly git blame info, display others info
  why recommend this way!!
finally install `@nest/cli` globally, cos can't use `npx @next/cli` successfully. it's not bad,after all i will use `nest` frequently later.
2. nivo deprecate, it's radar chart don't work as my understand. Use backup, react-vis
3. `ReferenceError: d3 is not defined`
  `react-vis`'s official radar example is broken one. Not surprise at all, it's common :)
  https://github.com/uber/react-vis/issues/843
  still not work, got `SyntaxError: Unexpected token 'export'`, wtf! `restart` next dev server solved this. Probably because I used `yarn remove` while the server still was running.