# Encode

绕不过的阮老师[字符编码笔记：ASCII，Unicode 和 UTF-8](http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html)


## ascii
ASCII 码一共规定了128个字符的编码, 只占用了一个字节的后面7位，最前面的一位统一规定为0  
其他语言，128个符号是不够的, 利用最前面的一位， 变为零，又多了 128 个  
还不够  

![](../assets/ascii.png)

## Unicode
现在的规模可以容纳100多万个符号  
unicode.org

如何才能区别 Unicode 和 ASCII ？计算机怎么知道三个字节表示一个符号，而不是分别表示三个符号呢

## UTF-8
UTF-8 就是在互联网上使用最广的一种 Unicode 的实现方式  
使用1~4个字节表示一个符号  
单字节的符号，字节的第一位设为0  
n字节的符号  
第一个字节的前n位都设为1，第n + 1位设为0，后面字节的前两位一律设为10。剩下的没有提及的二进制位，全部为这个符号的 Unicode 码  

|Unicode符号范围     |        UTF-8编码方式|
|(十六进制)        |              （二进制）|
|--|--|
|0000 0000-0000 007F | 0xxxxxx|
|0000 0080-0000 07FF | 110xxxxx 10xxxxxx|
|0000 0800-0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx|
|0001 0000-0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx|

## UTF-16
![](https://picb.zhimg.com/v2-00d7e0f8c532a2651e450ba7b93e0da7_r.jpg)  
UTF-16 用二个字节来表示基本平面，用四个字节来表示扩展平面

[An online tool](https://www.qqxiuzi.cn/bianma/Unicode-UTF.php)


String.fromCharCode(200) // utf-16
-> "È"

'🏃'.charCodeAt() // if it exceeds 65536, only display the first two bytes
55356

'🏃'.codePointAt() // use codePoint get all
127939

new TextEncoder().encode('È')  // utf-8
-> Uint8Array(2) [195, 136]

`` is the `128`th character. so in utf-8, it needs two bytes. It's the first character deserve two bytes, congrats europe dollar!

