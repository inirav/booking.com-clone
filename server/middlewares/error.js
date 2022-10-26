export const errorLogger = (error, req, res, next) => {
  console.log(error)
  next(error)
}

export const errorResponder = (error, req, res, next) => {
  const status = error.status || 500
  const message = error.message || 'Internal server error'

  return res.status(status).json({
    success: false,
    status,
    message,
    stack: error.stack,
  })
}
