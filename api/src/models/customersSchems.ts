// Dependencies and types imports
import { timeStamp } from 'console'
import mongoose, { Schema, Document, model } from 'mongoose'
import { isEmailValid, isStrongPassword } from '../validations/authValidators'

//Extends the Document interface from Mongoose. This interface represents the structure of a product document in the database, including its properties and their types. Needed first of all for model
export interface ICustomer extends Document {
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
  address: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  avatarImage: string
  isBanned: boolean
  createdAt: Date
  updatedAt: Date
  orders: mongoose.Schema.Types.ObjectId[]
}

//The Schema type in Mongoose, when used with TypeScript, is a way to define a schema programmatically while benefiting from type checking and autocompletion. It helps you to ensure that the structure of the schema you create is consistent with Mongoose's expected format.
const userSchema: Schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: isEmailValid,
        message: 'Invalid email format',
      },
    },
    password: {
      type: String,
      required: true,
      validator: {
        validator: isStrongPassword,
        message: 'Password is not strong enough',
      },
    },
    phone: {
      type: String,
    },
    address: {
      street: { type: String, default: '' },
      city: { type: String, default: '' },
      state: { type: String, default: '' },
      zip: { type: String, default: '' },
      country: { type: String, default: '' },
    },
    avatarImage: {
      type: String,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  },
  { timestamps: true }
)

const Customer = model<ICustomer>('UsersData', userSchema)

export default Customer
