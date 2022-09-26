const mariaDB = require('mariadb');

// --
require('dotenv').config();

// --
const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};
const conn = mariaDB.createPool(options);

console.log('DB Connection', JSON.stringify(options));

module.exports = conn;
