import './SuccessPage.css'

const SuccessPage = ({ data, onReturnHome }) => {
  return (
    <div className="success-page active">
      <div className="success-content">
        <div className="success-checkmark">/</div>
        <h2>Welcome!</h2>
        <p>You've been added to our waitlist.</p>
        <p>We'll be in touch soon with exclusive updates.</p>
        <div className="success-details">
          <p><strong>Name:</strong> <span>{data.name}</span></p>
          <p><strong>Email:</strong> <span>{data.email}</span></p>
          {data.twitter && (
            <p><strong>Twitter:</strong> <span>{data.twitter}</span></p>
          )}
        </div>
        <button className="success-button" onClick={onReturnHome}>Return Home</button>
      </div>
    </div>
  )
}

export default SuccessPage
