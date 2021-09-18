

## ArrayBuffer

1. ArrayBuffer对象、TypedArray对象、DataView对象是JavaScript操作二进制数据的一个接口
2. 这些对象原始的设计目的，与WebGL项目有关。所谓WebGL，就是指浏览器与显卡之间的通信接口
3. 为什么要用二进制，不能用文本传递数据？因为文本格式传递一个32位整数，两端的JavaScript脚本与显卡都要进行格式转化，将非常耗时

分配长度为n的内存，但是不能直接读写，每个字节的值默认都是0

```js
var buffer = new ArrayBuffer(4);
```

### TypedArray

要想进行读写，必须通过视图，`ArrayBuffer`有两种视图，一种是TypedArray视图，另一种是DataView视图,前者的数组成员都是同一个数据类型，后者的数组成员可以是不同的数据类型。

```js
var x1 = new Int32Array(buffer);
x1[0] = 1;
x1[0] // 1
var x2 = new Uint8Array(buffer);
x2[0]  = 2;
x2[1]  = 2;
x2[2]  = 2;
x2[3]  = 2;
```

注意，不同的视图对应的是同一块内存。

![Typed arrays in an ArrayBuffer](https://mdn.mozillademos.org/files/8629/typed_arrays.png)

```js
// 创建一个8字节的ArrayBuffer
var b = new ArrayBuffer(8);

// 创建一个指向b的Int32视图，开始于字节0，直到缓冲区的末尾
var v1 = new Int32Array(b);

// 创建一个指向b的Uint8视图，开始于字节2，直到缓冲区的末尾
var v2 = new Uint8Array(b, 2);

// 创建一个指向b的Int16视图，开始于字节2，长度为2
var v3 = new Int16Array(b, 2, 2);
```

`v1`、`v2`和`v3`是重叠的：`v1[0]`是一个32位整数，指向字节0～字节3；`v2[0]`是一个8位无符号整数，指向字节2；`v3[0]`是一个16位整数，指向字节2～字节3。只要任何一个视图对内存有所修改，就会在另外两个视图上反应出来。

TypedArray更快捷的操作是不用先分配ArrayBuffer：

```js
var typedArray = new Uint8Array([0,1,2]); //分配内存并赋值 [0,1,2]
typedArray.length // 3

typedArray[0] = 5;
typedArray // [5, 1, 2]

var f64a = new Float64Array(8); //分配长度， 默认值为0
f64a[0] = 10;

var typedArray = new Int8Array(new Uint8Array(4)); 
```

### ByteOrder

字节序指的是数值在内存中的表示方式。分为大端字节序（little endian）和小端字节序（little endian）。所有个人电脑几乎都是小端字节序，网络传输是大端字节序。

```js
// 假定某段buffer包含如下字节 [0x02, 0x01, 0x03, 0x07]
var buffer = new ArrayBuffer(4);
var v1 = new Uint8Array(buffer);
v1[0] = 2;
v1[1] = 1;
v1[2] = 3;
v1[3] = 7;

var uInt16View = new Uint16Array(buffer);

// 计算机采用小端字节序
// 所以头两个字节等于258
if (uInt16View[0] === 258) {
  console.log('OK'); // "OK"
}

// 赋值运算
uInt16View[0] = 255;    // 字节变为[0xFF, 0x00, 0x03, 0x07]
uInt16View[0] = 0xff05; // 字节变为[0x05, 0xFF, 0x03, 0x07]
uInt16View[1] = 0x0210; // 字节变为[0x05, 0xFF, 0x10, 0x02]
```

## ArrayBuffer与字符串的互相转换

```js
// ArrayBuffer转为字符串，参数为ArrayBuffer对象
function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

// 字符串转为ArrayBuffer对象，参数为字符串
//前提是字符串的编码方法是确定的。假定字符串采用UTF-16编码（JavaScript的内部编码方式)
function str2ab(str) {
  var buf = new ArrayBuffer(str.length * 2); // 每个字符占用2个字节
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}
```

## Blob

Binary large object

#### blob and file

```js
var debug = {hello: "world"};
var blob = new Blob([JSON.stringify(debug, null, 2)], {type : 'application/json'});
```

file是基于blob封装的，增加了自己的属性，比如filename，modifiedDate等等

```javascript
let files = new File([this.blob], file.name, {type: file.type})
```

#### blob and arraybuffer

arraybuffer  to blob

```js
var array = new Uint16Array([97, 32, 72, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 33]);
//测试成功
var blob = new Blob([array], { type: "application/octet-binary" });

var buffer = new ArrayBuffer(32);
var blob = new Blob([buffer]);  
```

blob to arraybuffer

```js
var bl = new Blob(); // bl是要转换的blob
var fr = new FileReader();
fr.onload = function(){
	var ab = this.result; // ab是转换后的结果
}
fr.readAsArrayBuffer(bl);
```

#### blob 使用

```js
var url = URL.createObjectURL(blob);
```

## Base64

MIME的全称是"Multipurpose Internet Mail Extensions", 其中一种骗码方式是base64. 即把二进制转化为文本编码，也就是ascii。

从ascii中选出64个字符----小写字母a-z、大写字母A-Z、数字0-9、符号"+"、"/"（再加上作为垫字的"="，实际上是65个字符）----作为一个基本字符集。

第一步，将每三个字节作为一组，一共是24个二进制位。

第二步，将这24个二进制位分为四组，每个组有6个二进制位。

第三步，在每组前面加两个00，扩展成32个二进制位，即四个字节。

第四步，根据下表，得到扩展后的每个字节的对应符号，这就是Base64的编码值。

不足三个字节的，用=补齐。 

所以最终转化后的结果就是三个字节的数据变成了四个ascii字符。比如Man的Base64编码就是TWFu。

js里跟base64相关的转化方法是`btoa`和`atob`， 举例：`window.btoa("Man") -> 'TWFu'`; 不过这个只能对string转化，如果是二进制，就需要自己去转化了。

## Data URLs

即前缀为 `data:` 协议的URL，其允许内容创建者向文档中嵌入小文件。

`data:[<mediatype>][;base64],<data>`

example:

```html
 <img src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUA
    AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO
        9TXL0Y4OHwAAAABJRU5ErkJggg==" alt="Red dot" />
```



ref：

1. [二进制数组](https://javascript.ruanyifeng.com/stdlib/arraybuffer.html#toc7)
2. [Base64笔记](https://www.ruanyifeng.com/blog/2008/06/base64.html)
3. 

