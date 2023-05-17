import mongoose, { Schema } from 'mongoose'

interface ICategory extends Document {
  name: string
  description?: string
  slug: string
  products: Array<string>
  createdAt?: Date
  updatedAt?: Date
}

const categorySchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 50,
    },
    description: {
      type: String,
      trim: true,
      default: '',
      maxlength: 500,
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

const Category = mongoose.model<ICategory>('Category', categorySchema)

export default Category

//TODO Delete description
