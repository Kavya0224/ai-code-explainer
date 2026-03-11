/*
  Search Service

  Purpose:
  Perform semantic search on repository files.

  It compares a user question with file contents
  and returns the most relevant files.
*/

const natural = require("natural");

/*
  Tokenizer splits text into words.
*/
const tokenizer = new natural.WordTokenizer();


/*
  Function: buildDocumentVectors

  Converts file contents into tokenized vectors.
*/
function buildDocumentVectors(files) {

    const documents = [];

    files.forEach(file => {

        // Safety check
        if (!file || !file.content || typeof file.content !== "string") {
            return;
        }

        // Normalize text
        const text = file.content.toLowerCase();

        // Tokenize
        const tokens = tokenizer.tokenize(text);

        // Skip empty tokens
        if (!tokens || tokens.length === 0) {
            return;
        }

        documents.push({
            path: file.path,
            tokens
        });

    });

    return documents;
}


/*
  Function: searchFiles

  Input:
  question → user search query
  documents → tokenized file data

  Output:
  most relevant files
*/

function searchFiles(question, documents) {

    if (!question || typeof question !== "string") {
        return [];
    }

    const queryTokens = tokenizer.tokenize(question.toLowerCase());

    if (!queryTokens || queryTokens.length === 0) {
        return [];
    }

    const queryString = queryTokens.join(" ");

    const results = [];

    documents.forEach(doc => {

        if (!doc.tokens || doc.tokens.length === 0) {
            return;
        }

        const docString = doc.tokens.join(" ");

        const similarity = natural.JaroWinklerDistance(
            queryString,
            docString
        );

        results.push({
            file: doc.path,
            score: similarity
        });

    });

    /*
      Sort results by similarity score.
    */
    results.sort((a, b) => b.score - a.score);

    /*
      Return top matches
    */
    return results.slice(0, 5);
}

module.exports = {
    buildDocumentVectors,
    searchFiles
};