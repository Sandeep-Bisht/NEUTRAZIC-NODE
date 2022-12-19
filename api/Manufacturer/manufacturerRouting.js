const ManufacturerController = require("./manufacturerController");
const upload=require('../Mulert')
const router = require("express").Router();
const cors = require("cors");
router.use(cors({ origin: true }));
const checkauth= require('../../Midileware/checkauth')
router.post("/add_manufacture",upload.array('image'),ManufacturerController.create);
router.post("/manufacture_by_id",ManufacturerController.find_by_id)
router.get("/all_manufacture",ManufacturerController.find_all)
router.put("/update_manufacturer_by_id",ManufacturerController.find_and_update)
router.delete("/delete_manufacturer_by_id",ManufacturerController.find_and_delete)

module.exports = router;
