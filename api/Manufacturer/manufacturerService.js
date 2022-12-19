const manufacturerModal =require('./manufacturerModal');
module.exports={
create:(data)=>{
    return manufacturerModal.create(data)
},
find_by_id:(_id)=>{
    return  manufacturerModal.find({_id})
},
find_all:()=>{
    return manufacturerModal.find()
},
find_and_update:(_id,data)=>{
    return manufacturerModal.findOneAndUpdate({_id},data)
    },
find_and_delete:(_id)=>{
    return manufacturerModal.findByIdAndRemove({_id})
}
}