require('dotenv').config();

const Sequelize = require('sequelize');
//setup MYSQLURI with .env 
const sequelize = new Sequelize(process.env.MYSQLURI);

module.exports = sequelize;
