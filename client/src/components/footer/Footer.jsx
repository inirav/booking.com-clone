import NewsLetter from '../newsletter/NewsLetter'
import './footer.scss'

const Footer = () => {
  return (
    <footer>
      <NewsLetter />
      <div className="bookingFooter">
        <div className="bookingFooter__wrapper">
          <div className="links">
            <ul>
              <li>Countries</li>
              <li>Regions</li>
              <li>Cities</li>
              <li>Districts</li>
              <li>Airport</li>
              <li>Hotels</li>
              <li>Places of interest</li>
            </ul>
            <ul>
              <li>Countries</li>
              <li>Regions</li>
              <li>Cities</li>
              <li>Districts</li>
              <li>Airport</li>
              <li>Hotels</li>
              <li>Places of interest</li>
            </ul>
            <ul>
              <li>Countries</li>
              <li>Regions</li>
              <li>Cities</li>
              <li>Districts</li>
              <li>Airport</li>
              <li>Hotels</li>
              <li>Places of interest</li>
            </ul>
            <ul>
              <li>Countries</li>
              <li>Regions</li>
              <li>Cities</li>
              <li>Districts</li>
              <li>Airport</li>
              <li>Hotels</li>
              <li>Places of interest</li>
            </ul>
          </div>

          <div className="copyrightText">
            Copyright © 1996–2022 Booking.com™. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
