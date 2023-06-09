// Import the necessary functions from the express-validator package
import { body, validationResult } from 'express-validator'

// Define the validation rules for the product schema
const productValidationRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ max: 100 })
    .withMessage('Product name cannot be longer than 100 characters'),
  body('description')
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Product description cannot be longer than 1000 characters'),
  body('price')
    //It checks whether the input value is a float (Дробное)
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('category').notEmpty().withMessage('Category is required'),
  body('brand').notEmpty().withMessage('Category is required'),
]

const productUpdateValidationRules = [
  body('name')
    .trim()
    .optional()
    .isLength({ max: 100 })
    .withMessage('Product name cannot be longer than 100 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Product description cannot be longer than 1000 characters'),

  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),

  body('category').optional().notEmpty().withMessage('Category is required'),

  body('brand').optional().notEmpty().withMessage('Brand is required'),
]

export { productValidationRules, productUpdateValidationRules }
