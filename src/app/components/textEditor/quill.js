"use client";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./quill.module.css";
import Button from "@mui/material/Button";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Cookies from "universal-cookie";

const Editor = () => {
  const [title, setTitle] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [hastags, setHastags] = useState("");
  const [message, setMessage] = useState("");
  const cookies = new Cookies();

  async function handlePost() {
    if (title === "" || editorContent === "" || hastags === "") {
      setMessage("Empty Field(s)");
      return;
    }
    const data = {
      title: title,
      content: editorContent,
      hashtags: hastags,
      author: cookies.get("author"),
      user: cookies.get("user"),
    };
    if (cookies.get("token") === undefined)
      setMessage("Token is expired Please login again");
    else {
      const response = await axios.post(
        "http://localhost:4000/blog/post",
        data,
        {
          withCredentials: true,
        }
      );

      console.log(response);
      setMessage(response.data.message);
    }
  }
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      [{ script: "super" }, { script: "sub" }],
      [{ direction: "rtl" }],
    ],
    clipboard: {
      matchVisual: false,
    },
  };
  return (
    <div>
      <Button variant="contained" color="success" onClick={handlePost}>
        Post
      </Button>
      {message && (
        <Alert severity="info" onClose={() => setMessage(null)}>
          {message}
        </Alert>
      )}
      <div className={styles.container}>
        <div className={styles.quillContainer}>
          <ReactQuill
            modules={{
              toolbar: [[{ header: "1" }, { header: "2" }, { font: [] }]],
              clipboard: {
                matchVisual: false,
              },
            }}
            theme="snow"
            value={title}
            onChange={setTitle}
            placeholder="Write your title !!"
          />
        </div>
        <div className={styles.quillContent}>
          <ReactQuill
            modules={modules}
            theme="snow"
            value={editorContent}
            onChange={setEditorContent}
            placeholder="Write your creative work !!"
            style={{ height: "30vh", width: "100%" }}
          />
        </div>
        <div className={styles.quillContainer}>
          <ReactQuill
            modules={{
              toolbar: [[{ header: "1" }, { header: "2" }, { font: [] }]],
              clipboard: {
                matchVisual: false,
              },
            }}
            theme="snow"
            value={hastags}
            onChange={setHastags}
            placeholder="#Hastags !!"
          />
        </div>
      </div>
    </div>
  );
};

export default Editor;
