// Load project params as JS object
const projectParams = require("./data/project.json");

// Load utils functions
const { readRespondentsData } = require("./utils/parseInputData");
const matchRespondents = require("./utils/matchRespondentsToParams");

// Declare class
class RespondentMatcher {
    constructor(respondentsDataFilePath, projectParams) {
        this.respondentsDataFilePath = respondentsDataFilePath;
        this.projectParams = projectParams;
        this.results = [];
        this.parsedData = {};
    }

    // Class getters
    getRespondentsDataFilePath() {
        return this.respondentsDataFilePath;
    }
    getProjectParams() {
        return this.projectParams;
    }
    getResults() {
        return this.results;
    }

    // Parse data method
    async parseData() {
        this.parsedData = await readRespondentsData(
            this.respondentsDataFilePath
        );
    }

    // Match respondents to project parameters
    matchRespondentsToProjectParams() {
        this.results = matchRespondents(this.parsedData, this.projectParams);
    }

    // Returns top eight results
    returnTopEightResults() {
        let results = [];
        for (let i = 0; i < 8; i++) {
            results.push(this.results[this.results.length - 1 - i]);
        }
        return results;
    }

    // Display all matches on terminal
    displayAllMatchedRespondents() {
        console.log("\nAll matches- ordered by matching scores:");
        console.log("===================================\n");
        for (let i = 0; i < this.results.length; i++) {
            const curr = this.results[this.results.length - 1 - i];
            console.log(i);
            console.log(
                `Name: ${curr.name.slice(0, 1).toUpperCase()}${curr.name.slice(
                    1
                )}`
            );
            console.log(
                `Number of matching industries: ${curr.industriesMatch.number}`
            );
            console.log(
                `Job matches: ${(() =>
                    curr.jobMatches.match
                        ? curr.jobMatches.jobTitle
                        : "No job matches")()}`
            );
            console.log(
                `Closest available city: ${curr.closestAvailableCity.city}`
            );
            console.log(
                `Distance to closest available city: ${curr.closestAvailableCity.distance}km`
            );
            console.log(`Matching Score: ${curr.score}`);
            console.log("-------------------------------");
        }
    }

    // Displays top 8 matches on terminal
    displayTopEightMatchedRespondents() {
        console.log("\nTop 8 matches- by matching scores:");
        console.log("===================================\n");

        for (let i = 0; i < 8; i++) {
            const curr = this.results[this.results.length - 1 - i];
            console.log(i);
            console.log(
                `Name: ${curr.name.slice(0, 1).toUpperCase()}${curr.name.slice(
                    1
                )}`
            );
            console.log(
                `Distance to closest available city: ${curr.closestAvailableCity.distance}km`
            );
            console.log(`Matching Score: ${curr.score}`);
            console.log("-------------------------------");
        }
    }
}

const newMatcher = new RespondentMatcher(
    "./data/respondents_data_test.csv",
    projectParams
);

const demo = () =>
    (async () => {
        await newMatcher.parseData();
        newMatcher.matchRespondentsToProjectParams();
        newMatcher.displayTopEightMatchedRespondents();
    })();

const demo2 = () =>
    (async () => {
        await newMatcher.parseData();
        newMatcher.matchRespondentsToProjectParams();
        newMatcher.displayAllMatchedRespondents();
    })();

module.exports = { RespondentMatcher, demo, demo2 };
