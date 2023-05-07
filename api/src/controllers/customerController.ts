// dependencies import
import { Request, Response } from 'express'

//other components imports
import { successHandler, errorHandler } from '../helpers/requestsHandler'
import Customer from '../models/customersSchems'
import { checkPassword, encryptPassword } from '../helpers/securePassword'
import dev from '../config'
import {
  BaseCustomer,
  CustomerPayload,
  CustomerType,
} from '../@types/customerType'
import { createAuthToken, getToken, verifyToken } from '../helpers/tokenHandler'
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
      <p> Please click here to <a href="${dev.app.clientUrl}/api/v1/customer/account/activate/${token}" target="_blank"> activate your account </a> </p>`,
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
const loginCustomer = async (req: Request, res: Response) => {
  try {
    // 1. Get email and password
    const { email, password }: BaseCustomer = req.body

    //2 Chek if the user exist already
    const customer = await Customer.findOne({ email: email })
    if (!customer) {
      return errorHandler(
        res,
        400,
        'Customer is not exist, please sing in first'
      )
    }
    // 3. Chect if the password match using helper/securePassword
    // use await as without it user will pass varification with any password!!!!!
    // password as string used to define type as sting because without that we have type error. That is because password can be undefined. But as we use validation as middleware in routers we can say for sure it 's a string
    const isPasswordMatched = await checkPassword(
      password as string,
      //String in scheama has String type, while password from payload string primitive. To meet TS requirments toString() is used
      customer.password.toString()
    )

    if (!isPasswordMatched) {
      return errorHandler(res, 400, 'Incorrect data. Please try again')
    }
    const customerId = customer._id
    // 4. Create an authentication token containing the user's ID and role
    const authToken = createAuthToken(customer._id)

    // 5. Reset cookie of there is one for some reason already exists

    if (req.cookies[authToken]) {
      req.cookies[authToken] = ''
    }
    //todo Create refresh token
    // 6. Set the authToken as an HttpOnly cookie, "authToken" - name of cookie, can be anyname
    res.cookie('authToken', authToken, {
      // Set "secure" to true if using HTTPS
      httpOnly: true,

      //Setting the path attribute to "/" means that the cookie will be sent with requests to all paths within the domain
      path: '/',
      //This attribute ensures that the cookie is only sent over HTTPS connections, adding an extra layer of security.
      secure: false,

      // sets the cookie to expire in 4 minutes from the time it is created.
      expires: new Date(Date.now() + 1000 * 30 * 60),

      // Set the SameSite attribute to protect against CSRF attacks
      sameSite: 'lax',
    })
    return successHandler(res, 200, 'You successfully logged in. Welcome!')
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
const getCustomerProfile = async (req: Request, res: Response) => {
  try {
    // Here we pass id directly without using pair key-value by using findById methon insted of findByOne and data from session
    const customer = await Customer.findById(
      (req.customer as { customerId: string }).customerId
    )

    if (!customer) {
      return res.status(404).json({
        message: 'Can not find user with such id',
      })
    }

    return res.status(200).json({
      Customer: customer,
      message: 'Successful operation',
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
const requestPasswordReset = async (req: Request, res: Response) => {
  try {
    // 1. Check for missing required fields. firstName and lastName are used in email message
    const { email }: CustomerType = req.body
    if (!email) {
      return errorHandler(res, 400, 'Email is required')
    }

    // 2. Chek if the user exist already
    const customer = await Customer.findOne({ email: email })
    if (!customer) {
      return errorHandler(res, 400, 'User is not exist')
    }

    // 3. Place email to token to use it after confirmation that will be send by email. getToken recieves 2 parameters, first is object and the second is array of keys
    const token = getToken({ email }, ['email'])

    // 4. Store email text to be sent by email in variable
    const emailData = {
      email,
      subject: 'Reset password Email',
      html: `
          <h2> Hello ${customer.firstName} ${customer.lastName} ! </h2>
          <p> Please click here to <a href="${dev.app.clientUrl}/api/v1/customer/account/verify-password/${token}" target="_blank"> reset your password  </a> </p>`,
    }

    // 5. Send email useing fuction from emailService to sent varification email>
    sendEmailWithNodeMailer(emailData)

    return successHandler(
      res,
      200,
      'Link to reset password has been sent to your email'
    )
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
const validatePasswordResetToken = async (req: Request, res: Response) => {
  try {
    // 1. Get token from params
    const { token } = req.body

    // 2. Check if the token exist
    if (!token) {
      return errorHandler(res, 404, 'Token is missing')
    }
    // 3. Varifying token
    verifyToken(token, async (err, decodedData) => {
      // email is passed to frontend to be passed back to backend to next step
      const email = decodedData.email
      // todo in case of wrong token server breaks but not handle error
      if (err) {
        console.log('An error occurred:', err.message)

        return errorHandler(res, 401, 'Token can be expired')
      }
      return successHandler(res, 200, 'Please enter new password', { email })
    })
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
const resetPassword = async (req: Request, res: Response) => {
  try {
    // 1. Get data from front end. Important that user is not passing email, it passed as successful massege when user varify token. Just need to store it and pass back to use it to find user in db
    const { email, password } = req.body

    // 2. Encrypt password before saving to db
    const hashPassword = await encryptPassword(password)

    // 4. Update the user in the database using the email
    await Customer.updateOne(
      { email: email },
      {
        $set: {
          password: hashPassword,
        },
      }
    )
    return successHandler(res, 200, 'Password updated successfully')
  } catch (error: unknown) {
    if (typeof error === 'string') {
      console.log('An unknown error occurred.')
    } else if (error instanceof Error) {
      console.log(error.message)
    }
    res.status(500).json({
      message: 'An unknown error occurred while reseting password',
    })
  }
}
const updateCustomerProfile = async (req: Request, res: Response) => {
  try {
    // 1. Check if the user with id stored in session exist in DB
    const customer = await Customer.findById(
      (req.customer as { customerId: string }).customerId
    )

    if (!customer) {
      return res.status(404).json({
        message: 'Can not find customer with such id',
      })
    }
    // 2 Check if a password is provided in the request body
    const { password, ...otherFields } = req.body
    // 3. Save other fields except password
    let updateData = otherFields
    // 4. Chech if password meets requirments
    if (password) {
      // Validate password strength
      if (!isStrongPassword(password)) {
        return res.status(400).json({
          message: 'The provided password is not strong enough',
        })
      }
      // Hash the password before updating
      const hashedPassword = await encryptPassword(password)
      // save password in variable
      updateData = { ...otherFields, password: hashedPassword }
    }
    // 5.Use findByIdAndUpdate mpngoose method to find user and update using spred operator (whatever we have in body - update)
    const updatedCustomer = await Customer.findByIdAndUpdate(
      (req.customer as { customerId: string }).customerId,
      updateData,
      //new: true: By default, the findByIdAndUpdate method returns the original document before the update. When you set the new option to true, it will return the updated document instead.
      //runValidators: true: Mongoose schemas can have validation rules defined, such as required fields, minlength, maxlength, etc. By default, these validation rules are applied when creating new documents, but not when updating existing ones. Setting the runValidators option to true ensures that the update operation follows the schema validation rules, so any updates that don't meet the criteria will result in an error.
      { new: true, runValidators: true }
    )

    if (!updatedCustomer) {
      return errorHandler(
        res,
        500,
        'An error occurred while updating the user profile.'
      )
    }
    return successHandler(res, 200, 'Customer data updated successfuly', {
      updatedCustomer,
    })
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
export {
  createCustomer,
  verifyCustomer,
  loginCustomer,
  getCustomerProfile,
  requestPasswordReset,
  validatePasswordResetToken,
  resetPassword,
  updateCustomerProfile,
}
