// dependencies import
import { Request, Response } from 'express'

//other components imports
import { successHandler, errorHandler } from '../helpers/requestsHandler'
import Customer from '../models/customersSchems'
import { encryptPassword } from '../helpers/securePassword'
import dev from '../config'
import { CustomerPayload, CustomerType } from '../@types/customerType'
import { getToken, verifyToken } from '../helpers/tokenHandler'
import sendEmailWithNodeMailer from '../util/emailSend'
import { isStrongPassword } from '../validations/authValidators'

const createCustomer = async (req: Request, res: Response) => {
  try {
    // 1. Get and distructure needed data from req.body
    const { firstName, lastName, email, password }: CustomerType = req.body
    const avatarImage = req.file?.path

    // 2. Check if the user already exists in DB
    const isExist = await Customer.findOne({ email: email })
    if (isExist) {
      return errorHandler(res, 404, 'User is alredy exist, please sign in')
    }
    // 3. Check if the password is strong
    if (!isStrongPassword(password)) {
      return errorHandler(
        res,
        400,
        'Password is not strong enough. Please use a stronger password.'
      )
    }
    // 4. Hash the password
    const hashPassword = await encryptPassword(password)
    // 5. Create token
    const token = getToken(
      { email, hashPassword, firstName, lastName, avatarImage }, //Paylod
      ['email', 'hashPassword', 'firstName', 'lastName'] // chek of fileds to be passed
    )
    // 6. Create email message
    const emailData = {
      email,
      subject: 'Account Activation Email',
      html: `
      <h2> Hello ${firstName} ${lastName} ! </h2>
      <p> Please click here to <a href="${dev.app.clientUrl}/api/v1/customers/account/activate/${token}" target="_blank"> activate your account </a> </p>`,
    }
    // 7. Send email to cutomer
    sendEmailWithNodeMailer(emailData)

    return successHandler(res, 201, 'Verification email sent')
  } catch (error: unknown) {
    if (typeof error === 'string') {
      console.log('An unknown error occurred.')
    } else if (error instanceof Error) {
      console.log(error.message)
    }
    res.status(500).json({
      message: 'An unknown error occurred.',
    })
  }
}

const verifyCustomer = async (req: Request, res: Response) => {
  try {
    // 1. Get token from body from frontend
    const { token } = req.body
    console.log(token)

    // 2. Check token exist in request body
    if (!token) {
      return errorHandler(res, 404, 'Token is missing')
    }
    // 3. Varifying and save user to DB
    // 3.1 Use function from helper/tokenHabler to verify email and decode data
    verifyToken(token, async (err, decodedData) => {
      if (err) {
        return errorHandler(res, 401, 'Token can be expired')
      }
      // 3.2 Get decode data from decodedData to use when save data to DB
      const {
        email,
        hashPassword,
        firstName,
        lastName,
        avatarImage,
      }: CustomerPayload = decodedData
      // 3.3 Chek if the user exist already by email
      const isExist = await Customer.findOne({ email: email })
      if (isExist) {
        return errorHandler(res, 401, 'Customer is already exist')
      }

      // 3.4 Creating user without image:
      const newCustomer = new Customer({
        email: email,
        password: hashPassword,
        firstName: firstName,
        lastName: lastName,
        isBanned: false,
      })
      // 3.4.1 conditionaly add image to DB
      if (avatarImage) {
        // Upload the image and get the public ID
        newCustomer.avatarImage = avatarImage
      }

      // 3.5 Save user to DB
      const customer = await newCustomer.save()
      if (!customer) {
        return errorHandler(res, 400, 'Customer was not created ')
      }
      return successHandler(res, 201, 'Customer was created, you can sign in')
    })
  } catch (error: unknown) {
    if (typeof error === 'string') {
      console.log('An unknown error occurred.')
    } else if (error instanceof Error) {
      console.log(error.message)
    }
    return res.status(500).json({
      message: 'An unknown error occurred.',
    })
  }
}
export { createCustomer, verifyCustomer }
