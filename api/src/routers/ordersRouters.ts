// dependencies import
import { Router } from 'express'
import { createOrder } from '../controllers/ordersControllers'
import { isLoggedIn } from '../middlewares/isLoggedIn'

// other components import

const orderRouter = Router()

// POST/api/v1/orders -> isLoggedIn -> Create category
orderRouter.post('/', isLoggedIn, createOrder)

// 3. Get single category

export default orderRouter
