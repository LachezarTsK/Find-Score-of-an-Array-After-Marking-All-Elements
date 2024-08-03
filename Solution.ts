
function findScore(input: number[]): number {
    this.numberOfElements = input.length;
    const pointsSortedByAscendingValue = createPointsSortedByAscendingValue(input);
    return calculateTotalScore(pointsSortedByAscendingValue);
};

class Point {

    value: number;
    index: number;

    constructor(value: number, index: number) {
        this.value = value;
        this.index = index;
    }
}

function createPointsSortedByAscendingValue(input: number[]): Point[] {
    const points = new Array(this.numberOfElements);
    for (let i = 0; i < this.numberOfElements; ++i) {
        points[i] = new Point(input[i], i);
    }
    points.sort((x, y) => compare_minValue_bySameValue_minIndex(x, y));
    return points;
}

function compare_minValue_bySameValue_minIndex(x: Point, y: Point): number {
    return (x.value === y.value) ? (x.index - y.index) : (x.value - y.value);
}

function calculateTotalScore(pointsSortedByAscendingValue: Point[]): number {
    const marked: boolean[] = new Array(this.numberOfElements).fill(false);
    let totalScore = 0;

    for (let i = 0; i < this.numberOfElements; ++i) {
        const point = pointsSortedByAscendingValue[i];

        if (marked[point.index]) {
            continue;
        }

        totalScore += point.value;
        marked[point.index] = true;

        if (point.index - 1 >= 0) {
            marked[point.index - 1] = true;
        }
        if (point.index + 1 < this.numberOfElements) {
            marked[point.index + 1] = true;
        }
    }

    return totalScore;
}
