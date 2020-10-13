package main

import (
	"fmt"
	"strconv"
	"unicode/utf8"
)

func main() {
	num := 10
	char := "10"
	fmt.Println("out", byte(num))
	fmt.Println("char", char)
	fmt.Println("string", string(num))
	fmt.Println("string", strconv.Itoa(num))

	intkk, _ := strconv.Atoi(char)
	fmt.Println("int", intkk)
	fmt.Println("int", int('2'))

	a, _ := strconv.Atoi("aaaaaa")
	fmt.Println("a", a)

	str1 := "abc我❤️你"
	l := len(str1)
	fmt.Println("len: ", l)
	for i := 0; i < l; i++ {
		fmt.Println(i, " --> ", str1[i])
	}
	fmt.Println("test: ", utf8.FullRuneInString(str1))

	bs := []byte(str1)
	l = len(bs)
	fmt.Println("len: ", l)
	for i := 0; i < len(bs); i++ {
		fmt.Println(i, " --> ", bs[i])
	}

	rs := []rune(str1)
	l = len(rs)
	fmt.Println("len: ", l)
	for i := 0; i < len(rs); i++ {
		fmt.Println(i, " --> ", rs[i], string(rs[i]))
	}
}
