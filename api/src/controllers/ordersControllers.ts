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

// 2. Get all orders
const getAllOrders = async (req: Request, res: Response) => {
  try {
    // Retrieve the page, limit, sortBy, and sortOrder from the query parameters in the request. Set default values if they are not provided.
    const page = parseInt(req.query.page as string) || 1 // geting page number from request query with default 1
    const limit = parseInt(req.query.limit as string) || 3

    const totalDocuments = await Order.countDocuments()

    // 1. Fetch all orders from the database
    const orders = await Order.find({})
      .populate('customer', 'firstName lastName ')
      .populate('items.product', 'name')
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ updatedAt: -1 }) // sort by timestamp
      .lean()

    console.log('request')

    if (!orders) {
      errorHandler(res, 404, 'No orders found')
    }

    // 2. Send the successful response with fetched orders
    return successHandler(res, 200, 'Orders fetched successfully', {
      orders,
      pagination: {
        curentPage: page,
        previousPage: page - 1,
        nextPage: page + 1,
        totalNumberOfProducts: totalDocuments,
        totalPages: Math.ceil(totalDocuments / limit),
      },
    })
  } catch (error: unknown) {
    // Handle different types of errors
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('An unknown error occurred.')
    }
    // Send the error response
    return errorHandler(res, 500, 'Error while fetching all orders')
  }
}
export { createOrder, getAllOrders }
