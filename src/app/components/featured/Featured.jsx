import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";
import img from "./image6.jpg";
export const Featured = () => {
  return (
    <div className={styles.container}>
      <div className={styles.quotes}>
        <h1>
          Welcome to <span>Awake</span> !!
        </h1>
        <p>
          Discover <span>new </span>stories and ideas...
        </p>
        <p>
          Share with <span>everyone...</span>
        </p>
      </div>
      <div className={styles.featured}>
        <Image src={img} height={500} width={500} alt="Featured" />
        <div className={styles.featuredDetails}>
          <h1>Trees are important</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </div>
  );
};
