/*
  FileExplanation Component

  Purpose:
  Display AI explanation for selected file.
*/

function FileExplanation({ file }) {

  if (!file) return <p>Select a file to see explanation</p>;

  return (

    <div>

      <h3>{file.path}</h3>

      <pre>
        {file.explanation}
      </pre>

    </div>

  );

}

export default FileExplanation;