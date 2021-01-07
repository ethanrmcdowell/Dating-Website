// Creating my server package 
 const path = require ('path');
const express = require('express');
const app = express();
//setting up the port 3000 to host the page and run the sequelize connection 
const PORT=process.env.PORT || 8080 ;
// fixing the static directory 
app.use(express.static(path.join(__dirname,'public')));
  

    const session = require("express-session");
     const passport = require("./config/passport");
     const exphbs = require("express-handlebars");

    const db = require("./models");
    const seed = require('./seed');



 app.use(express.urlencoded({ extended: true }));
 app.use(express.json());


app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
 app.use(passport.initialize());
 app.use(passport.session());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

 const routes = require("./controller/dating_controller.js");

 app.use("/", routes);

db.sequelize.sync({force: true}).then(function () {
    app.listen(PORT, function () {
      console.log("APP LISTENING ON PORT " + PORT);
      
      seed.seedUsers();
//       // seed.seedMessages();
  
     });
 })

//========================================
// Creating my server package for the chat app we will serve this on the port 3001
const http = require ('http');
// configuring socket.io 
const SocketIO = require ('socket.io');
const formatMessage = require ('./utils/messages')
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require ('./utils/users')
//initializing the http server
// & asking the server to listen on port 3001 
const server = http.createServer(app).listen(3001);
//initializing  the var and passing server 
const io = SocketIO(server);
//setting up the static folder
//app.use(express.static(path.join(__dirname,'public')));
//naming my bot 
const BotName = "Minion-Bot"
// run it when other client connects
io.on('connection', socket => {
    socket.on('joinRoom',({username, room}) =>{
        // setting the user for room 
        const user=userJoin(socket.id, username, room);
        socket.join(user.room);
         // welcome to the current user 
        socket.emit('message',formatMessage(BotName, 'Welcome to MinionCord'));
        // alert when another user connects-- this works for all users except the one is joining
        socket.broadcast.to(user.room).emit('message',formatMessage(BotName,  `${user.username} has joined the chat`));
            //sending users and room info 
    io.to(user.room).emit('roomUsers',{
        room: user.room,
        users: getRoomUsers(user.room)
        });
    });
    // here to listen to for the chat-messages 
    socket.on('chatMessage', (msg) =>{
        //getting the current user
        const user= getCurrentUser(socket.id);
        // added . to () since we are using the rooms
        io.to(user.room).emit('message',formatMessage(user.username, msg));
        
    });
    // when  client disconnects
    socket.on('disconnect', () =>{
        //getting the unique user that is leaving
        const user = userLeave(socket.id);
        if (user){
        //alert all users
        io.to(user.room).emit('message', formatMessage(BotName, `${user.username} has left the chat`));
        };
        //sending users and room info 
    io.to(user.room).emit('roomUsers',{
        room: user.room,
        users: getRoomUsers(user.room)
        });
    });
    });
