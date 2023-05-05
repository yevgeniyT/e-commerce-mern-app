// dependencies import
import { Router } from 'express'
import {
  createCustomer,
  verifyCustomer,
} from '../controllers/customerController'
import { avatarUpload } from '../util/upload'

const customerRouter = Router()

customerRouter.post(
  '/create',
  avatarUpload.single('avatarImage'),
  createCustomer
)

customerRouter.post('/verify-customer', verifyCustomer)
export default customerRouter
