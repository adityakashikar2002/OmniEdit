// import React, { useState } from "react";
// import axios from "axios";
// import { Upload, Button, message, Form, Typography, Spin, Result } from "antd";
// import { UploadOutlined, FileWordOutlined, LoadingOutlined } from "@ant-design/icons";

// const { Title } = Typography;

// function WordToPdfConverter() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [completed, setCompleted] = useState(false);
//   const [fileUrl, setFileUrl] = useState("");

//   const handleFileChange = ({ file }) => {
//     if (file.type === "application/pdf") {
//       setSelectedFile(file);
//       message.success("DOCX file selected successfully.");
//     } else {
//       message.error("Please select a valid DOCX file.");
//     }
//   };

//   const fileToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result.split(",")[1]);
//       reader.onerror = (error) => reject(error);
//     });
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       message.warning("Please select a file first.");
//       return;
//     }

//     setLoading(true);
//     setCompleted(false);

//     try {
//       const base64File = await fileToBase64(selectedFile);

//       const requestBody = {
//         Parameters: [
//           {
//             Name: "File",
//             FileValue: {
//               Name: selectedFile.name,
//               Data: base64File,
//             },
//           },
//           {
//             Name: "StoreFile",
//             Value: true,
//           },
//         ],
//       };

//       const response = await axios.post(
//         "https://v2.convertapi.com/convert/docx/to/pdf",
//         requestBody,
//         {
//           headers: {
//             Authorization: "Bearer secret_QyXSVs7VE3B6A7zM",
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data && response.data.Files && response.data.Files[0]) {
//         setFileUrl(response.data.Files[0].Url);
//         setCompleted(true);
//         message.success("File converted successfully.");
//       } else {
//         message.error("Conversion failed. Please try again.");
//       }
//     } catch (error) {
//       message.error(
//         `Error converting file: ${error.response?.data?.error || error.message}`
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: "32px", maxWidth: "500px", margin: "auto", background: "#fff", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
//       <Title level={3} style={{ textAlign: "center" }}>Word to PDF Converter</Title>
//       <Form layout="vertical">
//         <Form.Item label="Upload PDF File">
//           <Upload.Dragger
//             accept=".pdf"
//             showUploadList={false}
//             beforeUpload={() => false}
//             onChange={handleFileChange}
//             style={{ padding: "20px", borderRadius: "8px" }}
//           >
//             <p className="ant-upload-drag-icon">
//               <UploadOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
//             </p>
//             <p className="ant-upload-text">Click or drag file to this area</p>
//             <p className="ant-upload-hint">Only DOCX files are supported.</p>
//           </Upload.Dragger>
//         </Form.Item>

//         <Form.Item>
//           <Button
//             type="primary"
//             onClick={handleUpload}
//             loading={loading}
//             disabled={!selectedFile}
//             block
//           >
//             Convert to Word
//           </Button>
//         </Form.Item>
//       </Form>

//       {loading && (
//         <div style={{ textAlign: "center", marginTop: "20px" }}>
//           <Spin indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />} />
//           <p style={{ marginTop: "10px" }}>Converting your file...</p>
//         </div>
//       )}

//       {completed && fileUrl && (
//         <Result
//           status="success"
//           title="Conversion Completed!"
//           subTitle="Your Word file is ready for download."
//           extra={[
//             <Button type="primary" key="download" icon={<FileWordOutlined />}>
//               <a href={fileUrl} target="_blank" rel="noopener noreferrer">
//                 Download PDF File
//               </a>
//             </Button>,
//           ]}
//         />
//       )}
//     </div>
//   );
// }

// export default WordToPdfConverter;

import React, { useState } from "react";
import axios from "axios";
import { Upload, Button, message, Form, Typography, Spin, Result } from "antd";
import { UploadOutlined, FilePdfOutlined, LoadingOutlined } from "@ant-design/icons"; // Changed icon

const { Title } = Typography;

function WordToPdfConverter() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [fileUrl, setFileUrl] = useState("");

  const handleFileChange = ({ file }) => {
    if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      setSelectedFile(file);
      message.success("DOCX file selected successfully.");
    } else {
      message.error("Please select a valid DOCX file.");
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      message.warning("Please select a file first.");
      return;
    }

    setLoading(true);
    setCompleted(false);

    try {
      const base64File = await fileToBase64(selectedFile);

      const requestBody = {
        Parameters: [
          {
            Name: "File",
            FileValue: {
              Name: selectedFile.name,
              Data: base64File,
            },
          },
          {
            Name: "StoreFile",
            Value: true,
          },
        ],
      };

      const response = await axios.post(
        "https://v2.convertapi.com/convert/docx/to/pdf", // Correct endpoint
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_BEARER_ID}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.Files && response.data.Files[0]) {
        setFileUrl(response.data.Files[0].Url);
        setCompleted(true);
        message.success("File converted successfully.");
      } else {
        message.error("Conversion failed. Please try again.");
      }
    } catch (error) {
      message.error(
        `Error converting file: ${error.response?.data?.error || error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "32px", maxWidth: "700px", margin: "auto", background: "#fff", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
      <Title level={3} style={{ textAlign: "center" }}>Word to PDF Converter</Title>
      <Form layout="vertical">
        <Form.Item label="Upload DOCX File">
          <Upload.Dragger
            accept=".docx" // Correct accept type
            showUploadList={false}
            beforeUpload={() => false}
            onChange={handleFileChange}
            style={{ padding: "20px", borderRadius: "8px" }}
          >
            <p className="ant-upload-drag-icon">
              <UploadOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
            </p>
            <p className="ant-upload-text">Click or drag file to this area</p>
            <p className="ant-upload-hint">Only DOCX files are supported.</p>
          </Upload.Dragger>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            onClick={handleUpload}
            loading={loading}
            disabled={!selectedFile}
            block
          >
            Convert to PDF {/* Correct button text */}
          </Button>
        </Form.Item>
      </Form>

      {loading && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />} />
          <p style={{ marginTop: "10px" }}>Converting your file...</p>
        </div>
      )}

      {completed && fileUrl && (
        <Result
          status="success"
          title="Conversion Completed!"
          subTitle="Your PDF file is ready for download." // Correct subtitle
          extra={[
            <Button type="primary" key="download" icon={<FilePdfOutlined />}> {/* Changed icon */}
              <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                Download PDF File {/* Correct download link text */}
              </a>
            </Button>,
          ]}
        />
      )}
    </div>
  );
}

export default WordToPdfConverter;