// dependencies import
import { Router } from 'express'
import { createCustomer } from '../controllers/customerController'
import { avatarUpload } from '../util/upload'

const customerRouter = Router()

customerRouter.post(
  '/create',
  avatarUpload.single('avatarImage'),
  createCustomer
)

export default customerRouter
