import React, { useContext } from "react";
import "../index.css";
import notecontext from "./context/notes/notecontext";

const Noteitem = (props) => {
  const context=useContext(notecontext);
  const { note,updateNote} = props;
  const {deleteNote} = context;
  return (
    <div className="col-md-3">
      <div className="card">
        <div className="card-body">
          <p>
            <b className="boldy">Title:- </b>
            {note.title}
          </p>
          <p>
            <b className="boldy">Tag:-</b>
            {note.tag}
          </p>
          <p>
            <b className="boldy">Content:-</b>
            {note.description}
          </p>
          <i className="far fa-trash-alt" onClick={()=>{deleteNote(note._id);props.showAlert("Deleted","success");}}></i>
          <i className="far fa-edit" onClick={()=>{updateNote(note);}}></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
