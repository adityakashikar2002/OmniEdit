import React from "react";
import WordToPdfConverter from "./WordToPdfConverter";
import "./ConverterPage.css";

const WordToPdfPage = () => {

    return (
        <div>
            <h2>Convert Word to PDF</h2>
            <WordToPdfConverter />
        </div>
    );
};

export default WordToPdfPage;
