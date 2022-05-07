package main

import "fmt"

var	i int =0

func gen() func() {
	i+=1
	n := i
	return func () {
		fmt.Println(n)
	}
}

func main() {
	fn1 := gen()
	fn2 := gen()
	fn1()
	fn2()
}
