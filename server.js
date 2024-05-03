let roles = [];
let departments = [];
let managers = [];

const inquirer = require('inquirer');
const express = require('express')
const { Pool } = require('pg');
const CLI = require('./lib/cli.js');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const pool = new Pool(
    {
        user: 'postgres',
        password: 'B00tcamp2024',
        host: 'localhost',
        database: 'employee_db'
    },
    console.log('Connected to the employees database')
)

pool.connect();

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// const cli = new CLI();

// cli.run();


function roleChoices() {
    pool.query('SELECT title AS name FROM role, id AS value', async function(err, {rows}) {
        roles = rows
        await console.log(roles)
    })
    return roles;
};

function viewEmployees() {
    pool.query(`SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS emp_name, role.title, role.salary, department.name, ` +
               `CONCAT(manager.first_name, ' ', manager.last_name) AS manager ` +
               'FROM employee employee LEFT JOIN employee manager ON employee.manager_id = manager.id ' +
               'INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id' , async function(err, { rows }) {
                await console.table(rows)
                return run();
        })
};

function addEmployee() {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'firstName',
            message: `What is the employee's first name?`,
        },
        {
            type: 'input',
            name: 'lastName',
            message: `What is the employee's last name?`,
        },
        {
            type: 'list',
            name: 'role',
            message: `What is the employee's role?`,
            choices: roleChoices(),
        },
    ])
    .then(({ firstName, lastName, role, department }) => {

    })
    return run();
};

function updateRole() {
    return run();
};

function viewRoles() {
    pool.query('SELECT role.id, role.title, role.salary, department.name FROM role INNER JOIN department ON role.department_id = department.id ORDER BY role.title',
                async function(err, {rows}) {
        await console.table(rows);
        return run();
    })
};

function addRole() {
    return run();
};

function viewDepartments() {
    pool.query('SELECT * FROM department ORDER BY name', async function(err, {rows}) {
        await console.table(rows)
        return run();
    });
};

function addDepartment() {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'department',
            message: `What is the department name?`,
        },
    ])
    .then(({ department }) => {
        pool.query('INSERT INTO department (name) VALUES ($1)', [department], async (err) => {
            if (err) {
                await console.log(err.message);
                return
            } else {
                await console.log('');
                await console.log(`${department} sucessfully added!`);
                return run();
            }
        }
    )}
)};

function run() {
    inquirer
        .prompt([
        {
            type: 'list',
            name: 'todo',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role',
                    'View All Roles', 'Add Role', 'View All Departments', 'Add Department',
                    'Quit'],
            }
        ])
        .then(({ todo }) => {
            switch (todo) {
                case 'View All Employees':
                    viewEmployees();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update Employee Role':
                    updateRole();
                    break;
                case 'View All Roles':
                    viewRoles();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'View All Departments':
                    viewDepartments();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                default:
                    return;
                    break;
                };
            });
}

run();