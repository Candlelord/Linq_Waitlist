import { useState } from 'react'
import './App.css'
import WaitlistForm from './components/WaitlistForm'
import SuccessPage from './components/SuccessPage'

function App() {
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

  return (
    <div className="app">
      {/* Video Background */}
      <div className="video-background">
        <video autoPlay muted loop>
          <source src="/IMG_1277.MOV" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
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
