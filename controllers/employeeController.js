const asyncHandler = require('express-async-handler');
const Employee = require('../models/Employee');
const bcrypt = require("bcryptjs");


const addNewEmployee = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const employeeExists = await Employee.findOne({ email });

        if (employeeExists) return res.status(400).json({ message: 'Employee already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const createEmployee = new Employee({
            name,
            email,
            password: hashedPassword,
            role
        });
        const employeeCreated = await createEmployee.save();
        res.status(201).json({ message: 'New Employee Added', employeeCreated });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const updateEmployee = asyncHandler(async (req, res) => {
    try {
        const { name, email, role } = req.body;
        const findEmployee = await Employee.findById(req.params.id);

        if (!findEmployee) return res.status(400).json({ message: 'Employee not found' });

        findEmployee.name = name;
        findEmployee.email = email;
        findEmployee.role = role;

        const updatedEmployee = await findEmployee.save();
        res.status(201).json({ message: 'Employee Updated', updatedEmployee });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const forgotPassword = asyncHandler(async (req, res) => {

    try {
        const { oldPassword, newPassword } = req.body;
        const findEmployee = await Employee.findById(req.params.id);
        if (!findEmployee) return res.status(400).json({ message: 'Employee not found' });

        const isMatch = await bcrypt.compare(oldPassword, findEmployee.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid Password' });

        if (oldPassword === newPassword) return res.status(400).json({ message: 'New Password cannot be the same as old password' });
        if (newPassword.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        findEmployee.password = hashedPassword;
        const updatedEmployee = await findEmployee.save();
        res.status(201).json({ message: 'Password Updated', updatedEmployee });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


const deleteEmployee = asyncHandler(async (req, res) => {
    const findEmployee = await Employee.findById(req.params.id);
    if (!findEmployee) return res.status(400).json({ message: 'Employee not found' });

    const employeeDeleted = await findEmployee.deleteOne();
    res.json(employeeDeleted);
});


const getAllEmployees = asyncHandler(async (req, res) => {
    const employees = await Employee.find({}).sort({ priority: 1 });
    res.json(employees);
});


const getEmployeeById = asyncHandler(async (req, res) => {
    const findEmployee = await Employee.findById(req.params.id);
    if (!findEmployee) return res.status(400).json({ message: 'Employee not found' });
    res.json(findEmployee);
});

module.exports = { addNewEmployee, updateEmployee, deleteEmployee, getAllEmployees, getEmployeeById, forgotPassword };
