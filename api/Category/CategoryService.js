const CategoryModal =require('./CategoryModal');
module.exports={
create:(data)=>{
    return CategoryModal.create(data)
},
find_by_id:(_id)=>{
    return  CategoryModal.find({_id})
},
find_all:()=>{
    return CategoryModal.find()
},
find_and_update:(_id,data)=>{
    return CategoryModal.findOneAndUpdate({_id},data)
    },
    find_and_delete:(_id)=>{
        return CategoryModal.findByIdAndRemove({_id})
    }
}