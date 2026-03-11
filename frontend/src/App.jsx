/*
  Main Application Component

  This manages global state
  and connects all UI components.
*/

import { useState } from "react";
import RepoInput from "./components/RepoInput";
import FileList from "./components/FileList";
import FileExplanation from "./components/FileExplanation";

function App() {

  const [result, setResult] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  return (

    <div style={{ padding: "20px" }}>

      <h1>AI Codebase Explainer</h1>

      <RepoInput setResult={setResult} />

      {result && (

        <div style={{ display: "flex", gap: "40px", marginTop: "20px" }}>

          <FileList
            files={result.files}
            onSelect={setSelectedFile}
          />

          <FileExplanation file={selectedFile} />

        </div>

      )}

    </div>

  );

}

export default App;