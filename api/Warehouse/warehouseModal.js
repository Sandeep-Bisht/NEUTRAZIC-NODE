const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const warehouseSchema = new Schema({
    name: {
        required: true,
        type: String,
    },
    description:{
        type:String
    }
}, {timestamps : true })

const model = mongoose.model("warehouse", warehouseSchema);
module.exports = model;