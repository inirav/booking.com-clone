import { NextFunction, Request, Response } from 'express'
import { v2 as cloudinary } from 'cloudinary'

class UploadsController {
  public deleteImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id
      await cloudinary.uploader.destroy(id)

      res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }
}

export default UploadsController
