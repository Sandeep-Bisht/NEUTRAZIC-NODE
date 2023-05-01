const ForgetController = require("./ForgetPasswordController");
const router = require("express").Router();
const checkauth= require('../../Midileware/checkauth')
router.post("/createotp",ForgetController.create);
router.post("/verifyotp",ForgetController.verifyotp);
module.exports = router;
