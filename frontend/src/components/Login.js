import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../config";

export default function Login({ showAlert }) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (!response.ok || !data.success || !data.hashcode) {
        throw new Error(data.error || "Email or password is incorrect");
      }
      localStorage.setItem("token", data.hashcode);
      showAlert("Welcome back—your notes are ready");
      navigate("/home");
    } catch (error) {
      showAlert(error.message || "We couldn’t sign you in. Please try again.", "danger");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page page-wrap">
      <section className="auth-intro">
        <span className="eyebrow">Welcome back</span>
        <h1>Pick up exactly where you left off.</h1>
        <p>Your cloud notes stay organized, searchable, and ready for the next idea.</p>
        <div className="auth-quote">
          <span>“</span>
          A clear space creates room for better thinking.
        </div>
      </section>
      <section className="auth-card">
        <div>
          <span className="auth-kicker">SIGN IN</span>
          <h2>Continue to iText</h2>
          <p>Use the account connected to your cloud notes.</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              placeholder="Enter your password"
              minLength={5}
              required
            />
          </div>
          <button className="btn-ui btn-primary-ui auth-submit" type="submit" disabled={submitting}>
            {submitting ? "Signing in…" : "Sign in →"}
          </button>
        </form>
        <p className="auth-switch">New to iText? <Link to="/createuser">Create an account</Link></p>
      </section>
    </div>
  );
}
