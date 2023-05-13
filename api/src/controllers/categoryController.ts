// dependencies import
import { Request, Response } from 'express'
import slugify from 'slugify'
import { Types } from 'mongoose'

//other components import
import { successHandler, errorHandler } from '../helpers/requestsHandler'
import Category from '../models/categorySchema'
import Product from '../models/productSchema'

// 1. Create new category
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
// 2.  Get all categories
const getAllCategories = async (req: Request, res: Response) => {
  try {
    // aggregate all products grouped by the category field, and count the number of products for each category. As a result we get here an array with id and productCount value of that id
    const categoriesWithCount = await Product.aggregate([
      {
        $group: {
          // /  //identifier expression that $group uses to group documents. Here, it's grouping documents by the brand field, so all documents with the same brand will be in the same group.
          _id: '$category',
          //This is an accumulator expression that $group applies to each group. { $sum: 1 } expression means "for each document in the group, add 1 to the sum", so the result is the total count of documents in the group.
          productCount: { $sum: 1 },
        },
      },
    ])

    if (!categoriesWithCount.length) {
      return errorHandler(res, 404, 'No category found')
    }
    // 1. Fetch all categories from the database
    const categories = await Category.find().lean()

    // Add product counts to each category
    const finalCategories = categories.map((category) => {
      const categoryWithCount = categoriesWithCount.find(
        (c) => c._id.toString() === category._id.toString()
      )
      return {
        ...category,
        productCount: categoryWithCount ? categoryWithCount.productCount : 0,
      }
    })

    // 2. Send the successful response with fetched categories
    return successHandler(res, 200, 'Categories fetched successfully', {
      finalCategories,
    })
  } catch (error: unknown) {
    // Handle different types of errors
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('An unknown error occurred.')
    }
    // Send the error response
    return errorHandler(res, 500, 'Error while fetching all categories')
  }
}
const getSingleCategory = async (req: Request, res: Response) => {
  try {
    // 1. Get id from req.params (assuming id is a route parameter)
    const { id } = req.params

    // Check if the provided id is a valid ObjectID
    if (!Types.ObjectId.isValid(id)) {
      return errorHandler(res, 400, 'Invalid Product ID')
    }

    // 2. Fetch the category with the given id from the database
    const category = await Category.findById(id)
      .select('name slug description')
      .lean()

    // Check if the category exists
    if (!category) {
      return errorHandler(res, 404, 'Category not found')
    }

    // 3. Send the successful response with the fetched category
    return successHandler(res, 200, 'Category fetched successfully', {
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
    return errorHandler(res, 500, 'Error while fetching the category')
  }
}
// Delete a single category
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
// 5. Update category
// TODO add udpade image
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
  createCategory,
  getAllCategories,
  getSingleCategory,
  deleteCategory,
  updateCategory,
}
