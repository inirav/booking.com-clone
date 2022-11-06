import { useFormikContext } from 'formik'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { upload_image } from '../../services/cloudinary'
import Preview from './Preview'
import { Container } from './styles'
import { Image } from './types'
import { v4 as uuid } from 'uuid'
import extractPublicId from '../../utils/extractPublicId'
import { deleteImage } from '../../services/uploads'

type Props = {
  isError: boolean
  name: string
  value: string[]
}

const ImageUploadWidget = ({ name, value }: Props) => {
  const [images, setImages] = useState<Image[]>([])
  const { setFieldValue, setSubmitting } = useFormikContext()

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setSubmitting(true)
      const imgUrls: string[] = []
      await Promise.all(
        acceptedFiles.map(async (file) => {
          const id = uuid()
          setImages((prev) => [...prev, { id, url: URL.createObjectURL(file), isUploaded: false }])
          const { url, public_id } = await upload_image(file)
          imgUrls.push(url)
          setImages((prev) =>
            prev.map((image) =>
              image.id === id ? { ...image, id: public_id, isUploaded: true } : image
            )
          )
        })
      )
      setFieldValue(name, imgUrls)
      setSubmitting(false)
    },
    [name, setFieldValue, setSubmitting]
  )

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    useFsAccessApi: false,
    maxFiles: 10,
    onDrop,
  })

  useEffect(() => {
    setImages(
      value.map((imgUrl) => ({
        id: extractPublicId(imgUrl),
        url: imgUrl,
        isUploaded: true,
      }))
    )
  }, [value, name, setFieldValue])

  return (
    <>
      <Container {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some photos here, or click to select photos</p>
      </Container>
      <Preview
        images={images}
        onDelete={(id) => {
          deleteImage(id)
          setImages((prev) => prev.filter((image) => image.id !== id))
          setFieldValue(
            name,
            value.filter((imgUrl) => extractPublicId(imgUrl) !== id)
          )
        }}
      />
    </>
  )
}

export default ImageUploadWidget
