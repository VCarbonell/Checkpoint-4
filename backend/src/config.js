/* eslint-disable no-restricted-syntax */
const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  debug: false,
});

connection.connect((err) => {
  if (err) {
    console.error(err);
  }
  console.log("LESSSS GO");
});

module.exports = connection;
