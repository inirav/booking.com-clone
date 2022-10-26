import { plainToInstance } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import { RequestHandler } from 'express'
import { HttpException } from '../exceptions/HttpException'

const validationMiddleware = (
  type: any,
  value: 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true
): RequestHandler => {
  return async (req, res, next) => {
    const errors: ValidationError[] = await validate(plainToInstance(type, req[value]), {
      skipMissingProperties,
      whitelist,
      forbidNonWhitelisted,
    })

    if (errors.length > 0) {
      const message = errors
        .map((error: ValidationError) =>
          error.constraints
            ? Object.values(error.constraints)
            : error.children?.map((error: ValidationError) => error.constraints)
        )
        .join(', ')

      return next(new HttpException(400, message))
    }

    next()
  }
}

export default validationMiddleware
