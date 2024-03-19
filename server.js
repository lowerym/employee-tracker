const mysql2 = require('mysql2');
const inquirer = require('inquirer');
const db = require('./db/connection');

db.connect(err => {
  if (err) throw err;
  console.log('Database connected');
  employee_tracker();
});

var employee_tracker = function() {
  inquirer.prompt([{
    type: 'list',
    name: 'prompt',
    message: 'Hello! What would you like to do?',
    choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add a New Employee', 'Update an Employee Role', 'Log Out']
  }]).then((answers) => {
    if (answers.prompt === 'View All Departments') {
      db.query(`SELECT * FROM department`, (err, result) => {
        if (err) throw err;
        console.log("Viewing All Departments: ");
        console.table(result);
        employee_tracker();
      })
    }
  })
}
