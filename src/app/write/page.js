"use client";
import React, { useEffect, useState } from "react";
import Editor from "../components/textEditor/quill";
import axios from "axios";
import { Link } from "@mui/material";
import styles from './page.module.css'
export default function Write() {
  const [blogs, setBlogs] = useState(null);
  const [numberOfBlogs, setNumberOfBlogs] = useState(0);

  async function fetchBlog() {
    const response = await axios.get("http://localhost:4000/blog/myBlogs", {
      withCredentials: true,
    });
    // console.log(response)
    setBlogs(response.data);
    setNumberOfBlogs(response.data.length);
  }
  useEffect(() => {
    fetchBlog();
  }, []);


  return (
    <div className="dashboard">
        <h2>My Blogs</h2>
      <h3>{`Total blogs posted : ${numberOfBlogs}`}</h3>
      <div className={styles.blogs}>
      {blogs?.map((val, ind) => (
          <div className={styles.blog} key={ind} >
            <div dangerouslySetInnerHTML={{ __html: val.title }} />
            <div style={{display:'flex',fontWeight:'bold'}}>{`Author : ${val.author}` }</div>
            {`${val.description}....`}
            {/* {val.slug = `/blog/${val.slug}`} */}
            <Link href={`/blog/${val.slug}`}>Read more</Link>
         </div>
        )
      )}
    </div>
      <Editor />
    </div>
  );
}
