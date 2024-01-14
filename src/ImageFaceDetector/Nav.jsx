import React from 'react'
import styles from './Image.module.css';


const Nav = ({name}) => {
  return (
    <div  className={styles.navb}>
      <h1>Face Detection</h1>
      <h1>{name}</h1>
    </div>
  )
}

export default Nav