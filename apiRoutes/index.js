const router = require("express").Router()
const employeeRoutes = require("./employeeRoutes")
const roleRoutes = require("./roleRoutes")
const departmentRoutes = require("./departmentRoutes")

router.use(employeeRoutes)
router.use(departmentRoutes)
router.use(roleRoutes)

module.exports = router