const express = require("express");
const router = express.Router();
const dating = require("../models/index.js");
const db = require('../models')

router.get("/", (req,res) => {
    res.render("index")
}); 

router.post("/signUp", (req,res) => {
    res.render("profile")
});

module.exports = router;