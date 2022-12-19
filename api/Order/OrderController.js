const OrderService = require("./OrderService");
//end code for images
module.exports = {
  create: async (req, res) => {
    try {
      var data = { ...req.body };
      console.log(data);
      OrderService.create(data).then((result) => {
        if (result) {
          res.json({
            sucess: 200,
            message: "Ordered succefully",
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
    console.log("category hit")
    try {
      OrderService.find_all().then((result) => {
        console.log(result);
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
    const { userid } = req.body;
    console.log(req.body)
    try {
      OrderService.find_by_id(userid).then((result) => {
        console.log(result);
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
  updateOrder:(req, res, next) => {
    const { _id,status,justification,delivery_time} = req.body;
    console.log(req.body)
    try {
      OrderService.updateOrder(_id,status,justification,delivery_time).then((result) => {
        console.log(result);
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
  find_and_delete:(req,res)=>{
    const {_id} = req.body
    console.log(_id,"here")
    try{  
      OrderService.find_and_delete(_id).then((result) => {      
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
