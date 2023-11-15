
const mysql = require('mysql');
const inquirer = require('inquirer');
// const { start } = require('repl');
// const { exit } = require('process');
// const { connect } = require('http2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '2023SQLpassword$$',
        database: 'business_db'
    });


db.connect(function (err) {
    if (err) throw err;
    inquirer_prompt();
});

const deptChoices = ["Sales", "Engineering", "Finance", "Legal"];
const roleChoices = ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Accountant", "Legal Team Lead", "Lawyer"];
const employeeChoices = ["John Doe", "Mike Chan", "Ashley Rodriguez", "Kevin Tupik", "Malia Brown", "Sarah Lourd", "Tom Allen"];

function askQuestion() {

    inquirer.prompt([
        {
            type: 'list',
            name: 'selection',
            message: "What would you like to do?",
            choices: [
                'View employees',
                'View departments',
                'View roles',
                'Add an employee',
                'Add a department',
                'Add a role',
                'Update an employee role',
                'Delete an employee',
                'Exit'
            ],
        },
    ]).then((answers) => {
        console.log(answers);

        if (answers.selection === 'View employees') {
            viewEmployees();
        } else if (answers.selection === 'View departments') {
            viewDepartments();
        } else if (answers.selection === 'View roles') {
            viewRoles();
        } else if (answers.selection === 'Add an employee') {
            addEmployee();
        } else if (answers.selection === 'Add a department') {
            addDepartment();
        } else if (answers.selection === 'Add a role') {
            addRole();
        } else if (answers.selection === 'Update an employee role') {
            updateEmployee();
        } else if (answers.selection === 'Delete an employee') {
            deleteEmployee();
        } else {
            connection.end();
        };

    });
};
        

askQuestion();

function viewEmployees() {
    let query = "SELECT employees.first_name, employees.last_name, roles.title, roles.salary, department.department_name AS department,employees.manager_id " + "FROM employees " + "JOIN roles ON roles.id = employees.role_id " + "JOIN department ON roles.department_id = department.id " + "ORDER BY employees.id;";
    db.query(query, function (err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            if (res[i].manager_id === null) {
                res[i].manager_id = 'None';
            } else {
                res[i].manager = res[res[i].manager_id - 1].first_name + ' ' + res[res[i].manager_id - 1].last_name;
            };
            delete res[i].manager_id;
        };
        console.table(res);
        inquirer_prompt();
    });
};

function viewDepartments() {
    let query = "SELECT department.department_name AS department FROM department";
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        inquirer_prompt();
    });
};

function viewRoles() {
    let query = "SELECT roles.title, roles.salary, department.department_name AS department FROM roles INNER JOIN department ON department.id=roles.department_id";
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        inquirer_prompt();
    });
};

function addEmployee() {
    let query = "SELECT title FROM roles";
    db.query(query, function (err, res) {
        if (err) throw err;
        let roles = res.map(role => role.title);
        inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: "What is the employee's first name?"
            },
            {
                type: 'input',
                name: 'last_name',
                message: "What is the employee's last name?"
            },
            {
                type: 'list',
                name: 'role',
                message: "What is the employee's role?",
                choices: roles
            },
            {
                type: 'input',
                name: 'manager_id',
                message: "What is the employee's manager ID?"
            }
        ]).then(function (answers) {
            let roleId = res.find(role => role.title === answers.role).id;
            let query = "INSERT INTO employees SET ?";
            connection.query(query, {
                first_name: answers.first_name,
                last_name: answers.last_name,
                role_id: roleId,
                manager_id: answers.manager_id || null
            }, function (err, res) {
                if (err) throw err;
                console.log("Employee added successfully!");
                inquirer_prompt();
            });
        });
    });
};

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department_name',
            message: "What is the name of the department?"
        }
    ]).then(function (answers) {
        let query = "INSERT INTO department SET ?";
        db.query(query, {
            department_name: answers.department_name
        }, function (err, res) {
            if (err) throw err;
            console.log("Department added successfully!");
            inquirer_prompt();
        });
    });
};

function addRole() {
    let query = "SELECT department.department_name, department.id FROM department";
    db.query(query, function (err, res) {
        if (err) throw err;
        let departments = res.map(department => department.department_name);
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: "What is the title of the role?"
            },
            {
                type: 'input',
                name: 'salary',
                message: "What is the salary of the role?"
            },
            {
                type: 'list',
                name: 'department',
                message: "What department does the role belong to?",
                choices: departments
            }
        ]).then(function (answers) {
            let departmentId = res.find(department => department.department_name === answers.department).id;
            let query = "INSERT INTO roles SET ?";
            db.query(query, {
                title: answers.title,
                salary: answers.salary,
                department_id: departmentId
            }, function (err, res) {
                if (err) throw err;
                console.log("Role added successfully!");
                inquirer_prompt();
            });
        });
    });
};

function updateEmployee() {
    let query = "SELECT * FROM employees";
    db.query(query, function (err, res) {
        if (err) throw err;
        let employees = res.map(employee => employee.first_name + ' ' + employee.last_name);
        let rolesQuery = "SELECT * FROM roles";
        db.query(rolesQuery, function (err, res) {
            if (err) throw err;
            let roles = res.map(role => role.title);
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: "Which employee's role do you want to update?",
                    choices: employees
                },
                {
                    type: 'list',
                    name: 'role',
                    message: "What is the employee's new role?",
                    choices: roles
                }
            ]).then(function (answers) {
                let employeeId = res.find(employee => (employee.first_name + ' ' + employee.last_name) === answers.employee).id;
                let roleId = res.find(role => role.title === answers.role).id;
                let query = "UPDATE employees SET role_id = ? WHERE id = ?";
                db.query(query, [roleId, employeeId], function (err, res) {
                    if (err) throw err;
                    console.log("Employee role updated successfully!");
                    inquirer_prompt();
                });
            });
        });
    });
};

function deleteEmployee() {
    let query = "SELECT * FROM employees";
    db.query(query, function (err, res) {
        if (err) throw err;
        let employees = res.map(employee => employee.first_name + ' ' + employee.last_name);
        inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: "Which employee do you want to delete?",
                choices: employees
            }
        ]).then(function (answers) {
            let employeeId = res.find(employee => (employee.first_name + ' ' + employee.last_name) === answers.employee).id;
            let query = "DELETE FROM employees WHERE id = ?";
            db.query(query, [employeeId], function (err, res) {
                if (err) throw err;
                console.log("Employee deleted successfully!");
                inquirer_prompt();
            });
        });
    });
};


module.exports = db;









