import React,{useEffect} from "react";
import PropTypes from "prop-types";
import "../index.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useLocation, useNavigate } from "react-router-dom";
const Navbar=(props) =>{
  let navigate=useNavigate();
  const handleLogout=()=>{
    toast.info("Logged out",{position: toast.POSITION.TOP_CENTER});
    localStorage.removeItem('token');
    navigate('/login');
  }
  let location=useLocation();
  useEffect(()=>{
    console.log(location.pathname);
  },[location]);
  // const [text, setText] = useState('');
  return (
    // <di className="Nbody">
    <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
      <div className="container-fluid">
      <Link className="navbar-brand" to="/">{props.title}</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/home"?"active":""}`} to="/home">
               <u> <b>Save to Cloud</b></u>
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">
                {props.aboutText}
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/getuser"?"active":""}`} to="/getuser">
                User
              </Link>
            </li> */}
           
          </ul>
          <div className={`form-check form-switch text-${props.mode==='light'?'dark':'light'}`}>
                        <input className="form-check-input" onClick={props.toggleMode} type="checkbox" id="flexSwitchCheckDefault"/>
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Theme</label>
                    </div>
          {!localStorage.getItem('token')?<form className="d-flex mx-2"> 
          <Link className="btn btn-primary mx-1" to="/createuser" role="button">Signup</Link>
                    <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                    </form>: <button onClick={handleLogout} className="btn btn-primary">Logout</button>}
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  aboutText: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: "iText-Editor",
  aboutText: "About",
};
export default Navbar;