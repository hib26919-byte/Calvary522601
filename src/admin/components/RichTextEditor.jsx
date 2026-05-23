import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./RichTextEditor.css";

const modules = {
  toolbar: [
    ["bold", "italic", "underline"],
    [{ header: [1, 2, 3, false] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "link"],
    ["clean"]
  ]
};

export default function RichTextEditor({ value, onChange }) {
  return <ReactQuill theme="snow" value={value || ""} onChange={onChange} modules={modules} />;
}
