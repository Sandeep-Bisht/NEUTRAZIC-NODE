const blogController = require("./blogController");
const upload=require('../Mulert')
const router = require("express").Router();
const cors = require("cors");
router.use(cors({ origin: true }));
const checkauth= require('../../Midileware/checkauth')
router.post("/add_blog",upload.fields([{name : "featuredImage"}]),blogController.create);
router.post("/find_blog_by_slug",blogController.find_by_slug)
router.get("/find_all_slug",blogController.find_all)
router.put("/update_slug_by_id",upload.fields([{name : "featuredImage"}]),blogController.find_and_update)
router.delete("/delete_slug_by_id",blogController.find_and_delete)

module.exports = router;
