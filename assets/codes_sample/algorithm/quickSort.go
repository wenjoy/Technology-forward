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

func quickSortInPlace(list []int) {
	sorter(list, 0, len(list)-1)
}
func sorter(list []int, left, right int) {
	if left > right {
		return
	}
	strainer := left
	pivot := list[right]
	for i:=left;i<right;i++ {
		if(list[i]<pivot) {
			swap(list, i, strainer)
			strainer++
		}
	}
	swap(list, strainer, right)
	sorter(list, left, strainer-1)
	sorter(list, strainer+1, right)
}
func swap(list []int, i, j int) {
	list[i], list[j] = list[j], list[i]
}