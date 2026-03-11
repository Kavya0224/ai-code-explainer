/*
  Search Controller

  Purpose:
  Handle semantic search requests from frontend.

  Example:
  User asks:
  "Where is authentication implemented?"
*/

const { buildDocumentVectors, searchFiles } = require("../services/searchService");

let documents = []; 
/*
  This variable stores processed repo files.

  After repo analysis, we convert files
  into searchable document vectors.
*/


/*
  Function: indexRepository

  Called after repo analysis.

  It prepares the repository files
  for semantic search.
*/
function indexRepository(files) {

  documents = buildDocumentVectors(files);

}


/*
  Function: searchRepository

  API Endpoint:
  POST /api/search
*/
exports.searchRepository = (req, res) => {

  try {

    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        message: "Search question is required"
      });
    }

    /*
      Perform semantic search
    */
    const results = searchFiles(question, documents);

    res.json({
      message: "Search results",
      results
    });

  } catch (error) {

    console.error("Search error:", error);

    res.status(500).json({
      message: "Search failed"
    });

  }

};


module.exports.indexRepository = indexRepository;