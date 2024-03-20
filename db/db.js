const mysql2 = require('mysql2');

const db = mysql2.createConnection(
  {
  'host': process.env.DB_HOST,
  'user': process.env.DB_USER,
  'password': process.env.DB_PASS,
  'database': process.env.DB_NAME,
  },
  console.log(`Connected to ${process.env.DB_NAME} database.`)
);

module.exports = db;
