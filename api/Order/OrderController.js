const OrderService = require("./OrderService");
const CartService = require("../Cart/CartService");
const ProductService = require("../Products/ProductService");
const ProductModal = require('../Products/ProductModal');
const { ObjectId } = require('mongodb');
const nodemailer = require("nodemailer");
require("dotenv").config();
const router = require("express").Router();
const express = require("express");

const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_KEY);
//end code for images
module.exports = {
  create: async (req, res) => {
    const { order } = req.body;
    const customer = await stripe.customers.create({
      metadata: {
        userid: req.body.userid,
        //cart: order,
        customerName: req.body.username,
        customerNumber: req.body.mobile,
        customerEmail: req.body.email,
        order_no: req.body.order_no,
      },
    });

    let productArray = [];
    JSON.parse(order).map((item) => {
      productArray.push({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
            //images : [item.image]
          },
          unit_amount: parseInt(item.singleprice * 100),
        },
        quantity: item.quantity,
      });
    });

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      // cart : JSON.stringify(req.body.order),
      payment_method_types: ["card"],
      shipping_address_collection: { allowed_countries: ["US", "IN"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "inr" },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
      ],
      line_items: productArray,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/orderSuccess`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
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
      res.json({
        sucess: 400,
        message: "Please provide correct information",
      });
    }
  },

  // stripe webhook

  // This is your Stripe CLI webhook secret for testing your endpoint locally.

  webhook: async (req, res) => {
    console.log("webhook trigger");
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
        console.log("web hook verified");
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
          createOrder(customer, data);
        })
        .catch((err) => console.log(err.message));
    }

    // Return a 200 response to acknowledge receipt of the event
    res.send().end();
  },

  find_all: (req, res, next) => {
    try {
      OrderService.find_all().then((result) => {
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
    try {
      OrderService.find_by_id(userid).then((result) => {
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
  updateOrder: (req, res, next) => {
    const { _id } = req.body;
    let data = { ...req.body };
    try {
      OrderService.updateOrder(_id, data).then((result) => {
        if (result) {
          // res.status(200).json({
          //   data: result,
          //   msg: "Order status updated",
          // });
          const transporter = nodemailer.createTransport({
            host: "smtppro.zoho.com",
            port: 587,
            auth: {
              user: "admin@nutrazik.com",
              pass: "Nutrazik@123",
            },
          });
          const mailOptions = {
            from: "admin@nutrazik.com",
            to: result.userEmail,
            subject: "Update on Your Request in Progress",
            html: `<p>Dear ${result.username}</p>
            <p>The email provides an update to the recipient regarding the progress of their request. 
            <pre>It assures them that their request is being worked on and the team is making efforts 
            to complete it as soon as possible. The email also invites the recipient to reach out if 
            they have any questions or concerns.</pre>
            `,
          };
          try {
            transporter.sendMail(mailOptions);
            res.json({
              sucess: 200,
              message: "User Created succefully",
            });
          } catch (error) {
            console.error(error);
          }
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
  find_and_delete: (req, res) => {
    const { _id } = req.body;
    try {
      OrderService.find_and_delete(_id).then((result) => {
        if (result.length > 0) {
          res.status(200).json({
            data: result,
            msg: "cart item deleted",
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
};

const createOrder = async (customer, data) => {
  //const Items = JSON.parse(customer.metadata.cart);
  let newOrder = {
    userid: customer.metadata.userid,
    //order: JSON.parse(customer.metadata.cart),
    customerId: customer.id,
    mobile: customer.metadata.customerNumber,
    username: customer.metadata.customerName,
    userEmail: customer.metadata.customerEmail,
    paymentIntentId: data.id,
    transaction_id: data.payment_intent,
    justification: "",
    delivery_time: "",
    totalamount: data.amount_subtotal / 100,
    actualamount: data.amount_total / 100,
    addresstype: "Shipping",
    deliverytype: "Standard",
    address: data.shipping_details.address,
    payment_status: data.payment_status,
    orderStatus: "Pending",
    order_no: customer.metadata.order_no,
  };

  try {
    CartService.find_by_id(newOrder.userid).then(async (result) => {
      if (result) {
        CartService.find_and_delete(result[0]._id).then((result) => {
        });
        newOrder.order = result;
        try {
          for (let item of result[0].order) {
            const productId = item.productid;
            const purchasedQty = parseInt(item.quantity);
            await ProductModal.findOneAndUpdate(
              { _id: ObjectId(productId) },
              { $inc: { quantity: -purchasedQty } },
              { new: true }
            );
          }
        } catch (err) {
          console.log(err);
        }
       
        try {
          OrderService.create(newOrder).then((result) => {
            if (result) {
              // Send email to user
              const transporter = nodemailer.createTransport({
                host: "smtppro.zoho.com",
                port: 587,
                auth: {
                  user: "admin@nutrazik.com",
                  pass: "Nutrazik@123",
                },
              });

              const mailOptions = {
                from: "admin@nutrazik.com",
                to: newOrder.userEmail,
                subject: "Order has been successfully placed",
                text: `Hi ${newOrder.username},\n\nYour order has been placed successfully with order id ${newOrder.order_no} .\n\n
                Thanks for choosing Nutrazik.\n\n Best regards,
        Nutrazik\n+91-7500872014`,
              };
              try {
                transporter.sendMail(mailOptions);
              
              } catch (error) {
                console.error(error);
              }
            } else {
              OrderService.create(newOrder);
            }
          });         
         
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log("inside else");
      }
    });
  } catch (err) {
    console.log(err);
  }
};
