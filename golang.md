## FAQ

### 1. convert between int and float

1.1 `10 -> "10"` 
`strconv.Itoa(10)`

1.2 `"10" -> 10` 
`~~int("10")~~`
`strconv.Atoi("100")`

1.2.1 `"10.5" -> 10.5`
`~~float("10.5")~~`

### 2. string and convert
[blog of Rob Pike explained string in go thoroughly](https://blog.golang.org/strings)

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
6.1 `copy(a[i:], a[i+1:]);a = a[:len(a)-1]`
6.2 `a[i]=a[len(a)-1];a = a[:len(a)-1]`
6.3 `a=append(a[:i], a[i+1:]...)`

[2 ways to delete an element from a slice](https://yourbasic.org/golang/delete-element-slice/)
[How to delete an element from a Slice in Golang](https://stackoverflow.com/questions/37334119/how-to-delete-an-element-from-a-slice-in-golang)


refs:
1. https://learnku.com/docs/the-way-to-go
2. https://www.oreilly.com/library/view/introducing-go/9781491941997/
3. [Implement of Go data structure](https://flaviocopes.com/golang-data-structures/)
