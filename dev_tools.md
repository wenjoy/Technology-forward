# Dev tools

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

## fish
set as default `chsh -s /usr/local/bin/fish`

    chsh: /usr/local/bin/fish: non-standard shell

edit `/etc/shells`, add `/usr/local/bin/fish` to it

### config
`~/.config/fish/config.fish`
### snippet
check all available fish plugin `omf search '.*' | less -R`

### NOTES:
bash and fish both have two mode: `vi` or `emacs`, it cost me so much time to learn this when try to bind key 

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