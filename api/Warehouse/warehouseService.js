const warehouseModel = require("./warehouseModal");
module.exports={
    create:(data)=>{
        return warehouseModel.create(data)
    },
    find_by_id:(_id)=>{
        return warehouseModel.find({_id})
    },
    find_all:()=>{
        return warehouseModel.find()
    },
    find_and_update:(_id,data)=>{
        return warehouseModel.findByIdAndUpdate({_id},data)
    },
    find_and_delete:(_id)=>{
        return warehouseModel.findByIdAndRemove({_id})
    }
}