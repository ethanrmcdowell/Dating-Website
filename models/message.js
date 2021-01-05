module.exports = (sequelize, DataTypes) => {
    var Message = sequelize.define("Message", {
        sender_username_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        receiver_username: {
            type: DataTypes.STRING,
            len: [1, 30],
            allowNull: false
        },
        message: {
            type: DataTypes.STRING,
            len: [1, 250]
        }
    });
    Message.associate = function(models) {
        Message.belongsTo(models.User, {
            foreignKey: "sender_username_id",
            onDelete: 'cascade'
        });
    };

    return Message;
}