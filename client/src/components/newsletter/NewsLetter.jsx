import './newsletter.scss'

const NewsLetter = () => {
  return (
    <div className="newsletter">
      <div className="newsletter__wrapper">
        <h2>Save time, save money!</h2>
        <p>Sign up and we'll send the best deals to you</p>
        <div className="inputContainer">
          <input type="email" placeholder="Your email" />
          <button>Subscribe</button>
        </div>
        <div className="checknoxContainer">
          <input type="checkbox" />
          <label>Send me a link to get the FREE Booking.com app!</label>
        </div>
      </div>
    </div>
  )
}

export default NewsLetter
