"use client";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import styles from "./navbar.module.css";
import Link from "next/link";

import Cookies from "universal-cookie";
export default function Navbar() {
  const cookies = new Cookies();

  return (
    <div className={styles.navbar}>
      <div className={styles.leftSection}>
        <ElectricBoltIcon sx={{ fontSize: 50, color: "royalblue" }} />
        AWAKE
      </div>
      <div className={styles.middleSection}>
        <Link href="/" className={styles.link}>
          Home
        </Link>
        <Link href="/about" className={styles.link}>
          About
        </Link>
        {cookies.get("token") && <Link href="/write" className={styles.link}>
          Write
        </Link>
}
      </div>
      <div className={styles.rightSection}>
        {cookies.get("author") && (
          <div className={styles.helloMessage}>{`Hello ${decodeURIComponent(
            cookies.get("author")
          )}!`}</div>
        )}
        {cookies.get("token") !== undefined ? (
          <div
            onClick={() => {
              cookies.set("token", "", {
                expires: new Date(0),
                path: "/",
                sameSite: "strict",
              });
              cookies.remove("author", {
                path: "/",
              });
              window.location.href = `http://localhost:3000/`;
            }}
          >
            <button className={styles.login}>Logout</button>
          </div>
        ) : (
          <Link href="/login" className={styles.login}>
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
