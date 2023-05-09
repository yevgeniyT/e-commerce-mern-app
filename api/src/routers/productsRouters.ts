// dependencies import
import { Router } from 'express'

// other components import

import runValidation from '../validations'
import { productValidationRules } from '../validations/productValidators'
import { imageUpload } from '../util/upload'

import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from '../controllers/productController'

const productRouter = Router()

// 1. POST/api/v1/products -> isLogedIn, isAdmin -> Create product
// TODO Add admin and isLogedin validation
productRouter.post(
  '/',
  imageUpload.array('images', 5), // in body key is images, up to 5 images in array
  productValidationRules,
  runValidation,
  createProduct
)

// 2. GET/api/v1/products -> Get all products
productRouter.get('/', getAllProducts)

// 3. GET/api/v1/products/:id -> Get single product
productRouter.get('/:id', getSingleProduct)

// 4. DELETE/api/v1/products/:id -> Delete single product
productRouter.delete('/:id', deleteProduct)

// 5. PUT/api/v1/products/:id -> Update category
productRouter.put('/:id', productValidationRules, runValidation, updateProduct)

// 6. POST/api/v1/products/:id/add -> Add product to stock

// 7. POST/api/v1/products/:id/remoove -> Remove product from stock by any reason (damage or sale)

// 8. GET/api/v1/products/:serchValue -> Serch based on any values

export default productRouter
