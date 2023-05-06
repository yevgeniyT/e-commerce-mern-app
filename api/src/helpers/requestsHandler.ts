// reusable function to handle success/error  status in controllers

import { Response } from 'express'

const errorHandler = (res: Response, statusCode: number, message: string) => {
  return res.status(statusCode).json({
    success: false,
    message: message,
  })
}

const successHandler = (
  res: Response,
  statusCode: number,
  message: string,
  payload: any = {}
) => {
  return res.status(statusCode).json({
    success: true,
    message: message,
    payload: payload,
  })
}

export { errorHandler, successHandler }
