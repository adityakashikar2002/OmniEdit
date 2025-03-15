// src/App.js
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./components/login";
import SignUp from "./components/register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditorApp from "./EditorApp";
import { auth } from "./components/firebase";


function AppWrapper() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const isEditorApp = location.pathname.startsWith("/editor");

  useEffect(() => {
    if (isEditorApp) {
      document.body.classList.add("editor-app-background");
      document.body.classList.remove("auth-app-background");
    } else {
      document.body.classList.add("auth-app-background");
      document.body.classList.remove("editor-app-background");
    }
  }, [isEditorApp]);

  return (
    <div className={isEditorApp ? "app" : "app-wrapper-container"}>
      <div className={`app-container ${isEditorApp ? "editor-mode" : ""}`}>
        <div className={isEditorApp ? "app" : "auth-wrapper"}>
          <div className={isEditorApp ? "app" : "auth-inner"}>
            <Routes>
              <Route path="/" element={user ? <Navigate to="/editor" /> : <Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/editor/*" element={user ? <EditorApp /> : <Navigate to="/login" />} />
            </Routes>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return <AppWrapper />;
}

export default App;








