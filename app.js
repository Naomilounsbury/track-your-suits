//create the queries that will query the database 
//add the queries into the questions when necessary
//make a js file in db that holds a class and in that class methods and these methods 
//will have db.query followed by sql query string 
//once this class is created with all the methods export it so it can be used in the app js


//destructuring inquirer because I'm only using prompt and so i don't need all that other stuff with inquirer, might add validation later if I feel like it
const { prompt } = require("inquirer");
require("console.table")
//pulling in my class
const Db = require("./db")
//pulling the connection to the connection to the database
const connection = require("./db/connection")
//instanciated the Db class
const mysql = new Db(connection)

//originally made arrays to hold the questions but eventually just put them into the promts because it was only one question at a time
const departmentQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "What is the department's name?",
    },
]
//my giant function that switches between things i want to do
function viewAndChoose() {

    prompt([

        {
            type: 'list',
            name: 'allThings',
            message: 'What would you like to do?',
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Delete a department", "Delete a role", "Delete an employee", "Update an employee role", "Update a manager", "Finish"]

        },
    ]).then((data) => {
        switch (data.allThings) {
            case "View all departments":
                viewDepartment()
                break;
            case "View all roles":
                viewRoles()
                break;
            case "View all employees":
                viewEmployees()
                break;

            case "Add a department":
                addDepartment()
                break;

            case "Add a role":
                addRole()
                break;

            case "Add an employee":
                addEmployee()
                break;

            case "Delete a department":
                delDepartment()
                break;

            case "Delete a role":
                delRole()
                break;

            case "Delete an employee":
                delEmployee()
                break;

            case "Update an employee role":
                updateRoleId()
                break;

            case "Update a manager":
                updateManagerId()
                break;

            case "Finish":
                console.log("goodbye")
                process.exit()

        }
    })

}
// query the database for the things i need 7 things 
function viewDepartment() {
    mysql.viewDepartment().then(data => {
        console.table(data[0])
        viewAndChoose()
    });
}
function viewRoles() {
    mysql.viewRoles().then(data => {
        console.table(data[0])
        viewAndChoose()
    })
}
function viewEmployees() {
    mysql.viewEmployees().then(data => {
        console.table(data[0])
        viewAndChoose()
    })
}
function addDepartment() {
    prompt([...departmentQuestions,

    ]).then((departmentData) => {
        console.log(departmentData)
        mysql.makeDepartment(departmentData)
        viewAndChoose()
    })
}
function addRole() {
    mysql.viewDepartment().then(data => {
        // console.log(data[0].map(department=> department.name)) 
        const departmentChoices = data[0].map(department => {
            return { name: department.name, value: department.id }
        });
        prompt([
            {
                type: 'input',
                name: 'title',
                message: "What is the job title you would like to add?",
            },
            {
                type: 'list',
                //this might also need to be dynamic
                name: 'department_id',
                message: "What department does this role belong to?",
                choices: departmentChoices,
            },

            {
                type: 'number',
                name: 'salary',
                message: "What is the salary for this role",
            },

        ]).then((roleData) => {
            mysql.makeRole(roleData)
            viewAndChoose()
        })
    })

}
function addEmployee() {


    mysql.viewRoles().then(data => {
        // const departmentChoice = data[0].map(department => {
        //     return { name: role.title, value: department_id}
        // });

        const roleChoices = data[0].map(role => {
            return { name: role.title, value: `${role.id}-${role.department_id}` }

        });

        prompt([
            {
                type: 'input',
                name: 'first_name',
                message: "What is the employee's first name?",
            },
            {
                type: 'input',
                name: 'last_name',
                message: "What is the employee's last name?",
            },
            {
                type: 'list',
                name: 'role_id',
                message: "Please choose employee's role",
                //how do i import the choices in from the roles table in my database Im just going to call 
                //viewrole right here and see what happens, I don't need curly braces because map brings back an array
                choices: roleChoices
            },
            {
                type: 'confirm',
                name: 'manager',
                message: "Is this person a manager?",
            },
        ]).then((nameAndRole) => {

            const [roleId, departmentId] = nameAndRole.role_id.split("-")
            mysql.getManagerByDepartmentId(departmentId).then(data => {
                const managerChoices = data[0][0]
                const combinedData = { ...nameAndRole, role_id: roleId, manager_id: nameAndRole.manager ? null : managerChoices.id }
                //apparently this is very bad
                delete combinedData.manager
                //ternary, the question mark checks if the nameandroll.manager is truthy and if it is it returns null, if it isn't then it returns the first id in the array of managers for that department
                mysql.makeEmployee(combinedData)

                viewAndChoose()


            }) //     })
        })
    })

}
function delDepartment() {
    mysql.viewDepartment().then(data => {
        const departmentChoices = data[0].map(department => {
            return { name: department.name, value: department.id }
        })
        prompt([
            {
                type: 'list',
                name: 'id',
                message: "Please choose the department to be deleted",
                choices: departmentChoices
            },
        ]).then((departmentData) => {
            mysql.deleteDepartment(departmentData.id)
            viewAndChoose()
        })
    });
}
function delRole() {
    mysql.viewRoles().then(data => {
        const roleChoices = data[0].map(role => {
            return { name: role.title, value: role.id }
        })
        prompt([
            {
                type: 'list',
                name: 'id',
                message: "Please choose the role to be deleted",
                choices: roleChoices
            },
        ]).then((roleData) => {
            mysql.deleteRole(roleData.id)
            viewAndChoose()
        })
    });
}
function delEmployee() {
    mysql.viewEmployees().then(data => {
        const employeeChoices = data[0].map(employee => {
            return { name: `${employee.first_name} ${employee.last_name}`, value: employee.id }
        })
        prompt([
            {
                type: 'list',
                name: 'id',
                message: "Please choose the employee to be deleted",
                choices: employeeChoices
            },
        ]).then((employeeData) => {
            mysql.deleteEmployee(employeeData.id)
            viewAndChoose()
        })
    });
}
function updateRoleId() {
    mysql.viewEmployees().then(data => {
        const employeeChoices = data[0].map(employee => {
            return { name: `${employee.first_name} ${employee.last_name}`, value: employee.id }
        })
        prompt([
            {
                type: 'list',
                name: 'id',
                message: "Please choose the employee to be updated",
                choices: employeeChoices
            },
        ]).then((employeeData) => {
            mysql.viewRoles().then(data => {
                const roleChoices = data[0].map(role => {
                    return { name: role.title, value: role.id }
                })
                prompt([
                    {
                        type: 'list',
                        name: 'id',
                        message: "What is this employees new role?",
                        choices: roleChoices
                    },
                ]).then(roleData => {
                    mysql.updateEmployeeRole(roleData.id, employeeData.id)
                    viewAndChoose()
                })
            })
        })
    });
}
function updateManagerId() {
    mysql.viewEmployees().then(data => {
        const employeeChoices = data[0].map(employee => {
            return { name: `${employee.first_name} ${employee.last_name}`, value: employee.id }
        })
        prompt([
            {
                type: 'list',
                name: 'id',
                message: "Please choose the employee whose manager you would like to update",
                choices: employeeChoices
            },
        ]).then((employeeData) => {
            mysql.getAllManagers().then(data => {
                const managerChoices = data[0].map(manager => {
                    return { name: `${manager.first_name} ${manager.last_name}` , value: manager.id }
                })
                prompt([
                    {
                        type: 'list',
                        name: 'id',
                        message: "Who is this employee's new manager?",
                        choices: managerChoices
                    },
                ]).then(managerData => {
                    mysql.updateEmployeeManager(managerData.id, employeeData.id)
                    viewAndChoose()
                })
            })
        })
    });
}
console.log("Let's get started!")
viewAndChoose()