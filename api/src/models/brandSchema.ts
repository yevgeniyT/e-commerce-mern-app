import mongoose, { Document, Schema } from 'mongoose'

interface IBrand extends Document {
  name: string
  slug: string
}

const brandSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: 50,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
)

const Brand = mongoose.model<IBrand>('Brand', brandSchema)

export default Brand
