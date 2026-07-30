import { useContext, useState } from "react";
import notecontext from "./context/notes/notecontext";

export default function Noteitem({ note, onEdit, showAlert }) {
  const { deleteNote } = useContext(notecontext);
  const [deleting, setDeleting] = useState(false);

  const remove = async () => {
    if (!window.confirm(`Delete “${note.title}”? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      await deleteNote(note._id);
      showAlert("Note deleted", "warning");
    } catch (error) {
      showAlert(error.message || "That note could not be deleted", "danger");
      setDeleting(false);
    }
  };

  return (
    <article className="note-card">
      <div className="note-card-top">
        <span className="note-tag">{note.tag || "Untagged"}</span>
        <div className="note-menu" aria-label={`Actions for ${note.title}`}>
          <button type="button" className="icon-button" onClick={() => onEdit(note)} aria-label={`Edit ${note.title}`} title="Edit note">✎</button>
          <button type="button" className="icon-button delete-button" onClick={remove} disabled={deleting} aria-label={`Delete ${note.title}`} title="Delete note">⌫</button>
        </div>
      </div>
      <h3>{note.title}</h3>
      <p>{note.description}</p>
      <div className="note-card-footer">
        <span>{note.description?.trim().split(/\s+/).filter(Boolean).length || 0} words</span>
        <button type="button" onClick={() => onEdit(note)}>Open note →</button>
      </div>
    </article>
  );
}
