package main

import "fmt"

func main() {
	list := []int{5,2,3,1}
	result := quickSort(list)
	fmt.Println(result)
}

func quickSort(list []int) []int {
	if len(list) <=1 {
		return list
	}
	ind := len(list)/2
	left := []int{}
	right := []int{}
	result := []int{}

	for i := range list {
		if i==ind {
			continue
		}
		if list[i] < list[ind] {
			left = append(left, list[i])
		}else {
			right = append(right, list[i])
		}
	}
	result = append(result, quickSort(left)...)
	result = append(result, list[ind])
	result = append(result, quickSort(right)...)
	return result
}