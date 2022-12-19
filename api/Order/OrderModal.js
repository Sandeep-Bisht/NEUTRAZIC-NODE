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
        type:String,        
    }, 
    mobile:{
        type:String
    },
    othermobile:{
    type:String
    },
    orderfor:{
    type:String
    },
    status:{
    type:String,        
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
    order_no:{
    type:String,
    unique:true,
    required:true,    
    },
});
const model = mongoose.model("Order", OrderSchema);
module.exports = model;
