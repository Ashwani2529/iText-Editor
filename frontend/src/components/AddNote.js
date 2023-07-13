import React,{useContext,useState} from 'react';
import "../index.css";
import notecontext from "./context/notes/notecontext";
const AddNote=(props)=> {
    const context = useContext(notecontext);
  const {addNote } = context;
  const [note, setNote]= useState({title:"",tag:"",description:""})
  const handleClick=(e)=>{
    e.preventDefault();
    addNote(note.title,note.tag,note.description);
    setNote({title: "",  tag: "",description: ""});
    props.showAlert("File Added","success");
  }
  const onChange=(e)=>{
    setNote({...note,[e.target.id]:e.target.value,[e.target.name]:e.target.value})
  }
  return (
  <>
    <div className="container my-5">
    <h1 className="heading">
      <b>Save Your Files</b>
    </h1>
  </div>
  <div className='container'>
  <form id="form">
    <div className="col-sm-3 mx-1">
      <label id="sr-only" htmlFor="title">
        Title
      </label>
      <input
        type="text"
        className="form-control"
        id="title"
        placeholder=""
        onChange={onChange}
        required
      />
    </div>
    <div className="col-sm-4 mx-1 my-4">
      <label id="sr-only" htmlFor="tag" >
        Tags
      </label>
      <input
        type="text"
        className="form-control"
        id="tag"
        placeholder="#"
        onChange={onChange}
        
        />
    </div>
    <div className="form-group col-sm-8 my-4">
      <label id="description" htmlFor="description" >
        Content
      </label>
      <textarea
        className="form-control"
        id="description"
        rows="12"
        onChange={onChange}
        required
      ></textarea>
    </div>
    <button type="submit" className="btn btn-primary my-1" onClick={handleClick}>
      Save
    </button>
  </form>
  </div></>
  )
}

export default AddNote