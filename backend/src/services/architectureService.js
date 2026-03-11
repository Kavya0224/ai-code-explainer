/*
  Architecture Service

  Purpose:
  Analyze repository files and classify them into
  architecture layers like:

  - API Layer
  - Business Logic
  - Data Layer
  - Infrastructure
  - Other

  This helps understand the overall structure
  of a codebase automatically.
*/


/*
  Function: generateArchitecture

  Input:
  dependencyGraph → object containing file dependencies

  Example input:

  {
    "controllers/userController.js": ["services/userService.js"],
    "services/userService.js": ["models/userModel.js"]
  }

  Output:

  {
    apiLayer: [],
    businessLogic: [],
    dataLayer: [],
    infrastructure: [],
    other: []
  }
*/

function generateArchitecture(dependencyGraph) {

    /*
      Create architecture structure.

      Each property represents a system layer.
      Files will be categorized into these arrays.
    */
    const architecture = {

        apiLayer: [],

        businessLogic: [],

        dataLayer: [],

        infrastructure: [],

        other: []

    };


    /*
      Loop through every file in the dependency graph.

      Object.keys() returns all file paths in the repo.
    */
    Object.keys(dependencyGraph).forEach(file => {

        /*
          Convert file path to lowercase.

          This prevents case sensitivity issues.
        */
        const lowerPath = file.toLowerCase();



        /*
          Detect API layer files.

          API layer usually contains:

          - routes
          - controllers
          - endpoints
        */
        if (
            lowerPath.includes("route") ||
            lowerPath.includes("controller")
        ) {

            architecture.apiLayer.push(file);

        }



        /*
          Detect Business Logic layer.

          These usually contain the main application logic.
        */
        else if (
            lowerPath.includes("service") ||
            lowerPath.includes("manager")
        ) {

            architecture.businessLogic.push(file);

        }



        /*
          Detect Data Layer.

          Files responsible for database interaction.
        */
        else if (

            lowerPath.includes("model") ||
            lowerPath.includes("db") ||
            lowerPath.includes("database") ||
            lowerPath.includes("repository")

        ) {

            architecture.dataLayer.push(file);

        }



        /*
          Detect Infrastructure layer.

          These files support the system but do not
          contain business logic.
        */
        else if (

            lowerPath.includes("util") ||
            lowerPath.includes("helper") ||
            lowerPath.includes("middleware") ||
            lowerPath.includes("config")

        ) {

            architecture.infrastructure.push(file);

        }



        /*
          If file doesn't match any rule,
          categorize it as "other".
        */
        else {

            architecture.other.push(file);

        }

    });


    /*
      Return categorized architecture structure
      to the service that requested it.
    */
    return architecture;

}


/*
  Export function so other services can use it.

  Example:
  repoService → architectureService
*/
module.exports = {
    generateArchitecture
};