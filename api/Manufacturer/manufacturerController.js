const ManufacturerService = require("./manufacturerService");
//end code for images
module.exports = {
  create: async (req, res) => {
    // console.log(req.files)
    try {
      var data = { ...req.body,image:req.files };
      // console.log(data);
      ManufacturerService.create(data).then((result) => {
        if (result) {
          res.json({
            sucess: 200,
            message: "User Loged in succefully",
          });
        } else {
          res.json({
            sucess: 400,
            message: "Please provide correct information",
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
            sucess: 400,
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
    const{_id}=req.body
    // console.log(_id,userid,"bshkdhkdvfh")
    try{  
      ManufacturerService.find_and_update(_id,req.body).then((result) => {      
        if (result.length>0) {  
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
