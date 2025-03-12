import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HistoryPage.css";
import { FaTrash, FaDownload, FaArrowLeft } from "react-icons/fa";

function HistoryPage() {
    const [history, setHistory] = useState(() => {
        const storedHistory = localStorage.getItem("history");
        return storedHistory ? JSON.parse(storedHistory) : [];
    });

    const navigate = useNavigate();

    const loadVersion = (content, type) => {
        if (type === "docx") {
            localStorage.setItem("editorContent", content);
            navigate("/editor/word-editor");  // Navigate to DOCX editor
        } else if (type === "txt") {
            localStorage.setItem("textEditorContent", content);
            navigate("/editor/txt-editor");  // Navigate to Text Editor
        } else if (type === "pdf") {
            localStorage.setItem("pdfEditorContent", content);
            navigate("/editor/pdf-editor");  // Navigate to Text Editor
        }
    };

    const deleteVersion = (index) => {
        const newHistory = history.filter((_, i) => i !== index);
        setHistory(newHistory);
        localStorage.setItem("history", JSON.stringify(newHistory));
    };

    const textVersions = history.filter((version) => version.type === "txt");
    const docxVersions = history.filter((version) => version.type === "docx");
    const pdfVersions = history.filter((version) => version.type === "pdf");

    return (
        <div className="history-container">
            <div className="header">
                <h2>Saved Versions</h2>
                <button className="back-btn" onClick={() => navigate("/")}>
                    <FaArrowLeft /> Back to Editor
                </button>
            </div>

            <div className="versions">
                {[{ title: "📄 DOCX Versions", versions: docxVersions },
                  { title: "📕 PDF Versions", versions: pdfVersions },
                  { title: "📝 Text Versions", versions: textVersions }]
                  .map(({ title, versions }, sectionIndex) => (
                    <div key={sectionIndex} className="section">
                        <h3>{title}</h3>
                        {versions.length === 0 ? (
                            <p className="empty-message">No saved versions.</p>
                        ) : (
                            <ul>
                                {versions.map((version, index) => (
                                    <li key={index}>
                                        <span>{version.name}</span>
                                        <div className="buttons">
                                            <button
                                                className="load-btn"
                                                onClick={() => loadVersion(version.content, version.type)}
                                            >
                                                <FaDownload /> Load
                                            </button>
                                            <button
                                                className="delete-btn"
                                                onClick={() => deleteVersion(history.indexOf(version))}
                                            >
                                                <FaTrash /> Delete
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HistoryPage;
