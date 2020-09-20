const mongoose = require("mongoose")
const Schema = mongoose.Schema
const statusEnum = "AWAITING PAYMENT,PAID".split(",");
const paymentSchema = mongoose.Schema({
  order: {
    type: Schema.Types.ObjectId,
    ref: "orders"
  },
  total: Number,
  vaNumber: String,
  paymentStatus: {
    type: String,
    enum: statusEnum,
    default: "AWAITING PAYMENT"
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

module.exports = mongoose.model("payments", paymentSchema)
