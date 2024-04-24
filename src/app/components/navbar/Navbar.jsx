'use client'
import { useEffect, useState } from 'react'; // Import useEffect and useState
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import styles from "./navbar.module.css";
import Link from "next/link";
import Cookies from "universal-cookie";

export default function Navbar() {
  const [user, setUser] = useState(null); // Use state to manage user information
  const cookies = new Cookies();

  useEffect(() => {
    // Check for user information when the component mounts
    const storedUser = cookies.get("author");
    setUser(storedUser ? decodeURIComponent(storedUser) : null);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleLogout = () => {
    // Function to handle logout
    cookies.remove("token", { path: "/", sameSite: "strict" });
    cookies.remove("author", { path: "/" });
    cookies.remove("user", { path: "/" });
    setUser(null); // Update state to reflect logout
  };

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
        {user && ( // Render "Write" link if user is logged in
          <Link href="/write" className={styles.link}>
            Write
          </Link>
        )}
      </div>
      <div className={styles.rightSection}>
        {user ? ( // Render user greeting and logout link if user is logged in
          <>
            <span className={styles.link}>Hello {user}!</span>
            <button className={styles.login} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : ( // Render login link if user is not logged in
          <Link href="/login" className={styles.login}>
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
