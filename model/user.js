// represents the  model
const { Model, DataTypes } = require("sequelize");
const sequelize = require("./dbconfig");

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        userId: {
            type: DataTypes.STRING
        },
        wallet: {
            type: DataTypes.STRING
        },
        balance: {
            type: DataTypes.INTEGER
        }
    },
    {
        sequelize,
        modelName: "user",
        timestamps: false
    }
);

module.exports = User;
