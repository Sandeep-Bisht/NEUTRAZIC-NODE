const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SubCategorySchema = new Schema({
  name: {
    required: true,
    type: String,
    unique: true,
  },
  image: {
    type: Array,
   },
   category: { 
    type: Schema.Types.ObjectId, 
    ref: "Category" 
  },
   description:{
    type: String,  
   }
});
const model = mongoose.model("SubCategory", SubCategorySchema);
module.exports = model;