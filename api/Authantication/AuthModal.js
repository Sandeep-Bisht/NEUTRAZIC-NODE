const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LoginSchema = new Schema({
  username: {
    required: true,
    type: String,
    
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  phonenumber: {
    required: true,
    type : String,
  },
  password: {
    required: true,
    type: String,
  },
  role:{
  type: String, 
  },
  userStatus:{
    type:String,
  },
  organization:{
    type: String, 
    }
});
const model = mongoose.model("Login", LoginSchema);
module.exports = model;
