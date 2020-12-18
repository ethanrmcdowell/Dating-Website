const express = require("express");
const router = express.Router();
const dating = require("../models/index.js");

router.get("/", (req,res) => {
    res.render("index")
}); 

module.exports = router;