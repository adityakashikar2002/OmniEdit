// import React from "react";
// import { Routes, Route, Link } from "react-router-dom";
// import DocumentEditor from "./components/DocumentEditor";
// import HistoryPage from "./components/HistoryPage";
// import PdfEditor from "./components/PDFEditor";
// import WordEditor from "./components/WordEditor";
// import TextEditor from "./components/TextEditor";
// import "./Home.css";  // Import the CSS file

// function EditorApp() {
//     return (
//         <div>
//             <nav>
//                 <Link to="/">Home</Link>
//                 <Link to="/txt-editor">TXT Editor</Link>
//                 <Link to="/pdf-editor">PDF Editor</Link>
//                 <Link to="/word-editor">Word Editor</Link>
//                 <Link to="/history">History</Link>
//             </nav>
//             <div className="container">
//                 <Routes>
//                     <Route path="/" element={<DocumentEditor />} />
//                     <Route path="/txt-editor" element={<TextEditor />} />
//                     <Route path="/pdf-editor" element={<PdfEditor />} />
//                     <Route path="/word-editor" element={<WordEditor />} />
//                     <Route path="/history" element={<HistoryPage />} />
//                 </Routes>
//             </div>
//         </div>
//     );
// }

// export default EditorApp;

// // src/EditorApp.js
// import React, { useEffect, useState } from "react";
// import { Routes, Route, Link, useNavigate } from "react-router-dom";
// import DocumentEditor from "./components/DocumentEditor";
// import HistoryPage from "./components/HistoryPage";
// import PdfEditor from "./components/PDFEditor";
// import WordEditor from "./components/WordEditor";
// import TextEditor from "./components/TextEditor";
// import "./Home.css";
// import { auth, db } from "./components/firebase";
// import { doc, getDoc } from "firebase/firestore";

// function EditorApp() {
//   const navigate = useNavigate();
//   const [userDetails, setUserDetails] = useState(null);
//   const [showProfile, setShowProfile] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       auth.onAuthStateChanged(async (user) => {
//         if (user) {
//           const docRef = doc(db, "Users", user.uid);
//           const docSnap = await getDoc(docRef);
//           if (docSnap.exists()) {
//             setUserDetails(docSnap.data());
//           }
//         }
//       });
//     };
//     fetchUserData();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await auth.signOut();
//       navigate("/login");
//     } catch (error) {
//       console.error("Error logging out:", error.message);
//     }
//   };

//   const handleProfileClick = () => {
//     setShowProfile(!showProfile);
//   };

//   const toggleDarkMode = () => {
//     setDarkMode((prevMode) => !prevMode);
//   };

//   return (
//     <div className={`editor-app ${darkMode ? "dark-mode" : ""}`}>
//       {/* <div className="header">
//         <button onClick={toggleDarkMode}>
//           {darkMode ? (
//             <img src="/lightm.png" alt="Light Mode" className="w-8 h-8 rounded-full" />
//           ) : (
//             <img src="/sleep-mode.png" alt="Dark Mode" className="w-8 h-8 rounded-full" />
//           )}
//         </button>
//         {darkMode ? <img src="/logo2.png" alt="Logo" className='h-16'/> : <img src="/logo.png" alt="Logo" className='h-16'/>}

//         <button className="profile-button2" onClick={handleProfileClick}>
//           {darkMode ? (
//             <img src="/account.png" alt="User Profile" className="w-8 h-8 rounded-full" />
//           ) : (
//             <img src="/user1.png" alt="User Profile" className="w-8 h-8 rounded-full" />
//           )}
//         </button>
//       </div> */}

//       {/* {showProfile && userDetails && (
//         <div className="profile-dropdown">
//           <div className="profile-dropdown-content">
//             <h3 className="profile-title">Welcome, {userDetails.firstName}</h3>
//             <div className="profile-details">
//               <p>Email: {userDetails.email}</p>
//             </div>
//             <button className="profile-button" onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         </div>
//       )} */}

//       <nav>
//         <Link to="/editor">Home</Link>
//         <Link to="/editor/txt-editor">TXT Editor</Link>
//         <Link to="/editor/pdf-editor">PDF Editor</Link>
//         <Link to="/editor/word-editor">Word Editor</Link>
//         <Link to="/editor/history">History</Link>
//       </nav>
//       <div className="container">
//         <Routes>
//           <Route path="/" element={<DocumentEditor />} />
//           <Route path="/txt-editor" element={<TextEditor />} />
//           <Route path="/pdf-editor" element={<PdfEditor />} />
//           <Route path="/word-editor" element={<WordEditor />} />
//           <Route path="/history" element={<HistoryPage />} />
//         </Routes>
//       </div>
//     </div>
//   );
// }

// export default EditorApp;

// // src/EditorApp.js WORKS LIT 99%
// import React, { useEffect, useState } from "react";
// import { Routes, Route, Link, useNavigate } from "react-router-dom";
// import DocumentEditor from "./components/DocumentEditor";
// import HistoryPage from "./components/HistoryPage";
// import PdfEditor from "./components/PDFEditor";
// import WordEditor from "./components/WordEditor";
// import TextEditor from "./components/TextEditor";
// import "./Home.css"; // Use Home.css for EditorApp styles
// import { auth, db } from "./components/firebase";
// import { doc, getDoc } from "firebase/firestore";

// function EditorApp() {
//   const navigate = useNavigate();
//   const [userDetails, setUserDetails] = useState(null);
//   const [showProfile, setShowProfile] = useState(false);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       auth.onAuthStateChanged(async (user) => {
//         if (user) {
//           const docRef = doc(db, "Users", user.uid);
//           const docSnap = await getDoc(docRef);
//           if (docSnap.exists()) {
//             setUserDetails(docSnap.data());
//           }
//         }
//       });
//     };
//     fetchUserData();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await auth.signOut();
//       navigate("/login");
//     } catch (error) {
//       console.error("Error logging out:", error.message);
//     }
//   };

//   const handleProfileClick = () => {
//     setShowProfile(!showProfile);
//   };

//   return (
//     <div className="editor-app-container">
//       <div className="editor-app">
//       <nav>
//         <Link to="/editor">Home</Link>
//         <Link to="/editor/txt-editor">TXT Editor</Link>
//         <Link to="/editor/pdf-editor">PDF Editor</Link>
//         <Link to="/editor/word-editor">Word Editor</Link>
//         <Link to="/editor/history">History</Link>
//         <button className="profile-button2" onClick={handleProfileClick}>
//           <img src="/account.png" alt="User Profile" className="w-8 h-8 rounded-full" />
//         </button>

//         {showProfile && userDetails && (
//           <div className="profile-dropdown">
//             <div className="profile-dropdown-content">
//               <h3 className="profile-title">Welcome, {userDetails.firstName}</h3>
//               <div className="profile-details">
//                 <p>{userDetails.email}</p>
//               </div>
//               <button className="profile-button" onClick={handleLogout}>Logout</button>
//             </div>
//           </div>
//         )}

//       </nav>
//       <div className="container">
//         <Routes>
//           <Route path="/" element={<DocumentEditor />} />
//           <Route path="/txt-editor" element={<TextEditor />} />
//           <Route path="/pdf-editor" element={<PdfEditor />} />
//           <Route path="/word-editor" element={<WordEditor />} />
//           <Route path="/history" element={<HistoryPage />} />
//         </Routes>
//       </div>
//     </div>
//     </div>
    
//   );
  
// }

// export default EditorApp;

// src/EditorApp.js
import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import DocumentEditor from "./components/DocumentEditor";
import HistoryPage from "./components/HistoryPage";
import PdfEditor from "./components/PDFEditor";
import WordEditor from "./components/WordEditor";
import TextEditor from "./components/TextEditor";
import WordToPdfPage from "./components/WordToPdfPage";
import PdfToWordPage from "./components/PdfToWordPage";

import "./Home.css";
import { auth, db } from "./components/firebase";
import { doc, getDoc } from "firebase/firestore";

function EditorApp() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
          }
        }
      });
    };
    fetchUserData();
  }, []);

  const handleLogoClick = () => {
    navigate('/editor');
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div className="editor-app-container">
      <div className="editor-app">
        <nav>
          <img
          src="/omniedit-bg.png"
          alt="Logo"
          className="logo cursor-pointer"
          onClick={handleLogoClick}
        />
          <div className="nav-left">
            <Link to="/editor">Home</Link>
            <Link to="/editor/txt-editor">TXT Editor</Link>
            <Link to="/editor/pdf-editor">PDF Editor</Link>
            <Link to="/editor/word-editor">Word Editor</Link>
            <Link to="/editor/convert-to-pdf">DOCX ➡ PDF</Link>
            <Link to="/editor/convert-to-word">PDF ➡ DOCX</Link>
            <Link to="/editor/history">History</Link>
          </div>
          <div className="nav-right">
            <button className="profile-button2" onClick={handleProfileClick}>
              <img src="/account.png" alt="User Profile" className="w-8 h-8 rounded-full" />
            </button>
            {showProfile && userDetails && (
              <div className="profile-dropdown">
                <div className="profile-dropdown-content">
                  <h3 className="profile-title">Welcome, {userDetails.firstName}</h3>
                  <div className="profile-details">
                    <p>{userDetails.email}</p>
                  </div>
                  <button className="profile-button" onClick={handleLogout}>Logout</button>
                </div>
              </div>
            )}
          </div>
        </nav>
        <div className="container">
          <Routes>
            <Route path="/" element={<DocumentEditor />} />
            <Route path="/txt-editor" element={<TextEditor />} />
            <Route path="/pdf-editor" element={<PdfEditor />} />
            <Route path="/word-editor" element={<WordEditor />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/convert-to-pdf" element={<WordToPdfPage />} />
            <Route path="/convert-to-word" element={<PdfToWordPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default EditorApp;