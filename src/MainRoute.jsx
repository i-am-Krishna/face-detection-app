import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Main from './ImageFaceDetector/Main'
import VideoPlayer from './VideoFaceDetector/VideoPlayer'
import App from './WebCamFaceDetector/App'
import Home from './Home/Home'

const MainRoute = () => {
  return (
    <div>
        <Routes>
          <Route path='/' element={<Home/>}/>
            <Route path='/image-face-detect' element={<Main/>}/>
            <Route path='/video-face-detect' element={<VideoPlayer/>} />
            <Route path='/webcam-face-detect' element={<App/>} />
        </Routes>
    </div>
  )
}

export default MainRoute