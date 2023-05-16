// The isLoggedIn middleware is responsible for checking if the user is logged in by verifying the authToken in the cookies. If the authToken is valid, the middleware proceeds to the next function in the request-response cycle. If the authToken is not found or invalid, a 401 Unauthorized status code is sent along with a message informing the user that they need to log in to access the resource.

// Import necessary modules and types
import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../helpers/tokenHandler'
import { errorHandler } from '../helpers/requestsHandler'
// import type to handle TS error with absence of user Type in Request types

const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1. Get the authToken from the cookies
    const authToken = req.cookies['authToken']
    console.log(authToken)

    // 2. Check if authToken exists
    if (!authToken) {
      return errorHandler(
        res,
        401,
        'You are not logged in. Please log in to access this resource.'
      )
    }

    // 3. Verify the authToken
    verifyToken(authToken, (err, decodedData) => {
      if (err) {
        return errorHandler(res, 401, 'Invalid token. Please log in again.')
      }

      // 4. Attach the decoded data (user ID) to the request object for other middlewares to use
      const customer = decodedData
      console.log(customer)

      req.customer = {
        customerId: customer.customerId,
        isAdmin: customer.isAdmin,
      }

      // 5. Proceed to the next middleware
      next()
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'An unknown error occurred while isLoggedIn.',
    })
  }
}

export { isLoggedIn }
