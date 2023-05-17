import { Router } from 'express'
import { imageUpload } from '../util/upload'
import {
  productUpdateValidationRules,
  productValidationRules,
} from '../validations/productValidators'
import runValidation from '../validations'
import { isLoggedIn } from '../middlewares/isLoggedIn'
import { isAdmin } from '../middlewares/isAdmin'
import {
  adminCreateProduct,
  adminToogleIsActive,
  adminUpdateProduct,
} from '../controllers/adminControllers'

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
// 2. PUT/api/v1/admin/products/:id/active -> isLogedIn, isAdmin -> Toggle isActive
adminRouter.put(
  '/products/:id/active',
  isLoggedIn,
  isAdmin,
  adminToogleIsActive
)
// 3. PUT/api/v1/admin/products/:id -> isLogedIn, isAdmin -> Updtae product
adminRouter.put(
  '/products/:id',
  imageUpload.array('images', 5), // in body key is images, up to 5 images in array
  isLoggedIn,
  isAdmin,
  productUpdateValidationRules,
  runValidation,
  adminUpdateProduct
)

export default adminRouter
