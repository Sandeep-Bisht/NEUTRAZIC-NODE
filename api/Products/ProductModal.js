const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  name: {
    required: true,
    type: String,
    unique: true,
  },
  description: {
    type: String,
  },
  image: {
    type: Array,
  },
  otherImage: {
    type: Array,
  },
  category: { 
    type: Schema.Types.ObjectId, 
    ref: "Category" 
  },
  warehouse: {
    type: Schema.Types.ObjectId,
    ref:"warehouse"
  },
  type: {
    type: String,
  },
  inrMrp: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  reorderQuantity:{
    type: Number,
  },
  maximumOrder:{
    type:Number,
  },
  dollerMrp: {
    type: String,
  },
  inrDiscount: {
    type: String,
  },
  dollerDiscount: {
    type: String,
  },
  manufacturer: { type: Schema.Types.ObjectId, ref: "manufacturer" },
  subcategory: { type: Schema.Types.ObjectId, ref: "SubCategory" },
});
const model = mongoose.model("Product", ProductSchema);
module.exports = model;
