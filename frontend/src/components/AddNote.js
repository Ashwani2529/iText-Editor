import { useContext, useState } from "react";
import notecontext from "./context/notes/notecontext";

export default function AddNote({ onClose, showAlert }) {
  const { addNote } = useContext(notecontext);
  const [note, setNote] = useState({ title: "", tag: "", description: "" });
  const [saving, setSaving] = useState(false);

  const onChange = (event) => {
    setNote((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await addNote(note.title.trim(), note.tag.trim(), note.description.trim());
      showAlert("Note added to your library");
      onClose();
    } catch (error) {
      showAlert(error.message || "Your note could not be saved", "danger");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="note-title">Title</label>
        <input
          id="note-title"
          name="title"
          value={note.title}
          onChange={onChange}
          placeholder="Give this note a clear name"
          minLength={3}
          maxLength={100}
          autoFocus
          required
        />
      </div>
      <div className="field">
        <label htmlFor="note-tag">Tag <span className="optional">(optional)</span></label>
        <input
          id="note-tag"
          name="tag"
          value={note.tag}
          onChange={onChange}
          placeholder="Ideas, work, personal…"
          maxLength={40}
        />
      </div>
      <div className="field">
        <label htmlFor="note-description">Note</label>
        <textarea
          id="note-description"
          name="description"
          value={note.description}
          onChange={onChange}
          placeholder="Capture the thought before it disappears…"
          minLength={3}
          required
        />
      </div>
      <div className="modal-actions">
        <button type="button" className="btn-ui" onClick={onClose}>Cancel</button>
        <button type="submit" className="btn-ui btn-primary-ui" disabled={saving}>
          {saving ? "Saving…" : "Save note"}
        </button>
      </div>
    </form>
  );
}
