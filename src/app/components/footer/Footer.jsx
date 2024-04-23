'use client'
import React from 'react';
import styles from './footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLogo}>AWAKE</div>
        <div className={styles.footerLinks}>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>
        <div className={styles.footerSocial}>
          <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="#" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
      <div className={styles.footerCopyright}>
        © 2024 AWAKE. All rights reserved.
      </div>
    </footer>
  );
};
