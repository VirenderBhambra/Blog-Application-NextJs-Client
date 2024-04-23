import React from "react";
import Editor from "./components/textEditor/quill";
import { Featured } from "./components/featured/Featured";
import { CategoryList } from "./components/categoryList/CategoryList";
import styles from "./page.module.css";
import { Footer } from "./components/footer/Footer";
import {Pagination } from './components/pagination/pagination'

export default function Home() {
  return (
    <div className={styles.container}>
      <div>
        <Featured/>
        <CategoryList/>
      </div>
      <Pagination/>
      <Footer/>
    </div>
  );
}
