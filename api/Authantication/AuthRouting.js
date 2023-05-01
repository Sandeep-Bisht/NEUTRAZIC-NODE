const AuthController = require("./AuthController");
const router = require("express").Router();
const checkauth= require('../../Midileware/checkauth')
router.post("/register",AuthController.create);
router.post("/login",AuthController.isuser)
router.get(`/allusers`,AuthController.find_all)
router.post("/user_by_id",AuthController.find_by_id)
router.put("/update_user_by_id",AuthController.find_and_update)
router.delete("/delete_user_by_id",AuthController.find_and_delete)
router.put("/find_by_id_update",AuthController.find_by_id_update)


module.exports = router;
