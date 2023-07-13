import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import About from "./components/About";
import TextForm from "./components/TextForm";
import Save from "./components/Save";
import Signup from "./components/Signup";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import NoteState from "./components/context/notes/NoteState";
import { useState } from "react";
import Alert from "./components/Alert"
function App() {
  const [alert,setAlert]=useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null);
      
    },2500);
  }
  const [mode,setMode]=useState('light');
  const toggleMode = ()=>{
    if(mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor = '#03192b';
      showAlert("Dark mode Active", "success");
    }
    else{
      setMode('light');
   
      document.body.style.backgroundColor=' rgb(206, 255, 196)';
      showAlert("Light mode Active", "success");
    }
  }
  return (
  <NoteState mode={mode}>
    <ToastContainer /> 
    <div className="App">
      <Router>
        <Navbar mode={mode} toggleMode={toggleMode} key={new Date()} />
        <Alert alert={alert}/>
        <Routes>
          <Route path="/" element={<TextForm mode={mode} />} />
          <Route path="/home" element={<Save mode={mode} showAlert={showAlert}/>} />
          <Route path="/about" element={<About mode={mode}/>} />
          {/* <Route path="/getuser" element={<UserDetails mode={mode} />}/> */}
          <Route path="/login" element={<Login  mode={mode} showAlert={showAlert}/>} />
          <Route path="/createuser" element={<Signup  mode={mode} showAlert={showAlert}/>} />
        </Routes>
      
      </Router>
    </div>
    </NoteState>
  );
}

export default App;
