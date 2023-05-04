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
    // 3. Hash the password
    const hashPassword = await encryptPassword(password)
    // 4. Create token
    const token = getToken(
      { email, hashPassword, firstName, lastName, avatarImage }, //Paylod
      ['email', 'hashPassword', 'firstName', 'lastName'] // chek of fileds to be passed
    )
    // 5. Create email message
    const emailData = {
      email,
      subject: 'Account Activation Email',
      html: `
      <h2> Hello ${firstName} ${lastName} ! </h2>
      <p> Please click here to <a href="${dev.app.clientUrl}/api/v1/users/activate/${token}" target="_blank"> activate your account </a> </p>`,
    }
    // 6. Send email to cutomer
    sendEmailWithNodeMailer(emailData)

    return successHandler(res, 201, 'Link has been sent seccussfuly')
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
