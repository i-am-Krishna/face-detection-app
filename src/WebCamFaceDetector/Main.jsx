import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import styles from './Webcam.module.css'

const Main = () => {
    const videoRef = useRef();
    const canvasRef = useRef();

    useEffect(() => {

        const loadModels = () => {

            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
                faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
                faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
                faceapi.nets.faceExpressionNet.loadFromUri('/models')
            ]).then(handlevideo).catch((err) => console.error(err))
        }

        const handlevideo = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: {} })
                videoRef.current.srcObject = stream
                videoRef.current.addEventListener('play', handlePlay); 
            } catch (error) {
                console.error(error)
            }
        }

        loadModels();
    }, [])

    const handlePlay = () => {
        const canvas = canvasRef.current;
        const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
        faceapi.matchDimensions(canvas, displaySize);

        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
            console.log(detections)

            const resizedDetections = faceapi.resizeResults(detections, displaySize);

            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
            faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        }, 100)
    }
    return (
        <div className={styles.container}>
            <video ref={videoRef} width="720" height="560" autoPlay muted  ></video>
            <canvas id="canvas" ref={canvasRef}></canvas>
        </div>
    )
}
export default Main