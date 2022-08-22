require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQLURI);

module.exports = sequelize;
