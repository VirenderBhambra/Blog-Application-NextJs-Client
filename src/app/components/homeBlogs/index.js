"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./index.module.css";
import { Link } from "@mui/material";

export const HomeBlogs = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState(null);
  async function fetchBlog() {
    setLoading(true);
    const response = await axios.get("https://blog-application-express-server.onrender.com/blog/ften");
    setBlogs(response.data);
    console.log(response);
  } 
  useEffect(() => {
    fetchBlog();
  },[]); 

  return (
    <div className={styles.blogs}>
      {blogs ? (
        blogs.length > 0 ? (
          blogs.map((val, ind) => (
            <div className={styles.blog} key={ind}>
              <div dangerouslySetInnerHTML={{ __html: val.title }} />
              <div style={{ display: "flex", fontWeight: "bold" }}>
                {`Author: ${val.author}`}
              </div>
              {`${val.description}....`}
              <Link href={`/blog/${val.slug}`}>Read more</Link>
            </div>
          ))
        ) : (
          <div className={styles.noBlogs}>No blogs in database</div>
        )
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
