const warehouseService = require("./warehouseService");
module.exports = {
    create: async (req,res) =>{
      console.log(req.body,"inside warehouse create",req.files)
        try {
            var data = {...req.body,image:req.files };
            warehouseService.create(data).then((result) =>{
              console.log(result,"result")
             if(result) {
                res.json({
                    success: 200,
                    message : "Warehouse created successfully"
                })
             }   else{
                res.json({
                    success : 200,
                    messgae: "Somthing went wrong"
                })
             }
            })
        } catch (error) {
            console.log(error)
            res.json({
                success : 400,
                message : "Please provide correct information"
            })
        }
    },
    find_all : async(req,res) => {
        try {
           warehouseService.find_all().then((result) =>{
            if(result){
                res.json({
                    success:200,
                    message: "Data Found",
                    data: result
                })
            } else{
                res.json({
                    error : 400,
                    message: "Data not found"
                })
            }
           }) 
        } catch (error) {
            console.log(error)
            res.json({
                error: 400,
                message:"Somthing went wrong"
            })
        }
    },
    find_by_id: async(req,res) => {
        const {_id } = req.body;
        try {
            warehouseService.find_by_id(_id).then((result)=>{
                if(result){
                    res.json({
                        success: 200,
                        messgae:"Data found",
                        data : result
                    })
                } else{
                    res.json({
                        error:400,
                        message: "Somthing went wrong"
                    })
                }
            })
        } catch (error) {
            console.log(error)
            res.json({
                error: 400,
                messgae : "Please provide correct information"
            })
        }
    },
    find_and_update:(req,res,next)=>{
        const{_id}=req.body;
        var images   
        if(req.files[0]){
          images = req.files    
        }
        else{
          images = req.body.image
        }
    
        const data={...req.body,image:images} 
        try{  
          warehouseService.find_and_update(_id,data).then((result) => {      
            if (result) {  
              res.json({
                success : 200,
                data: result,
                msg:'Data found'
              });
                   
            } else {
              res.json({
                error: 400,
                message: "Data Not Found",
              });
            }
          })
        }
         catch (err) {
            console.log(err);
            res.json({
                error: 400,
              message: "Please provide correct information",
            });
          }
        },
      find_and_delete:(req,res)=>{
        const {_id} = req.body
        // console.log(_id,"here")
        try{  
          warehouseService.find_and_delete(_id).then((result) => {      
              if (result.length>0) {  
                res.json({
                    success:200,
                  data: result,
                  msg:'cart item deleted'
                });
                     
              } else {
                res.json({
                  error: 400,
                  message: "Data Not Found",
                });
              }
            })
          }
           catch (err) {
              console.log(err);
              res.json({
                error: 400,
                message: "Please provide correct information",
              });
            }     
      }
}