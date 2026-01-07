import { useState } from 'react'
import './WaitlistForm.css'

const WaitlistForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    twitter: ''
  })

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [showModal, setShowModal] = useState(false)

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateName = (name) => {
    return name.trim().length >= 2
  }

  const validateTwitter = (twitter) => {
    if (!twitter) return true
    const twitterRegex = /^@?[A-Za-z0-9_]{1,15}$/
    return twitterRegex.test(twitter)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(prev => ({
      ...prev,
      [name]: true
    }))
    validateField(name)
  }

  const validateField = (fieldName) => {
    const newErrors = { ...errors }

    if (fieldName === 'name') {
      if (!validateName(formData.name)) {
        newErrors.name = 'Name must be at least 2 characters'
      } else {
        delete newErrors.name
      }
    }

    if (fieldName === 'email') {
      if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address'
      } else {
        delete newErrors.email
      }
    }

    if (fieldName === 'twitter') {
      if (!validateTwitter(formData.twitter)) {
        newErrors.twitter = 'Invalid Twitter handle. Use @username format (1-15 chars)'
      } else {
        delete newErrors.twitter
      }
    }

    setErrors(newErrors)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = {}

    if (!validateName(formData.name)) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!validateTwitter(formData.twitter)) {
      newErrors.twitter = 'Invalid Twitter handle. Use @username format (1-15 chars)'
    }

    if (Object.keys(newErrors).length === 0) {
      onSuccess(formData)
      setShowModal(false)
      setFormData({ name: '', email: '', twitter: '' })
      setErrors({})
      setTouched({})
    } else {
      setErrors(newErrors)
      setTouched({ name: true, email: true, twitter: true })
    }
  }

  const getInputClass = (fieldName) => {
    if (!touched[fieldName]) return ''
    return errors[fieldName] ? 'error' : 'success'
  }

  return (
    <>
      <button className="waitlist-button" onClick={() => setShowModal(true)}>
        <span>Join the waitlist now</span>
        <div className="arrow-icon">
          <svg viewBox="0 0 24 24">
            <line x1="5" y1="19" x2="19" y2="5"></line>
            <polyline points="9 5 19 5 19 15"></polyline>
          </svg>
        </div>
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
            <div className="modal-header">
              {'> > > JOIN THE REVOLUTION < < <'}
            </div>
            <h2>Get Early Access</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">FULL NAME:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Your Name"
                  className={getInputClass('name')}
                />
                {errors.name && <div className="error-message show">{errors.name}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="email">EMAIL ADDRESS:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="you@example.com"
                  className={getInputClass('email')}
                />
                {errors.email && <div className="error-message show">{errors.email}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="twitter">TWITTER HANDLE:</label>
                <input
                  type="text"
                  id="twitter"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="@yourhandle"
                  maxLength="50"
                  className={getInputClass('twitter')}
                />
                {errors.twitter && <div className="error-message show">{errors.twitter}</div>}
              </div>

              <button type="submit" className="submit-btn">Get on the List</button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default WaitlistForm
