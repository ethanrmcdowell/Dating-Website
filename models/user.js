const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            len: [1, 30],
            allowNull: false
        },
        personalStatement: {
            type: DataTypes.STRING,
            len: [1, 250],
            allowNull: false
        },
        hobby1id: {
            type: DataTypes.INTEGER
        },
        hobby2id: {
            type: DataTypes.INTEGER
        },
        hobby3id: {
            type: DataTypes.INTEGER
        }
    });
    return User;
}