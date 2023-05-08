// reusable function to handle success/error  status in controllers

import { Response } from 'express'

const errorHandler = (
  res: Response,
  // Use default values for status code and message
  statusCode: number = 500,
  message: string = 'Internal Server Error'
) => {
  return res.status(statusCode).json({
    success: false,
    message: message,
  })
}

const successHandler = (
  res: Response,
  statusCode: number = 200,
  message: string = 'Success operation',
  payload: any = {}
) => {
  return res.status(statusCode).json({
    success: true,
    message: message,
    payload: payload,
  })
}

export { errorHandler, successHandler }
