import mongoose, { Document, Schema } from 'mongoose'

interface IBrand extends Document {
  name: string
  slug: string
  products: Schema.Types.ObjectId[]
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
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Brand = mongoose.model<IBrand>('Brand', brandSchema)

export default Brand
