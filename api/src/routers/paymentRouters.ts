import { Router } from 'express'
import { isLoggedIn } from '../middlewares/isLoggedIn'
import {
  getClientToken,
  proccessPayment,
} from '../controllers/paymentControllers'

const paymentRouter = Router()

// 1. GET/api/v1/payment/token -> return token
paymentRouter.get('/token', isLoggedIn, getClientToken)
//TODO check why not working in postmen
// 2. POST/api/v1/payment/preccess -> return token
paymentRouter.get('/proccess', isLoggedIn, proccessPayment)

export default paymentRouter
