import mongoose from "mongoose"
const Schema = mongoose.Schema

let userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }, 
  password: {
    type: String,
    required: true
  },
  img: {
    type: String
  }
}, {
  timestamps: true 
})

export const User = mongoose.model('User', userSchema)

