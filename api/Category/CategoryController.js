const CategoryService = require("./CategoryService");
//end code for images
module.exports = {
  create: async (req, res) => {
      console.log("catigory hit by sanjuuuuuu",req.body)
    try {
      var data = { ...req.body,image:req.files };
       console.log(data, "hit by sanju",data);
      CategoryService.create(data).then((result) => {
        if (result) {
          res.json({
            sucess: 200,
            message: "Category created succefully",
          });
        } else { 
          res.json({
            sucess: 400,
            message: "Please provide correct information",
          });
        }
      }).catch((err) => {
        if (err.code === 11000) {
          res.status(400).json({
            success: 400,
            message: "Category already exists",
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
        sucess: 400,
        message: "Please provide correct information",
      });
    }
  },
  find_all: (req, res, next) => {
    //  console.log("catigory hit by sanjuuuuuu")
    try {
      CategoryService.find_all().then((result) => {
        //  console.log(result, "catigory hit by sanjuuuuuu")
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
      CategoryService.find_by_id(_id).then((result) => {
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
    var images   
    if(req.files[0]){
      images = req.files     
    }
    else{
      images = req.body.image
    }

    const data={...req.body,image:images} 
    try{  
    CategoryService.find_and_update(_id,data).then((result) => {      
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
       console.log(_id,"here")
      try{  
        CategoryService.find_and_delete(_id).then((result) => {      
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
