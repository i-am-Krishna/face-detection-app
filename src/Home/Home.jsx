import React from 'react'; 
import styles from './Home.module.css'
const Home = () => {
  return (
      <div>
 
        <div className={styles.homeSec}>
          <div><p className={styles.paragraph}>In ReactJS, I successfully completed three distinct face detection projects. The first involved real-time face detection in videos, while the second focused on identifying faces within static images. The third project implemented face detection using a webcam feed. Leveraging React's component-based architecture, I integrated computer vision libraries to achieve accurate and efficient face recognition. These projects showcase my proficiency in ReactJS and my ability to implement diverse face detection functionalities for various media types.</p></div>

          <div className={styles.faceImgSec}><img className={styles.faceImg} src="https://d2mk45aasx86xg.cloudfront.net/Using_Deep_Learning_to_Design_Real_time_Face_Detection_and_Recognition_Systems_938a8cdcd7.webp" alt="face rec img" /></div>
        </div>
        </div>
  );
}

export default Home;
