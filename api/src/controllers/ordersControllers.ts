// // dependencies import
// import { Request, Response, Express } from 'express'
// import { Types } from 'mongoose'

// //other components import
// import { successHandler, errorHandler } from '../helpers/requestsHandler'
// import { BrandType } from '../@types/brandTypes'
// import Product from '../models/productSchema'

// // 1. Create new Brand
// const createOrder = async (req: Request, res: Response) => {
//   try {
//     // 1. Get name
//     const { name }: BrandType = req.body

//     // 2. Check if the brand already exists in DB
//     const isExist = await Brand.findOne({ name: name })
//     if (isExist) {
//       return errorHandler(res, 409, 'Brand is alredy exist')
//     // }

//     // 3 Creating brand data to be saved in DB
//     const brandData = {
//       name: name,
//       slug: slugify(name),
//     }

//     // 4. Create brand and save it to DB using the create() method
//     const newBrand = await Brand.create(brandData)

//     if (!newBrand) {
//       return errorHandler(res, 400, 'Brand was not created ')
//     }

//     return successHandler(res, 200, 'Brand was created successfuly', {
//       newBrand,
//     })
//   } catch (error: unknown) {
//     // Handle different types of errors
//     if (error instanceof Error) {
//       console.error(error.message)
//     } else {
//       console.error('An unknown error occurred.')
//     }
//     // Send the error response
//     return errorHandler(res, 500, 'Error while creating brand')
//   }
// }
