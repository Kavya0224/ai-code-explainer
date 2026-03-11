const fs = require("fs");
const path = require("path");

// Folders we do NOT want to scan
const IGNORED_FOLDERS = new Set([
  ".git",
  "node_modules",
  ".devcontainer",
  ".github",
  "dist",
  "build",
  "coverage",
  ".next"
]);

// Allowed file types
const ALLOWED_EXTENSIONS = new Set([
  ".js",
  ".ts",
  ".py",
  ".java",
  ".cpp",
  ".c",
  ".cs",
  ".go",
  ".rb"
]);

function scanDirectory(directoryPath, fileList = []) {

  const items = fs.readdirSync(directoryPath);

  for (const item of items) {

    const fullPath = path.join(directoryPath, item);

    const stat = fs.statSync(fullPath);

    // If directory
    if (stat.isDirectory()) {

      // Skip ignored folders
      if (IGNORED_FOLDERS.has(item)) {
        console.log("Skipping folder:", item);
        continue;
      }

      // Recurse
      scanDirectory(fullPath, fileList);

    } else {

      const ext = path.extname(item);

      if (ALLOWED_EXTENSIONS.has(ext)) {
        fileList.push(fullPath);
      }

    }

  }

  return fileList;
}

module.exports = scanDirectory;