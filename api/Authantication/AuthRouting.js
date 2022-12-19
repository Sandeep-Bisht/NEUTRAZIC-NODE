const AuthController = require("./AuthController");
const router = require("express").Router();
const checkauth= require('../../Midileware/checkauth')
router.post("/register",AuthController.create);
router.post("/login",AuthController.isuser)
router.get(`/allusers`,AuthController.find_all)
module.exports = router;
