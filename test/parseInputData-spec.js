const assert = require("assert");
const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-as-promised"));
const fs = require("fs").promises;

const {
    readRespondentsData,
    FileTypeException,
} = require("../utils/parseInputData");

const file = "./data/respondents_data_test.csv";
const badFile = "image.jpg";

describe("readRespondentsData()", async () => {
    const parsedData = await readRespondentsData(file);
    const data = await fs.readFile(file, "utf8", (err, data) => {
        if (err) {
            return `Error reading file.\n${err}`;
        }
        return data;
    });

    describe("checks filetype is .csv", () => {
        it("should throw FyleTypeException when given wrong file format", async () => {
            await expect(readRespondentsData(badFile)).to.be.rejectedWith(
                FileTypeException(badFile)
            );
        });
    });

    describe("check number of entries in obj", () => {
        it("should return same number of entries as number of lines in input file - 1", async () => {
            let result = Object.keys(parsedData).length;
            let expected = data.split("\n").length - 1;

            assert.strictEqual(result, expected);
        });
    });

    describe("check that every entry in object has valid values", () => {
        it("should have all truthy values", () => {
            let result = (() =>
                Object.keys(parsedData).every((item) =>
                    Object.keys(item).every((item) => item)
                ))();
            let expected = true;

            assert.strictEqual(result, expected);
        });

        it("should return false if object has falsy values", () => {
            parsedData["499"].firstName = "";
            let result = (() =>
                Object.keys(parsedData).every((item) => {
                    Object.keys(item).every((item2) => !!item2);
                }))();
            let expected = false;

            assert.strictEqual(result, expected);
        });
    });
});
