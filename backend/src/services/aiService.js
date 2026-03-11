const axios = require("axios");

async function explainCode(code, filePath) {

    try {

        console.log("=================================");
        console.log("Sending file to AI:", filePath);

        // Limit code length (important for speed)
        if (code.length > 3000) {
            code = code.substring(0, 3000);
        }

        const response = await axios.post(
            "http://localhost:11434/api/generate",
            {
                model: "llama3",
                prompt: `
Explain this code file.

File: ${filePath}

Code:
${code}

Provide:
1. Purpose
2. Main functions
3. Dependencies
4. Notes
`,
                stream: false
            }
        );

        console.log("AI response received for:", filePath);
        console.log("=================================");

        return response.data.response;

    } catch (error) {

        console.error("Local AI error:", error.message);

        return "Local AI explanation failed.";

    }

}

module.exports = { explainCode };