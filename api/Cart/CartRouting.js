const CartController = require("./CartController");
const router = require("express").Router();
const checkauth= require('../../Midileware/checkauth')
router.post("/add_to_cart",CartController.create);
router.post("/cart_by_id",CartController.find_by_id)
router.put("/update_cart_by_id",CartController.find_and_update)
router.delete("/delete_cart_by_id",CartController.find_and_delete)
module.exports = router;
