//create the queries that will query the database 
//add the queries into the questions when necessary
//make a js file in db that holds a class and in that class methods and these methods 
//will have db.query folloed by sql query string 
//once this class is created with all the methods export it so it can be used in the app js


//destructuring inquirer because I'm only using prompt and so i don't need all that other stuff with inquirer, might add validation later if I feel like it
const { prompt } = require("inquirer");
const { makeRole, makeDepartment, makeEmployee, viewEmployees, viewDepartment } = require("./db");
const db = require("./db/connection")

// const { writeFile } = require("./src/utils");

const departmentQuestions = [
    {
        type: 'input',
        name: 'departmentName',
        message: "What is the department's name?",
    },
]
const roleQuestions = [
    {
        type: 'input',
        name: 'title',
        message: "What is the job title you would like to add?",
    },
    {
        type: 'input',
        //this might also need to be dynamic
        name: 'departmentId',
        message: "What department does this role belong to?",
    },

    {
        type: 'number',
        name: 'salary',
        message: "What is the salary for this role",
    },
]
const employeeQuestions = [
    {
        type: 'input',
        name: 'firstName',
        message: "What is the employee's first name?",
    },
    {
        type: 'input',
        name: 'lastName',
        message: "What is the employee's last name?",
    },

    {
        type: 'list',
        name: 'role',
        message: "Please choose employee's role",
        //how do i import the choices in from the roles table in my database Im just going to call 
        //viewrole right here and see what happens
        choice: [viewRole()]
    },
]


function viewAndChoose() {
    console.log("Let's get started")
    prompt([

        {
            type: 'list',
            name: 'allThings',
            message: 'What would you like to do?',
            choice: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Delete a department","Delete a row", "Delete an Employee","Update an employee role", "Update a manager","Finish"]

        },
    ]).then((data) => {
        //do i even need this add here, i feel like data is sufficient because Im not doing anything with it
        switch (data.add) {
            case "View all departments":
                viewDepartment()
                break;
            case "View all roles":
                viewRole()
                break;
            case "View all employees":
                viewEmployees()

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
                employee()
                break;

            case "Delete a role":
                employee()
                break;

            case "Delete an employee":
                employee()
                break;

            case "Update an employee role":
                employee()
                break;

            case "Update a manager":
                employee()
                break;

            case "Finish":
               
                console.log("goodbye")
        }
    })

}
// query the database for the things i need 7 things 

function addDepartment() {
    prompt([...departmentQuestions,

    ]).then((departmentData) => {
        makeDepartment(departmentData)
        viewAndChoose()
    })
}
function addRole() {
    prompt([...roleQuestions,
  
    ]).then((roleData)=>{
        makeRole(roleData)
    viewAndChoose()
    })
}
function addEmployee() {
    prompt([...employeeQuestions,

    ]).then((employeeData) => {
        makeEmployee(employeeData)
        viewAndChoose()
    })
}

function delDeparment(){
    prompt
}

function init() {
    viewAndChoose()
}

init()