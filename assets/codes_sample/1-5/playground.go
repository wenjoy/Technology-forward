package main

import (
	"fmt"
	"strconv"
	"unicode/utf8"
)

func main() {
	nums := []int{1, 2, 3, 4, 5, 6, 7, 8, 9}
	reverse(nums, 0, 4)
	fmt.Println(nums)
	return

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
	s := string(rs)
	fmt.Println("converted: ", s)
	l = len(rs)
	fmt.Println("len: ", l)
	for i := 0; i < len(rs); i++ {
		fmt.Println(i, " --> ", rs[i], string(rs[i]))
	}

}
func reverse(nums []int, start int, end int) {
	count := (end - start + 1) / 2
	for i := 0; i < count; i++ {
		current := i + start
		j := end - i
		nums[current] += nums[j]
		nums[j] = nums[current] - nums[j]
		nums[current] -= nums[j]
	}
}
