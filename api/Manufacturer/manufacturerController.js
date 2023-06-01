const ManufacturerService = require("./manufacturerService");
//end code for images
module.exports = {
  create: async (req, res) => {
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
      }).catch((err) => {
        if (err.code === 11000) {
          res.status(400).json({
            success: 400,
            message: "Manufacturer already exists",
          });
        } else {
          console.log(err);
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
    try {
      ManufacturerService.find_all().then((result) => {
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
    const{_id,name,description}=req.body;
    const data={
      _id:_id,
      name:name,
      description:description,
    }   
    if(req.files[0]){
      data.images = req.files;     
    } 
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
