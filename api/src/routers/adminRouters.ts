import { Router } from 'express'
import { imageUpload } from '../util/upload'
import { productValidationRules } from '../validations/productValidators'
import runValidation from '../validations'
import { isLoggedIn } from '../middlewares/isLoggedIn'
import { isAdmin } from '../middlewares/isAdmin'
import { adminCreateProduct } from '../controllers/adminControllers'

const adminRouter = Router()

// 1. POST/api/v1/admin/products -> isLogedIn, isAdmin -> Create product
adminRouter.post(
  '/products',
  imageUpload.array('images', 5), // in body key is images, up to 5 images in array
  isLoggedIn,
  isAdmin,
  productValidationRules,
  runValidation,
  adminCreateProduct
)

export default adminRouter
