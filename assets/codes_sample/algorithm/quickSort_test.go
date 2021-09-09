package main

import (
	"fmt"
	"math/rand"
	"reflect"
	"testing"
)

func BenchmarkQuickSort(t *testing.B) {
	mockData := mockData(20000)
	t.ResetTimer()
	quickSort(mockData)
}

func BenchmarkQuickSortInPlace(t *testing.B) {
	mockData := mockData(20000)
	t.ResetTimer()
	quickSortInPlace(mockData)
}

func mockData(scale int) []int {
	list := make([]int, scale)
	for _, i := range list {
		list[i] = rand.Int()
	}
	return list
}

/*
go test --benchtime=10x -benchmem --bench=. --count=3
--benchmem generate memory report
--bench={regex} filter
-benchtime=5s default is 1s, excute 5 seconds
-benchtime=30x execute 30 times
--count whole benchtest excute number

example:
go test --benchmem --bench=.

goos: darwin
goarch: amd64
{test case name}-{cpu number}     {execute numbers}   {time}                  {mem}
BenchmarkQuickSort-8              233876              5398 ns/op            9293 B/op          0 allocs/op
BenchmarkQuickSortInPlace-8     1000000000               0.0338 ns/op          0 B/op          0 allocs/op
*/

func TestSort(t *testing.T) {
	t.Run("sort", func(t *testing.T) {
		data := []int{6, 1, 3, 5, 8}
		quickSortInPlace(data)
		expect := []int{1, 3, 5, 6, 8}
		if reflect.DeepEqual(data, expect) {
			fmt.Println("true")
		} else {
			t.Errorf("expected %+v, got %+v \n", expect, data)
		}
	})
}
