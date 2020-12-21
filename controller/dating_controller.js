const express = require("express");
const router = express.Router();
const dating = require("../models/index.js");
const db = require('../models')

router.get("/", (req,res) => {
    res.render("index")
}); 

router.get("/profile", (req,res) => {
    res.render("profile");
});

router.get("/login", (req,res) => {
    res.render("login");
});

router.get("/signup", (req,res) => {
    res.render("signup");
})

router.post("/signup", (req,res) => {
    res.render("signup");
});

module.exports = router;