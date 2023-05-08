import { validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

const runValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).send({
        success: false,
        message: errors.array()[0].msg,
      })
    }
    return next()
  } catch (error) {
    return next(error)
  }
}

export default runValidation
