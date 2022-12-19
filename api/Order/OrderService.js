const OrderModal =require('./OrderModal');
module.exports={
create:(data)=>{
    return OrderModal.create(data)
},
find_by_id:(userid)=>{
    return  OrderModal.find({userid})
},
find_all:()=>{
    return OrderModal.find()
},
updateOrder:(_id,status,justification,delivery_time)=>{
    return OrderModal.findByIdAndUpdate({_id},{status,justification,delivery_time})
},
find_and_delete:(_id)=>{
    return OrderModal.findByIdAndRemove({_id})
}
}