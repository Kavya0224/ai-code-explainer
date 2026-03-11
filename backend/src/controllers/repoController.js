// Import service that will handle repo cloning
const repoService = require("../services/repoService");
const { indexRepository } = require("./searchController");

// Controller function
exports.analyzeRepo = async (req, res) => {

    try {

        // Get repo URL from request body
        const { repoUrl } = req.body;

        if (!repoUrl) {
            return res.status(400).json({
                error: "Repository URL required"
            });
        }

        // Clone repo + scan files
        const result = await repoService.cloneRepository(repoUrl);

        // Index files for semantic search
        await indexRepository(result.files);

        res.json({
            message: "Repository cloned successfully",
            data: result
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Failed to analyze repository"
        });

    }

};