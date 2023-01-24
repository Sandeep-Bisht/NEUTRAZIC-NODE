const ProductService = require("./ProductService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = {
  create: (req, res) => {
        try {
          var data = {...req.body,image:req.files.image, otherImage:req.files.otherImage};      
          ProductService.create(data).then((result) => {
            if (result) {
               res.status(200).json({
                success: 200,
                message: "Product Created succefully",
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
    try {            
      ProductService.find_all().then((result) => {
        // console.log(result)
        if (result) {  
          res.status(200).json({
            data: result,
            msg:'data found'
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
        success: 400,
        message: "Please provide correct information",
      });
    }
  },
  find_by_id:(req,res,next) =>{
    const{_id}=req.body
    try {            
      ProductService.find_by_id(_id).then((result) => {
        // console.log(result)
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
      });
    } catch (err) {
      console.log(err);
      res.json({
        success: 400,
        message: "Please provide correct information",
      });
    }
  },
  find_and_update:(req,res,next)=>{
    // console.log(req.body,"kh")
      const {_id} =req.body
    try{  
      ProductService.find_and_update(_id,req.body).then((result) => {      
        // console.log(result)
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
          success: 400,
          message: "Please provide correct information",
        });
      }
    },
  find_and_delete:(req,res)=>{
    const {_id} = req.body
    // console.log(_id,"here")
    try{  
      ProductService.find_and_delete(_id).then((result) => {      
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
            success: 400,
            message: "Please provide correct information",
          });
        }     
  }

};
