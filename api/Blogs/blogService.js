const blogModel = require("./warehouseModal");
module.exports={
    create:(data)=>{
        return blogModel.create(data)
    },
    find_by_slug:(_id)=>{
        return blogModel.find({_id})
    },
    find_all:()=>{
        return blogModel.find()
    },
    find_and_update:(_id,data)=>{
        return blogModel.findByIdAndUpdate({_id},data)
    },
    find_and_delete:(_id)=>{
        return blogModel.findByIdAndRemove({_id})
    }
}