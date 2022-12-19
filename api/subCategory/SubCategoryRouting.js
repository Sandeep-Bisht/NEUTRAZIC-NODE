const SubCategoryController = require("./SubCategoryController");
const upload=require('../Mulert')
const router = require("express").Router();
const cors = require("cors");
router.use(cors({ origin: true }));
const checkauth= require('../../Midileware/checkauth')
router.post("/add_subcategory",upload.array('image'),SubCategoryController.create);
router.post("/subcategory_by_id",SubCategoryController.find_by_id)
router.get("/all_subcategory",SubCategoryController.find_all)
router.put("/update_subcategory_by_id",SubCategoryController.find_and_update)
router.delete("/delete_subcategory_by_id",SubCategoryController.find_and_delete)

module.exports = router;
