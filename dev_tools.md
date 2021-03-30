- [VS code](#vs-code)
  - [debug](#debug)
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

## VS code

### debug
1. use `launch.json` to config debug
2. fields in `launch.json`
2.1 `name` is what display in the dropdown
2.2 `type` can be `node` or others which will be supply be extension
2.3 `request` is `launch` or `attach`

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
    # 创建
    tmux new # 不指定session name
    tmux new -s [session-name]

    # 删除Session
    tmux kill-session -t [session-name]
    tmux kill-server

    # 列出当前Session
    tmux ls # 
    Prefix s # tmux 内

    # 恢复Session
    tmux a -t [session-name]
    tmux a

    # 断开Session
    tmux detach
    Prefix d

    # 重命名Session
    Prefix $

#### window
    # 创建
    Prefix c

    # 选择窗口
    Prefix + [number] # 选择第n个窗口
    Prefix + p/n	# 前/后一个窗口

    # 关闭窗口
    Prefix &
    exit

    # 列出所有window（包含其他Session）
    Prefix w 
    j/k # 前后选择

    # 搜索窗口
    Prefix f

    # 重命名当前窗口
    Prefix ,

#### panel
    # 创建
    Prefix %	# 水平窗格
    Prefix '"'	# 垂直窗格

    # 关闭
    Prefix x

    # 切换
    Prefix o # 在窗格间切换
    Prefix q	# 显示窗格编号，输入编号切换

    # 将当前窗格切换到新窗口
    Prefix ！

    # 窗格交换位置
    Prefix + {/}

    # resize panel see [this](https://dev.to/michael/resizing-panes-in-tmux-2da7)
    :resize-pane -D (Resizes the current pane down by 1 cell)

    # change panel layout
    Prefix + Space
    will cycle through 5 available panel layouts, see [this](https://superuser.com/questions/493048/how-to-convert-2-horizontal-panes-to-vertical-panes-in-tmux) get more

    # change title
    Just for people who came here by searching how to change the title of a tmux session:

    `Ctrl + B, $` == `tmux rename-window -t <window> <newname>`

    This will give you a prompt, where you can rename the active session.

    To change the active window use komma instead:

    `Ctrl + B, ,`

## vim
`:w !sudo tee %` why this works? see [this](https://stackoverflow.com/questions/2600783/how-does-the-vim-write-with-sudo-trick-work)
this not works in `neovim`

## wireshark
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
