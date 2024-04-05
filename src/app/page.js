import Image from "next/image";
import styles from "./page.module.css";
import { Featured } from "./components/featured/Featured";
import { CategoryList } from "./components/categoryList/CategoryList";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <Featured/>
      <CategoryList/>
      <div className={styles.section}>
      
      </div>
    </div>
  );
}
