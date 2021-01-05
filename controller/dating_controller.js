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
    });
        res.redirect("/profile/" + req.body.username);
});

router.get("/", (req, res) => {
    if(req.user){
        res.redirect("profile");
    }
    res.render("index", {title: "Minion Mingle"})
});

// router.get("/profile/:username", isAuthenticated, (req, res) => {
router.get("/profile/:username", (req, res) => {

    // Query for finding other users that match hobbies. 
    let currentUser = req.params.username;
    let favoriteHobbies = [];

    // First Query gets the info from the current user
    db.User.findOne({
        where: {
            username: currentUser
        }
    })
    .then(response => {
        let profileInfo = {
            username: response.dataValues.username,
            personalStatement: response.dataValues.personalStatement,
            hobby1id: response.dataValues.hobby1id,
            hobby2id: response.dataValues.hobby2id,
            hobby3id: response.dataValues.hobby3id,
            avatarURL: response.dataValues.avatarURL
        }

        // This saves the current user's favorite hobbies in a separate array for the next query
        favoriteHobbies.push(profileInfo.hobby1id);
        favoriteHobbies.push(profileInfo.hobby2id);
        favoriteHobbies.push(profileInfo.hobby3id);

        // This matches any user that shares hobbies in common with the current user
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

            // This bundles up all the info from the previous two queries into a single object to hand to handlebars
            let hbsObjecct = {
                minionConnections: userArray,
                userProfile: profileInfo,
                title: `${currentUser}'s Profile`
            };

            // This renders the page
            res.render("profile", hbsObjecct);
        });
    });
});
    

router.get("/login", (req, res) => {
    res.render("login", {title: "Login"});
});

router.get("/signup", (req, res) => {
    res.render("signup", {title: "Sign Up"});
});


// Settings page
router.get("/settings/:username", (req, res) => {
    let currentUser = req.params.username;
    res.render("settings", {username: currentUser, title: `${currentUser}'s Settings`});
});

router.post("/updateAvatar", (req, res) => {
    db.User.update({ avatarURL: req.body.avatarURL }, {
        where: {
            username: req.body.username
        }
    }).then(() => {
        res.redirect("/profile/" + req.body.username)
    });
});

router.post("/updatePersonalStatement", (req, res) => {
    db.User.update({ personalStatement: req.body.personalStatement}, {
        where: {
            username: req.body.username
        }
    }).then(() => {
        res.redirect("/profile/" + req.body.username);
    });
});

router.post("/updateHobbies", (req, res) => {
    db.User.update({hobby1id: req.body.hobby1id, hobby2id: req.body.hobby2id, hobby3id: req.body.hobby3id}, {
        where: {
            username: req.body.username
        }
    }).then(() => {
        res.redirect("/profile/" + req.body.username);
    });
});

router.post("/deleteUser", (req, res) => {
    console.log(req.body);
    db.User.destroy({
        where: {
            username: req.body.username
        }
    }).then(() => {
        res.redirect("/");
    });
});

module.exports = router;