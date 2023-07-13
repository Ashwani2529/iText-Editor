import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./indexing.module.css";
const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate= useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.hashcode);
      toast.success("Logged in Successfully",{ position: toast.POSITION.TOP_CENTER});
      // props.showAlert("Logged in Successfully","success")
      navigate("/home");
    } 
      else{
        // alert("fuck")
        toast.error("Invalid Credentials",{position: toast.POSITION.TOP_CENTER});
      // props.showAlert("Invalid credentials", "warning");
    }    
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <section className={styles.sectional}>
        <div className={styles.formed}>
          <div className="f-val">
            <form id={styles.buttonloginwali} onSubmit={handleSubmit} >
              <h2 className={styles.h2}>Login</h2>
              <div className={styles.inputbox}>
                <ion-icon name="mail-outline"></ion-icon>
                <input type="email" value={credentials.email} onChange={onChange} id="email" name="email" required />
                <label htmlFor="email">E-Mail</label>
              </div>
              <div className={styles.inputbox}>
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input type="password" value={credentials.password} onChange={onChange} id="password" name="password" required />
                <label htmlFor="">Password</label>
              </div>

              <div className={styles.forget}>
                <p>
                <button type="submit" className="btn btn-primary mx-5">Login</button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    
     </div> 
  );
};

export default Login;
