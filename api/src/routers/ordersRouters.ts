// dependencies import
import { Router } from 'express'
import { createOrder, getAllOrders } from '../controllers/ordersControllers'
import { isLoggedIn } from '../middlewares/isLoggedIn'

// other components import

const orderRouter = Router()

// POST/api/v1/orders -> isLoggedIn -> Create category
orderRouter.post('/', isLoggedIn, createOrder)

// 2. GET/api/v1/orders - isLoggetIn - Get all orders
orderRouter.get('/', isLoggedIn, getAllOrders)
// 3. Get single category

export default orderRouter
