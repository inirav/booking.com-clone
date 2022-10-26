import { v2 as cloudinary } from 'cloudinary'

export const deleteObject = async (req, res, next) => {
  try {
    await cloudinary.uploader.destroy(req.params.id)
    res.json(`Object ${req.params.id} deleted`)
  } catch (error) {
    next(error)
  }
}
