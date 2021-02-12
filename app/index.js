const express = require("express");

const { RespondentMatcher } = require("../RespondentMatcher");
const projectParams = require("../data/project.json");

const app = express();

app.set("view engine", "pug");

app.get("/", async (req, res) => {
    const newMatch = new RespondentMatcher(
        "./data/respondents_data_test.csv",
        projectParams
    );
    await newMatch.parseData();
    newMatch.matchRespondentsToProjectParams();
    let results = newMatch.returnTopEightResults();

    res.render("index", { results });
});

const port = 8081;

app.listen(port, () => console.log(`Listening on port ${port}...`));
