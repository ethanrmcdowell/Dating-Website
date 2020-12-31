const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");
const exphbs = require("express-handlebars");
const app = express();
const PORT = process.env.PORT || 8080;
const db = require("./models");
const seed = require('./seed');

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const routes = require("./controller/dating_controller.js");

app.use("/", routes);

db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("APP LISTENING ON PORT " + PORT);
    
    seed.seedUsers();

  });
});