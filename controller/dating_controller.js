const express = require("express");
const passport = require("../config/passport");
const router = express.Router();
const dating = require("../models/index.js");
const db = require('../models')
const {Op} = require('sequelize');
const isAuthenticated = require("../config/middleware/isAuthenticated");


router.post("/login", passport.authenticate("local", {
    successRedirect: "/profile/username",
    failureRedirect: "/",
}));

router.post("/signup", (req, res) => {
    db.User.create({
        password: req.body.password,
        username: req.body.username
    })
    .then(function(){
        res.render("profile");
    });
});

router.get("/", (req, res) => {
    if(req.user){
        res.redirect("profile");
    }
    res.render("index")
});

// router.get("/profile/:username", isAuthenticated, (req, res) => {
router.get("/profile/:username", (req, res) => {
        // Query for finding other users that match hobbies. 
        let currentUser = req.params.username;
        console.log(currentUser);
        let favoriteHobbies = ['Karate', 'Music', 'DIY'];

        db.User.findAll({
                attributes: ['username', 'hobby1id', 'hobby2id', 'hobby3id'],
                where: {
                    [Op.or]: [
                        {hobby1id: favoriteHobbies},
                        {hobby2id: favoriteHobbies},
                        {hobby3id: favoriteHobbies}
                    ],
                    username: 
                    {[Op.ne]: currentUser.replace(":", "")}
                }
            })
            .then(usersData => {
                let userArray = [];
                usersData.forEach(user => {
                    userArray.push(user.dataValues);
                });

                // This Query gets the user's info for their profile.
                // Once again, the Current User is hardcoded for now.
                db.User.findOne({
                    where: {
                        username: currentUser
                    }
                }).then(response => {
                    let profileInfo = {
                        username: response.dataValues.username,
                        personalStatement: response.dataValues.personalStatement,
                        hobby1id: response.dataValues.hobby1id,
                        hobby2id: response.dataValues.hobby2id,
                        hobby3id: response.dataValues.hobby3id,
                        avatarURL: response.dataValues.avatarURL
                    }
                    console.log(profileInfo);

                    // This bundles up the results of both queries into an object to pass to handlebars
                    let hbsObjecct = {
                        minionConnections: userArray,
                        userProfile: profileInfo
                    };

                    console.log(hbsObjecct);
                    res.render("profile", hbsObjecct);
                });
            });
});


router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/signup", (req, res) => {
    res.render("signup");
});



module.exports = router;