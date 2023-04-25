const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const WishlistSchema = new Schema({
  userid: {
    required: true,
    type: String,
  },
  image: {
    type: Array,
    default:[]
   },
   name:{
     required:true,
     type:String
   },
   productId:{
     required:true,
     type:String
   },
   rating:{
     type:Number
   },
   description:{
     type:String
   },
   categoryId:{
    type:String
   }
});
const model = mongoose.model("Wishlist", WishlistSchema);
module.exports = model;
