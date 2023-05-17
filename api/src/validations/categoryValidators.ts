// Import the necessary functions from the express-validator package
import { body, validationResult } from 'express-validator'

// Define the validation rules for the category schema
const categoryValidationRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Category name is required')
    .isLength({ max: 50 })
    .withMessage('Category name cannot be longer than 50 characters'),
  body('description')
    .trim()
    .optional()
    .isLength({ max: 500 })
    .withMessage('Category description cannot be longer than 500 characters'),
]

export { categoryValidationRules }
