
import java.util.Arrays;

public class Solution {

    private record Element(int value, int index){}

    private int numberOfElements;

    public long findScore(int[] input) {
        numberOfElements = input.length;
        Element[] elementsSortedByAscendingValue = createElementsSortedByAscendingValue(input);
        return calculateTotalScore(elementsSortedByAscendingValue);
    }

    private Element[] createElementsSortedByAscendingValue(int[] input) {
        Element[] elements = new Element[numberOfElements];
        for (int i = 0; i < numberOfElements; ++i) {
            elements[i] = new Element(input[i], i);
        }
        Arrays.sort(elements, (x, y) -> compare_minValue_bySameValue_minIndex(x, y));
        return elements;
    }

    private int compare_minValue_bySameValue_minIndex(Element x, Element y) {
        return (x.value == y.value) ? (x.index - y.index) : (x.value - y.value);
    }

    private long calculateTotalScore(Element[] elementsSortedByAscendingValue) {
        boolean[] marked = new boolean[numberOfElements];
        long totalScore = 0;

        for (int i = 0; i < numberOfElements; ++i) {
            Element element = elementsSortedByAscendingValue[i];

            if (marked[element.index]) {
                continue;
            }

            totalScore += element.value;
            marked[element.index] = true;

            if (element.index - 1 >= 0) {
                marked[element.index - 1] = true;
            }
            if (element.index + 1 < numberOfElements) {
                marked[element.index + 1] = true;
            }
        }

        return totalScore;
    }
}
