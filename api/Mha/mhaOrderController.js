//onst OrderService = require("./OrderService");
//const CartService = require("../Cart/CartService");
require("dotenv").config();
const router = require("express").Router();
const express = require("express");
const axios = require('axios');

const Stripe = require("stripe");
const stripe = Stripe(process.env.MHA_STRIPE_KEY);
//end code for images
module.exports = {
  create: async (req, res) => {
    const { order } = req.body;
     console.log("inside cretae mha",order, req.body)
    const customer = await stripe.customers.create({
      metadata: {
        user_id: req.body.userid,
        mhaUser : req.body.userId,
        accountId : req.body.accountId, 
        cart : order,       
        customerName: req.body.address.name,
        customerNumber: req.body.address.phoneNumber,
        // customerEmail: req.body.email,
        userShipping_details : JSON.stringify(req.body.address),
        order_no : req.body.orderId,
        userToken : req.body.userToken
      },
    });

    let productArray = [];
    JSON.parse(order).map((item) => {
      productArray.push({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
            images : [item.image]
            // images: [
            //   `http://arogyapath.org/_next/image?url=%2Fimages%2FAyurveda-Book.png&w=64&q=75`,
            // ],
          },
          unit_amount: item.unitPrice,
        },
        quantity: item.quantity,
      });
    });
    // console.log(productArray[0],"productArray productArray")

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      // cart : JSON.stringify(req.body.order),
      payment_method_types: ["card"],
      // shipping_address_collection: { allowed_countries: ["US", "IN"] },
      // shipping_options: [
      //   {
      //     shipping_rate_data: {
      //       type: "fixed_amount",
      //       fixed_amount: { amount: 0, currency: "inr" },
      //       display_name: "Free shipping",
      //       delivery_estimate: {
      //         minimum: { unit: "business_day", value: 5 },
      //         maximum: { unit: "business_day", value: 7 },
      //       },
      //     },
      //   },
      // ],
      line_items: productArray,
      mode: "payment",
      success_url: `${process.env.MHA_CLIENT_URL}/success`,
      cancel_url: `${process.env.MHA_CLIENT_URL}/checkout`,
    });
    try {
      if (session.success_url) {
        res.json({
          success: 200,
          url: session.url,
          message: "Ordered created succefully",
        });
      } else {
        res.json({
          success: 400,
          message: "Please provide correct information",
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        success: 400,
        message: "Please provide correct information",
      });
    }

  },

  // stripe webhook

  // This is your Stripe CLI webhook secret for testing your endpoint locally.

  webhook: async (req, res) => {
    console.log("web hook  trigger");
    let endpointSecret;
    //endpointSecret ="whsec_78ee2f6392677e2c2f3dd65d301271bc4026f84838c9b7d014343f6e097567cd";
    const sig = req.headers["stripe-signature"];
    let eventType;
    let data;
    
    if (endpointSecret) {
      try {
        event = stripe.webhooks.constructEvent(
          req.rawBody,
          sig,
          endpointSecret
        );
        //  console.log("web hook verified");
      } catch (err) {
         console.log(`web hook failed : ${err.message}, err, ${err}`);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
      data = event.data.object;
      eventType = event.type;
    } else {
      data = req.body.data.object;
      eventType = req.body.type;
    }

    // Handle the event
    if (eventType === "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then((customer) => {
          //  console.log(customer, "customer");
          //  console.log("data ", data);
           updateOrder(customer, data)       
        

        })
        .catch((err) => console.log(err.message));
    }

    // Return a 200 response to acknowledge receipt of the event
    res.send().end();
  },

};

const updateOrder = async (customer, data) => {
  let id = customer.metadata.order_no;
  let status = 0;
   let userId = customer.metadata.mhaUser;
  let accountId = customer.metadata.accountId;
  let companyId = 38401;
  let groupId = 38607;
  let userToken = customer.metadata.userToken
  let payload = {
    customer,
    data
  }

  let url = `http://13.126.72.50:8282/o/mha-headless/commerce/update-order-payment/?orderId=${id}&status=${status}&userId=${userId}&accountId=${accountId}&companyId=${companyId}&groupId=${groupId}`;
console.log("url", url)
  axios.post(url, payload,  {
    headers: {
      Authorization: 'Bearer ' + userToken
    }
  })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });

}

const createOrder = async (customer, data) => {
  //const Items = JSON.parse(customer.metadata.cart);
  let newOrder = {
    userid: customer.metadata.userid,
    order : JSON.parse(customer.metadata.cart),
    customerId: customer.id,    
    mobile: customer.metadata.customerNumber,
    username: customer.metadata.customerName,
    userEmail: customer.metadata.customerEmail,
    paymentIntentId: data.id,
    transaction_id: data.payment_intent,
    justification: "",
    delivery_time: "",
    totalamount: (data.amount_subtotal/100),
    actualamount: (data.amount_total/100),
    addresstype: "Shipping",
    deliverytype: "Standard",
    address: data.shipping_details.address,
    payment_status: data.payment_status,
    orderStatus :"Pending",
    order_no: customer.metadata.order_no,
  };

  try {      
       
    CartService.find_by_id(newOrder.userid).then((result) => {
      // console.log("result from cart", result)
      if (result && result.cartStatus == "Open") { 
        let {_id, userid, order, cartStatus} = result; 
        cartStatus = "Closed"
        try{  
          CartService.find_and_update(_id,userid,order,cartStatus).then((result) => {})
          }
           catch (err) {
              console.log(err);
              
            }
             
      } 
    });
  } catch (err) {
    console.log(err);   
  }


  try {
      OrderService.create(newOrder);    
   } catch (error) {
    console.log(error);
  }
};
