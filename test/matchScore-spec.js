const assert = require("assert");
const chai = require("chai");
const expect = chai.expect;

const { matchScore, BadRespondentData } = require("../utils/matchScore");
const { RespondentMatcher } = require("../RespondentMatcher");
const { professionalIndustry: industryList } = require("../data/project.json");
const projectParams = require("../data/project.json");
let filePath = "./data/respondents_data_test.csv";

let respondent = {};
describe("matchScore()", () => {
    beforeEach(async () => {
        matcher = new RespondentMatcher(filePath, projectParams);
        await matcher.parseData();
        matcher.matchRespondentsToProjectParams();
        respondent = matcher.getResults()[Math.floor(Math.random() * 495)];
    });

    describe("check that function throws Invalid Respondent Exception when given bad input data", () => {
        it("should throw BadRespondentData exception when respondent number of industries is undefined", () => {
            respondent.industriesMatch.number = undefined;

            expect(() => matchScore(industryList, respondent)).to.throw(
                BadRespondentData()
            );
        });

        it("should throw BadRespondentData exception when respondent distance is undefined", () => {
            respondent.closestAvailableCity.distance = undefined;

            expect(() => matchScore(industryList, respondent)).to.throw(
                BadRespondentData()
            );
        });
    });
    describe("check that random respondents get correct score", () => {
        it("should return correct score", () => {
            expect(matchScore(industryList.length, respondent)).to.equal(
                respondent.score
            );
        });

        it("should return score of 2/3rds of 100", () => {
            respondent.closestAvailableCity.distance = 0;
            respondent.industriesMatch.number = industryList.length;
            respondent.jobMatches.match = false;

            expect(matchScore(industryList.length, respondent)).to.eql("66.67");
        });

        it("should return score of 1/3rds of 100", () => {
            respondent.closestAvailableCity.distance = 100;
            respondent.industriesMatch.number = industryList.length;
            respondent.jobMatches.match = false;

            expect(matchScore(industryList.length, respondent)).to.eql("33.33");
        });

        it("should return score of 1/3rds of 100", () => {
            respondent.closestAvailableCity.distance = 0;
            respondent.industriesMatch.number = 0;
            respondent.jobMatches.match = false;

            expect(matchScore(industryList.length, respondent)).to.eql("33.33");
        });

        it("should return score of 100", () => {
            respondent.closestAvailableCity.distance = 0;
            respondent.industriesMatch.number = industryList.length;
            respondent.jobMatches.match = true;

            expect(matchScore(industryList.length, respondent)).to.eql(
                "100.00"
            );
        });
    });
});
