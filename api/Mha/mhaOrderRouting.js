const express = require('express');
const app = express();
const MhaController = require("./mhaOrderController");
const upload=require('../Mulert')
const router = require("express").Router();
const cors = require("cors");
router.use(cors({ origin: true }));
const checkauth= require('../../Midileware/checkauth')
router.post("/create-checkout-session",upload.array('image'),MhaController.create);
router.post("/webhook",express.raw({type:'application/json'}),MhaController.webhook)

module.exports = router;