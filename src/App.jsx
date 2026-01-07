import { useState, useRef, useEffect } from 'react'
import './App.css'
import WaitlistForm from './components/WaitlistForm'
import SuccessPage from './components/SuccessPage'

function App() {
  const videoRef = useRef(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState(null)

  const handleSuccess = (data) => {
    setFormData(data)
    setShowSuccess(true)
  }

  const handleReturnHome = () => {
    setShowSuccess(false)
    setFormData(null)
  }

  useEffect(() => {
    const chooseAndLoad = () => {
      const connType = navigator.connection && navigator.connection.effectiveType ? navigator.connection.effectiveType : ''
      const isSlow = /2g|3g/.test(connType)
      const smallScreen = window.innerWidth <= 700
      const chosen = (isSlow || smallScreen) ? '/IMG_1277_360.mp4' : '/IMG_1277.mp4'

      const video = videoRef.current
      if (!video) return
      const srcEl = video.querySelector('source')
      if (srcEl) {
        if (srcEl.getAttribute('src') !== chosen) {
          srcEl.setAttribute('src', chosen)
          video.load()
          video.play().catch(() => {})
        }
      }
    }

    chooseAndLoad()

    const onResize = () => chooseAndLoad()
    window.addEventListener('resize', onResize)
    const conn = navigator.connection
    if (conn && conn.addEventListener) conn.addEventListener('change', chooseAndLoad)

    return () => {
      window.removeEventListener('resize', onResize)
      if (conn && conn.removeEventListener) conn.removeEventListener('change', chooseAndLoad)
    }
  }, [])

  return (
    <div className="app">
      {/* Video Background */}
      <div className="video-background">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/poster.svg"
          onCanPlay={() => setVideoLoaded(true)}
        >
          {/* sources are set dynamically in useEffect for best UX on mobile */}
          <source id="video-source" />
          Your browser does not support the video tag.
        </video>
        {!videoLoaded && <div className="video-loading-overlay" />}
      </div>


      {/* Dark Overlay */}
      <div className="overlay"></div>

      {/* Main Content */}
      {!showSuccess && (
        <div className="container">
          <div className="text-wrapper">
            <div className="headline-line1">You Liked it Fast,</div>
            <div className="headline-line2">we made it faster</div>
            <div className="headline-line3">from the kitchen to your table.</div>
          </div>

          <WaitlistForm onSuccess={handleSuccess} />
        </div>
      )}

      {/* Success Page */}
      {showSuccess && formData && (
        <SuccessPage data={formData} onReturnHome={handleReturnHome} />
      )}
    </div>
  )
}

export default App
