// dependencies import
import { Request, Response, Express } from 'express'
import slugify from 'slugify'
import { Types } from 'mongoose'

//other components import
import { successHandler, errorHandler } from '../helpers/requestsHandler'
import { PartialProductType, ProductType } from '../@types/productTypes'
import Product from '../models/productSchema'
import Customer from '../models/customersSchems'
import Category from '../models/categorySchema'

// 1. Create new Product
const adminCreateProduct = async (
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
// 2. Admin Update product
const adminUpdateProduct = async (
  req: Request & { files?: Express.Multer.File[] },
  res: Response
) => {
  try {
    // 1. Get name, description, price, category, and brand from req.body
    const { name, description, price, category, brand }: ProductType = req.body

    // 2. Get the array of images from req.files. I case of empty umage filed an empty array will be stored
    const images = req.files?.map((file) => file.path) ?? []

    // 3. Get id from request params
    const { id } = req.params

    // 4. Create filter, updates, and options for the findByIdAndUpdate method
    const updates: PartialProductType = {
      description: description,
      price: price,
      category: category,
      brand: brand,
      images: images,
    }

    // 5. If name is present, include it and its slugified version in the updates
    if (name) {
      updates.name = name
      updates.slug = slugify(name)
    }

    const option = { new: true } // to return updated value imidiately
    const updatesForMongo = { $set: updates } // sets updates with optional filds

    // 2. Update the category with the given id and return the updated document
    const product = await Product.findByIdAndUpdate(id, updatesForMongo, option)
    // 3. Check if the category with the given id exists
    if (!product) {
      return errorHandler(res, 404, 'Product not found')
    }

    // 4. Send the successful response after deleting the category
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
    return errorHandler(res, 500, 'Error while deleting the product')
  }
}
// 3. Set is product active
const adminToogleIsActive = async (req: Request, res: Response) => {
  try {
    // 1. Get id from request params
    const { id } = req.params

    // 2. Fetch the current state of the product from the database
    const product = await Product.findById(id)

    // 3. Check if the product with the given id exists
    if (!product) {
      return errorHandler(res, 404, 'Product not found')
    }

    // 4. Toggle isActive status
    product.isActive = !product.isActive

    // 5. Save the updated product
    await product.save()

    // 6. Send the successful response after updating the product
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
    return errorHandler(res, 500, 'Error while updating the product')
  }
}

// 4. Get all customers
const getAllCustomers = async (req: Request, res: Response) => {
  try {
    // Retrieve the page, limit, sortBy, and sortOrder from the query parameters in the request. Set default values if they are not provided.
    const page = parseInt(req.query.page as string) || 1 // geting page number from request query with default 1
    const limit = parseInt(req.query.limit as string) || 3

    const totalDocuments = await Customer.countDocuments()
    // TODO Update orders when be done
    // 1. Fetch all products from the database
    const customers = await Customer.find({})
      // .select('name slug description price images brand isActive')
      // .populate('orders', '')
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ updatedAt: -1 }) // sort by timestamp
      .lean()
    //Category.find({}): Find all documents in the Category collection without any filters or conditions.
    //.select('name slug description'): Include only the 'name', 'slug', and 'description' fields in the resulting documents. All other fields will be excluded.
    // When you use lean(), it tells Mongoose to return plain JavaScript objects instead of Mongoose documents. This can significantly improve query performance and reduce memory usage, especially when dealing with large datasets.

    if (!customers) {
      errorHandler(res, 404, 'No customers found')
    }

    // 2. Send the successful response with fetched products
    return successHandler(res, 200, 'Customers fetched successfully', {
      customers,
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
    return errorHandler(res, 500, 'Error while fetching all customers')
  }
}

// 6. Create new category
const createCategory = async (req: Request, res: Response) => {
  try {
    // 1. Get name and description from req.body
    const { name, description } = req.body

    // 2. Create category and save it to db by using create metod
    const category = await Category.create({
      name: name,
      description: description,
      // use to create slug name from name
      slug: slugify(name),
    })

    return successHandler(res, 200, 'Category was created successfuly')
  } catch (error: unknown) {
    // Handle different types of errors
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('An unknown error occurred.')
    }
    // Send the error response
    return errorHandler(res, 500, 'Error while  creating category')
  }
}

// 7. Delete a single category
const deleteCategory = async (req: Request, res: Response) => {
  try {
    // 1. Get id from req.params (assuming id is a route parameter)
    const { id } = req.params

    // Check if the provided id is a valid ObjectID
    if (!Types.ObjectId.isValid(id)) {
      return errorHandler(res, 400, 'Invalid Product ID')
    }
    // 2. Check if the category with the given id exists
    const category = await Category.findByIdAndDelete(id)

    // 3. Check if the category was deleted
    if (!category) {
      return errorHandler(res, 404, 'Category not found')
    }

    // 4. Send the successful response after deleting the category
    return successHandler(res, 200, 'Category deleted successfully')
  } catch (error: unknown) {
    // Handle different types of errors
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('An unknown error occurred.')
    }
    // Send the error response
    return errorHandler(res, 500, 'Error while deleting the category')
  }
}
// 8. Update category
const updateCategory = async (req: Request, res: Response) => {
  try {
    // 1.  Get name and description from req.body
    const { name, description } = req.body

    // 1.1. Create filter, updates, and options for the findByIdAndUpdate method
    const filter = req.params.id
    const updates = {
      $set: {
        name: name,
        description: description,
        slug: slugify(name),
      },
    }
    const option = { new: true } // to return updated value imidiately

    // 2. Update the category with the given id and return the updated document
    const category = await Category.findByIdAndUpdate(filter, updates, option)
    // 3. Check if the category with the given id exists
    if (!category) {
      return errorHandler(res, 404, 'Category not found')
    }

    // 4. Send the successful response after deleting the category
    return successHandler(res, 200, 'Category updated successfully', {
      category,
    })
  } catch (error: unknown) {
    // Handle different types of errors
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('An unknown error occurred.')
    }
    // Send the error response
    return errorHandler(res, 500, 'Error while deleting the category')
  }
}
export {
  adminCreateProduct,
  adminUpdateProduct,
  adminToogleIsActive,
  getAllCustomers,
  createCategory,
  deleteCategory,
  updateCategory,
}
