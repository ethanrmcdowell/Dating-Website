const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            len: [1, 100],
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            len: [1, 30],
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            len: [1, 30],
            allowNull: false
        }
    });
    return User;
}