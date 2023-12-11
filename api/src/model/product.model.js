import mongoose from "mongoose"

const Schema = mongoose.Schema

let productSchema = new Schema({
  cat: {
    type: String
  },
  desc: {
    type: String
  },
  ingredientes: {
    type: String
  },
  price: {
    type: Number
  },
  img: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  }
},{
  timestamps: true
})


export const Product = mongoose.model('Product', productSchema)
