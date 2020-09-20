const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProductSchema = mongoose.Schema({
  name: String,
  category: {
    type: Schema.Types.ObjectId,
    ref: "productCategories"
  },
  image: String,
  desc: String,
  price: Number,
  isDeleted: {
    type: Boolean,
    default: false
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  updatedDate: {
    type: Date,
    default: Date.now
  },
},
  {
    timestamps: true
  })

module.exports = mongoose.model("products", ProductSchema)
