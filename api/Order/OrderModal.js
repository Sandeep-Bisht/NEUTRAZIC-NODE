const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrderSchema = new Schema({
  order:{
    type:Array,        
    required:true
    },
    userid:{
        type:String,        
        required:true
    },
    address:{
        type:Object, required:true        
    }, 
    mobile:{
        type:String, required:true
    }, 
    status:{
    type:String,        
    }, 
    transaction_id:{
        type:String, required:true
    },
    payment_status:{
    type:String, required:true
    },
    justification:{
    type:String,        
    },   
    delivery_time:{
    type:String,        
    },
    totalamount:{
    type:String
    },
    actualamount:{
    type:String
    },
    instruction:{
    type:String
    },
    addresstype:{
    type:String
    },
    deliverytype:{
    type:String
    },
    username:{
    type:String
    },
    userEmail:{
        type : String,
    },
    order_no:{
    type:String,
    unique:true,
    required:true,    
    },
}, {timestamps : true});
const model = mongoose.model("Order", OrderSchema);
module.exports = model;
