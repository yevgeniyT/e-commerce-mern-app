// dependencies import
import { Request, Response, Express } from 'express'
import slugify from 'slugify'
import { Types } from 'mongoose'

//other components import
import { successHandler, errorHandler } from '../helpers/requestsHandler'
import { BrandType } from '../@types/brandTypes'
import Brand from '../models/brandSchema'

// 1. Create new Brand
const createBrand = async (req: Request, res: Response) => {
  try {
    // 1. Get name
    const { name }: BrandType = req.body

    // 2. Check if the brand already exists in DB
    const isExist = await Brand.findOne({ name: name })
    if (isExist) {
      return errorHandler(res, 409, 'Brand is alredy exist')
    }

    // 3 Creating brand data to be saved in DB
    const brandData = {
      name: name,
      slug: slugify(name),
    }

    // 4. Create brand and save it to DB using the create() method
    const newBrand = await Brand.create(brandData)

    if (!newBrand) {
      return errorHandler(res, 400, 'Brand was not created ')
    }

    return successHandler(res, 200, 'Brand was created successfuly', {
      newBrand,
    })
  } catch (error: unknown) {
    // Handle different types of errors
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('An unknown error occurred.')
    }
    // Send the error response
    return errorHandler(res, 500, 'Error while creating brand')
  }
}
// 2. Get all products
const getAllBrands = async (req: Request, res: Response) => {
  try {
    // 1. Fetch all brands from the database
    const brands = await Brand.find().select('name slug').lean()

    if (!brands) {
      errorHandler(res, 404, 'No brand found')
    }
    // 2. Send the successful response with fetched brands
    return successHandler(res, 200, 'Brands fetched successfully', {
      brands,
    })
  } catch (error: unknown) {
    // Handle different types of errors
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('An unknown error occurred.')
    }
    // Send the error response
    return errorHandler(res, 500, 'Error while fetching all brands')
  }
}
// 3. Get a single product
const getSingleBrand = async (req: Request, res: Response) => {
  try {
    // 1. Get id from req.params (assuming id is a route parameter)
    const { id } = req.params
    // Check if the provided id is a valid ObjectID
    if (!Types.ObjectId.isValid(id)) {
      return errorHandler(res, 400, 'Invalid Brand ID')
    }

    // 2. Fetch the brands with the given id from the database
    const brand = await Brand.findById(id).select('name slug').lean()

    // Check if the category exists
    if (!brand) {
      return errorHandler(res, 404, 'Brand not found')
    }

    // 3. Send the successful response with the fetched brands
    return successHandler(res, 200, 'brand fetched successfully', {
      brand,
    })
  } catch (error: unknown) {
    // Handle different types of errors
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('An unknown error occurred.')
    }
    // Send the error response
    return errorHandler(res, 500, 'Error while getting a single brand')
  }
}
// 4. Delete a single product
const deleteProduct = async (req: Request, res: Response) => {
  try {
    // 1. Get id from req.params (assuming id is a route parameter)
    const { id } = req.params

    // Check if the provided id is a valid ObjectID
    if (!Types.ObjectId.isValid(id)) {
      return errorHandler(res, 400, 'Invalid Brand ID')
    }

    // 2. Check if the brand with the given id exists
    const brand = await Brand.findByIdAndDelete(id)

    // 3. Check if the brand was deleted
    if (!brand) {
      return errorHandler(res, 404, 'Brand not found')
    }

    // 4. Send the successful response after deleting the brand
    return successHandler(res, 200, 'Brand deleted successfully')
  } catch (error: unknown) {
    // Handle different types of errors
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('An unknown error occurred.')
    }
    // Send the error response
    return errorHandler(res, 500, 'Error deliting the single brand')
  }
}
// 5. Update brand

const updateBrand = async (req: Request, res: Response) => {
  try {
    // 1.  Get name req.body
    const { name } = req.body
    const { id } = req.params

    // 1.1. Create filter, updates, and options for the findByIdAndUpdate method
    const updates = {
      $set: {
        name: name,
        slug: slugify(name),
      },
    }
    const option = { new: true } // to return updated value imidiately

    // 2. Update the brand with the given id and return the updated document
    const brand = await Brand.findByIdAndUpdate(id, updates, option)
    // 3. Check if the product with the given id exists
    if (!brand) {
      return errorHandler(res, 404, 'Brand not found')
    }

    // 4. Send the successful response after deleting the product
    return successHandler(res, 200, 'Brand updated successfully', {
      brand,
    })
  } catch (error: unknown) {
    // Handle different types of errors
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('An unknown error occurred.')
    }
    // Send the error response
    return errorHandler(res, 500, 'Error whule updating the brand')
  }
}

export { createBrand, getAllBrands, getSingleBrand, deleteProduct, updateBrand }
