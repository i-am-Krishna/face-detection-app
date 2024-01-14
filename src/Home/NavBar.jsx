import React from 'react'
import { Link } from 'react-router-dom';
import styles from './Home.module.css'


const NavBar = () => {
  return (
    <div>
        
        <nav>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to="/image-face-detect">Image Face Detector</Link></li>
            <li><Link to="/video-face-detect">Video Face Detector</Link></li>
            <li><Link to="/webcam-face-detect">WebCam Face Detector</Link></li>
          </ul>
        </nav>
    </div>
  )
}

export default NavBar