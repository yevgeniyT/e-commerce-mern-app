import mongoose, { Schema, Document, model } from 'mongoose'

export interface IRefreshToken extends Document {
  token: string
  customers: mongoose.Schema.Types.ObjectId[]
}
const refreshTokenSchema: Schema = new Schema({
  token: {
    type: String,
    required: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
  },
})

const RefreshToken = model<IRefreshToken>('RefreshToken', refreshTokenSchema)
export default RefreshToken
