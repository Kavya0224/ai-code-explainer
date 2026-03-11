const simpleGit = require("simple-git");
const path = require("path");
const fs = require("fs");

const scanDirectory = require("../utils/fileScanner");
const readFileContent = require("../utils/fileReader");
const aiService = require("./aiService");
const dependencyService = require("./dependencyService");
const architectureService = require("./architectureService");

// Clone repo and analyze
exports.cloneRepository = async (repoUrl) => {

    console.log("=================================");
    console.log("Starting repository analysis");
    console.log("Repo URL:", repoUrl);
    console.log("=================================");

    // Force Git binary path (Windows fix)
    const git = simpleGit({
        binary: "C:\\Program Files\\Git\\cmd\\git.exe",
        unsafe: {
            allowUnsafeCustomBinary: true
        }
    });

    // Extract repository name
    const repoName = repoUrl.split("/").pop().replace(".git", "");

    // Local repo path
    const repoPath = path.join(__dirname, "../../repos", repoName);

    // Delete repo if it already exists
    if (fs.existsSync(repoPath)) {
        console.log("Removing existing repository...");
        fs.rmSync(repoPath, { recursive: true, force: true });
    }

    // Clone repository (shallow clone for speed)
    console.log("Cloning repository...");
    await git.clone(repoUrl, repoPath, ["--depth", "1"]);
    console.log("Repository cloned at:", repoPath);

    // ---------------------------
    // SCAN REPOSITORY FILES
    // ---------------------------
    console.log("Scanning repository files...");
    const files = scanDirectory(repoPath);
    console.log("Total code files found:", files.length);

    // ---------------------------
    // AI ANALYSIS
    // ---------------------------
    console.log("Starting AI analysis...");

    const fileData = [];

    const filesToAnalyze = files.slice(0, 5); // limit for speed

    for (let i = 0; i < filesToAnalyze.length; i++) {

        const file = filesToAnalyze[i];

        console.log(`Analyzing file ${i + 1}/${filesToAnalyze.length}:`, file);

        const content = readFileContent(file);

        if (!content) {
            console.log("Skipping empty file:", file);
            continue;
        }

        const explanation = await aiService.explainCode(content, file);

        fileData.push({
            path: file,
            explanation
        });
    }

    console.log("AI analysis completed");

    // ---------------------------
    // DEPENDENCY GRAPH
    // ---------------------------
    console.log("Generating dependency graph...");
    const dependencyGraph = await dependencyService.generateDependencyGraph(repoPath);

    // ---------------------------
    // ARCHITECTURE GENERATION
    // ---------------------------
    console.log("Generating architecture...");
    const architecture = architectureService.generateArchitecture(dependencyGraph);

    console.log("Repository analysis completed");
    console.log("=================================");

    return {
        repoName,
        totalFiles: files.length,
        files: fileData,
        dependencyGraph,
        architecture
    };
};