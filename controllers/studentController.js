const asyncHandler = require('express-async-handler');
const Student = require('../models/Student');
const bcrypt = require("bcryptjs");


const addNewStudent = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const studentExists = await Student.findOne({ email });

        if (studentExists) return res.status(400).json({ message: 'Student already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const createStudent = new Student({
            name,
            email,
            password: hashedPassword,
        });
        const studentCreated = await createStudent.save();
        res.status(201).json({ message: 'New Student Added', studentCreated });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const updateStudent = asyncHandler(async (req, res) => {
    try {
        const { name, email } = req.body;
        const findStudent = await Student.findById(req.params.id);

        if (!findStudent) return res.status(400).json({ message: 'Student not found' });

        findStudent.name = name;
        findStudent.email = email;

        const updatedStudent = await findStudent.save();
        res.status(201).json({ message: 'Student Updated', updatedStudent });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const forgotPassword = asyncHandler(async (req, res) => {

    try {
        const { oldPassword, newPassword } = req.body;
        const findStudent = await Student.findById(req.params.id);
        if (!findStudent) return res.status(400).json({ message: 'Student not found' });

        const isMatch = await bcrypt.compare(oldPassword, findStudent.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid Password' });

        if (oldPassword === newPassword) return res.status(400).json({ message: 'New Password cannot be the same as old password' });
        if (newPassword.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        findStudent.password = hashedPassword;
        const updatedStudent = await findStudent.save();
        res.status(201).json({ message: 'Password Updated', updatedStudent });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


const deleteStudent = asyncHandler(async (req, res) => {
    const findStudent = await Student.findById(req.params.id);
    if (!findStudent) return res.status(400).json({ message: 'Student not found' });

    const studentDeleted = await findStudent.deleteOne();
    res.json(studentDeleted);
});


const getAllStudents = asyncHandler(async (req, res) => {
    const students = await Student.find({}).sort({ priority: 1 });
    res.json(students);
});


const getStudentById = asyncHandler(async (req, res) => {
    const findStudent = await Student.findById(req.params.id);
    if (!findStudent) return res.status(400).json({ message: 'Student not found' });
    res.json(findStudent);
});

module.exports = { addNewStudent, updateStudent, deleteStudent, getAllStudents, getStudentById, forgotPassword };
