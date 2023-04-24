const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 3600 }, // expires after 1 hour (3600 seconds)
  });

const model = mongoose.model("subscriber_token", TokenSchema);
module.exports = model;
