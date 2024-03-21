const mysql2 = require('mysql2');

const db = mysql2.createConnection(
  {
  host: 'localhost',
  user: 'root',
  password: 'W31c0m3-1',
  database: 'employee_tracker_db',
  }
);

module.exports = db;
