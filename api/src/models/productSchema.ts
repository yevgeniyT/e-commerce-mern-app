import mongoose, { Schema, Document } from 'mongoose'

interface IProduct extends Document {
  name: string
  slug: string
  description?: string
  price: number
  images: Array<string>
  category: string
  brand: string
  stockQuantity?: number
  isActive: boolean
  discount?: number
  ratings: Array<number>
  averageRating: number
  createdAt?: Date
  updatedAt?: Date
}

const productSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: 100,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    images: [
      {
        type: String,
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
      required: true,
    },
    stockQuantity: {
      type: Number,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    ratings: {
      type: [Number],
      default: [],
    },
    averageRating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model<IProduct>('Product', productSchema)

export default Product
