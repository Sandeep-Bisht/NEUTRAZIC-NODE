const SubCategoryModal =require('./SubCategoryModal');
module.exports={
create:(data)=>{
    return SubCategoryModal.create(data)
},
find_by_id:(_id)=>{
    return  SubCategoryModal.find({_id})
},
find_all:()=>{
    return SubCategoryModal.find().populate("Category")
},
find_and_update:(_id,data)=>{
    return SubCategoryModal.findOneAndUpdate({_id},data)
    },
    find_and_delete:(_id)=>{
        return SubCategoryModal.findByIdAndRemove({_id})
    }
}