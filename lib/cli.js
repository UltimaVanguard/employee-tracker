const inquirer = require('inquirer');

class CLI {
    constructor() {}
    run() {
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
                        this.viewEmployees();
                        break;
                    case 'Add Employee':
                        this.addEmployee();
                        break;
                    case 'Update Employee Role':
                        this.updateRole();
                        break;
                    case 'View All Roles':
                        this.viewRoles();
                        break;
                    case 'Add Role':
                        this.addRole();
                        break;
                    case 'View All Departments':
                        this.viewDepartments();
                        break;
                    case 'Add Department':
                        this.addDepartment();
                        break;
                    default:
                        return;
                        break;
                };
            });
    }

    viewEmployees() {
        pool.query(`SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS emp_name, role.title, role.salary, department.name, ` +
                   `CONCAT(manager.first_name, ' ', manager.last_name) AS manager ` +
                   'FROM employee employee LEFT JOIN employee manager ON employee.manager_id = manager.id ' +
                   'INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id ' +
                   'ORDER BY emp_name', async function(err, { rows }) {
            await console.table(rows)
            return this.run();
        })
    };
    
    addEmployee() {
        pool.query('SELECT title AS name, id AS value FROM role', async function(err, {rows}) {
            const roles = rows
            await pool.query(`SELECT CONCAT(first_name, ' ', last_name) AS name,` +
                             'id AS value FROM employee WHERE role_id IN (1,2,3)', async function(err, {rows}) {
                const managers = rows
                await inquirer
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
                            choices: roles,
                        },
                        {
                            type: 'list',
                            name: 'manager',
                            message: `Who is the employee's manager?`,
                            choices: managers,
                        },
                    ])
                    .then(({ firstName, lastName, role, manager }) => {
                        pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id)' +
                                   'VALUES ($1, $2, $3, $4)', [firstName, lastName, role, manager], async (err) => {
                            if (err) {
                                await console.log(err.message);
                                return
                            } else {
                                await console.log('');
                                await console.log(`${firstName} ${lastName} successfully added!`);
                                return this.run();
                            }
                        });
                    })
            })
        })
    };

    updateRole() {
        pool.query(`SELECT CONCAT(first_name, ' ', last_name) AS name, ` +
                   'id AS value FROM employee', async function(err, {rows}) {
            const employees = rows
            await pool.query('SELECT title AS name, id AS value FROM role', async function(err, {rows}) {
                const roles = rows
                await inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'employee',
                            message: `What employee do you want to update?`,
                            choices: employees,
                          },
                        {
                            type: 'list',
                            name: 'role',
                            message: `What is their new role?`,
                            choices: roles
                        },
                    ])
                    .then(({ employee, role }) => {
                        pool.query('UPDATE employee ' +
                                   'SET role_id = $1 ' +
                                   'WHERE id = $2', [role, employee], async (err) => {
                            if (err) {
                                await console.log(err.message);
                                return
                            } else {
                                await console.log('');
                                await console.log(`Employee successfully updated`);
                                return this.run();
                            }
                         });
                    })
                })
            })
    };
        
    viewRoles() {
        pool.query('SELECT role.id, role.title, role.salary, department.name FROM role INNER JOIN department ON role.department_id = department.id ORDER BY role.title',
                    async function(err, {rows}) {
            await console.table(rows);
            return this.run();
        })
    };
        
    addRole() {
        pool.query('SELECT name, id AS value FROM department', async function(err, {rows}) {
            const departments = rows
            await inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'title',
                        message: `What is the title of the role?`,
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: `What is the salary for the role?`,
                    },
                    {
                        type: 'list',
                        name: 'department',
                        message: `What department is the role under?`,
                        choices: departments,
                    },
                ])
                .then(({ title, salary, department }) => {
                    pool.query('INSERT INTO role (title, salary, department_id)' +
                               'VALUES ($1, $2, $3)', [title, salary, department], async (err) => {
                        if (err) {
                            await console.log(err.message);
                            return
                        } else {
                            await console.log('');
                            await console.log(`${title} successfully added!`);
                            return this.run();
                        }
                    });
                })
        })
    };
        
    viewDepartments() {
        pool.query('SELECT * FROM department ORDER BY name', async function(err, {rows}) {
            await console.table(rows)
            return this.run();
        });
    };
        
    addDepartment() {
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
                    await console.log(`${department} successfully added!`);
                    return this.run();
                }
            }
        )}
    )};
}

module.exports = CLI