import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import styles from "./navbar.module.css";
import Link from "next/link";
import { yellow } from "@mui/material/colors";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.leftSection}>
        <ElectricBoltIcon sx={{ fontSize: 50 , color:'royalblue'}} />
        AWAKE
      </div>
      <div className={styles.middleSection}>
        <Link href="/" className={styles.link}>
          Home
        </Link>
        <Link href="/about" className={styles.link}>
          About
        </Link>
        <Link href="/contact" className={styles.link}>
          Contact
        </Link>
      </div>
      <div className={styles.rightSection}>
       <Link href="/auth/login" className={styles.login}>Login</Link>
      </div>
    </div>
  );
}
