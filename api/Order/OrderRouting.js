const express = require('express');
const app = express();
const OrderController = require("./OrderController");
const upload=require('../Mulert')
const router = require("express").Router();
const cors = require("cors");
router.use(cors({ origin: true }));
const checkauth= require('../../Midileware/checkauth')
router.post("/create-checkout-session",upload.array('image'),OrderController.create);
router.post("/webhook",express.raw({type:'application/json'}),OrderController.webhook)
//router.post("/add_order",upload.array('image'),OrderController.createOrder);
router.post("/order_by_id",OrderController.find_by_id)
router.get("/all_order",OrderController.find_all)
router.patch("/update_order",OrderController.updateOrder)
router.delete("/delete_order_by_id",OrderController.find_and_delete)
module.exports = router;
