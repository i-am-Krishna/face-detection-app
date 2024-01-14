import React, { useState, useRef, useEffect } from 'react';
import { fabric } from 'fabric';
import * as faceapi from 'face-api.js';
import styles from './Video.module.css'

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  useEffect(() => {
    const initializeFaceApi = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
      await faceapi.nets.faceExpressionNet.loadFromUri('/models')
    };
    initializeFaceApi(); 
  }, []); 

  const handleVideoPlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    const videoUrl = URL.createObjectURL(file);
    videoRef.current.src = videoUrl;
    console.log(videoRef.current.clientHeight)
  };

  const detectFaces = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const displaySize = { width:videoRef.current.clientWidth, height:videoRef.current.clientHeight };

setInterval(async() => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
    faceapi.matchDimensions(canvas, displaySize);
    const resizedDetections = faceapi.resizeResults(detections,displaySize) 
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
            faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
  },100)
}

  useEffect(() => {
    if (isPlaying) {
      const intervalId = setInterval(() => {
        detectFaces();
      }, 100);
      return () => clearInterval(intervalId);
    }
  }, [isPlaying]);

  return (
    <div className={styles.containerVideo}>
    <div className={styles.videoPlayer}>
    <video ref={videoRef} onLoadedData={() => detectFaces()} />
      <canvas ref={canvasRef}  style={{position:"absolute"}}/>
    </div> 
      <br />
      <div className={styles.tags}>
      <input type="file" onChange={handleVideoUpload} />
      <button onClick={handleVideoPlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      </div>
    </div>
  );
};

export default VideoPlayer;
