const ProductModal =require('./ProductModal');
module.exports={
create:(data)=>{    
    return ProductModal.create(data)
},
find_all:()=>{
    return ProductModal.find().populate("manufacturer").populate("category").populate("subcategory")
},
find_by_id:(_id)=>{
    return  ProductModal.find({_id}).populate("manufacturer").populate("category").populate("subcategory")
},
find_and_update:(_id,data)=>{
    return ProductModal.findOneAndUpdate({_id},data)
    },
find_and_delete:(_id)=>{
    return ProductModal.findByIdAndRemove({_id})
}
}