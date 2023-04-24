const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const subscribedSchema = new Schema({
     email: {
    type: String,
    unique: true,
  },
});
const model = mongoose.model("Subscribed", subscribedSchema);
module.exports = model;
