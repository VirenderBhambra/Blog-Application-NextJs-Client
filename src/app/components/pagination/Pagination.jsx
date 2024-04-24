"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./pagination.module.css";
import { Link } from "@mui/material";

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
  },[]); 

  function handleSlug(slug){
    console.log(slug);
  }
  return (
    <div className={styles.blogs}>
      {blogs?.map((val, ind) => {
        return (
          <div className={styles.blog} key={ind} onClick={(val)=>handleSlug(val)}>
            <div dangerouslySetInnerHTML={{ __html: val.title }} />
            <div style={{display:'flex',fontWeight:'bold'}}>{`Author : ${val.author}` }</div>
            {`${val.description}....`}
            {/* <div dangerouslySetInnerHTML={{ __html: val.content }} /> */}
            <Link href={val.slug}>Read more</Link>
          </div>
        );
      })}
    </div>
  );
};
