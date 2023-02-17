const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const warehouseSchema = new Schema({
    name: {
        type: String,
        required: true,        
        unique: true,
    },
    warehouseContactNo: {
        type: String,        
    },
    warehouseAddress: {
        type: String
    },
    creatorId: {
        type: String
    },
    description:{
        type:String
    }
}, {timestamps : true })

const model = mongoose.model("warehouse", warehouseSchema);
module.exports = model;