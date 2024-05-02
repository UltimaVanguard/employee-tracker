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
            .then(({ todo }) => {
                switch (todo) {
                    case 'View All Employees':
                        return this.viewEmployees();
                        break;
                    case 'Add Employee':
                        return this.addEmployee();
                        break;
                    case 'Update Employee Role':
                        return this.updateRole();
                        break;
                    case 'View All Roles':
                        return this.viewRoles();
                        break;
                    case 'Add Role':
                        return this.addRole();
                        break;
                    case 'View All Departments':
                        return this.viewDepartments();
                        break;
                    case 'Add Department':
                        return this.addDepartment();
                        break;
                    default:
                        return;
                        break;
                };
            });
    };

    viewEmployees() {

    };

    addEmployee() {

    };

    updateRole() {

    };

    viewRoles() {

    };

    addRole() {

    };

    viewDepartments() {

    };

    addDepartment() {

    };
}