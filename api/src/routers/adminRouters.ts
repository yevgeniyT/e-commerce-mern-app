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
  createCategory,
  deleteCategory,
  getAllCustomers,
  getAllOrders,
  updateCategory,
} from '../controllers/adminControllers'
import { categoryValidationRules } from '../validations/categoryValidators'

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

// 3. GET/api/v1/admin/customers -> isLogedIn, isAdmin -> Get all customers
adminRouter.get('/customers', isLoggedIn, isAdmin, getAllCustomers)

// 4. Delete single category
adminRouter.delete('/categories/:id', isLoggedIn, isAdmin, deleteCategory)
// 5. Update category
adminRouter.put(
  '/categories/:id',
  categoryValidationRules,
  runValidation,
  updateCategory
)

// 6.  POST/api/v1/admin/categories -> isLogedIn, isAdmin -> Create category
adminRouter.post(
  '/categories',
  isLoggedIn,
  isAdmin,
  categoryValidationRules,
  runValidation,
  createCategory
)
// 7. GET/api/v1/orders - isLoggetIn - Get all orders
adminRouter.get('/orders', isLoggedIn, getAllOrders)

export default adminRouter
