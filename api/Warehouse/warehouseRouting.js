const warehouseController = require("./warehouseController");
const upload=require("../Mulert")
const router = require("express").Router();
const cors = require("cors");
router.use(cors({ origin : true}));
const checkauth = require("../../Midileware/checkauth");
router.post("/add_warehouse",warehouseController.create);
router.post("/get_warehouse_by_id",warehouseController.find_by_id);
router.get("/get_all_warehouse",warehouseController.find_all);
router.put("/update_warehouse_by_id",warehouseController.find_and_update)
router.delete("/delete_warehouse_by_id",warehouseController.find_and_delete);

module.exports = router;