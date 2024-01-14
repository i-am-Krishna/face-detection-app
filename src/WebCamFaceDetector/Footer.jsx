import React from 'react'
import styles from './Webcam.module.css'


const Footer = () => {
  return (
    <footer>
        <div className={styles.footerContainer}>
            <div className={styles.footerLogo}>Krishna</div>
            <div className={styles.footerSocial}>
                <a href="#" className={styles.socialIcon}>Facebook</a>
                <a href="#" className={styles.socialIcon}>Twitter</a>
                <a href="#" className={styles.socialIcon}>Instagram</a>
            </div>
            <div className={styles.footerSubscribe}>
                <p>Subscribe to our newsletter for updates:</p>
                <input type="email" placeholder="Your Email" />
                <button>Subscribe</button>
            </div>
        </div>
    </footer>
        )
}

export default Footer