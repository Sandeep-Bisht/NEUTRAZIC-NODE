const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const manufacturerSchema = new Schema({
  name: {
    required: true,
    type: String,
    unique: true,
  },
  image: {
    type: Array,
   },
   creatorId: {
    type: String,
    required: true,
   },
   description:{
    type: String,  
   }
});
const model = mongoose.model("manufacturer", manufacturerSchema);
module.exports = model;
