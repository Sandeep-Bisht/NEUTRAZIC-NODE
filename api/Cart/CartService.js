const CartModal =require('./CartModal');
module.exports={
create:(data)=>{
    return CartModal.create(data)
},
find_by_id:(userid)=>{
    return  CartModal.find({userid})
},
find_and_update:(_id,userid,order)=>{
return CartModal.findOneAndUpdate({_id},{userid,order})
},
find_and_delete:(_id)=>{
    return CartModal.findByIdAndRemove({_id})
}
}