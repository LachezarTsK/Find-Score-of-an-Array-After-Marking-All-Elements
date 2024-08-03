
class Solution {

    private data class Element(val value: Int, val index: Int) {}

    private var numberOfElements: Int = 0

    fun findScore(input: IntArray): Long {
        numberOfElements = input.size
        val elementsSortedByAscendingValue: ArrayList<Element> = createElementsSortedByAscendingValue(input)
        return calculateTotalScore(elementsSortedByAscendingValue)
    }

    private fun createElementsSortedByAscendingValue(input: IntArray): ArrayList<Element> {
        val elements = ArrayList<Element>(numberOfElements)
        for (i in 0..<numberOfElements) {
            elements.add(Element(input[i], i))
        }
        elements.sortWith() { x, y -> compare_minValue_bySameValue_minIndex(x, y) }
        return elements
    }

    private fun compare_minValue_bySameValue_minIndex(x: Element, y: Element): Int {
        return if (x.value == y.value) (x.index - y.index) else (x.value - y.value)
    }

    private fun calculateTotalScore(elementsSortedByAscendingValue: ArrayList<Element>): Long {
        val marked = BooleanArray(numberOfElements)
        var totalScore: Long = 0

        for (i in 0..<numberOfElements) {
            val element = elementsSortedByAscendingValue[i]

            if (marked[element.index]) {
                continue
            }

            totalScore += element.value
            marked[element.index] = true

            if (element.index - 1 >= 0) {
                marked[element.index - 1] = true
            }
            if (element.index + 1 < numberOfElements) {
                marked[element.index + 1] = true
            }
        }

        return totalScore
    }
}
