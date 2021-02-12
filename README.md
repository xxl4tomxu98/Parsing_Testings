# Respondent Matcher

By Jony Almeida-

## Run the program

-   for outputting the top 8 matches, please run:
    ##### npm run run
-   for running the tests, please run:
    ##### 'npm install --only=dev' --> 'npm run test'
-   for outputting the all matches in order, please run:
    ##### 'npm run run2'
-   for initializing the Express server to visualize results on browser, please run:
    ##### 'npm install' --> 'npm start'

**Table of Contents**

-   [Respondent Matcher at a Glance](#matcher-at-a-glance)
-   [Application Architecture & Technologies Used](#application-architecture)
-   [Backend Overview](#backend-overview)
-   [Code Highlights](#code-highlights)
-   [Conclusion & Next Steps](#conclusion-and-next-steps)

## Respondent Matcher at a Glance

Respondent Matcher is Scoring Algorithm function that calculates a Respondent candidate's matching score based on the candidate's information and the custom data points.

 ## Application Architecture

Respondent Matcher is designed as a stand alone algorithm that will take in respondents' data in csv format and the project parameters for ideal matching, as arguments.
Built in Node.js, with Javascript and tested with Mocha & Chai Assertion Library.

## Backend Overview

### Backend Technologies Used

#### Mocha

[Mocha](https://mochajs.org/) provided the simple to follow formatted test output.

#### Chai

[Express](https://chaijs.com/) added more testing options as an assertion library.

#### ExpressJS

[Express](https://expressjs.com/) was the natural choice for a simple Node.js server.

#### Pug

[Pug](https://www.pug.org/) was perfect for creating a web visualization of the results.

## Code Highlights

```javascript
//Async Mocha handle hook with chai-as-promised library
    describe("checks filetype is .csv", () => {
        it("should throw FyleTypeException when given wrong file format", async () => {
            await expect(readRespondentsData(badFile)).to.be.rejectedWith(
                FileTypeException(badFile)
            );
        });
    });

// Test Invalid Coordinates Input throw error
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

//Custom errors
// Coordinate out of range error
function InvalidCoordinateException() {
    this.message = " Coordinate is not in valid range.";
    this.toString = function () {
        return this.message;
    };
}

// Before Each Mocha hook
describe("RespondentMatcher()", () => {
    beforeEach(async () => {
        matcher = new RespondentMatcher(filePath, projectParams);
        await matcher.parseData();
        matcher.matchRespondentsToProjectParams();
    });
```

##### Matching Score Algorithm

```javascript
// Matching score algorithm

function matchScore(industryList, respondent) {
    // Calculate percentage of matching industries
    const industryMatchScore = (() =>
        (100 * respondent.industriesMatch.number) / industryList)();

    // Calculate percentage of distance considering max distance
    const distanceMatchScore = (() =>
        100 - respondent.closestAvailableCity.distance)();

    // Calculate percentage of job match
    const jobMatchScore = (() => (respondent.jobMatches.match ? 100 : 0))();

    // Calculate final score
    const score =
        ((industryMatchScore + distanceMatchScore + jobMatchScore) * 100) / 300;

    return score;
}
```

## Considerations

-   I assumed that the 3 scoring factors had the same weight when calculating the Matching Score
-   I assumed that a Respondent candidate closest distance would be the closest distance to any of the available cities in the project params cities array
-   Added a project breakdown readme file with an overall planning of the steps before starting

**Next Steps:**
Next steps for Respondent Matcher include:

-   developing a UI with form for data input and option selection
-   connecting a database

I had a lot of fun completing this project.
Thanks to all at Respondent! ✌🏽
