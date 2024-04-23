import styles from './page.module.css'
import Link from 'next/link';
import LoginPage from "../components/auth/login";
export default function About(){
    
    return(
        <div className={styles.login}>
            <LoginPage/>
        </div>
    )
}