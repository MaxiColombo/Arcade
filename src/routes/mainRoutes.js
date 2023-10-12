const express = require("express");
const router = express.Router();


const mainControllers = require("../controllers/mainController.js");

router.get("/", mainControllers.main)

module.exports = router;