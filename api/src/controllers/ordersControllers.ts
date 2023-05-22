// dependencies import
import { Request, Response, Express } from 'express'
import { Types } from 'mongoose'

//other components import
import { successHandler, errorHandler } from '../helpers/requestsHandler'

import { OrderType } from '../@types/oedersType'
import Customer from '../models/customersSchems'
import Order from '../models/ordersSchema'

// 1. Create new Order
const createOrder = async (req: Request, res: Response) => {
  try {
    // Get data from frontend
    const { items, deliveryCost, totalPrice }: OrderType = req.body

    console.log('order body:', req.body)

    // Get customer from res isLogedin middleware
    const customer = await Customer.findById(
      (req.customer as { customerId: string }).customerId
    )
    if (!customer) {
      return errorHandler(res, 400, 'Customer not found')
    }

    // Creating order data to be saved in DB
    const orderData = {
      items: items,
      deliveryCost: deliveryCost,
      totalPrice: totalPrice,
      customer: customer._id,
    }

    // Create order and save it to DB using the create() method
    const newOrder = await Order.create(orderData)

    if (!newOrder) {
      return errorHandler(res, 400, 'Failed to create new order')
    }

    return successHandler(res, 200, 'Order was created successfully', {
      newOrder,
    })
  } catch (error: unknown) {
    // Handle different types of errors
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('An unknown error occurred.')
    }
    // Send the error response
    return errorHandler(res, 500, 'Error while creating order')
  }
}

export { createOrder }
