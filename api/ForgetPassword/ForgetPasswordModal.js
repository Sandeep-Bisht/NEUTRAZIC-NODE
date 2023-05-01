const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OtpSchema = new Schema({
  otp: {
    required: true,
    type: String,
    unique:true,
  },
});
const model = mongoose.model("Otp", OtpSchema);
module.exports = model;
