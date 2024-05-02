const inquirer = require('inquirer');

class CLI {
    constructor() {}
    run() {
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
    }
}