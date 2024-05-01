"use client";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./quill.module.css";
import Button from "@mui/material/Button";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Cookies from "universal-cookie";

const Editor = ({ slug }) => {
  const [title, setTitle] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [message, setMessage] = useState("");
  const [method, setMethod] = useState("");
  const [blogID, setBlogID] = useState("");
  const cookies = new Cookies();

  useEffect(() => {
    if (slug !== null) {
      setMethod("EDIT");
      fetchData(slug);
    } else {
      setMethod("POST");
      setTitle("");
      setHashtags("");
      setEditorContent("");
      setBlogID("");
    }
  }, [slug]);

  async function fetchData(slug) {
    try {
      const response = (
        await axios.get(
          `https://blog-application-express-server.onrender.com/blog/s/${slug}`
        )
      ).data;
      setEditorContent(response.content);
      setTitle(response.title);
      setHashtags(response.hashtags);
      setBlogID(response._id);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  }
  async function handlePost() {
    if (title === "" || editorContent === "" || hashtags === "") {
      setMessage("Empty Field(s)");
      return;
    }
    if (cookies.get("token") === undefined) {
      setMessage("Token is expired Please login again");
      return;
    }

    const data = {
      title: title,
      content: editorContent,
      hashtags: hashtags,
      author: cookies.get("author"),
      user: cookies.get("user"),
    };

    if (method === "POST") {
      try {
        const response = await axios.post(
          "https://blog-application-express-server.onrender.com/blog/post",
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${cookies.get("token")}`,
            },
          }
        );
        console.log("Post created:", response.data);
        setMessage("Post created!");
        setMethod("POST");
        setTitle("");
        setHashtags("");
        setEditorContent("");
        setBlogID("");
      } catch (error) {
        console.error("Error creating post:", error);
        setMessage("Error creating post:", error);
      }
    } else {
      try {
        const response = await axios.put(
          "https://blog-application-express-server.onrender.com/blog/post",
          { data, blogID },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${cookies.get("token")}`,
            },
          }
        );
        console.log("Post edited:", response.data);
        setMessage("Post edit success!");
        setMethod("POST");
        setTitle("");
        setHashtags("");
        setEditorContent("");
        setBlogID("");
      } catch (error) {
        console.error("Error creating post:", error);
        setMessage("Error in editting:", error);
      }
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
    <div className={styles.container}>
    <div className={styles.postContainer}>
    <Button variant="contained" color="success" onClick={handlePost}>
        {method}
      </Button>
    </div>
    <div>
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
            value={hashtags}
            onChange={setHashtags}
            placeholder="#Hashtags !!"
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Editor;
