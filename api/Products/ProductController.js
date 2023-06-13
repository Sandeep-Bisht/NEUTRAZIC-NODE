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
          }).catch((err) => {
            if (err.code === 11000) {
              res.status(400).json({
                success: 400,
                message: "Product already exists",
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
    if(req.query._page && req.query._limit)
    {
      const page=Number(req.query._page) || 1;
        const limit=Number(req.query._limit);
        let skip=(page-1)*limit;
        try {            
          ProductService.find_all().skip(skip).limit(limit).then((result) => {
            if (result.length>0 || result.length<6) {
              res.status(200).json({
                data: result,
                msg:'data found',
               
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
    }
    else{
      try {            
        ProductService.find_all().then((result) => {
          if (result) {
            res.status(200).json({
              data: result,
              msg:'data found',
             
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
    }   
  },
  find_by_id:(req,res,next) =>{
    const{_id}=req.body
    try {            
      ProductService.find_by_id(_id).then((result) => {
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
    const {_id,name,description,warehouse,category,subcategory,quantity,reorderQuantity,maximumOrder,inrMrp,dollerMrp,inrDiscount,dollerDiscount,manufacturer,type} =req.body;
    const data={
      _id:_id,
      name:name,
      description:description,
      warehouse:warehouse,
      category:category,
      subcategory:subcategory,
      quantity:quantity,
      reorderQuantity:reorderQuantity,
      maximumOrder:maximumOrder,
      inrMrp:inrMrp,
      dollerMrp:dollerMrp,
      inrDiscount:inrDiscount,
      dollerDiscount:dollerDiscount,
      manufacturer:manufacturer,
      type:type,
    }   
    if(req.files.image){
      data.image = req.files.image;     
    } 
    if(req.files.image){
      data.otherImage = req.files.otherImage;     
    }
    try{  
      ProductService.find_and_update(_id,data).then((result) => {      
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
          success: 400,
          message: "Please provide correct information",
        });
      }
    },
  find_and_delete:(req,res)=>{
    const {_id} = req.body
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
