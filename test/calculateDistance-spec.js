const assert = require("assert");
const { expect } = require("chai");

const {
    distanceInKmBetweenEarthCoordinates,
    degreesToRadians,
    InvalidCoordinateException,
} = require("../utils/calculateDistance");

const location1 = { lat: 32.7766642, lon: -96.7969879 };
const location2 = { lat: 34.0522342, lon: -118.2436849 };
const location3 = { lat: 91, lon: 0 };
const location4 = { lat: 0, lon: -181 };

describe("distanceInKmBetweenEarthCoordinates()", () => {
    describe("checks for valid coordinates input", () => {
        it("should throw InvalidCoordinateException when latitude input is out of valid range", () => {
            expect(() =>
                distanceInKmBetweenEarthCoordinates(location3, location1)
            ).to.throw(InvalidCoordinateException());
        });

        it("should throw InvalidCoordinateException when longitude input is out of valid range", () => {
            expect(() =>
                distanceInKmBetweenEarthCoordinates(location4, location1)
            ).to.throw(InvalidCoordinateException());
        });
    });

    describe("checks distance calculation", () => {
        it("should calculate the earth distance between two coordinate locations", () => {
            let test = distanceInKmBetweenEarthCoordinates(
                location1,
                location2
            );
            let result = 1994.22;

            assert.strictEqual(test, result);
        });
    });
});

describe("degreesToRadians()", () => {
    describe("checks degrees to radians coversion", () => {
        it("should covert coordinate degress to radians", () => {
            let test = degreesToRadians(location1.lat);
            let result = 0.5720607081105532;

            assert.strictEqual(test, result);
        });
    });
});
