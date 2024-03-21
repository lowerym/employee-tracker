const inquirer = require('inquirer');
const db = require('./db/connection');

db.connect(err => {
  if (err) {
    console.log(err);
  }
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
        if (err) {
          console.log(err);
        }
        console.log("Viewing All Departments: ");
        console.table(result);
        employee_tracker();
      })
    } else if (answers.prompt === 'View All Roles') {
      db.query(`SELECT * FROM role`, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log("Viewing All Roles: ");
        console.table(result);
        employee_tracker();
      })
    } else if (answers.prompt === 'View All Employees') {
      db.query(`SELECT * FROM employee`, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log("Viewing All Employees: ");
        console.table(result);
        employee_tracker();
      })
    } else if (answers.prompt === 'Add a Department') {
      inquirer.prompt([{
        type: 'input',
        name: 'department',
        message: 'What is the name of the new department you want to add?',
        validate: departmentInput => {
          if (departmentInput) {
            return true;
          } else {
            console.log('Please enter a department!');
            return false;
          }
        }
      }]).then((answers) => {
        db.query(`INSERT INTO department (name) VALUES (?)`, [answers.department], (err, result) => {
          if (err) {
            console.log(err);
          }
          console.log(`Added ${answers.department} to the database.`);
          employee_tracker();
        });
      })
    } else if (answers.prompt === 'Add a Role') {
      db.query(`SELECT * FROM department`, (err, result) => {
        if (err) {
          console.log(err);
        }
      inquirer.prompt([
        {
        type: 'input',
        name: 'title',
        message: 'What is the title of the new role you want to add?',
        validate: titleInput => {
          if (titleInput) {
            return true;
          } else {
            console.log('Please enter a title!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the new role you want to add?',
        validate: salaryInput => {
          if (salaryInput) {
            return true;
          } else {
            console.log('Please enter a salary!');
            return false;
          }
        }
      },
      {
        type: 'list',
        name: 'department',
        message: 'Which department does the new role belong to?',
        choices: () => {
          var array = [];
          for (var i = 0; i < result.length; i++) {
            array.push(result[i].name);
          }
          return array;
        }
      }
    ]).then((answers) => {
      for (var i = 0; i < result.length; i++) {
        if (result[i].name === answers.department) {
          var department = result[i];
        }
      }
        db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [answers.title, answers.salary, department.id], (err, result) => {
          if (err) {
            console.log(err);
          }
          console.log(`Added ${answers.title} to the database.`);
          employee_tracker();
        });
      })
    })
    } else if (answers.prompt === 'Add a New Employee') {
    db.query(`SELECT * FROM employee, role`, (err, result) => {
      if (err) {
        console.log(err);
      }
    inquirer.prompt([
      {
      type: 'input',
      name: 'first_name',
      message: 'What is the first name of the new employee you want to add?',
      validate: firstNameInput => {
        if (firstNameInput) {
          return true;
        } else {
          console.log('Please enter a first name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'What is the last name of the new employee you want to add?',
      validate: lastNameInput => {
        if (lastNameInput) {
          return true;
        } else {
          console.log('Please enter a last name!');
          return false;
        }
      }
    },
    {
      type: 'list',
      name: 'role',
      message: 'What is the role of the new employee?',
      choices: () => {
        var array = [];
        for (var i = 0; i < result.length; i++) {
          array.push(result[i].title);
        }
        var newArray = [...new Set(array)];
        return newArray;
      }
    },
    {
      type: 'input',
      name: 'manager',
      message: 'Who is the manager of the new employee?',
      validate: managerInput => {
        if (managerInput) {
          return true;
        } else {
          console.log('Please enter a manager!');
          return false;
        }
      }
    }
  ]).then((answers) => {
    for (var i = 0; i < result.length; i++) {
      if (result[i].title === answers.role) {
        var role = result[i];
      }
    }
      db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answers.first_name, answers.last_name, role.id, answers.manager.id], (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(`Added ${answers.first_name} ${answers.last_name} to the database.`);
        employee_tracker();
      });
    })
  })
    } else if (answers.prompt === 'Update an Employee Role') {
      db.query(`SELECT * FROM employee, role`, (err, result) => {
        if (err) {
          console.log(err);
        }
      inquirer.prompt([
        {
        type: 'list',
        name: 'employee',
        message: 'Whose role would you like to update?',
        choices: () => {
          var array = [];
          for (var i = 0; i < result.length; i++) {
            array.push(result[i].last_name);
          }
          var employeeArray = [...new Set(array)];
          return employeeArray;
        }
      },
      {
        type: 'list',
        name: 'role',
        message: 'What is their new role?',
        choices: () => {
          var array = [];
          for (var i = 0; i < result.length; i++) {
            array.push(result[i].title);
          }
          var newArray = [...new Set(array)];
          return newArray;
        }
      },
      {
        type: 'list',
        name: 'role',
        message: 'What is the role of the new employee?',
        choices: () => {
          var array = [];
          for (var i = 0; i < result.length; i++) {
            array.push(result[i].title);
          }
          var newArray = [...new Set(array)];
          return newArray;
        }
      }
    ]).then((answers) => {
      for (var i = 0; i < result.length; i++) {
        if (result[i].last_name === answers.employee) {
          var name = result[i];
        }
      }
      for (var i = 0; i < result.length; i++) {
        if (result[i].title === answers.role) {
          var role = result[i];
        }
      }
        db.query(`UPDATE employee SET ? WHERE ?`, [{role_id: role}, {last_name: name}], (err, result) => {
          if (err) {
            console.log(err);
          }
          console.log(`Updated ${answers.employee} role to the database.`);
          employee_tracker();
        });
      })
    })
    } else if (answers.prompt === 'Log Out') {
      db.end();
      console.log('Thank you. Have a nice day!');
    }
})
}
