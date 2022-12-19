const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
  name: {
    required: true,
    type: String,
    unique: true,
  },
  image: {
    type: Array,
   },
   description:{
    type: String,  
   },
   featuredImage: {
    type: Array,
   },
   slideShow:{
     type:Boolean
   }
});
const model = mongoose.model("Category", CategorySchema);
module.exports = model;
