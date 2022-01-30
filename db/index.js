const connection = require("./connection")
// so I put in the app.js here because these methods arent being used in this file theyre being used in app so I shoulkd just export
class Db{
    constructor(connection){
        this.connection = connection
    }
    //deleted
    viewDepartment(){
        //whenever adding a wildcard into a query string like a question 
        //with a promise either resolve or reject it if resolved its happy and if rejected itll at least go back
        return this.connection.promise().query('SELECT * FROM departments')
        // new Promise((resolve, reject) => {
            
        //})
    }
    viewRoles(){
        return this.connection.promise().query(`SELECT * FROM roles`)
    }
    viewEmployees(){
        return this.connection.promise().query(`SELECT * FROM employees`)
    }
    makeDepartment(departmentName){
        return this.connection.promise().query(`INSERT INTO departments SET ?`, departmentName)
    }
    makeRole(roleData){
        return this.connection.promise().query(`INSERT INTO roles SET ?`, roleData)
    }
    makeEmployee(employeeData){

        return this.connection.promise().query(`INSERT INTO employees SET ?`, employeeData)
    }

    //when you use this method in app.js I will call the method and then call in the id of the method that Im going to delete and 
    // this uses that id to execute the code
    deleteDepartment(id){
        return this.connection.promise().query(`DELETE FROM departments WHERE id = ?`, id)
    }
    deleteRole(id){
        return this.connection.promise().query(`DELETE FROM roles WHERE id = ?`, id)
    }
    deleteEmployee(id){
        return this.connection.promise().query(`DELETE FROM employees WHERE id = ?`, id)
    }
    getDepartmentByRole(role){
        return this.connection.promise().query(`SELECT department_id FROM roles WHERE id = ?`, role)
    }
    // getManagerByDepartmentId(department_id){
    //     return this.connection.promise().query(`SELECT id FROM employees WHERE department_id = ? AND manager_id = NULL `, department_id)
    // }
    getManagerByDepartmentId(department_id){
        return this.connection.promise().query(`SELECT roles.department_id, employees.role_id, employees.id, employees.manager_id FROM roles LEFT JOIN employees ON employees.role_id = roles.id WHERE employees.manager_id IS NULL AND roles.department_id = ?`, department_id)
    }
    joinDepartmentsToRoles(){
        return this.connection.promise().query(`SELECT * FROM departments LEFT JOIN roles ON departments.id = roles.department_id`)
    }
//did square brackets here so it knows which order to put things in
    updateEmployeeRole(roleId, employeeId){
        return this.connection.promise().query(`UPDATE employees SET role_id = ? WHERE id = ?`, [roleId, employeeId])
    }
    updateEmployeeManager(managerId, employeeId){
        return this.connection.promise().query(`UPDATE employees SET manager_id = ? WHERE id = ?`, [managerId, employeeId])
    }
    getAllManagers(){
        return this.connection.promise().query(`SELECT * FROM employees WHERE employees.manager_id IS NULL`)
    }

}
module.exports = Db
