"use client";
import React, { useEffect, useState } from "react";
import QuillEditor from "../components/textEditor/QuillEditor";
import axios from "axios";
import { Link } from "@mui/material";
import styles from "./page.module.css";
import Cookie from "universal-cookie";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ArticleIcon from "@mui/icons-material/Article";
import CreateIcon from "@mui/icons-material/Create";
export default function Write() {
  const cookies = new Cookie();
  const [blogs, setBlogs] = useState(null);
  const [numberOfBlogs, setNumberOfBlogs] = useState(0);
  const [props, setProps] = useState(null);
  const [mode, setMode] = useState(true);
  const [loading, setLoading] = useState(false);

  async function fetchBlog() {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://blog-application-express-server.onrender.com/blog/myBlogs",
        {
          headers: {
            "Content-Type": "application/json",
            user: `${cookies.get("user")}`,
          },
        }
      );
      // console.log(response);
      setBlogs(response.data);
      setNumberOfBlogs(response.data.length);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  useEffect(() => {
    setProps(null);
    fetchBlog();
  }, []);

  async function handleDelete(id) {
    try {
      const response = await axios.delete(
        `https://blog-application-express-server.onrender.com/blog/delete/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${cookies.get("token")}`,
          },
        }
      );
      fetchBlog();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  if (loading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );

  return (
    <div className={styles.dashboard}>
      <div className={styles.headers}>
        <h3
          onClick={() => {
            setMode(true);
            fetchBlog();
            setProps(null);
          }}
          className={styles.create}
        >
          <ArticleIcon />
          My Blogs
        </h3>
        <span
          className={styles.create}
          onClick={() => {
            setMode(false);
            setProps(null);
          }}
        >
          <CreateIcon />
          Create
        </span>
        <span style={{ display: "flex" ,alignItems:'center', gap:5}}>
          <h3>Total blogs posted :</h3>
          <span style={{ color: "royalblue", fontWeight: "bold" }}>
            {numberOfBlogs}
          </span>
        </span>
      </div>

      <div className={styles.blogs}>
        {mode ? (
          blogs?.map((val, ind) => (
            <div className={styles.blog} key={ind}>
              <div className={styles.tools}>
                <EditIcon
                  onClick={() => {
                    setMode(false);
                    setProps(val.slug);
                  }}
                />
                <DeleteIcon onClick={() => handleDelete(val._id)} />
              </div>
              <div dangerouslySetInnerHTML={{ __html: val.title }} />
              <div
                style={{ display: "flex", fontWeight: "bold" }}
              >{`Author : ${val.author}`}</div>
              {`${val.description}....`}
              {/* {val.slug = `/blog/${val.slug}`} */}
              <Link href={`/blog/${val.slug}`}>Read more</Link>
            </div>
          ))
        ) : (
          <QuillEditor slug={props} theme ="snow" />
        )}
      </div>
    </div>
  );
}
