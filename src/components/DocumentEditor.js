import React from "react";
import { Link } from "react-router-dom";
import "./DocumentEditor.css"; // Import the CSS file

function DocumentEditor() {
    return (
        <div className="document-editor-container">
            <h2>Document Editor</h2>
            <p>Select a document type to edit:</p>
            <ul>    
                <li><Link to="/editor/txt-editor">Edit Txt</Link></li>
                <li><Link to="/editor/pdf-editor">Edit PDF</Link></li>
                <li><Link to="/editor/word-editor">Edit DOCX</Link></li>
            </ul>
        </div>
    );
}

export default DocumentEditor;
