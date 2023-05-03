// dependencies import
import { Router } from 'express'
import { createCustomer } from '../controllers/customerController'

const customerRouter = Router()

customerRouter.post('/create', createCustomer)

export default customerRouter
