// Matching score algorithm
function matchScore(industryList, respondent) {
    if (
        respondent.closestAvailableCity.distance === undefined ||
        respondent.industriesMatch.number === undefined
    ) {
        throw new BadRespondentData();
    }

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

    return score.toFixed(2);
}

// Bad Respondent data error
function BadRespondentData() {
    this.message = "Respondent data is damaged or imcomplete.";
    this.toString = function () {
        return this.message;
    };
}

module.exports = { matchScore, BadRespondentData };
