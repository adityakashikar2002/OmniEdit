//WORKS FINE 99%
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import mammoth from "mammoth";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { useNavigate } from "react-router-dom";
import { FaUndo, FaRedo } from "react-icons/fa";
import htmlToPdfmake from "html-to-pdfmake";
import "./PDFEditor.css";

if (pdfFonts && pdfFonts.pdfMake) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
} else {
    console.error("Error: pdfFonts is undefined. Ensure pdfmake and vfs_fonts are correctly imported.");
}

const PdfEditor = () => {
    const [docxContent, setDocxContent] = useState("");
    const editorRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check local storage first, then clear it if needed
        const storedContent = localStorage.getItem("pdfEditorContent");
        if (storedContent) {
            setDocxContent(storedContent);
        } else {
            // Only clear if no content was found
            localStorage.removeItem("pdfEditorContent");
        }
    }, []);

    const handlePdfUpload = async (event) => {
        const file = event.target.files[0];
        if (!file || file.type !== "application/pdf") {
            alert("Please upload a valid PDF file.");
            return;
        }
        const formData = new FormData();
        formData.append("file", file);
        try {
            const response = await axios.post("http://127.0.0.1:5000/convert_pdf_to_docx", formData, {
                responseType: "blob",
            });
            if (response.status !== 200) {
                throw new Error("Failed to convert PDF on server.");
            }
            const blob = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
            const reader = new FileReader();
            reader.onload = async function (e) {
                const arrayBuffer = e.target.result;
                const { value } = await mammoth.convertToHtml({ arrayBuffer });
                setDocxContent(value);
            };
            reader.readAsArrayBuffer(blob);
            alert("PDF converted to DOCX. Open and edit it before converting back.");
        } catch (error) {
            console.error("Error converting PDF:", error);
            alert("Failed to convert PDF. Try again.");
        }
    };

    const handleContentChange = (newContent) => {
        setDocxContent(newContent);
        if (newContent) {
            localStorage.setItem("pdfEditorContent", newContent);
        } else {
            localStorage.removeItem("pdfEditorContent");
        }
    };

    const handleConvertToPDF = () => {
        if (!docxContent) {
            alert("Edit the DOCX content first!");
            return;
        }
        const fileName = prompt("Enter the filename for your PDF:", "edited.pdf");
        if (!fileName) return;

        const pdfContent = htmlToPdfmake(docxContent);
        const docDefinition = {
            content: [{ text: 'Your PDF Title', style: 'header' }, pdfContent],
            styles: {
                header: { fontSize: 16, bold: true, margin: [0, 0, 0, 10] },
                normalText: { fontSize: 12 }
            }
        };
        pdfMake.createPdf(docDefinition).download(fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`);
    };

    const handleSaveVersion = () => {
        const versionName = prompt("Enter version name:");
        if (versionName) {
            const newVersion = { name: versionName, content: docxContent, type: "pdf" };
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
    };

    return (
        <div className="pdf-editor-container">
            <h2 className="pdf-editor-title">PDF Editor</h2>
            <input type="file" accept="application/pdf" onChange={handlePdfUpload} className="pdf-input" />
            <ReactQuill
                value={docxContent || ""}
                onChange={handleContentChange}
                ref={editorRef}
                modules={modules}
                className="pdf-editor-quill"
            />
            <div className="pdf-editor-buttons">
                <button className="pdf-download-btn" onClick={handleConvertToPDF}>Download PDF</button>
                <button className="pdf-save-btn" onClick={handleSaveVersion}>Save Version</button>
                {/* <button className="pdf-history-btn" onClick={() => navigate("/history")}>View History</button> */}
                <button className="pdf-history-btn" onClick={() => navigate("/editor/history")}>View History</button>
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

export default PdfEditor;
