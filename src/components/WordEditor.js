// //WORKS FINE 99%
// import React, { useState, useRef, useEffect } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import mammoth from "mammoth";
// import { saveAs } from "file-saver";
// import htmlDocx from "html-docx-js/dist/html-docx";
// import { useNavigate } from "react-router-dom";
// import { FaUndo, FaRedo } from "react-icons/fa"; // Import icons
// import "./WordEditor.css"; // Import the CSS file

// const WordEditor = () => {
//     const [content, setContent] = useState("");
//     const editorRef = useRef(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const storedContent = localStorage.getItem("editorContent");
//         if (storedContent) {
//             setContent(storedContent);
//             localStorage.removeItem("editorContent");
//         }
//     }, []);

//     const handleFileUpload = async (event) => {
//         const file = event.target.files[0];
//         if (file && file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
//             try {
//                 const arrayBuffer = await file.arrayBuffer();
//                 const result = await mammoth.convertToHtml({
//                     arrayBuffer,
//                     styleMap: [
//                         "p => p",
//                         "r => span",
//                     ],
//                 });
//                 setContent(result.value);
//             } catch (error) {
//                 console.error("DOCX to HTML conversion error:", error);
//                 alert("Error converting DOCX to HTML. Please check the console.");
//             }
//         } else if (file) {
//             alert("Invalid file type. Please upload a .docx file.");
//         }
//     };

//     const handleContentChange = (newContent) => {
//         setContent(newContent);
//     };

//     const handleDownload = () => {
//         if (content) {
//             const fileName = prompt("Enter file name:", "edited-document.docx");
//             if (fileName) {
//                 try {
//                     const html = `<!DOCTYPE html><html><head><meta charset='utf-8'></head><body>${content}</body></html>`;
//                     const converted = htmlDocx.asBlob(html);
//                     saveAs(converted, fileName);
//                 } catch (error) {
//                     console.error("Error creating DOCX:", error);
//                     alert("Error creating DOCX. Please try again.");
//                 }
//             }
//         } else {
//             alert("There is no content to download.");
//         }
//     };

//     const handleSaveVersion = () => {
//         const versionName = prompt("Enter version name:");
//         if (versionName) {
//             const newVersion = { name: versionName, content: content, type: "docx" };
//             const storedHistory = JSON.parse(localStorage.getItem("history") || "[]");
//             storedHistory.push(newVersion);
//             localStorage.setItem("history", JSON.stringify(storedHistory));
//             alert("Version saved!");
//         }
//     };

//     const modules = {
//         toolbar: [
//             // ["bold", "italic", "underline"],
//             // [{ list: "ordered" }, { list: "bullet" }],
//             [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // Heading levels
//             ['bold', 'italic', 'underline', 'strike'], // Basic formatting
//             [{ 'font': [] }], // Font family
//             [{ 'size': ['small', false, 'large', 'huge'] }], // Font sizes
//             [{ 'color': [] }, { 'background': [] }], // Font colors and background
//             [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Lists
//             [{ 'script': 'sub' }, { 'script': 'super' }], // Subscript/superscript
//             [{ 'indent': '-1' }, { 'indent': '+1' }], // Indentation
//             [{ 'direction': 'rtl' }], // Right-to-left text direction
//             [{ 'align': [] }], // Text alignment
//             ['link', 'image', 'video'], // Links, images, and videos
//             ['clean'], // Remove formatting
//             // ['undo', 'redo'], // Undo/redo
//             // [
//             //     { undo: "undo" },
//             //     { redo: "redo" }
//             // ]
//         ],
//         history: {
//             delay: 1000,
//             maxStack: 50,
//             userOnly: true
//         }
//     };

//     return (
//         <div className="word-editor-container">
//             <h2>Word Editor</h2>
//             <input type="file" accept=".docx" onChange={handleFileUpload} />
//             <ReactQuill value={content} onChange={handleContentChange} ref={editorRef} modules={modules} />
//             <div className="word-editor-buttons">
//                 <button onClick={handleDownload} className="word-download-btn">Download DOCX</button>
//                 <button onClick={handleSaveVersion} className="word-save-btn">Save Version</button>
//                 {/* <button onClick={() => navigate("/history")} className="word-history-btn">View History</button> */}
//                 <button onClick={() => navigate("/editor/history")} className="word-history-btn">View History</button>
//                 <button onClick={() => editorRef.current?.editor.history.undo()} className="word-undo-btn">
//                     <FaUndo />
//                 </button>
//                 <button onClick={() => editorRef.current?.editor.history.redo()} className="word-redo-btn">
//                     <FaRedo />
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default WordEditor;


// //WORKS FINE 99% using conversion
// import React, { useState, useRef, useEffect } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import mammoth from "mammoth";
// import { saveAs } from "file-saver";
// import htmlDocx from "html-docx-js/dist/html-docx";
// import { useNavigate } from "react-router-dom";
// import { FaUndo, FaRedo } from "react-icons/fa";
// import "./WordEditor.css";
// import WordToPdfConverter from "./WordToPdfConverter";

// const WordEditor = () => {
//     const [content, setContent] = useState("");
//     const editorRef = useRef(null);
//     const navigate = useNavigate();
//     const [showWordConverter, setShowWordConverter] = useState(false);

//     useEffect(() => {
//         const storedContent = localStorage.getItem("editorContent");
//         if (storedContent) {
//             setContent(storedContent);
//             localStorage.removeItem("editorContent");
//         }
//     }, []);

//     const handleFileUpload = async (event) => {
//         const file = event.target.files[0];
//         if (file && file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
//             try {
//                 const arrayBuffer = await file.arrayBuffer();
//                 const result = await mammoth.convertToHtml({
//                     arrayBuffer,
//                     styleMap: [
//                         "p => p",
//                         "r => span",
//                     ],
//                 });
//                 setContent(result.value);
//             } catch (error) {
//                 console.error("DOCX to HTML conversion error:", error);
//                 alert("Error converting DOCX to HTML. Please check the console.");
//             }
//         } else if (file) {
//             alert("Invalid file type. Please upload a .docx file.");
//         }
//     };

//     const handleContentChange = (newContent) => {
//         setContent(newContent);
//     };

//     const handleDownload = () => {
//         if (content) {
//             const fileName = prompt("Enter file name:", "edited-document.docx");
//             if (fileName) {
//                 try {
//                     const html = `<!DOCTYPE html><html><head><meta charset='utf-8'></head><body>${content}</body></html>`;
//                     const converted = htmlDocx.asBlob(html);
//                     saveAs(converted, fileName);
//                 } catch (error) {
//                     console.error("Error creating DOCX:", error);
//                     alert("Error creating DOCX. Please try again.");
//                 }
//             }
//         } else {
//             alert("There is no content to download.");
//         }
//     };

//     const handleSaveVersion = () => {
//         const versionName = prompt("Enter version name:");
//         if (versionName) {
//             const newVersion = { name: versionName, content: content, type: "docx" };
//             const storedHistory = JSON.parse(localStorage.getItem("history") || "[]");
//             storedHistory.push(newVersion);
//             localStorage.setItem("history", JSON.stringify(storedHistory));
//             alert("Version saved!");
//         }
//     };

//     const modules = {
//         toolbar: [
//             // ["bold", "italic", "underline"],
//             // [{ list: "ordered" }, { list: "bullet" }],
//             [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // Heading levels
//             ['bold', 'italic', 'underline', 'strike'], // Basic formatting
//             [{ 'font': [] }], // Font family
//             [{ 'size': ['small', false, 'large', 'huge'] }], // Font sizes
//             [{ 'color': [] }, { 'background': [] }], // Font colors and background
//             [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Lists
//             [{ 'script': 'sub' }, { 'script': 'super' }], // Subscript/superscript
//             [{ 'indent': '-1' }, { 'indent': '+1' }], // Indentation
//             [{ 'direction': 'rtl' }], // Right-to-left text direction
//             [{ 'align': [] }], // Text alignment
//             ['link', 'image', 'video'], // Links, images, and videos
//             ['clean'], // Remove formatting
//             // ['undo', 'redo'], // Undo/redo
//             // [
//             //     { undo: "undo" },
//             //     { redo: "redo" }
//             // ]
//         ],
//         history: {
//             delay: 1000,
//             maxStack: 50,
//             userOnly: true
//         }
//     };


//     const handleWordConversionClick = () => {
//         setShowWordConverter(true);
//     };

//     const handleCloseWordConverter = () => {
//         setShowWordConverter(false);
//     };


//     return (
//         <div className="word-editor-container">
//             <h2>Word Editor</h2>
//             <input type="file" accept=".docx" onChange={handleFileUpload} />
//             <ReactQuill value={content} onChange={handleContentChange} ref={editorRef} modules={modules} />
//             <div className="word-editor-buttons">
//                 <button onClick={handleDownload} className="word-download-btn">Download DOCX</button>
//                 <button onClick={handleWordConversionClick} className="word-download-btn">Download PDF</button>
//                 <button onClick={handleSaveVersion} className="word-save-btn">Save Version</button>
//                 <button onClick={() => navigate("/editor/history")} className="word-history-btn">View History</button>
//                 <button onClick={() => editorRef.current?.editor.history.undo()} className="word-undo-btn">
//                     <FaUndo />
//                 </button>
//                 <button onClick={() => editorRef.current?.editor.history.redo()} className="word-redo-btn">
//                     <FaRedo />
//                 </button>
//             </div>
//             {showWordConverter && (
//                     <div className="pdf-converter-modal">
//                         <WordToPdfConverter onClose={handleCloseWordConverter} />
//                         <button onClick={handleCloseWordConverter}>Close</button>
//                     </div>
//             )}
//         </div>
//     );

// };

// export default WordEditor;

//WORKS FINE 99% using conversion
import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import mammoth from "mammoth";
import { saveAs } from "file-saver";
import htmlDocx from "html-docx-js/dist/html-docx";
import { useNavigate } from "react-router-dom";
import { FaUndo, FaRedo } from "react-icons/fa";
import "./WordEditor.css";

const WordEditor = () => {
    const [content, setContent] = useState("");
    const editorRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedContent = localStorage.getItem("editorContent");
        if (storedContent) {
            setContent(storedContent);
            localStorage.removeItem("editorContent");
        }
    }, []);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            try {
                const arrayBuffer = await file.arrayBuffer();
                const result = await mammoth.convertToHtml({ arrayBuffer });
                setContent(result.value);
            } catch (error) {
                console.error("DOCX to HTML conversion error:", error);
                alert("Error converting DOCX to HTML.");
            }
        } else {
            alert("Invalid file type. Please upload a .docx file.");
        }
    };

    const handleContentChange = (newContent) => {
        setContent(newContent);
    };

    const handleDownload = () => {
        if (content) {
            const fileName = prompt("Enter file name:", "edited-document.docx");
            if (fileName) {
                try {
                    const html = `<!DOCTYPE html><html><head><meta charset='utf-8'></head><body>${content}</body></html>`;
                    const converted = htmlDocx.asBlob(html);
                    saveAs(converted, fileName);
                } catch (error) {
                    console.error("Error creating DOCX:", error);
                    alert("Error creating DOCX.");
                }
            }
        } else {
            alert("There is no content to download.");
        }
    };

    const handleSaveVersion = () => {
        const versionName = prompt("Enter version name:");
        if (versionName) {
            const newVersion = { name: versionName, content, type: "docx" };
            const storedHistory = JSON.parse(localStorage.getItem("history") || "[]");
            storedHistory.push(newVersion);
            localStorage.setItem("history", JSON.stringify(storedHistory));
            alert("Version saved!");
        }
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'font': [] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'align': [] }],
            ['link', 'image', 'video'],
            ['clean'],
        ],
        history: {
            delay: 1000,
            maxStack: 50,
            userOnly: true,
        },
    };

    const handleWordConversionClick = () => {
        navigate("/editor/convert-to-pdf");
    };

    return (
        <div className="word-editor-container">
            <h2>Word Editor</h2>
            <input type="file" accept=".docx" onChange={handleFileUpload} />
            <ReactQuill value={content} onChange={handleContentChange} ref={editorRef} modules={modules} />
            <div className="word-editor-buttons">
                <button onClick={handleDownload} className="word-download-btn">Download DOCX</button>
                {/* <button onClick={handleWordConversionClick} className="word-download-btn">Download PDF</button> */}
                <button onClick={handleSaveVersion} className="word-save-btn">Save Version</button>
                <button onClick={() => navigate("/editor/history")} className="word-history-btn">View History</button>
                <button onClick={() => editorRef.current?.editor.history.undo()} className="word-undo-btn">
                    <FaUndo />
                </button>
                <button onClick={() => editorRef.current?.editor.history.redo()} className="word-redo-btn">
                    <FaRedo />
                </button>
            </div>
        </div>
    );
};

export default WordEditor;



