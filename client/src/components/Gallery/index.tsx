import { useState } from 'react'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs'
import { ImCross } from 'react-icons/im'
import { CloseIcon, Container, Image, PrevNextIcon } from './styles'

type Props = {
  images: string[]
  setShowGallery: React.Dispatch<React.SetStateAction<boolean>>
}

const Gallery = ({ images, setShowGallery }: Props) => {
  const [sliderIndex, setSliderIndex] = useState(0)

  const changeIndex = (isIncrement: boolean = false) => {
    if (isIncrement) {
      sliderIndex < images.length - 1 && setSliderIndex((prevIndex) => prevIndex + 1)
    } else {
      sliderIndex > 0 && setSliderIndex((prevIndex) => prevIndex - 1)
    }
  }

  return (
    <Container>
      <CloseIcon onClick={() => setShowGallery(false)}>
        <ImCross />
      </CloseIcon>

      <PrevNextIcon onClick={() => changeIndex()}>
        <BsFillArrowLeftCircleFill />
      </PrevNextIcon>

      <Image src={images[sliderIndex]} />

      <PrevNextIcon onClick={() => changeIndex(true)}>
        <BsFillArrowRightCircleFill />
      </PrevNextIcon>
    </Container>
  )
}

export default Gallery
