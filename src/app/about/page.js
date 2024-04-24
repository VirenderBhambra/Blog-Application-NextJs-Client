import styles from './page.module.css'
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import Link from 'next/link';
export default function About(){
    
    return(
        <div className={styles.about}>
            <div className={styles.info}>
                <h1>Virender Bhambra</h1>
                <h2>
                    Links: 
                    <a href='https://github.com/VirenderBhambra'><GitHubIcon/></a>
                    <a href='https://twitter.com/BhambraVirender'><XIcon/></a>
                </h2> 
                
                <div>
                    <h2>Tech Stack  </h2>
                    <h3>Frontend : NextJs</h3>
                    <h3> Backend : NodeJs, ExpressJs</h3>
                    <h3>Database : MongoDB, Mongoose</h3>
                    <h3>Authentication : JWT, CryptoJs, Cookies</h3>
                    <h3>UI components: Material UI</h3>
                    <h2>Design Idea By: Virender Bhambra</h2>
                </div>

            </div>
        </div>
    )
}