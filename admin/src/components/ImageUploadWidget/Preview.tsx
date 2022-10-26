import { Img, LoadingContainer, Thumb, ThumbInner, ThumbsContainer } from './styles'
import { GrFormClose } from 'react-icons/gr'
import { Image } from './types'
import { RaceBy } from '@uiball/loaders'

type Props = {
  images: Image[]
  onDelete: (name: string) => void
}

const Preview = ({ images, onDelete }: Props) => {
  return (
    <ThumbsContainer>
      {images.map((image) => (
        <Thumb key={image.id}>
          <GrFormClose className="icon" onClick={() => onDelete(image.id)} />
          {!image.isUploaded && (
            <LoadingContainer>
              <RaceBy size={34} color="#4162FE" />
            </LoadingContainer>
          )}
          <ThumbInner>
            <Img src={image.url} />
          </ThumbInner>
        </Thumb>
      ))}
    </ThumbsContainer>
  )
}

export default Preview
