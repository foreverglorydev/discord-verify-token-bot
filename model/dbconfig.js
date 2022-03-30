const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("token-verify", "user", "pass", {
  dialect: "sqlite",
  host: "./token-verify.sqlite"
});

module.exports = sequelize;
