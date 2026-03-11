/*
  FileList Component

  Purpose:
  Show repository files returned from backend.
*/

function FileList({ files, onSelect }) {

  if (!files) return null;

  return (

    <div>

      <h3>Files</h3>

      <ul>

        {files.map((file, index) => (

          <li
            key={index}
            onClick={() => onSelect(file)}
            style={{ cursor: "pointer" }}
          >
            {file.path}
          </li>

        ))}

      </ul>

    </div>

  );

}

export default FileList;