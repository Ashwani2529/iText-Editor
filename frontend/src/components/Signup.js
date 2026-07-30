import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../config";

export default function Signup({ showAlert }) {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", gender: "" });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const onChange = (event) => {
    setCredentials((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/createuser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...credentials,
          gender: credentials.gender.trim() || "Not specified",
        }),
      });
      const data = await response.json();
      const token = typeof data === "string" ? data : data.hashcode;
      if (!response.ok || !token) {
        throw new Error(data.error || "That account could not be created");
      }
      localStorage.setItem("token", token);
      showAlert("Your account is ready—welcome to iText");
      navigate("/home");
    } catch (error) {
      showAlert(error.message || "We couldn’t create your account. Please try again.", "danger");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page page-wrap">
      <section className="auth-intro">
        <span className="eyebrow">Your writing, remembered</span>
        <h1>Build a home for every good idea.</h1>
        <p>Create an account to keep important notes close, wherever inspiration finds you.</p>
        <ul className="auth-benefits">
          <li><span>✓</span> A private cloud note library</li>
          <li><span>✓</span> Edit and organize from any device</li>
          <li><span>✓</span> Free to start, simple to use</li>
        </ul>
      </section>
      <section className="auth-card">
        <div>
          <span className="auth-kicker">CREATE ACCOUNT</span>
          <h2>Make iText yours</h2>
          <p>It takes less than a minute.</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form auth-form-grid">
          <div className="field full-field">
            <label htmlFor="name">Your name</label>
            <input id="name" name="name" value={credentials.name} onChange={onChange} placeholder="How should we greet you?" minLength={2} required />
          </div>
          <div className="field full-field">
            <label htmlFor="signup-email">Email address</label>
            <input id="signup-email" name="email" type="email" autoComplete="email" value={credentials.email} onChange={onChange} placeholder="you@example.com" required />
          </div>
          <div className="field">
            <label htmlFor="signup-password">Password</label>
            <input id="signup-password" name="password" type="password" autoComplete="new-password" value={credentials.password} onChange={onChange} placeholder="5+ characters" minLength={5} required />
          </div>
          <div className="field">
            <label htmlFor="gender">Gender <span className="optional">(optional)</span></label>
            <input id="gender" name="gender" value={credentials.gender} onChange={onChange} placeholder="How you identify" />
          </div>
          <button className="btn-ui btn-primary-ui auth-submit full-field" type="submit" disabled={submitting}>
            {submitting ? "Creating account…" : "Create my account →"}
          </button>
        </form>
        <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
      </section>
    </div>
  );
}
