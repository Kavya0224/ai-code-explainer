/*
  RepoInput Component

  Purpose:
  Allow user to paste GitHub repository URL
  and start analysis.
*/

import { useState } from "react";
import { analyzeRepository } from "../services/api";

function RepoInput({ setResult }) {

  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  /*
    Function triggered when user clicks analyze
  */
  const handleAnalyze = async () => {

    try {

      setLoading(true);

      const data = await analyzeRepository(repoUrl);

      /*
        Send result to parent component
      */
      setResult(data.data);

    } catch (error) {

      console.error("Analysis failed:", error);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div>

      <h2>Analyze GitHub Repository</h2>

      <input
        type="text"
        placeholder="Enter GitHub repo URL"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        style={{ width: "400px" }}
      />

      <button onClick={handleAnalyze}>

        {loading ? "Analyzing..." : "Analyze"}

      </button>

    </div>

  );

}

export default RepoInput;