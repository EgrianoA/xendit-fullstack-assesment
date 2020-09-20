const mongoose = require("mongoose")
const Schema = mongoose.Schema
const statusEnum = "DRAFT,AWAITING PAYMENT,PROCESSING,PAID,COMPLETED,FAILED".split(",");
const OrderSchema = mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  products: [
    {
      qty: Number,
      products: {
        type: Schema.Types.ObjectId,
        ref: "products"
      }
    }
  ],
  orderStatus: {
    type: String,
    enum: statusEnum,
    default: "DRAFT"
  },
  address: String,
  total: Number,
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

module.exports = mongoose.model("orders", OrderSchema)
