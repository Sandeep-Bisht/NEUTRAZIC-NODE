const ManufacturerService = require("./manufacturerService");
//end code for images
module.exports = {
  create: async (req, res) => {
    // console.log(req.files)
    try {
      var data = { ...req.body,image:req.files };
      ManufacturerService.create(data).then((result) => {
        if (result) {
          res.status(200).json({
            success: 200,
            message: "Manufacturer created succefully",
          });
        } else {
          res.json({
            success: 400,
            message: "Please provide correct information",
          });
        }
      });
    } catch (err) {
      console.log(err);
      res.json({
        success: 400,
        message: "Please provide correct information",
      });
    }
  },
  find_all: (req, res, next) => {
    // console.log("category hit")
    try {
      ManufacturerService.find_all().then((result) => {
        // console.log(result);
        if (result) {
          res.status(200).json({
            data: result,
            msg: "data found",
          });
        } else {
          res.json({
            success: 400,
            message: "Data Not Found",
          });
        }
      });
    } catch (err) {
      console.log(err);
      res.json({
        sucess: 400,
        message: "Please provide correct information",
      });
    }
  },
  find_by_id: (req, res, next) => {
    const { _id } = req.body;
    try {
      ManufacturerService.find_by_id(_id).then((result) => {
        // console.log(result);
        if (result.length > 0) {
          res.status(200).json({
            data: result,
            msg: "data found",
          });
        } else {
          res.json({
            error: 400,
            message: "Data Not Found",
          });
        }
      });
    } catch (err) {
      console.log(err);
      res.json({
        sucess: 400,
        message: "Please provide correct information",
      });
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
      ManufacturerService.find_and_update(_id,data).then((result) => {      
        if (result) {  
          res.status(200).json({
            data: result,
            msg:'data found'
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
          sucess: 400,
          message: "Please provide correct information",
        });
      }
    },
  find_and_delete:(req,res)=>{
    const {_id} = req.body
    // console.log(_id,"here")
    try{  
      ManufacturerService.find_and_delete(_id).then((result) => {      
          if (result.length>0) {  
            res.status(200).json({
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
            sucess: 400,
            message: "Please provide correct information",
          });
        }     
  }

};
