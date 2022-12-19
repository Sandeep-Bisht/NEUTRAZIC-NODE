const ProductController = require("./ProductController");
const upload=require('../Mulert')
const router = require("express").Router();
const checkauth= require('../../Midileware/checkauth')
router.post("/add_product",upload.array('image'),ProductController.create);
router.get("/all_product",ProductController.find_all)
router.post("/product_by_id",ProductController.find_by_id)
router.put("/update_product_by_id",ProductController.find_and_update)
router.delete("/delete_product_by_id",ProductController.find_and_delete)
module.exports = router;
