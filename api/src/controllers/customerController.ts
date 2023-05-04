// dependencies import
import { Request, Response } from 'express'

//other components imports
import { successHandler, errorHandler } from '../helpers/requestsHandler'
import Customer from '../models/customersSchems'
import { encryptPassword } from '../helpers/securePassword'
import dev from '../config'
import { CustomerType } from '../@types/customerType'
import { getToken } from '../helpers/tokenHandler'
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
      <p> Please click here to <a href="${dev.app.clientUrl}/api/v1/users/activate/${token}" target="_blank"> activate your account </a> </p>`,
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

export { createCustomer }
