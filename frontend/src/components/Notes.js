import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";
import notecontext from "./context/notes/notecontext";

export default function Notes({ showAlert }) {
  const navigate = useNavigate();
  const { notes, getNotes, editNote, loading } = useContext(notecontext);
  const [dialog, setDialog] = useState(null);
  const [query, setQuery] = useState("");
  const [editDraft, setEditDraft] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { replace: true });
      return;
    }
    getNotes().catch((error) => showAlert(error.message || "Your notes could not be loaded", "danger"));
    // Context functions are stable for the lifetime of this page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, showAlert]);

  const filteredNotes = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return notes;
    return notes.filter((note) =>
      [note.title, note.tag, note.description].some((value) => value?.toLowerCase().includes(term))
    );
  }, [notes, query]);

  const openEdit = (note) => {
    setEditDraft({
      id: note._id,
      title: note.title || "",
      tag: note.tag || "",
      description: note.description || "",
    });
    setDialog("edit");
  };

  const saveEdit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await editNote(editDraft.id, editDraft.title.trim(), editDraft.tag.trim(), editDraft.description.trim());
      showAlert("Your changes are saved");
      setDialog(null);
    } catch (error) {
      showAlert(error.message || "Your changes could not be saved", "danger");
    } finally {
      setSaving(false);
    }
  };

  const closeDialog = () => {
    setDialog(null);
    setEditDraft(null);
  };

  return (
    <div className="notes-page page-wrap">
      <section className="notes-hero">
        <div>
          <span className="eyebrow">Your private library</span>
          <h1 className="page-title">Ideas worth <span className="gradient-text">keeping.</span></h1>
          <p className="page-lead">Capture quick thoughts, shape longer notes, and find them when you need them.</p>
        </div>
        <button type="button" className="btn-ui btn-primary-ui new-note-button" onClick={() => setDialog("add")}>
          <span aria-hidden="true">＋</span> New note
        </button>
      </section>

      <section className="library-panel">
        <div className="library-toolbar">
          <div className="search-field">
            <span aria-hidden="true">⌕</span>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search your notes…" aria-label="Search notes" />
            {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search">×</button>}
          </div>
          <span className="note-count">{notes.length} {notes.length === 1 ? "note" : "notes"}</span>
        </div>

        <div className="notes-grid">
          {loading ? (
            <>
              {[1, 2, 3].map((item) => <div className="note-skeleton" key={item} />)}
            </>
          ) : filteredNotes.length ? (
            filteredNotes.map((note) => (
              <Noteitem key={note._id} note={note} onEdit={openEdit} showAlert={showAlert} />
            ))
          ) : (
            <div className="empty-state">
              <strong>{query ? "No matching notes" : "Your library is ready"}</strong>
              <span>{query ? "Try a different word or clear the search." : "Create your first note and give that idea somewhere to live."}</span>
              {!query && <button type="button" className="btn-ui btn-primary-ui" onClick={() => setDialog("add")}>Create first note</button>}
            </div>
          )}
        </div>
      </section>

      {dialog && (
        <div className="modal-backdrop-ui" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && closeDialog()}>
          <section className="modal-card-ui" role="dialog" aria-modal="true" aria-labelledby="note-dialog-title">
            <div className="modal-heading">
              <div>
                <span className="eyebrow">{dialog === "add" ? "Capture an idea" : "Refine your note"}</span>
                <h2 id="note-dialog-title">{dialog === "add" ? "Create a new note" : "Edit note"}</h2>
              </div>
              <button type="button" className="icon-button" onClick={closeDialog} aria-label="Close">×</button>
            </div>
            {dialog === "add" ? (
              <AddNote onClose={closeDialog} showAlert={showAlert} />
            ) : (
              <form className="note-form" onSubmit={saveEdit}>
                <div className="field">
                  <label htmlFor="edit-title">Title</label>
                  <input id="edit-title" value={editDraft.title} onChange={(e) => setEditDraft({ ...editDraft, title: e.target.value })} minLength={3} required autoFocus />
                </div>
                <div className="field">
                  <label htmlFor="edit-tag">Tag <span className="optional">(optional)</span></label>
                  <input id="edit-tag" value={editDraft.tag} onChange={(e) => setEditDraft({ ...editDraft, tag: e.target.value })} />
                </div>
                <div className="field">
                  <label htmlFor="edit-description">Note</label>
                  <textarea id="edit-description" value={editDraft.description} onChange={(e) => setEditDraft({ ...editDraft, description: e.target.value })} minLength={3} required />
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn-ui" onClick={closeDialog}>Cancel</button>
                  <button type="submit" className="btn-ui btn-primary-ui" disabled={saving}>{saving ? "Saving…" : "Save changes"}</button>
                </div>
              </form>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
