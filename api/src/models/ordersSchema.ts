import mongoose, { Schema, Document } from 'mongoose'

interface IOrderItem {
  product: string
  quantity: number
  price: number
}
interface IOrder extends Document {
  customer: string
  items: Array<IOrderItem>
  deliveryCost: number
  totalPrice: number
  status: string
  createdAt?: Date
  updatedAt?: Date
}

const orderSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'CustomerData',
      required: true,
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    deliveryCost: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: true, // Adds createAt and updatedAt
  }
)

const Order = mongoose.model('Order', orderSchema)

export default Order
