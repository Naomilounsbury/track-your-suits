const connection = require("./connection")
// so I put in the app.js here because these methods arent being used in this file theyre being used in app so I shoulkd just export
const app = require("../app")
class Db{
    constructor(connection){
        this.connection = connection
    }
    viewDepartment(){
        //whenever adding a wildcard into a query string like a question 
        return this.connection.promise().query('SELECT * FROM departments');
    }
    viewRoles(){
        return this.connection.promise().query(`SELECT * FROM roles`)
    }
    viewEmployees(){
        return this.connection.promise().query(`SELECT * FROM employees`)
    }
    makeDepartment(departmentName){
        return this.connection.promise().query(`INSERT INTO department (name) VALUES (?)`, departmentName)
    }
    makeRole(title, departmentId, salary){
        return this.connection.promise().query(`INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`, (title, departmentId, salary))
    }
    makeEmployee(firstName, lastName, role){
        return this.connection.promise().query(`INSERT INTO employees (firstName, lastName, role_id) VALUES (?,?,?)`, (firstName, lastName, role))
    }

    //when you use this method in app.js I will call the method and then call in the id of the method that Im going to delete and 
    // this uses that id to execute the code
    deleteDepartment(departmentId){
        return this.connection.promise().query(`DELETE FROM department WHERE id = ?`, departmentId)
    }
    deleteRole(id){
        return this.connection.promise().query(`DELETE FROM roles WHERE id = ?`, id)
    }
    deleteEmployee(){
        return this.connection.promise().query(`DELETE FROM employees WHERE id = ?`)

    }
}
module.exports = {viewDepartment, viewRoles, viewEmployees, makeDepartment, makeRole, makeEmployee, deleteDepartment, deleteRole, deleteEmployee}