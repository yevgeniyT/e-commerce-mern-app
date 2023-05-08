// dependencies import
import { Router } from 'express'

// other components import
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
} from '../controllers/categoryController'
import { categoryValidationRules } from '../validations/categoryValidators'
import runValidation from '../validations'

const categoryRouter = Router()

// 1. Create category
// TODO Add admin and isLogedin validation
categoryRouter.post('/', categoryValidationRules, runValidation, createCategory)

// 2. Get all categories
categoryRouter.get('/', getAllCategories)

// 3. Get single category
categoryRouter.get('/:id', getSingleCategory)

// 4. Delete single category
categoryRouter.delete('/:id', deleteCategory)
// 5. Update category
categoryRouter.put(
  '/:id',
  categoryValidationRules,
  runValidation,
  updateCategory
)

export default categoryRouter
