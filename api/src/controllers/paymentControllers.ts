// dependencies import
import { Request, Response } from 'express'

//other components import
import { successHandler, errorHandler } from '../helpers/requestsHandler'
import gateway from '../config/payment'

// 1.  Get client token
const getClientToken = async (req: Request, res: Response) => {
  try {
    // 1. Generate token uing getway from config folder
    const braintreeToken = (await gateway.clientToken.generate({})).clientToken

    // 2. Check if token is in response
    if (!braintreeToken) {
      console.error('Failed to generate client token.')
      return errorHandler(res, 500, 'Failed to generate client token.')
    }
    // 2. Send the successful response with payment token
    return successHandler(res, 200, 'Token returned  successfully', {
      braintreeToken,
    })
  } catch (error: unknown) {
    // Handle different types of errors
    if (error instanceof Error) {
      console.error(`Error while fetching payment token: ${error.message}`)
    } else {
      console.error('An unknown error occurred.')
    }
    // Send the error response
    return errorHandler(res, 500, 'Error while fetching paymnet token')
  }
}

// 1.  Get client token
const proccessPayment = async (req: Request, res: Response) => {
  try {
    //TODO uptade with payment process
    // 2. Send the successful response with payment token
    return successHandler(res, 200, 'Payment ok', {})
  } catch (error: unknown) {
    // Handle different types of errors
    if (error instanceof Error) {
      console.error(`Error while fetching payment token: ${error.message}`)
    } else {
      console.error('An unknown error occurred.')
    }
    // Send the error response
    return errorHandler(res, 500, 'Error while fetching paymnet token')
  }
}

export { getClientToken, proccessPayment }
