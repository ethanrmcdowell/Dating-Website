const db = require('./models');

const seed = {
    seedUsers: function(){
        db.User.bulkCreate([
            {username: 1, password: 1, hobby1id: 'DIY', hobby2id: 'Karate', hobby3id: 'Music'},
            {username: 2, password: 1, hobby1id: 'Karate', hobby2id: 'Music', hobby3id: 'Travel'},
            {username: 3, password: 1, hobby1id: 'Music', hobby2id: 'Travel', hobby3id: 'Weight-Lifting'},
            {username: 4, password: 1, hobby1id: 'Travel', hobby2id: 'Weight-Lifting', hobby3id: 'Wrestling'},
        ])
    }
}

module.exports = seed;