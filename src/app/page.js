import React from "react";
import Editor from "./components/textEditor/quill";
import { Featured } from "./components/featured/Featured";
import { CategoryList } from "./components/categoryList/CategoryList";
import styles from "./page.module.css";
import { HomeBlogs } from "./components/homeBlogs";


export default function Home() {
  return (
    <div className={styles.container}>
      <Featured />
      <CategoryList />
      <HomeBlogs/>
    </div>
  );
}
