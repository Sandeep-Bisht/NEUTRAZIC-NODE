const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OtpSchema = new Schema({
  otp: {
    required: true,
    type: String,
    unique:true,
  },
});
const model = mongoose.model("forgetPasswordOtp", OtpSchema);
module.exports = model;
