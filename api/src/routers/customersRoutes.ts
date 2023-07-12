// dependencies import
import { Router } from 'express'

//other components import
import {
  createCustomer,
  getCustomerProfile,
  logOutCustomer,
  loginCustomer,
  refreshToken,
  requestPasswordReset,
  resetPassword,
  updateCustomerProfile,
  validatePasswordResetToken,
  verifyCustomer,
} from '../controllers/customerController'

import { avatarUpload } from '../util/upload'
import {
  resetPasswordValidation,
  signInValidation,
} from '../middlewares/inputValidations'
import { isLoggedIn } from '../middlewares/isLoggedIn'

const customerRouter = Router()
//TODO add input validation

customerRouter.post(
  '/create',
  avatarUpload.single('avatarImage'),
  createCustomer
)
customerRouter.post('/verify-customer', verifyCustomer)
customerRouter.post('/login', signInValidation, loginCustomer)
customerRouter.get('/logout', logOutCustomer)
customerRouter.get('/refresh', refreshToken)

customerRouter
  .route('/profile')
  .get(isLoggedIn, getCustomerProfile)
  .put(isLoggedIn, updateCustomerProfile)

customerRouter.post('/forgot-password', requestPasswordReset)
customerRouter.post('/verify-password', validatePasswordResetToken)
customerRouter.put('/set-newpassword', resetPasswordValidation, resetPassword)
export default customerRouter
