- 
- [VS code](#vs-code)
  - [debug](#debug)
  - [eslint prettier and editor-config](#eslint-prettier-and-editor-config)
  - [prettier plugin not work](#prettier-plugin-not-work)
- [Tmux](#tmux)
  - [config](#config)
    - [let tmux use system clipboard](#let-tmux-use-system-clipboard)
  - [mechanism](#mechanism)
  - [usage](#usage)
    - [session](#session)
    - [window](#window)
    - [panel](#panel)
- [vim](#vim)
- [wireshark](#wireshark)
  - [1. cannot capture localhost packet](#1-cannot-capture-localhost-packet)
- [tcpdump](#tcpdump)
- [namp](#namp)
- [grep](#grep)
- [tldr / cheat](#tldr--cheat)
- [git](#git)
- [Chrome](#chrome)
- [shell](#shell)
  - [fish](#fish)
    - [config](#config-1)
  - [snippet](#snippet)
      - [NOTES:](#notes)
- [curl](#curl)
- [shell](#shell-1)
  - [1. `set` vs `export`](#1-set-vs-export)
  - [2. how to make terminal use proxy](#2-how-to-make-terminal-use-proxy)
  - [3. position argument `./ant.sh fullclean main`](#3-position-argument-antsh-fullclean-main)

## VS code

### debug
1. use `launch.json` to config debug
2. fields in `launch.json`
2.1 `name` is what display in the configure dropdown
2.2 `type` can be `node` or others which will be supply be extension, such as `go`, `python`
2.3 `request` is `launch` or `attach`
Launch is launch a program as configured then start a vscode's inspector to attach to this process  
Attach is just start a vscode's inspector to a running process. This process should be a node process launched by `node --inspect` or `node --inspect-brk`.
Using `node --inspect` will execute until see a breakpoint but will not auto open debug gui, must run the `attach` debug config. `node --inspect-brk` will hang on first line of program.Only when start the inspector, the program will continue execute.

an example for deno
```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug deno",
      "runtimeExecutable": "deno",
      "runtimeArgs": ["run", "--inspect-brk", "-A", "${file}"],
    }
  ]
}
```

### eslint prettier and editor-config
1. eslint主要做代码质量相关的validate，比如未使用的变量， 也可以指定代码风格相关的，比如缩进，支持的很好，也可以autofix。但是对max-len的支持，只能校验，不会帮你去自动换行，这里就是prettier可以发挥的地方
2. editor config是你写代码时候就生效的，比如按一下tab，缩进是tab还是空格，几个空格，但是对已经老代码是不会管的，而另外两者是对写完的代码去校验和格式化。onType或者onSave
3. 要配置eslint自动移除没有使用的import要用这个[eslint-plugin-unused-imports](https://github.com/sweepline/eslint-plugin-unused-imports#usage)

参考：
https://blog.csdn.net/Bruski/article/details/115416048  
[ESLint，Prettier 和 EditorConfig 简介](https://juejin.cn/post/6924249306039844872)  

an `eslintrc` example, 缩进和自动remote unused import:

```yml
  "plugins": ["unused-imports"],
  rules: {
    "no-unused-vars": "off", // or "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
    ],
    'indent': ["error", 2],
  },
```

### prettier plugin not work

It's not out of the box , you need to config this in your `settings.json`:
```json
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
```

This is [Language-specific editor settings](https://code.visualstudio.com/docs/getstarted/settings#_languagespecific-editor-settings), it means we only specify `js` and `jsx` to format by prettier.

language level's setting has the highest precedence then workspace level than user level.

## Tmux

### config
`~/.tmux.conf`
#### let tmux use system clipboard
`bind -T copy-mode-vi y send-keys -X copy-pipe-and-cancel 'xclip -in -selection clipboard'`
see [this](https://unix.stackexchange.com/questions/131011/use-system-clipboard-in-vi-copy-mode-in-tmux#:~:text=Then%20hit%20Ctrl%2Bb%20%5B%20to,be%20copied%20to%20the%20clipboard.) to get more

### mechanism

- session
- window
- panel

### usage
#### session
  1. 创建  

    `tmux new` 不指定session name
    `tmux new -s` [session-name]

  2. 删除Session  

    `tmux kill-session -t [session-name]`
    `tmux kill-server`

  3. 列出当前Session  

    `tmux ls`
    `Prefix s` # tmux 内

  4. 恢复Session  

    `tmux a -t [session-name]`
    `tmux a`

  5. 断开Session  

    `tmux detach`
    `Prefix d`

  6. 重命名Session  

    `Prefix $`

#### window
  1. 创建  

    `Prefix c`

  2. 选择窗口  

    `Prefix + [number]` # 选择第n个窗口
    `Prefix + p/n`	# 前/后一个窗口

  3. 关闭窗口  

    `Prefix &`
    `exit`

  4. 列出所有window（包含其他Session）  

    `Prefix w `
    `j/k # 前后选择`

  5. 搜索窗口  

    `Prefix f`

  6. 重命名当前窗口  

    `Prefix ,`

#### panel
  1. 创建  

    `Prefix %	# 水平窗格`
    `Prefix '"'	# 垂直窗格`

  2. 关闭  

    `Prefix x`

  3. 切换  

    `Prefix o` # 在窗格间切换
    `Prefix q`	# 显示pane编号，输入编号切换

  4. 将当前窗格切换到新窗口  

    `Prefix ！`

  5. 窗格交换位置  

    `Prefix + {` or `Prefix + }`

  6. resize panel see [this](https://dev.to/michael/resizing-panes-in-tmux-2da7)  

    `:resize-pane -D (Resizes the current pane down by 1 cell)`

  7. change panel layout  

    `Prefix Space`
    will cycle through 5 available panel layouts, see [this](https://superuser.com/questions/493048/how-to-convert-2-horizontal-panes-to-vertical-panes-in-tmux) get more

  8. change title  

    Just for people who came here by searching how to change the title of a tmux session:

  `Prefix $` or `tmux rename-window -t <window> <newname>`

  This will give you a prompt, where you can rename the active session.

  To change the active window use comma instead:

  `Prefix ,` this will not work if set default title as below

  set default title:
  `set -g window-status-format '#I:#(pwd="#{pane_current_path}"; echo ${pwd####*/})#F'`

----

## vim
`:w !sudo tee %` why this works? see [this](https://stackoverflow.com/questions/2600783/how-does-the-vim-write-with-sudo-trick-work)
this not works in `neovim`

## wireshark
### 1. cannot capture localhost packet
when start, select loopback interface, not en0.
## tcpdump
## namp
## grep
a network packet analyzer 
`sudo ngrep -x -q -d lo0 '' 'port 3306'`
## tldr / [cheat](https://github.com/cheat/cheat)

## git

see [this](https://coderwall.com/p/bt93ia/extend-git-with-custom-commands)  
tj's [git extras](https://github.com/tj/git-extras) using this trick  
You can extend and customize git through command aliases. You can also add entirely new commands.

Place any executable with a name like git-squash in your PATH and git will automatically make it available as a subcommand.

You can then call it just like any other git command.

## Chrome
1. Chrome的network中无法显示OPTIONS请求"的解决方案:
1.1 Chrome 79+ no longer shows preflight CORS requests. You can use for example Firefox to see it
1.2 For me running Chrome 84/Win10, OPTIONS requests show up in the Network tab if you select the 'All' filter, but don't if you select the 'XHR' filter. Which is annoying because then I have to wade through dozens of other requests I don't care about. Any idea why you can't show them in both places?
see [here](https://stackoverflow.com/questions/57410051/chrome-not-showing-options-requests-in-network-tab) and [here](https://stackoverflow.com/questions/57410051/chrome-not-showing-options-requests-in-network-tab/62590759#62590759)


## shell

---

### fish
1. set as default `chsh -s /usr/local/bin/fish`, got error:

    chsh: /usr/local/bin/fish: non-standard shell

edit `/etc/shells`, add `/usr/local/bin/fish` to it

2. set prompt path to shorthand:
    `set -U fish_prompt_pwd_dir_length {n}`, 0 mean use full path, `n` means use first `n` character represent the full path.

#### config
`~/.config/fish/config.fish`
### snippet
check all available fish plugin `omf search '.*' | less -R`

---

##### NOTES: 
**BASH's VIM mode and EMACS mode**  
bash and fish both have two mode: `vi` or `emacs`, it cost me so much time to learn this when try to bind key on fish. 

---

## curl
-L follow redirect  
-D dump header to special file  
-o output  
-o /dev/null don't output anywhere

example:  
`curl -sSL -D - 'https://unsplash.it/800/400/?random' -o /dev/null | grep
location `

## shell

### 1. `set` vs `export`
   `env_any='test' <command>` is called set environment variable, but it works barely current command
   if want it works for current shell and children process, need use `export env_any`. see [this](https://unix.stackexchange.com/questions/71144/what-do-the-bash-builtins-set-and-export-do)

    `set` is used to set shell attributes and positional attributes.??
    `export` called with no arguments prints all of the variables in the shell's
    `set` also prints variables that are not exported ??

### 2. how to make terminal use proxy

The `http_proxy` and `https_proxy` environment variable is used to specify proxy settings to client programs such as `curl` and `wget`.

Its specified by specific application like `curl` not shell or terminal. see [this](https://unix.stackexchange.com/questions/212894/whats-the-right-format-for-the-http-proxy-environment-variable-caps-or-no-ca).

PS: Portable Operating System Interface，缩写为`POSIX`. 是IEEE为要在各种UNIX操作系统上运行软件，而定义的API.Linux基本上逐步实现了`POSIX`兼容.Windows 声称部分实现了`POSIX`标准.

### 3. position argument `./ant.sh fullclean main`
  `$0` name of current shell , aka `./ant.sh` 
  `$1` the first argument, aka `fullclean`  
  `basename` extract only the script name from full path  
  `basename $0` --> `ant.sh` !!no `./` prefix any more  
  `$* / $@` all arguments



### Linux

[软连接和硬连接](https://www.jianshu.com/p/dde6a01c4094)

|                 |        |                                                          |
| --------------- | ------ | -------------------------------------------------------- |
| ln file_path    | 硬连接 | 指向同一个block，inode相同                               |
| ln -s file_path | 软连接 | inode不同，只是对目标文件path的一个指向, 会有`L`flag标识 |

硬连接使用场景较少，一般只有备份会用到，比如：

`git` 工具，当克隆本地的一个仓库时，执行 `clone` 指令：

```

git clone --reference <repository>
```

## SSH
免密登录，即公钥登录的原理

    所谓"公钥登录"，原理很简单，就是用户将自己的公钥储存在远程主机上。登录的时候，远程主机会向用户发送一段随机字符串，用户用自己的私钥加密后，再发回来。远程主机用事先储存的公钥进行解密，如果成功，就证明用户是可信的，直接允许登录shell，不再要求密码。

[阮老师链接](https://www.ruanyifeng.com/blog/2011/12/ssh_remote_login.html)

遇到个问题：  
目标机已经加了我的私钥，但是我执行 `ssh 172.27.130.68` 还是报错，后来试了试 ` ssh root@172.27.130.68 ` 就可以了。原来默认的用户名是我本机的用户名，我的前一种方式等价于`ssh wenjoy@172.27.130.68`. 但是目标机上根本没有这个用户的，只有一个root用户。  
如果要增加用户，参考https://blog.csdn.net/WoBenZiYou/article/details/101465198。 然后在这个用户目录下增加authrizedKeys就可以