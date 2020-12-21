const express = require("express");
const passport = require("../config/passport");
const router = express.Router();
const dating = require("../models/index.js");
const db = require('../models')

router.post("/login", passport.authenticate("local"), (req, res) => {
    res.json(req.user);
});

router.post("/signup", (req, res) => {
    db.User.create({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username
    });
});

router.get("/", (req, res) => {
    res.render("index")
});

router.get("/profile", (req, res) => {
    res.render("profile");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/signup", (req, res) => {
    res.render("signup");
})

router.post("/signup", (req, res) => {
    res.render("signup");
});

module.exports = router;