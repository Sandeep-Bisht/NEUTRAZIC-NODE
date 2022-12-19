const CategoryController = require("./CategoryController");
const upload=require('../Mulert')
const router = require("express").Router();
const cors = require("cors");
router.use(cors({ origin: true }));
const checkauth= require('../../Midileware/checkauth')
router.post("/add_category",upload.array('image',10),CategoryController.create);
router.post("/category_by_id",CategoryController.find_by_id)
router.get("/all_category",CategoryController.find_all)
router.put("/update_category_by_id",upload.array('image'),CategoryController.find_and_update)
router.delete("/delete_category_by_id",CategoryController.find_and_delete)

module.exports = router;
