import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import "../index.css";
export default function TextForm(props) {
  const handleUpClick = () => {
    let newText = text.replace(/&nbsp;/g, " ").toUpperCase();
    setText(newText);
  };
  const handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
  };
  const handleClearClick = () => {
    let newText = "";
    setText(newText);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      editor.current.value = "";
      setText(reader.result);
      editor.current.value = reader.result;
    };
  };
  const handleDownload = () => {
    const textWithoutTags = text.replace(/<[^>]+>/g, "");
    const textBlob = new Blob([textWithoutTags.replace(/\s+/g, " ").trim()], {
      type: "text/plain",
    });
    const downloadLink = document.createElement("a");
    downloadLink.download = "untitled.txt";
    downloadLink.href = URL.createObjectURL(textBlob);
    downloadLink.click();
  };
  const handleCopy = () => {
    const editorElement = document.getElementById("editor"); // replace with your element ID
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = editorElement.innerHTML;
    const plainText = tempDiv.textContent || tempDiv.innerText || "";
    navigator.clipboard.writeText(plainText);
  };
  const [text, setText] = useState("");
  const editor = useRef(null);
  return (
    <div className="Tbody">
      <div
        className="container"
        style={{ color: props.mode === "white" ? "dark" : "#000000" }}
      >
        <h1 className="mb-4">{props.heading}</h1>
        <div className="mb-3">
          <JoditEditor
            ref={editor}
            value={text}
            onChange={(newText) => setText(newText)}
          />
        </div>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item ">
            <label className="nav-link" htmlFor="file-upload">
              Import
              <input
                id="file-upload"
                type="file"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
            </label>
          </li>
        </ul>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleUpClick}
        >
          Convert to Uppercase
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleLoClick}
        >
          Convert to Lowercase
        </button>

        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleClearClick}
        >
          Clear Text
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleCopy}
        >
          Copy
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleDownload}
        >
          Download
        </button>
      </div>
      <div
        className="container my-3"
        style={{ color: props.mode === "dark" ? "white" : "#000000" }}
      >
        <h2>Text Summary</h2>
        <p>
          {
            text
              .trim()
              .split(/\s+/)
              .filter((element) => {
                return element.length !== 0;
              }).length
          }{" "}
          words and {text.trim().replace(/\s+/g, "").length} characters
        </p>

        <p>
          {0.008 *
            text.split(/\s+/).filter((element) => {
              return element.length !== 0;
            }).length}{" "}
          Minutes read
        </p>
        <h2>Preview</h2>
        <p id="editor">
          {text.length > 0
            ? new DOMParser().parseFromString(text, "text/html").body
                .textContent
            : "Nothing to preview!"}
        </p>
      </div>
    </div>
  );
}