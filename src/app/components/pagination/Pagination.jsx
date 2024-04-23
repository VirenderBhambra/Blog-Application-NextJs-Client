"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./pagination.module.css";
export const Pagination = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState(null);
  async function fetchBlog() {
    setLoading(true);
    const response = await axios.get("http://localhost:4000/blog/all");
    setBlogs(response.data);
    console.log(response);
  }
  useEffect(() => {
    fetchBlog();
  }, []);
  return (
    <div className={styles.blogs}>
      {blogs?.map((val, ind) => {
        return (
          <div className={styles.blog} key={ind}>
            <div dangerouslySetInnerHTML={{ __html: val.title }} />
            Author :<div dangerouslySetInnerHTML={{ __html: val.author }} />
            {/* <div dangerouslySetInnerHTML={{ __html: val.content }} /> */}
          </div>
        );
      })}
    </div>
  );
};
