const connection = require("./connection")
class Db {
    constructor(connection) {
        this.connection = connection
    }
  
    viewDepartment() {
        return this.connection.promise().query('SELECT * FROM departments')
    }
    viewRoles() {
        return this.connection.promise().query(`SELECT * FROM roles`)
    }
    viewEmployees() {
        return this.connection.promise().query(`SELECT * FROM employees`)
    }
    makeDepartment(departmentName) {
        return this.connection.promise().query(`INSERT INTO departments SET ?`, departmentName)
    }
    makeRole(roleData) {
        return this.connection.promise().query(`INSERT INTO roles SET ?`, roleData)
    }
    makeEmployee(employeeData) {

        return this.connection.promise().query(`INSERT INTO employees SET ?`, employeeData)
    }
    deleteDepartment(id) {
        return this.connection.promise().query(`DELETE FROM departments WHERE id = ?`, id)
    }
    deleteRole(id) {
        return this.connection.promise().query(`DELETE FROM roles WHERE id = ?`, id)
    }
    deleteEmployee(id) {
        return this.connection.promise().query(`DELETE FROM employees WHERE id = ?`, id)
    }
    getDepartmentByRole(role) {
        return this.connection.promise().query(`SELECT department_id FROM roles WHERE id = ?`, role)
    }

    getManagerByDepartmentId(department_id) {
        return this.connection.promise().query(`SELECT roles.department_id, employees.role_id, employees.id, employees.manager_id FROM roles LEFT JOIN employees ON employees.role_id = roles.id WHERE employees.manager_id IS NULL AND roles.department_id = ?`, department_id)
    }
    joinDepartmentsToRoles() {
        return this.connection.promise().query(`SELECT * FROM departments LEFT JOIN roles ON departments.id = roles.department_id`)
    }
    //did square brackets here so it knows which order to put things in
    updateEmployeeRole(roleId, employeeId) {
        return this.connection.promise().query(`UPDATE employees SET role_id = ? WHERE id = ?`, [roleId, employeeId])
    }
    updateEmployeeManager(managerId, employeeId) {
        return this.connection.promise().query(`UPDATE employees SET manager_id = ? WHERE id = ?`, [managerId, employeeId])
    }
    getAllManagers() {
        return this.connection.promise().query(`SELECT * FROM employees WHERE employees.manager_id IS NULL`)
    }

}
module.exports = Db
