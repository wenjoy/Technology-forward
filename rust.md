# Rust

## FAQ
1. what is `::` and `.` means?

    `::` static method, aka, associated function of the String type
  `.` instance method
  nothing weird

2. `let mut guess = String::new();`
    same as `new String()`

3. `&` -> reference
4. `.expect("Failed to read line");`  
   An instance of io::Result has an expect method that you can call

5. unused manifest key: package.crate-type

```toml
    Cargo.toml应该这样写：
    [package]
    name = "embed"
    version = "0.1.0"
    [lib]
    name = "embed"
    crate-type = ["dylib"]

    [dependencies]
```

6. what is `extern` key word

    Rust has a keyword, extern, that facilitates the creation and use of a Foreign Function Interface (FFI).

see this [Using extern Functions to Call External Code](https://doc.rust-lang.org/book/ch19-01-unsafe-rust.html?highlight=extern#calling-an-unsafe-function-or-method)

7. can't find crate for `deno`  
see [this](https://stackoverflow.com/questions/34463980/rust-cant-find-crate)

8. what is `#[no_mangle]`
with out this, i got error:  

    thread 'main' panicked at 'called `Result::unwrap()` on an `Err` value: SymbolGettingError(Custom { kind: Other, error: "dlsym(0x7fa4be50a730, deno_plugin_init): symbol not found" })', cli/ops/plugin.rs:58:27
    note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace

9. got this error `terminated by signal SIGSEGV (Address boundary error` on Deno `1.1.1`, it gone when i upgrade to `1.2.1`


   (1) .dll .obj .lib使用在windows平台下。
        .dll：动态链接库，作为共享函数库的可执行文件。
        .obj：目标文件，相当于源代码对应的二进制文件，未经重定位。
        .lib：可理解为多个obj的集合，本质与.obj相同。



    (2) .so .o .a使用在linux平台下。
            .so：(share object)动态链接库，跟Windows平台类似。
            .o： 目标文件，相当于源代码对应的二进制文件。
            .a： 与.o类似，多个.o的集合
10. Why doesn't Rust have increment and decrement operators?
Preincrement and postincrement (and the decrement equivalents), while convenient, are also fairly complex. They require knowledge of evaluation order, and often lead to subtle bugs and undefined behavior in C and C++. x = x + 1 or x += 1 is only slightly longer, but unambiguous.

## Refs
[Official homepage](https://www.rust-lang.org/)  
[Book - The Rust Programming Language](https://doc.rust-lang.org/book)  
[Book - Rust By Example](https://doc.rust-lang.org/stable/rust-by-example/crates/link.html)  
[Book - 通过例子学 Rust](https://rustwiki.org/zh-CN/rust-by-example/std/box.html)
[Book - The Rust Reference](https://doc.rust-lang.org/reference/linkage.html)
[Book - Another book](https://www.cs.brandeis.edu/~cs146a/rust/doc-02-21-2015/book/arrays-vectors-and-slices.html)

[learning-rust](https://learning-rust.github.io/docs/b1.vectors.html)

[Packages](https://crates.io/)  
[Examples](https://doc.rust-lang.org/stable/rust-by-example/)  
[Cheat](https://cheats.rs/)  
[Rust语言中文社区](https://rustcc.cn/)  