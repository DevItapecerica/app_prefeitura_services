const Sequelize = require("sequelize");
const db = require("../context");

const Service = db.define("Service", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  tag:{
    type: Sequelize.STRING(15),
    allowNull: false,
    defaultValue: "outros"
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Service;
