// dependencies import
import { Router } from 'express'

// other components import
import {
  getAllCategories,
  getSingleCategory,
} from '../controllers/categoryController'
import { categoryValidationRules } from '../validations/categoryValidators'
import runValidation from '../validations'

const categoryRouter = Router()

// 2. Get all categories
categoryRouter.get('/', getAllCategories)

// 3. Get single category
categoryRouter.get('/:id', getSingleCategory)

export default categoryRouter
