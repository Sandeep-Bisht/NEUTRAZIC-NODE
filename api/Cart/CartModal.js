const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CartSchema = new Schema({
  userid: {
    required: true,
    type: String,
    unique: true,
  },
  order: {
    type: Array,
    default:[]
   },
});
const model = mongoose.model("Cart", CartSchema);
module.exports = model;
