const express = require("express");
const passport = require("../config/passport");
const router = express.Router();
const dating = require("../models/index.js");
const db = require('../models')
const {Op} = require('sequelize');


router.post("/login", passport.authenticate("local"), (req, res) => {
    res.json(req.user);
});

router.post("/signup", (req, res) => {
    db.User.create({
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


    // // // Query for finding other users that match hobbies. 
    // // Need to get this info from page. At the moment is hardcoded
    // let currentUser = 1;
    // let favoriteHobbies = ['Karate', 'Music', 'DIY'];
    // db.User.findAll({
    //     attributes: ['username', 'hobby1id', 'hobby2id', 'hobby3id'],
    //     where: {
    //       [Op.or]: [
    //         {hobby1id: favoriteHobbies},
    //         {hobby2id: favoriteHobbies},
    //         {hobby3id: favoriteHobbies}
    //       ],
    //       username: {
    //         [Op.ne]: currentUser
    //       }
    //     }
    //   })
    //   .then(usersData => {
    //     let userArray = [];
    //     usersData.forEach(user => {
    //       userArray.push(user.dataValues)
    //     });
    //     let connectionsObject = {data: userArray};
    //     console.log(connectionsObject);
    //     // Render with Handlebars with an #each helper
    //   });


module.exports = router;