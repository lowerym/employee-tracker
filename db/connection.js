const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3001,
  database: 'employee_tracker_db'
});

module.exports = db;
