const { distanceInKmBetweenEarthCoordinates } = require("./calculateDistance");
const { matchScore } = require("./matchScore");
const binaryInsert = require("./sortingAlgorithm");

// Match respondents with project params
function matchRespondents(respondentsDataObject, projectParams) {
    const matchResults = [];
    let count = 0;

    for (let respondent in respondentsDataObject) {
        const curRespondent = respondentsDataObject[respondent];

        // Initialize current respondent output object
        const curRespondentOutput = { name: curRespondent.firstName };

        // Calculate respondent distance to available cities
        // Since only eliminating factor is distance > 100km
        // If closest distance to any available city > 100km continue to next respondent
        curRespondentOutput.closestAvailableCity = {
            distance: Infinity,
            city: "",
        };
        for (let city of projectParams.cities) {
            let curDistance = 0;

            // Left commented out
            // if (city.location.city.toLowerCase() === curRespondent.city) {
            //     curRespondentOutput.closestAvailableCity = {
            //         distance: 0,
            //         city: city.location.city,
            //     };
            //     break;
            // }

            curDistance = distanceInKmBetweenEarthCoordinates(
                {
                    lat: city.location.location.latitude,
                    lon: city.location.location.longitude,
                },
                { lat: curRespondent.lat, lon: curRespondent.lon }
            );

            if (
                curDistance < curRespondentOutput.closestAvailableCity.distance
            ) {
                curRespondentOutput.closestAvailableCity.distance = Number(
                    curDistance
                );
                curRespondentOutput.closestAvailableCity.city =
                    city.location.city;
            }
        }

        // Only constraining factor
        if (curRespondentOutput.closestAvailableCity.distance > 100) {
            continue;
        }

        // Check if job title match
        curRespondentOutput.jobMatches = {
            match: projectParams.professionalJobTitles.some(
                (item) => item.toLowerCase() === curRespondent.jobTitle
            ),
            jobTitle: curRespondent.jobTitle,
        };

        // Check number of matches for industries
        const curRespondentMatchingIndustries = projectParams.professionalIndustry.filter(
            (industry) =>
                curRespondent.industry.includes(industry.toLowerCase())
        );
        curRespondentOutput.industriesMatch = {
            number: curRespondentMatchingIndustries.length,
            industries: curRespondentMatchingIndustries,
        };

        // Calculate matching score
        curRespondentOutput.score = matchScore(
            projectParams.professionalIndustry.length,
            curRespondentOutput
        );

        // Adds respondent to results array at sorted index by score rating
        binaryInsert(curRespondentOutput, matchResults);
    }

    return matchResults;
}

module.exports = matchRespondents;
