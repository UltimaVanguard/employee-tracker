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

function viewEmployees() {
    pool.query('SELECT * FROM employee ORDER BY first_name, last_name', function(err, {rows}) {
        console.log(rows)
    })
    return run();
};

function addEmployee() {
    return run();
};

function updateRole() {
    return run();
};

function viewRoles() {
    pool.query('SELECT * FROM role ORDER BY title', function(err, {rows}) {
        console.log(rows)
    })
    return run();
};

function addRole() {
    return run();
};

function viewDepartments() {
    pool.query('SELECT * FROM department ORDER BY name', async function(err, {rows}) {
        console.log(rows)
        return run();
    })
};

function addDepartment() {
    return run();
};

function run() {
    return inquirer
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