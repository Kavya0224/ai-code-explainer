const fs = require("fs");

function readFileContent(filePath) {

    try {

        const content = fs.readFileSync(filePath, "utf-8");

        return content;

    } catch (error) {

        console.error("Error reading file:", filePath);

        return null;

    }

}

module.exports = readFileContent;