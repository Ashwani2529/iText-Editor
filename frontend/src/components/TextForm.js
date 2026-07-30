import { useMemo, useRef, useState } from "react";
import JoditEditor from "jodit-react";

function toPlainText(html) {
  return new DOMParser().parseFromString(html || "", "text/html").body.textContent || "";
}

export default function TextForm({ showAlert }) {
  const editor = useRef(null);
  const fileInput = useRef(null);
  const [text, setText] = useState("");

  const plainText = useMemo(() => toPlainText(text).replace(/\u00a0/g, " "), [text]);
  const words = plainText.trim() ? plainText.trim().split(/\s+/).length : 0;
  const characters = plainText.length;
  const readingTime = words === 0 ? 0 : Math.max(1, Math.ceil(words / 220));

  const config = useMemo(() => ({
    height: 420,
    minHeight: 280,
    placeholder: "Start with a thought. Shape it into something worth sharing…",
    toolbarAdaptive: true,
    buttons: "bold,italic,underline,|,ul,ol,|,fontsize,paragraph,|,link,align,|,undo,redo",
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
  }), []);

  const transform = (type) => {
    const next = type === "upper" ? plainText.toUpperCase() : plainText.toLowerCase();
    setText(next);
    showAlert(type === "upper" ? "Converted to uppercase" : "Converted to lowercase");
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      showAlert("Please choose a text file smaller than 2 MB", "warning");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setText(String(reader.result || ""));
      showAlert(`${file.name} imported`);
    };
    reader.onerror = () => showAlert("That file could not be read", "danger");
    reader.readAsText(file);
    event.target.value = "";
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(plainText);
      showAlert("Copied to clipboard");
    } catch {
      showAlert("Clipboard access was blocked by your browser", "warning");
    }
  };

  const handleDownload = () => {
    const blobUrl = URL.createObjectURL(new Blob([plainText], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.download = "itext-note.txt";
    link.href = blobUrl;
    link.click();
    URL.revokeObjectURL(blobUrl);
    showAlert("Your text file is ready");
  };

  const clearEditor = () => {
    setText("");
    showAlert("Editor cleared", "warning");
  };

  return (
    <div className="editor-page page-wrap">
      <section className="editor-hero">
        <div>
          <span className="eyebrow">Your focused writing space</span>
          <h1 className="page-title">
            Turn rough thoughts into <span className="gradient-text">clear words.</span>
          </h1>
          <p className="page-lead">
            Write, refine, transform, and export—without clutter getting between you and the idea.
          </p>
        </div>
        <div className="live-badge"><span /> Autosaved in this session</div>
      </section>

      <section className="workspace-card" aria-label="Text editor workspace">
        <div className="workspace-topline">
          <div>
            <span className="document-dot" />
            <strong>Untitled document</strong>
          </div>
          <span className="privacy-label">Private on this device</span>
        </div>

        <div className="editor-frame">
          <JoditEditor ref={editor} value={text} config={config} onChange={setText} />
        </div>

        <div className="editor-toolbar" aria-label="Document actions">
          <input
            ref={fileInput}
            type="file"
            accept=".txt,.md,.html,text/plain,text/markdown,text/html"
            onChange={handleFileUpload}
            hidden
          />
          <button className="btn-ui" type="button" onClick={() => fileInput.current?.click()}>
            <span aria-hidden="true">↥</span> Import
          </button>
          <button className="btn-ui" disabled={!plainText} type="button" onClick={() => transform("upper")}>AA Uppercase</button>
          <button className="btn-ui" disabled={!plainText} type="button" onClick={() => transform("lower")}>aa Lowercase</button>
          <span className="toolbar-spacer" />
          <button className="btn-ui btn-danger-ui" disabled={!plainText} type="button" onClick={clearEditor}>Clear</button>
          <button className="btn-ui" disabled={!plainText} type="button" onClick={handleCopy}>Copy</button>
          <button className="btn-ui btn-primary-ui" disabled={!plainText} type="button" onClick={handleDownload}>Download ↓</button>
        </div>
      </section>

      <section className="insights-grid">
        <div className="stats-card">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Live insights</span>
              <h2>Know your draft</h2>
            </div>
            <span className="status-pill">{plainText ? "Analyzing" : "Waiting for words"}</span>
          </div>
          <div className="stats-row">
            <div><strong>{words.toLocaleString()}</strong><span>Words</span></div>
            <div><strong>{characters.toLocaleString()}</strong><span>Characters</span></div>
            <div><strong>{readingTime}</strong><span>Min read</span></div>
          </div>
        </div>

        <div className="preview-card">
          <span className="eyebrow">Clean preview</span>
          <h2>Reader view</h2>
          <div className={`preview-copy ${plainText ? "" : "is-empty"}`}>
            {plainText || "Your distraction-free preview will appear here as you write."}
          </div>
        </div>
      </section>
    </div>
  );
}
