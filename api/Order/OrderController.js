const OrderService = require("./OrderService");
const Stripe = require('stripe');
require('dotenv').config()

const stripe = Stripe(process.env.STRIPE_KEY)
//end code for images
module.exports = {

  create: async (req, res) => {
    const {order} = req.body;
    
    let productArray = [];
    
    JSON.parse(order).map((item) => {
      console.log(item.image,"item.image")
      productArray.push({
        price_data:{
          currency:'inr',
          product_data:{
            name:item.name,
            images: [`http://arogyapath.org/_next/image?url=%2Fimages%2FAyurveda-Book.png&w=64&q=75`]
          },
          unit_amount:parseInt(item.singleprice*100),
        },
        quantity:item.quantity,
      })
    })


    const session = await stripe.checkout.sessions.create({
      line_items: productArray,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/Success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });
  
    res.send({url: session.url});
    // try {
    //   var data = { ...req.body };
    //   // console.log(data);
    //   OrderService.create(data).then((result) => {
    //     if (result) {
    //       res.json({
    //         sucess: 200,
    //         message: "Ordered succefully",
    //       });
    //     } else {
    //       res.json({
    //         sucess: 400,
    //         message: "Please provide correct information",
    //       });
    //     }
    //   });
    // } catch (err) {
    //   console.log(err);
    //   res.json({
    //     sucess: 400,
    //     message: "Please provide correct information",
    //   });
    // }
  },
  find_all: (req, res, next) => {
    // console.log("category hit")
    try {
      OrderService.find_all().then((result) => {
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
    const { userid } = req.body;
    // console.log(req.body)
    try {
      OrderService.find_by_id(userid).then((result) => {
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
  updateOrder:(req, res, next) => {
    const { _id,status,justification,delivery_time} = req.body;
    // console.log(req.body)
    try {
      OrderService.updateOrder(_id,status,justification,delivery_time).then((result) => {
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
  find_and_delete:(req,res)=>{
    const {_id} = req.body
    // console.log(_id,"here")
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
