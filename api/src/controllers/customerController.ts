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
    const user = await Customer.findById(req.user.userId)
    if (!user) {
      return res.status(404).json({
        message: 'Can not find user with such id',
      })
    }

    return res.status(200).json({
      User: user,
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
export { createCustomer, verifyCustomer, loginCustomer, getCustomerProfile }
