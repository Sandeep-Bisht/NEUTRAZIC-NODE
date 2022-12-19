const OrderController = require("./OrderController");
const upload=require('../Mulert')
const router = require("express").Router();
const cors = require("cors");
router.use(cors({ origin: true }));
const checkauth= require('../../Midileware/checkauth')
router.post("/add_order",upload.array('image'),OrderController.create);
router.post("/order_by_id",OrderController.find_by_id)
router.get("/all_order",OrderController.find_all)
router.patch("/update_order",OrderController.updateOrder)
router.delete("/delete_order_by_id",OrderController.find_and_delete)
module.exports = router;
