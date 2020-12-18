const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    var Hobby = sequelize.define("Hobby", {
        name: {
            type: DataTypes.STRING,
            len: [1, 50],
            allowNull: false
        }
    });
    return Hobby;
}