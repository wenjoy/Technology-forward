FAQ
## 1. `set` vs `export`
   `env_any='test' <command>` is called set environment variable, but it works barely current command
   if want it works for current shell and children process, need use `export env_any`. see [this](https://unix.stackexchange.com/questions/71144/what-do-the-bash-builtins-set-and-export-do)

    `set` is used to set shell attributes and positional attributes.??
    `export` called with no arguments prints all of the variables in the shell's
    `set` also prints variables that are not exported ??

## 2. how to make terminal use proxy

The `http_proxy` and `https_proxy` environment variable is used to specify proxy settings to client programs such as `curl` and `wget`.

Its specified by specific application like `curl` not shell or terminal. see [this](https://unix.stackexchange.com/questions/212894/whats-the-right-format-for-the-http-proxy-environment-variable-caps-or-no-ca).

PS: Portable Operating System Interface，缩写为`POSIX`. 是IEEE为要在各种UNIX操作系统上运行软件，而定义的API.Linux基本上逐步实现了`POSIX`兼容.Windows 声称部分实现了`POSIX`标准.

## 3. position argument `./ant.sh fullclean main`
  `$0` name of current shell , aka `./ant.sh` 
  `$1` the first argument, aka `fullclean`  
  `basename` extract only the script name from full path  
  `basename $0` --> `ant.sh` !!no `./` prefix any more  
  `$* / $@` all arguments