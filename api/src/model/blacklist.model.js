import mongoose from "mongoose"
const Schema = mongoose.Schema

let BlacklistSchema = new Schema({

  token: {
    type: String,
    required: true,
  },

})

export const Blacklist = mongoose.model('blacklist', BlacklistSchema)