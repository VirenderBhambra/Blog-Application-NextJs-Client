import React from "react";
import styles from "./categoryList.module.css";
import fashion from "./images/fashion.jpg";
import food from "./images/food.jpg";
import coding from "./images/coding.jpg";
import nature from "./images/nature.jpg";
import travel from "./images/travel.jpg";
import culture from "./images/culture.jpg";
import Image from "next/image";

export const CategoryList = () => {
  return (
    <div className={styles.container}>
      <h2>Popular Categories</h2>
      <div className={styles.wrapper}>
        <div className={styles.category} style={{backgroundColor:'#DFDDFE'}}>
          <Image
            src={fashion}
            height={40}
            width={40}
            alt="fashion"
            style={{ borderRadius: 20 }}
          />
          Fashion
        </div>
        <div className={styles.category} style={{backgroundColor:'#F7E7F3'}}>
          <Image
            src={food}
            height={40}
            width={40}
            alt="food"
            style={{ borderRadius: 20 }}
          />
          Food
        </div>
        <div className={styles.category} style={{backgroundColor:'#E5EEE6'}}>
          <Image
            src={coding}
            height={40}
            width={40}
            alt="coding"
            style={{ borderRadius: 20 }}
          />
          Coding
        </div>
        <div className={styles.category} style={{backgroundColor:'#E1F1FF'}}>
          <Image
            src={nature}
            height={40}
            width={40}
            alt="nature"
            style={{ borderRadius: 20 }}
          />
          Nature
        </div>
        <div className={styles.category} style={{backgroundColor:'#FDE1DB'}}>
          <Image
            src={travel}
            height={40}
            width={40}
            alt="travel"
            style={{ borderRadius: 20 }}
          />
          Travel
        </div>
        <div className={styles.category} style={{backgroundColor:'#FEE8D3'}}>
          <Image
            src={culture}
            height={40}
            width={40}
            alt="culture"
            style={{ borderRadius: 20 }}
          />
          Culture
        </div>
      </div>
    </div>
  );
};
