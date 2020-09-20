const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
  username: String,
  email:String,
  phoneNumber: String,
  password: String,
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

module.exports = mongoose.model("users", UserSchema)
