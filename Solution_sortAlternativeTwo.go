
package main

import (
    "fmt"
    "sort"
)

type Element struct {
    value int
    index int
}

var numberOfElements int

func findScore(input []int) int64 {
    numberOfElements = len(input)
    var elementsSortedByAscendingValue []Element = createElementsSortedByAscendingValue(input)
    return calculateTotalScore(elementsSortedByAscendingValue)
}

func createElementsSortedByAscendingValue(input []int) []Element {
    elements := make([]Element, numberOfElements)
    for i := 0; i < numberOfElements; i++ {
        elements[i] = Element{value: input[i], index: i}
    }

    sort.Sort(compare_minValue_bySameValue_minIndex(elements))

    return elements
}

type compare_minValue_bySameValue_minIndex []Element

func (c compare_minValue_bySameValue_minIndex) Len() int {
    return len(c)
}
func (c compare_minValue_bySameValue_minIndex) Swap(i, j int) {
    c[i], c[j] = c[j], c[i]
}
func (c compare_minValue_bySameValue_minIndex) Less(i, j int) bool {
    x := c[i]
    y := c[j]
    return Ternary((x.value == y.value), (x.index < y.index), (x.value < y.value))
}

func calculateTotalScore(elementsSortedByAscendingValue []Element) int64 {
    marked := make([]bool, numberOfElements)
    var totalScore int64 = 0

    for i := 0; i < numberOfElements; i++ {
        element := elementsSortedByAscendingValue[i]
        if marked[element.index] {
            continue
        }

        totalScore += int64(element.value)
        marked[element.index] = true

        if element.index-1 >= 0 {
            marked[element.index-1] = true
        }
        if element.index+1 < numberOfElements {
            marked[element.index+1] = true
        }
    }

    return totalScore
}

func Ternary[T any](condition bool, first T, second T) T {
    if condition {
        return first
    }
    return second
}
