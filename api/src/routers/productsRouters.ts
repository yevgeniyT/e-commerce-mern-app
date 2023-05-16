// dependencies import
import { Router } from 'express'

// other components import

import runValidation from '../validations'
import {
  productUpdateValidationRules,
  productValidationRules,
} from '../validations/productValidators'
import { imageUpload } from '../util/upload'

import {
  deleteProduct,
  getAllProducts,
  getFilteredProducts,
  getSingleProduct,
  searchProducts,
  updateProduct,
} from '../controllers/productController'

const productRouter = Router()

// 9. GET/api/v1/products/search?searchValue=:searchValue -> Search based on any values
productRouter.get('/search', searchProducts)
// 2. GET/api/v1/products/:id -> Get single product
productRouter.get('/:id', getSingleProduct)

// 3. GET/api/v1/products -> Get all products
productRouter.get('/', getAllProducts)

// 4. POST/api/v1/products/filtered -> Get filtered products
productRouter.post('/filtered', getFilteredProducts)

// 5. DELETE/api/v1/products/:id -> Delete single product
productRouter.delete('/:id', deleteProduct)

// 6. PUT/api/v1/products/:id -> Update category
productRouter.put(
  '/:id',
  productUpdateValidationRules,
  runValidation,
  updateProduct
)

// 7. POST/api/v1/products/:id/add -> Add product to stock

// 8. POST/api/v1/products/:id/remoove -> Remove product from stock by any reason (damage or sale)

export default productRouter
