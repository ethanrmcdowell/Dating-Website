const db = require('./models');

const seed = {
    seedUsers: function(){
        db.User.bulkCreate([
            {username: "Emily-GrinionMinion", password: 1, hobby1id: 'Karate', hobby2id: 'Music', hobby3id: 'Travel', avatarURL: '../assets/img/diy.jpg'},
            {username: "Cryin-Brian", password: 1, hobby1id: 'Music', hobby2id: 'Travel', hobby3id: 'Weight-Lifting', avatarURL: "../assets/img/karate.jpg"},
            {username: "Megan-MegaMinion", password: 1, hobby1id: 'Travel', hobby2id: 'Weight-Lifting', hobby3id: 'Wrestling', avatarURL: "../assets/img/music.jpg"},
            {username: "hunkkid123", password: 1, hobby1id: 'DIY', hobby2id: 'Weight-Lifting', hobby3id: 'Wrestling', avatarURL: "../assets/img/weight-lifting.jpg"},
            {username: "IZK-So-Fresh-Man", password: 1, hobby1id: 'DIY', hobby2id: 'Travel', hobby3id: 'Wrestling', avatarURL: "../assets/img/wrestling.jpg"},
        ])
    },
    // seedMessages: function(){
    //     db.Message.bulkCreate([
    //         {sender_username_id: 1, receiver_username: "username2", message: "message1"},
    //         {sender_username_id: 1, receiver_username: "username2", message: "message2"},
    //         {sender_username_id: 1, receiver_username: "username2", message: "message3"}
    //     ])
    // }
}

module.exports = seed;