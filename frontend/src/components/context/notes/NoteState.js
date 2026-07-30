import { useCallback, useMemo, useState } from "react";
import { API_URL } from "../../../config";
import notecontext from "./notecontext";

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token") || "",
      ...options.headers,
    },
  });
  let data = null;
  try {
    data = await response.json();
  } catch {
    // Some successful delete endpoints do not return JSON.
  }
  if (!response.ok) {
    throw new Error(data?.error || data?.message || "The server could not complete that request");
  }
  return data;
}

export default function NoteState({ children }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const getNotes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiRequest("/api/notes/fetchallnotes", { method: "GET" });
      setNotes(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }, []);

  const addNote = useCallback(async (title, tag, description) => {
    const note = await apiRequest("/api/notes/addnote", {
      method: "POST",
      body: JSON.stringify({ title, tag, description }),
    });
    setNotes((current) => [note, ...current]);
    return note;
  }, []);

  const deleteNote = useCallback(async (id) => {
    await apiRequest(`/api/notes/deletenote/${id}`, { method: "DELETE" });
    setNotes((current) => current.filter((note) => note._id !== id));
  }, []);

  const editNote = useCallback(async (id, title, tag, description) => {
    await apiRequest(`/api/notes/updatenote/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, tag, description }),
    });
    setNotes((current) => current.map((note) =>
      note._id === id ? { ...note, title, tag, description } : note
    ));
  }, []);

  const value = useMemo(
    () => ({ notes, loading, addNote, deleteNote, editNote, getNotes }),
    [notes, loading, addNote, deleteNote, editNote, getNotes]
  );

  return <notecontext.Provider value={value}>{children}</notecontext.Provider>;
}
