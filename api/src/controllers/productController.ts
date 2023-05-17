// dependencies import
import { Request, Response, Express } from 'express'
import slugify from 'slugify'
import { Types } from 'mongoose'

//other components import
import { successHandler, errorHandler } from '../helpers/requestsHandler'
import { PartialProductType, ProductType } from '../@types/productTypes'
import Product from '../models/productSchema'

// 2. Get all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    // Retrieve the page, limit, sortBy, and sortOrder from the query parameters in the request. Set default values if they are not provided.
    const page = parseInt(req.query.page as string) || 1 // geting page number from request query with default 1
    const limit = parseInt(req.query.limit as string) || 3

    console.log(page)

    const totalDocuments = await Product.countDocuments()

    // 1. Fetch all products from the database
    const products = await Product.find({})
      // .select('name slug description price images brand isActive')
      .populate('category', 'name slug')
      .populate('brand', 'name slug')
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ updatedAt: -1 }) // sort by timestamp
      .lean()
    //Category.find({}): Find all documents in the Category collection without any filters or conditions.
    //.select('name slug description'): Include only the 'name', 'slug', and 'description' fields in the resulting documents. All other fields will be excluded.
    // When you use lean(), it tells Mongoose to return plain JavaScript objects instead of Mongoose documents. This can significantly improve query performance and reduce memory usage, especially when dealing with large datasets.

    if (!products) {
      errorHandler(res, 404, 'No products found')
    }

    // 2. Send the successful response with fetched products
    return successHandler(res, 200, 'Products fetched successfully', {
      products,
      pagination: {
        curentPage: page,
        previousPage: page - 1,
        nextPage: page + 1,
        totalNumberOfProducts: totalDocuments,
        totalPages: Math.ceil(totalDocuments / limit),
      },
    })
  } catch (error: unknown) {
    // Handle different types of errors
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('An unknown error occurred.')
    }
    // Send the error response
    return errorHandler(res, 500, 'Error while fetching all products')
  }
}
// 3. Get a single product
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    // 1. Get id from req.params (assuming id is a route parameter)
    const { id } = req.params
    // Check if the provided id is a valid ObjectID
    if (!Types.ObjectId.isValid(id)) {
      return errorHandler(res, 400, 'Invalid Product ID')
    }

    // 2. Fetch the product with the given id from the database
    const product = await Product.findById(id)
      .select('name slug description price images brand isActive category')
      .lean()

    // Check if the category exists
    if (!product) {
      return errorHandler(res, 404, 'Product not found')
    }

    // 3. Send the successful response with the fetched category
    return successHandler(res, 200, 'Product fetched successfully', {
      product,
    })
  } catch (error: unknown) {
    // Handle different types of errors
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('An unknown error occurred.')
    }
    // Send the error response
    return errorHandler(res, 500, 'Error while getting a single product')
  }
}
// 4. Delete a single product
const deleteProduct = async (req: Request, res: Response) => {
  try {
    // 1. Get id from req.params (assuming id is a route parameter)
    const { id } = req.params

    // Check if the provided id is a valid ObjectID
    if (!Types.ObjectId.isValid(id)) {
      return errorHandler(res, 400, 'Invalid Product ID')
    }

    // 2. Check if the product with the given id exists
    const product = await Product.findByIdAndDelete(id)

    // 3. Check if the product was deleted
    if (!product) {
      return errorHandler(res, 404, 'Product not found')
    }

    // 4. Send the successful response after deleting the product
    return successHandler(res, 200, 'Product deleted successfully')
  } catch (error: unknown) {
    // Handle different types of errors
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('An unknown error occurred.')
    }
    // Send the error response
    return errorHandler(res, 500, 'Error deliting the single product')
  }
}
// 5. Update product
// TODO add image update, review update if not all fileds are added
// const updateProduct = async (req: Request, res: Response) => {
//   try {
//     // 1.  Get name and description from req.body
//     const { name, description, price }: PartialProductType = req.body
//     const { id } = req.params

//     // 1.1. Create filter, updates, and options for the findByIdAndUpdate method
//     const updates: PartialProductType = {
//       description: description,
//       price: price,
//     }

//     // If name is present, include it and its slugified version in the updates
//     if (name) {
//       updates.name = name
//       updates.slug = slugify(name)
//     }
//     const option = { new: true } // to return updated value imidiately
//     const updatesForMongo = { $set: updates } // sets updates with optional filds

//     // 2. Update the product with the given id and return the updated document
//     const product = await Product.findByIdAndUpdate(id, updatesForMongo, option)
//     // 3. Check if the product with the given id exists
//     if (!product) {
//       return errorHandler(res, 404, 'Product not found')
//     }

//     // 4. Send the successful response after deleting the product
//     return successHandler(res, 200, 'Product updated successfully', {
//       product,
//     })
//   } catch (error: unknown) {
//     // Handle different types of errors
//     if (error instanceof Error) {
//       console.error(error.message)
//     } else {
//       console.error('An unknown error occurred.')
//     }
//     // Send the error response
//     return errorHandler(res, 500, 'Error whule updating the product')
//   }
// }
// 6. Filter products by price brand and category
const getFilteredProducts = async (req: Request, res: Response) => {
  try {
    // Retrieve the page, limit, sortBy, and sortOrder from the query parameters in the request. Set default values if they are not provided.
    // const page = parseInt(req.query.page as string) || 1
    // const limit = parseInt(req.query.limit as string) || 5
    const {
      priceRange = [],
      checkedCategories = [],
      checkedBrands = [],
    } = req.body

    console.log(req.body)

    // Initialize filter object which will store filtering criteria
    const filter: {
      [key: string]: { $gte?: number; $lte?: number; $in?: string[] }
    } = {}

    // If priceRange array is not empty, set a price range filter
    if (priceRange.length) {
      filter.price = { $gte: priceRange[0], $lte: priceRange[1] }
    }

    // If checkedCategory array is not empty, set a category filter to include any of the checked categories
    if (checkedCategories.length) {
      filter.category = { $in: checkedCategories }
    }

    // If checkedBrand array is not empty, set a brand filter to include any of the checked brands
    if (checkedBrands.length) {
      filter.brand = { $in: checkedBrands }
    }

    // Fetch products from the database that meet the filtering criteria
    // Use .select() to limit the fields that are returned
    // Use .populate() to include associated category and brand data
    // Use .skip() to implement pagination
    // Use .lean() to convert the Mongoose document to a plain JavaScript object
    const products = await Product.find(filter)
      .select('name slug description price images brand isActive')
      .populate('category', 'name slug')
      .populate('brand', 'name slug')
      // .skip((page - 1) * limit)
      .lean()

    // If no products are found (i.e., the products array is empty), return an error
    if (products.length === 0) {
      return errorHandler(res, 400, 'No products with such filers found')
    }
    // 2. Send the successful response with fetched products
    return successHandler(res, 200, 'Products were filtered successfuley', {
      products,
    })
  } catch (error: unknown) {
    // Handle different types of errors
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('An unknown error occurred.')
    }
    // Send the error response
    return errorHandler(res, 500, 'Error while fetching filterd products')
  }
}

// 7. Serch products by any word
// 7. Search products by any word
const searchProducts = async (req: Request, res: Response) => {
  try {
    //Retrieve and typecast searchValue to string from query parameters
    let searchValue = String(req.query.searchValue || '')

    // Validate searchValue: it should exist and not be an empty string
    if (!searchValue || searchValue.length === 0) {
      throw new Error('Search value is required')
    }

    // Trim white space from searchValue
    searchValue = searchValue.trim()

    // what ever in the begining + serchValue + whatever at the end, 'i' -ignor Case
    const searchRegExp = new RegExp('.*' + searchValue + '.*', 'i')
    //Define filter for database query: it will match any product whose name contains searchValue
    const filter = { $or: [{ name: { $regex: searchRegExp } }] }
    // Query the database with the defined filter
    const products = await Product.find(filter)
    // If products were found, return them in the response
    if (products.length === 0) {
      return errorHandler(res, 404, 'No products found')
    }

    return successHandler(res, 200, 'Products were found', { products })
  } catch (error: unknown) {
    // Handle different types of errors
    if (error instanceof Error) {
      console.error(error.message)
      if (error.message === 'Search value is required') {
        return errorHandler(res, 400, error.message)
      }
    } else {
      console.error('An unknown error occurred.')
    }
    // Send the error response
    return errorHandler(res, 500, 'Error while fetching filtered products')
  }
}

export {
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  getFilteredProducts,
  searchProducts,
}
