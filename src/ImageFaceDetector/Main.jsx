import { useEffect, useState } from 'react';
import Post from './Post';
import styles from './Image.module.css';


function Main() {

  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const [name,setName] = useState();

  useEffect(() => {
    const getImage = () => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () =>{
        setImage({
          url: img.src,
          width: img.width,
          height: img.height
        });
      }
    };

    file && getImage();
  }, [file]);
  

  return (
    <div className={styles.containerImage} >
      {image ? (<Post image={image} name={name} />):(

    <div className={styles.newPost}>
    <div className={styles.addPost}>
          <img src='https://images.pexels.com/photos/1081685/pexels-photo-1081685.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='image' className={styles.image} />
          <div className={styles.addForm}>
            
            <input type='text' value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Hi write here something...' className={styles.postInput} />

            <input type='file' id='file' onChange={(e) => setFile(e.target.files[0])} />
            <label htmlFor="file">
              <img
                className={styles.addImg}
                src="https://cdn.icon-icons.com/icons2/564/PNG/512/Add_Image_icon-icons.com_54218.png"
                alt=""
                />
              <img
                className={styles.addImg}
                src="https://icon-library.com/images/maps-icon-png/maps-icon-png-5.jpg"
                alt=""
                />
              <img
                className={styles.addImg}
                src="https://d29fhpw069ctt2.cloudfront.net/icon/image/84451/preview.svg"
                alt=""
                />
              <button>Send</button>
            </label>
            <input type='file' id='file' style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />

          </div>
        </div>

      </div>
                )}
    </div>
  );
} 

export default Main;