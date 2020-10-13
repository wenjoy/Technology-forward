## FAQ

1. convert between int and float

1.1 `10 -> "10"` 
`strconv.Itoa(10)`

1.2 `"10" -> 10` 
`~~int("10")~~`
`strconv.Atoi("100")`

1.2.1 `"10.5" -> 10.5`
`~~float("10.5")~~`

2. string and convert
[blog of Rob Pike explained string in go thoroughly](https://blog.golang.org/strings)

3. import in go
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

refs:
1. https://learnku.com/docs/the-way-to-go
2. https://www.oreilly.com/library/view/introducing-go/9781491941997/
3. [Implement of Go data structure](https://flaviocopes.com/golang-data-structures/)
