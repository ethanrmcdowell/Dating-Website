const db = require('./models');

const seed = {
    seedHobbies: function(){
        db.Hobby.bulkCreate([
            {name: 'DIY'},
            {name: 'Karate'},
            {name: 'Music'},
            {name: 'Travel'},
            {name: 'Weight-Lifting'},
            {name: 'Wrestling'}
        ])
    }
}

module.exports = seed;