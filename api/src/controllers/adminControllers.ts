// dependencies import
import { Request, Response, Express } from 'express'
import slugify from 'slugify'
import { Types } from 'mongoose'

//other components import
import { successHandler, errorHandler } from '../helpers/requestsHandler'
import { PartialProductType, ProductType } from '../@types/productTypes'
import Product from '../models/productSchema'

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

export { adminCreateProduct, adminUpdateProduct }
