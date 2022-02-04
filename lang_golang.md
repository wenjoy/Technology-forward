## FAQ

### 1. convert between int and float

1.1 `10 -> "10"` 
`strconv.Itoa(10)`

1.2 `"10" -> 10` 
~~int("10")~~  `strconv.Atoi("100")`

1.2.1 `"10.5" -> 10.5`
`~~float("10.5")~~`

### 2. string and convert
[blog of Rob Pike explained string in go thoroughly](https://blog.golang.org/strings)
`var data []byte = []byte(str)`

`var str string = string(data[:])`

### 3. import in go
3.1 no relative import in go

only outside $GOPATH
[everything about go import](https://scene-si.org/2018/01/25/go-tips-and-tricks-almost-everything-about-imports/)

3.2 relative example
give file structure: 

```
list
  |- list_test.go
  |- list.go
```
```go
//list.go
package list
```

`.` is taken as a path name, not `current directory`, `..` is taken as `upper directory`. It's a littler strange
```go
//list_test.go
package list_test
import "./list" // error: cannot find package at ....
import "../list" // success
```
### 4 fmt.Print
4.1 `fmt.Printf`
```go
bool:                    %t
int, int8 etc.:          %d
uint, uint8 etc.:        %d, %#x if printed with %#v
float32, complex64, etc: %g
string:                  %s
chan:                    %p
pointer:                 %p
```

### 5 debug in go
[ vscode-go/docs/debugging.md ](https://github.com/golang/vscode-go/blob/master/docs/debugging.md)

### 6 remove an element in slice
```go
  a := []string{"A", "B", "C", "D", "E"}
	i := 2
```
three ways:
6.1 `copy(a[i:], a[i+1:]);a = a[:len(a)-1]`
6.2 `a[i]=a[len(a)-1];a = a[:len(a)-1]`
6.3 `a=append(a[:i], a[i+1:]...)`

[2 ways to delete an element from a slice](https://yourbasic.org/golang/delete-element-slice/)
[How to delete an element from a Slice in Golang](https://stackoverflow.com/questions/37334119/how-to-delete-an-element-from-a-slice-in-golang)

### 7 pass slice to function
1. as default it copy slice, pass pointer to change the default behavior
2. assign back to dereferenced pointer to modify the slice
```go
func myAppend(list *[]string, value string) {
    *list = append(*list, value)
}
```
[click me](https://stackoverflow.com/questions/49428716/pass-slice-as-function-argument-and-modify-the-original-slice)

### 8 cannot use `&` with `append`
```go
&append([]int{}, 1) // error
```
[The spec says that to use & on something it has to be addressable...go doesn't make the result of a function addressable](https://stackoverflow.com/questions/30744965/how-to-get-the-pointer-of-return-value-from-function-call)

### 9 gin return to json string from a slice
`c.JSON(200, slice)`

### 10 gin get post json body why use bind, not more intuitive way
???

### 11 `make([]string,1)` get `[nil]`
`make([]string,0)` get `[]`, the first way may cause bug in `for loop`

### 12 define same package in different files, cant invoke, got undefined error
正常来说同一个package下，函数是可以相互调用的，不应该报错， 出现这种问题的原因是没有对这个package整体进行编译
1. 多个.go文件一起编译运行 `go run a.go b.go`
2. 直接运行这个package `go run ./`

### 13 serialize and deserialize in go 
`func Marshal(v interface{}) ([]byte, error)`  
serialize: `data, err := json.Marshal(map[string]string)`  
Map keys must be strings.

====  
 deserialize
 example: 
 ```json
 data={
   "name":"zhang san"
 }
 ```
 1. tag struct 
  ```go
  type Obj struct {
    username string `json:"name"`
  }
  var obj Obj
  err := json.Unmarshal([]byte(data), &obj)
  ```
  [serialize](https://code.tutsplus.com/tutorials/json-serialization-with-golang--cms-30209)  

 2. type infer
 ```go
  var jsonI interface{}
  err := json.Unmarshal([]byte(data), &jsonI)
  jsonM, ok := jsonI.(map[string]interface{})
  value := jsonM["name"]
 ```
 [deserialize](https://jingwei.link/2019/03/15/golang-json-unmarshal-using.html)


 ### 14 log.Fatal 是什么
 `log.Fatal` will call `os.Exit(1)`
 `defer` function will not execute
 `panic` equal exception, and defer function will be executed
 I encountered this issue when work on an websocket project, every time I refresh page, server will shut down with error `1011` and exit with code 1.  
 I searched about `why websocket exit with 1011` and `keep alive in websocket` but it's not the thing.
 finally I have to use the overkill weapon -- `debug`, and I realized 
suspect is `log.Fatal`
```go

	for {
		fmt.Println("wait read")
		messageType, message, err := conn.ReadMessage()
		if err != nil {
			log.Fatalf("websocket read error: %v[]", err)
			continue
    }
    ...
```

### 15 check io.Reader 's value
r io.Reader  
`b, err := ioutil.ReadAll(r)`


### 16 how to set http request header
The Header field of the Request is public. You may do this :
```go
	req, _ := http.NewRequest(http.MethodPost, "/agency", strings.NewReader(string(body)))
req.Header.Set("name", "value")
```

### 17 [explorer this repo -- awesome go](https://github.com/avelino/awesome-go)

### 18 equivalent of constructor in go
```go
type Thing struct {
    Name  string
    Num   int
}
func NewThing(someParameter string) *Thing {
    p := new(Thing)
    p.Name = someParameter
    p.Num = 33 // <- a very sensible default value
    return p
}
//or
func makeThing(name string) Thing {
    return Thing{name, 33}
}
```

### 19 type alias in go
`type T1=T2` not `type T1 T2`

### 20 declare function in function
必须用赋值，不能再函数里面再声明函数，函数里面只能声明匿名函数
```go
func a() {
  var b func()
  b = func() {
    b()
  }
}
```

### 21 the max number of int

`math.MaxInt32`

refs:
1. https://learnku.com/docs/the-way-to-go
2. https://www.oreilly.com/library/view/introducing-go/9781491941997/
3. [Implement of Go data structure](https://flaviocopes.com/golang-data-structures/)

### FAQ:

1. go项目的依赖

   首先确认go的env和version

   `go env` list所有的go相关的环境变量，  `go version` 显示当前版本

   注意其中的`GOPATH` `GOPROXY` 

   go 会在GOPATH下找依赖的module

   因为有些资源需要翻墙，需要设置GOPROXY，`export GOPROXY=https://goproxy.io,direct` 参考：https://goproxy.io/zh/

   设置完GOPATH，遇到了这个错误could not create module cache: mkdir /User: read-only file system

   应该是我设置的GOPATH  ` export GOPATH=/User/wenjoy/workspace/studio/go`没有权限, 用`chown -R` 应该可以解决，我用了reset到默认gopath的办法，也可以解决

   go从1.1之后就支持go mod了，以后遇到go的项目都可以用这种方式来解决依赖，之前是依赖GOPATH，安装依赖是靠手动`go get github.com/davecgh/go-spew/spew` 这样。

   用go mod的方式是，先在root下`go mod init <mod_name>`，会生成go.mod, 然后执行`go mod tidy` , 就会自动安装依赖,生产go.sum文件

   Go mod参考这个https://juejin.cn/post/6844903798658301960
