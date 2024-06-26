// ReactQuillWrapper.jsx

import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./editor.css"; // Import the CSS file for styling

const ReactQuillWrapper = ({ handleChange, lan }) => {
  const [text, setText] = useState("");

  const handleChange1 = (value) => {
    setText(value);
    console.log("value", value);
    handleChange(value);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <div className="">
      <ReactQuill
        value={text}
        modules={modules}
        formats={formats}
        onChange={handleChange1}
        className={lan === "arabic" ? "rtl-editor" : ""} // Apply the RTL class here
      />
    </div>
  );
};

export default ReactQuillWrapper;
