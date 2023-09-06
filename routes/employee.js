const express = require('express');
const router = express.Router();

const { addNewEmployee, updateEmployee, deleteEmployee, getAllEmployees, getEmployeeById, forgotPassword } = require('../controllers/employeeController');

router.route('/').post(addNewEmployee).get(getAllEmployees);
router.route('/:id').put(updateEmployee).delete(deleteEmployee).get(getEmployeeById);
router.route('/forgotPassword/:id').put(forgotPassword);

module.exports = router;
