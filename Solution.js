
/**
 * @param {number[]} input
 * @return {number}
 */
var findScore = function (input) {
    this.numberOfElements = input.length;
    const elementsSortedByAscendingValue = createElementsSortedByAscendingValue(input);
    return calculateTotalScore(elementsSortedByAscendingValue);
};

/**
 * @param {number} value
 * @param {number} index
 */
function  Element(value, index) {
    this.value = value;
    this.index = index;
}

/**
 * @param {number[]} input
 * @return {Element[]}
 */
function  createElementsSortedByAscendingValue(input) {
    const elements = new Array(this.numberOfElements);
    for (let i = 0; i < this.numberOfElements; ++i) {
        elements[i] = new Element(input[i], i);
    }
    elements.sort((x, y) => compare_minValue_bySameValue_minIndex(x, y));
    return elements;
}

/**
 * @param {Element} x
 * @param {Element} y 
 * @return {number}
 */
function compare_minValue_bySameValue_minIndex(x, y) {
    return (x.value === y.value) ? (x.index - y.index) : (x.value - y.value);
}

/**
 * @param {Element[]} elementsSortedByAscendingValue
 * @return {number}
 */
function calculateTotalScore(elementsSortedByAscendingValue) {
    const marked = new Array(this.numberOfElements).fill(false);
    let totalScore = 0;

    for (let i = 0; i < this.numberOfElements; ++i) {
        const element = elementsSortedByAscendingValue[i];

        if (marked[element.index]) {
            continue;
        }

        totalScore += element.value;
        marked[element.index] = true;

        if (element.index - 1 >= 0) {
            marked[element.index - 1] = true;
        }
        if (element.index + 1 < this.numberOfElements) {
            marked[element.index + 1] = true;
        }
    }

    return totalScore;
}
