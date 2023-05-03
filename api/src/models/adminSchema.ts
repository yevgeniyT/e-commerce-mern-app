import mongoose, { Schema, Document, model } from 'mongoose'
import { isEmailValid, isStrongPassword } from '../validations/authValidators'

export interface IAdmin extends Document {
  firstName: string
  lastName: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}

const adminSchema: Schema = new mongoose.Schema(
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
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
  },
  { timestamps: true }
)

const Admin = model<IAdmin>('AdminsData', adminSchema)

export default Admin
