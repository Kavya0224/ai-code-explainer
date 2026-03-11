const madge = require("madge");

/*
  Function: generateDependencyGraph
  Purpose: analyze repository and return dependency map
*/

async function generateDependencyGraph(repoPath) {

    try {

        // Run madge analysis
        const result = await madge(repoPath);
        
        // Get dependency object
        const dependencyGraph = result.obj();  

//         {
//   "app.js": ["routes/userRoutes.js"],
//   "routes/userRoutes.js": ["controllers/userController.js"],
//   "controllers/userController.js": ["services/userService.js"]
// }

        return dependencyGraph;

    } catch (error) {

        console.error("Dependency graph error:", error);

        return {};

    }

}

module.exports = {
    generateDependencyGraph
};