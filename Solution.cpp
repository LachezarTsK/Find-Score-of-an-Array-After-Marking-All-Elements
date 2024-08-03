
#include <span>
#include <ranges>
#include <vector>
using namespace std;

class Solution {

    struct Element {
        int value{};
        size_t index{};

        Element() = default;
        ~Element() = default;

        Element(int value, size_t index) : value{ value }, index{ index } {}
    };

    size_t numberOfElements{};

public:
    long long findScore(const vector<int>& input) {
        numberOfElements = input.size();
        vector<Element> elementsSortedByAscendingValue = createElementsSortedByAscendingValue(input);
        return calculateTotalScore(elementsSortedByAscendingValue);
    }

private:
    vector<Element> createElementsSortedByAscendingValue(span<const int> input) const {
        vector<Element> elements;
        elements.reserve(numberOfElements);
        for (size_t i = 0; i < numberOfElements; ++i) {
            elements.emplace_back(input[i], i);
        }

        const auto compare_minValue_bySameValue_minIndex = [](const Element& x, const Element& y) {
                   return (x.value == y.value) ? (x.index < y.index) : (x.value < y.value);};

        ranges::sort(elements, compare_minValue_bySameValue_minIndex);
        return elements;
    }

    long long calculateTotalScore(span<const Element> elementsSortedByAscendingValue) const {
        vector<bool> marked(numberOfElements);
        long long totalScore = 0;

        for (size_t i = 0; i < numberOfElements; ++i) {
            Element element = elementsSortedByAscendingValue[i];

            if (marked[element.index]) {
                continue;
            }

            totalScore += element.value;
            marked[element.index] = true;

            if (element.index - 1 != variant_npos) {
                marked[element.index - 1] = true;
            }
            if (element.index + 1 < numberOfElements) {
                marked[element.index + 1] = true;
            }
        }

        return totalScore;
    }
};
