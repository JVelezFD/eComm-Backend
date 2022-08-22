 const express = require('express');
const routes = require('./routes');
const mysql = require("mysql2")
const fs = require("fs")

const seedQuery = fs.readFileSync("db/seed.sql", {
  encoding: "utf-8",
})
// import sequelize connection

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true, // IMPORTANT
})

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
