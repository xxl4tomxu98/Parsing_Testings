const fs = require("fs").promises;

// Read Respondents' data from .csv file
async function readRespondentsData(respondentsDataFilePath) {
    validateDataFileType(respondentsDataFilePath);

    const respondentsData = await fs.readFile(
        respondentsDataFilePath,
        "utf8",
        (err, data) => {
            if (err) {
                return `Error reading file.\n${err}`;
            }
            return data;
        }
    );
    respondentsData;

    // Parse data into organized usable data
    // Split data into lines as 1 entry per line
    const parseLines = respondentsData.split("\n").slice(1);

    // Initialize respondents' data object
    respondentsDataObject = {};

    // Iterate over array of entry lines
    parseLines.forEach((line, idx) => {
        if (line) {
            const entry = line
                // Formats values to lower case
                .toLowerCase()
                .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

            // Split lines into entry with key(categories) value(information) pairs
            // Stores organized data in respondentsDataObject using the line number index as keys
            respondentsDataObject[idx] = {
                firstName: entry[0],
                gender: entry[1],
                jobTitle: entry[2],
                industry: (() =>
                    entry[3].slice(1, entry[3].length - 1).split(","))(),
                city: (() =>
                    entry[4].slice(1, entry[4].length - 1).split(",")[0])(),
                lat: Number(entry[5]),
                lon: Number(entry[6]),
            };
        }
    });
    // Returns respondents data object
    return respondentsDataObject;
}

// Check file is .csv
function validateDataFileType(respondentsDataFilePath) {
    if (!respondentsDataFilePath.endsWith(".csv")) {
        throw new FileTypeException(respondentsDataFilePath);
    }
}

// Filetype error
function FileTypeException(filePath) {
    this.filePath = filePath;
    this.message = " File type is not of format .csv";
    this.toString = function () {
        return this.filePath + this.message;
    };
}

module.exports = { readRespondentsData, FileTypeException };
