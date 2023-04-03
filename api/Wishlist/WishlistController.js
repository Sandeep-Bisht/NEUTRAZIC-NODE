const WishlistService = require("./WishlistService");
module.exports = {
  create: (req, res) => {
        try {
          var data = {...req.body};  
          // console.log(data,"by sanju")       
          WishlistService.create(data).then((result) => {
            if (result) {
              res.json({
                success: 200,
                data:result,
                message: "Wishlist added succefully",
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
  find_by_id:(req,res,next) =>{
    const{userid}=req.body
    // console.log(userid)
    try {            
      WishlistService.find_by_id(userid).then((result) => {
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
  const{_id,userid,order}=req.body
  try{  
  WishlistService.find_and_update(_id,userid,order).then((result) => {  
    console.log(result,"result");    
      if (result) {  
        res.json({
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
      WishlistService.find_and_delete(_id).then((result) => {  
          if (result != "") {  
            res.status(200).json({
              // data: result,
              status: 200,
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
