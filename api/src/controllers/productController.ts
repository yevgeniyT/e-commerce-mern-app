// dependencies import
import { Request, Response, Express } from 'express'
import slugify from 'slugify'
import { Types } from 'mongoose'

//other components import
import { successHandler, errorHandler } from '../helpers/requestsHandler'
import { ProductType } from '../@types/productTypes'
import Product from '../models/productSchema'

// 1. Create new Product
const createProduct = async (
  //By adding Request & { files?: Express.Multer.File[] to the type of req, you are extending the type of Request to include an optional files property with the type File[]. This way, TypeScript will know the correct type for req.files
  req: Request & { files?: Express.Multer.File[] },
  res: Response
) => {
  try {
    // 1. Get name, description, price, category, and brand from req.body
    const { name, description, price, category, brand }: ProductType = req.body

    // 2. Get the array of images from req.files. I case of empty umage filed an empty array will be stored
    const images = req.files?.map((file) => file.path) ?? []

    // 3. Check if the product already exists in DB
    const isExist = await Product.findOne({ name: name })
    if (isExist) {
      return errorHandler(res, 409, 'Product is alredy exist')
    }

    // 4 Creating product data to be saved in DB
    const productData = {
      name: name,
      slug: slugify(name),
      description: description,
      price: price,
      category: category,
      brand: brand,
      images: images,
    }

    // Create product and save it to DB using the create() method
    const newProduct = await Product.create(productData)

    if (!newProduct) {
      return errorHandler(res, 400, 'Product was not created ')
    }

    return successHandler(res, 200, 'Product was created successfuly', {
      newProduct,
    })
  } catch (error: unknown) {
    // Handle different types of errors
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('An unknown error occurred.')
    }
    // Send the error response
    return errorHandler(res, 500, 'Error while creating product')
  }
}
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
      .select('name slug description price images brand isActive')
      .populate('category', 'name slug')
      .skip((page - 1) * limit)
      .limit(limit)
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
      .select('name slug description price images brand isActive')
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
const updateProduct = async (req: Request, res: Response) => {
  try {
    // 1.  Get name and description from req.body
    const { name, description, price } = req.body
    const { id } = req.params

    // 1.1. Create filter, updates, and options for the findByIdAndUpdate method
    const updates = {
      $set: {
        name: name,
        description: description,
        slug: slugify(name),
        price: price,
      },
    }
    const option = { new: true } // to return updated value imidiately

    // 2. Update the product with the given id and return the updated document
    const product = await Product.findByIdAndUpdate(id, updates, option)
    // 3. Check if the product with the given id exists
    if (!product) {
      return errorHandler(res, 404, 'Product not found')
    }

    // 4. Send the successful response after deleting the product
    return successHandler(res, 200, 'Product updated successfully', {
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
    return errorHandler(res, 500, 'Error whule updating the product')
  }
}

// 6. Filter products by price brand and category
const getFilteredProducts = async (req: Request, res: Response) => {
  try {
    // Retrieve the page, limit, sortBy, and sortOrder from the query parameters in the request. Set default values if they are not provided.
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const {
      priceRange = [],
      checkedCategory = [],
      checkedBrand = [],
    } = req.body

    // Create filtering logic
    const filter: {
      [key: string]: { $gte?: number; $lte?: number; $in?: string[] }
    } = {}

    // If range of price is available
    if (priceRange.length) {
      filter.price = { $gte: priceRange[0], $lte: priceRange[1] }
    }

    // If there are checked categories
    if (checkedCategory.length) {
      filter.category = { $in: checkedCategory }
    }

    // If there are checked brands
    if (checkedBrand.length) {
      filter.brand = { $in: checkedBrand }
    }

    // 1. Fetch products with filter
    const products = await Product.find(filter)
      .select('name slug description price images brand isActive')
      .populate('category', 'name slug')
      .skip((page - 1) * limit)
      .lean()
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
export {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  getFilteredProducts,
}
