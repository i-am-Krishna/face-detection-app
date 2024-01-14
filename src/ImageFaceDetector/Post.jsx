import React from 'react'
import {useEffect, useRef} from 'react';
import * as faceapi from 'face-api.js';
import styles from './Image.module.css';
import Nav from './Nav'

const Post = ({image,name}) => {
const {url,height,width} = image;
    
  const imgRef = useRef();
  const canvasRef = useRef();
  console.log(url)

  const handleImage = async () => {
    const detections = await faceapi.detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
    canvasRef.current.innerHtml =  faceapi.createCanvasFromMedia(imgRef.current);
    const displaySize = {width,height}
    faceapi.matchDimensions(canvasRef.current,displaySize)

    const resized = faceapi.resizeResults(detections, {
      width: width,
      height: height
    })

    faceapi.draw.drawDetections(canvasRef.current, resized);
    faceapi.draw.drawFaceExpressions(canvasRef.current, resized)
    faceapi.draw.drawFaceLandmarks(canvasRef.current,resized);
}

  useEffect(()=>{
    const loadModels = () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models")
      ])
      .then(handleImage)
      .catch((e)=> console.log(e))
    
    }
    imgRef && loadModels();
  },[])

  return (
<>
    <div className={styles.imageSec}>
    <img  crossOrigin="anonymous" ref={imgRef} src={url} width={width} height={height}/>
    <canvas ref={canvasRef} width={width} height={height}/>

    </div>
    </>
  )
}

export default Post;