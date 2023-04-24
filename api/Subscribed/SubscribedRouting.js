const SubscribedController = require("./SubscribedController");
const router = require("express").Router();
const checkauth= require('../../Midileware/checkauth');
const cors = require("cors");
router.use(cors({ origin: true }));
router.post("/subscribed",SubscribedController.create);
router.post("/verify",SubscribedController.verify);
module.exports = router;