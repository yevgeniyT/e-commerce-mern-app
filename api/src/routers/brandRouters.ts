// dependencies import
import { Router } from 'express'

// other components import
import {
  createBrand,
  getAllBrands,
  getSingleBrand,
  deleteProduct,
  updateBrand,
} from '../controllers/brandController'

const brandRouter = Router()

// 1. Create category
// TODO Add admin and isLogedin validation
brandRouter.post('/', createBrand)

// 2. Get all categories
brandRouter.get('/', getAllBrands)

// 3. Get single category
brandRouter.get('/:id', getSingleBrand)

// 4. Delete single category
brandRouter.delete('/:id', deleteProduct)
// 5. Update category
brandRouter.put('/:id', updateBrand)

export default brandRouter
