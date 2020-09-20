const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProductCategorySchema = mongoose.Schema({
  name: String,
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

module.exports = mongoose.model("productCategories", ProductCategorySchema)
