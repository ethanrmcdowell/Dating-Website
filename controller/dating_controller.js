const express = require("express");
const passport = require("../config/passport");
const router = express.Router();
const dating = require("../models/index.js");
const db = require('../models')
const {Op} = require('sequelize');
const isAuthenticated = require("../config/middleware/isAuthenticated");
const user = require("../models/user");



router.post("/login", passport.authenticate("local", {
    successRedirect: "/profile/" + user.username,
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
    res.render("index", {title: "Minion Mingle"})
});

router.get("/profile/:username", isAuthenticated, (req, res) => {
    // Query for finding other users that match hobbies. 
    let currentUser = req.user;
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

router.get("/profile", (req,res) => {
    if(req.user){
        res.redirect("/profile/" + req.user);
    }
    else{
        res.redirect("/login");
    }
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
    db.User.destroy({
        where: {
            username: req.body.username
        }
    }).then(() => {
        res.redirect("/");
    });
});

router.get("/messages/:username", (req, res) => {
    let currentUser = req.params.username;
    db.Message.findAll({
        where: {
          receiver_username: currentUser
        },
        include: {
          model: db.User,
          attributes: ['username', 'avatarURL']
        }
      })
      .then(data => {
        let messageArray = []
        data.forEach(message => {
            messageArray.push({
                id: message.dataValues.id,
                message: message.dataValues.message,
                username: message.dataValues.User.dataValues.username,
                avatarURL: message.dataValues.User.dataValues.avatarURL,
            });
        });
        res.render("messages", {currentUser: req.params.username, title: `${req.params.username}'s Messages`, messages: messageArray});
    });
});

router.post("/deleteMessage", (req, res) => {
    db.Message.destroy({
        where: {
            id: req.body.id
        }
    }).then(() => {
        res.redirect("/messages/" + req.body.username);        
    })
})

router.post("/replyMessage", (req, res) => {
    db.User.findOne({
        attributes: ["id"],
        where: {
            username: req.body.senderUsername
        }
    }).then(response => {
        db.Message.create({
            sender_username_id: response.dataValues.id,
            receiver_username: req.body.receiver_username,
            message: req.body.message
        })
    })
})


module.exports = router;