import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const navItems = [
  { to: "/", label: "Editor" },
  { to: "/home", label: "Cloud notes" },
  { to: "/about", label: "About" },
];

export default function Navbar({ mode, toggleMode }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  useEffect(() => setOpen(false), [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.info("You’re safely signed out");
    navigate("/login");
  };

  return (
    <header className="topbar">
      <nav className="nav-shell" aria-label="Primary navigation">
        <Link className="brand" to="/" aria-label="iText Studio home">
          <span className="brand-mark" aria-hidden="true">iT</span>
          <span>
            <strong>iText</strong>
            <small>STUDIO</small>
          </span>
        </Link>

        <button
          className="nav-menu-button"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>

        <div className={`nav-content ${open ? "is-open" : ""}`}>
          <div className="nav-links">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) => `nav-link-ui ${isActive ? "active" : ""}`}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="nav-actions">
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleMode}
              aria-label={`Switch to ${mode === "light" ? "dark" : "light"} theme`}
              title={`Switch to ${mode === "light" ? "dark" : "light"} theme`}
            >
              <span className="theme-track">
                <span className="theme-thumb">{mode === "light" ? "☀" : "☾"}</span>
              </span>
              <span>{mode === "light" ? "Light" : "Dark"}</span>
            </button>
            {isLoggedIn ? (
              <button className="btn-ui" type="button" onClick={handleLogout}>Sign out</button>
            ) : (
              <>
                <Link className="nav-login" to="/login">Log in</Link>
                <Link className="btn-ui btn-primary-ui" to="/createuser">Get started</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
