const assert = require("assert");
const { allowedNodeEnvironmentFlags } = require("process");

const binaryInsert = require("../utils/sortingAlgorithm");

const elementsArray = (() => {
    const array = [];
    for (let i = 0; i < 100; i++) {
        array.push({ score: Math.floor(Math.random() * 100) });
    }
    return array;
})();

let results = [];
describe("binaryInsert()", () => {
    beforeEach(() => {
        elementsArray.forEach((item) => binaryInsert(item, results));
    });

    describe("checks edge cases", () => {
        it("should not modify input array when given empty object as input", () => {
            let arr = [];
            binaryInsert({}, arr);

            let expected = [];

            assert.strictEqual(arr.length, expected.length);
        });
    });

    describe("checks sorting algorithm works correctly", () => {
        it("should return a populated array with 100 values", () => {
            let expected = new Array(100).fill(null);

            assert.strictEqual(elementsArray.length, expected.length);
        });

        it("should return true for expression 'results[n] <= results[n+1]' for any randon n", () => {
            let n = Math.floor(Math.random() * 100);

            let result = (() => results[n] <= results[n + 1])();

            let expected = true;

            assert.strictEqual(result, expected);
        });

        it("should return false for expression 'results[n] <= results[n+1]' for any randon n", () => {
            let n = Math.floor(Math.random() * 100);

            let result = (() => results[n] > results[n + 1])();

            let expected = false;

            assert.strictEqual(result, expected);
        });
    });
});
