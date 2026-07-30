import { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import About from "./components/About";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Save from "./components/Save";
import Signup from "./components/Signup";
import TextForm from "./components/TextForm";
import NoteState from "./components/context/notes/NoteState";

function getInitialTheme() {
  const saved = localStorage.getItem("itext-theme");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function App() {
  const [mode, setMode] = useState(getInitialTheme);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    document.documentElement.style.colorScheme = mode;
    localStorage.setItem("itext-theme", mode);
  }, [mode]);

  const showAlert = useCallback((message, type = "success") => {
    setAlert({ id: Date.now(), msg: message, type });
  }, []);

  const toggleMode = () => {
    setMode((current) => (current === "light" ? "dark" : "light"));
  };

  return (
    <NoteState>
      <BrowserRouter>
        <div className="app-shell">
          <Navbar mode={mode} toggleMode={toggleMode} />
          <Alert alert={alert} onDismiss={() => setAlert(null)} />
          <main className="page-content">
            <Routes>
              <Route path="/" element={<TextForm showAlert={showAlert} />} />
              <Route path="/home" element={<Save showAlert={showAlert} />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login showAlert={showAlert} />} />
              <Route path="/createuser" element={<Signup showAlert={showAlert} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <footer className="site-footer">
            <span>iText Studio</span>
            <span>Write clearly. Keep what matters.</span>
          </footer>
          <ToastContainer
            position="top-center"
            autoClose={2600}
            newestOnTop
            theme={mode}
          />
        </div>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
