
using System;

public class Solution
{
    private sealed record Element(int value, int index) { }

    private int numberOfElements;

    public long FindScore(int[] input)
    {
        numberOfElements = input.Length;
        Element[] elementsSortedByAscendingValue = CreateElementsSortedByAscendingValue(input);
        return CalculateTotalScore(elementsSortedByAscendingValue);
    }

    private Element[] CreateElementsSortedByAscendingValue(int[] input)
    {
        Element[] elements = new Element[numberOfElements];
        for (int i = 0; i < numberOfElements; ++i)
        {
            elements[i] = new Element(input[i], i);
        }
        Array.Sort(elements, (x, y) => Compare_minValue_bySameValue_minIndex(x, y));
        return elements;
    }

    private int Compare_minValue_bySameValue_minIndex(Element x, Element y)
    {
        return (x.value == y.value) ? (x.index - y.index) : (x.value - y.value);
    }

    private long CalculateTotalScore(Element[] elementsSortedByAscendingValue)
    {
        bool[] marked = new bool[numberOfElements];
        long totalScore = 0;

        for (int i = 0; i < numberOfElements; ++i)
        {
            Element element = elementsSortedByAscendingValue[i];

            if (marked[element.index])
            {
                continue;
            }

            totalScore += element.value;
            marked[element.index] = true;

            if (element.index - 1 >= 0)
            {
                marked[element.index - 1] = true;
            }
            if (element.index + 1 < numberOfElements)
            {
                marked[element.index + 1] = true;
            }
        }

        return totalScore;
    }
}
