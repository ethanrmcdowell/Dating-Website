var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

const db = require("../models");
const user = require('../models/user');

passport.use(new LocalStrategy(
  function(username, password, done){
    db.User.findOne({ where: { username: username }}).then(function(response,err){
      if (err) {
        console.log(err);
        return done(err);
      } if (!username) {
        console.log("Incorrect username.");
        return done(null, false, { message: "Incorrect username." });
      } if (response.password !== password) {
        console.log("Incorrect password.");
        return done(null, false, { message: "Incorrect password." });
      }
      console.log(response);
      console.log("! ! ! S U C C E S S F U L L Y  L O G G E D  I N ! ! !");
      return done(null, username);
    });
  }
));

passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });

module.exports = passport;