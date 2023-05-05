// dependencies import
import { Router } from 'express'
import {
  createCustomer,
  loginCustomer,
  verifyCustomer,
} from '../controllers/customerController'
import { avatarUpload } from '../util/upload'
import { signInValidation } from '../middlewares/inputValidations'

const customerRouter = Router()
//todo add input validation
customerRouter.post(
  '/create',
  avatarUpload.single('avatarImage'),
  createCustomer
)

customerRouter.post('/verify-customer', verifyCustomer)

customerRouter.post('/login', signInValidation, loginCustomer)
export default customerRouter
