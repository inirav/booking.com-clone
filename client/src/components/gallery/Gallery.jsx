import {
  faCircleChevronLeft,
  faCircleChevronRight,
  faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import './gallery.scss'

export const Gallery = ({ photos, setIsShowGallery }) => {
  const [sliderIndex, setSliderIndex] = useState(0)

  const changeIndex = (action) => {
    if (action === 'increment') {
      sliderIndex < photos.length - 1 && setSliderIndex((prevIndex) => prevIndex + 1)
    } else {
      sliderIndex > 0 && setSliderIndex((prevIndex) => prevIndex - 1)
    }
  }

  return (
    <div className="gallery">
      <FontAwesomeIcon
        icon={faXmarkCircle}
        className="icon close"
        onClick={() => setIsShowGallery(false)}
      />

      <FontAwesomeIcon icon={faCircleChevronLeft} onClick={changeIndex} className="icon" />
      {photos && <img src={photos[sliderIndex].src} alt="" />}
      <FontAwesomeIcon
        icon={faCircleChevronRight}
        onClick={() => changeIndex('increment')}
        className="icon"
      />
    </div>
  )
}
