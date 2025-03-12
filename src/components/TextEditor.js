import React, { useState, useRef, useEffect } from "react";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";
import { FaUndo, FaRedo } from "react-icons/fa";
import "./TextEditor.css";

const TextEditor = () => {
    const [content, setContent] = useState("");
    const [fileName, setFileName] = useState(""); // Track the file name
    const editorRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedContent = localStorage.getItem("textEditorContent");
        if (storedContent) {
            setContent(storedContent);
            localStorage.removeItem("textEditorContent");
        }

        localStorage.setItem("textEditorRedoHistory", JSON.stringify([]));
    }, []);

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem("textEditorHistory") || "[]");
        localStorage.setItem("textEditorHistory", JSON.stringify([...history, content]));
    }, [content]);

    const handleContentChange = (newContent) => {
        setContent(newContent);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setContent(e.target.result);
                setFileName(file.name); // Store the file name
            };
            reader.readAsText(file);
        }
    };

    const handleDownload = () => {
        if (content) {
            const downloadName = fileName || prompt("Enter file name:", "edited-text.txt"); // Use original name if available
            if (downloadName) {
                const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
                saveAs(blob, downloadName);
            }
        } else {
            alert("There is no content to download.");
        }
    };

    const handleSaveVersion = () => {
        const versionName = prompt("Enter version name:");
        if (versionName) {
            const newVersion = { name: versionName, content: content, type: "txt" };
            const storedHistory = JSON.parse(localStorage.getItem("history") || "[]");
            storedHistory.push(newVersion);
            localStorage.setItem("history", JSON.stringify(storedHistory));
            alert("Version saved!");
        }
    };

    const handleUndo = () => {
        const history = JSON.parse(localStorage.getItem("textEditorHistory") || "[]");
        if (history.length > 1) {
            history.pop();
            const previousContent = history[history.length - 1];
            setContent(previousContent);
            localStorage.setItem("textEditorHistory", JSON.stringify(history));
            localStorage.setItem("textEditorRedoHistory", JSON.stringify([content, ...JSON.parse(localStorage.getItem("textEditorRedoHistory") || "[]")]));
        }
    };

    const handleRedo = () => {
        const redoHistory = JSON.parse(localStorage.getItem("textEditorRedoHistory") || "[]");
        if (redoHistory.length > 0) {
            const nextContent = redoHistory.shift();
            setContent(nextContent);
            localStorage.setItem("textEditorRedoHistory", JSON.stringify(redoHistory));
            localStorage.setItem("textEditorHistory", JSON.stringify([...JSON.parse(localStorage.getItem("textEditorHistory") || "[]"), nextContent]));
        }
    };

    return (
        <div className="text-editor-container">
            <h2>Text Editor</h2>
            <input type="file" onChange={handleFileChange} accept=".txt" /> {/* Add file input */}
            <textarea
                ref={editorRef}
                value={content}
                onChange={(e) => handleContentChange(e.target.value)}
                className="text-editor-textarea"
            />
            <div className="text-editor-buttons">
                <button onClick={handleDownload} className="text-download-btn">Download TXT</button>
                <button onClick={handleSaveVersion} className="text-save-btn">Save Version</button>
                {/* <button onClick={() => navigate("/history")} className="text-history-btn">View History</button> */}
                <button onClick={() => navigate("/editor/history")} className="text-history-btn">View History</button>
                <button onClick={handleUndo} className="text-undo-btn">
                    <FaUndo />
                </button>
                <button onClick={handleRedo} className="text-redo-btn">
                    <FaRedo />
                </button>
            </div>
        </div>
    );
};

export default TextEditor;