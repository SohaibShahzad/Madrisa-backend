const asyncHandler = require('express-async-handler');
const Teacher = require('../models/Teacher');
const bcrypt = require("bcryptjs");


const addNewTeacher = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const teacherExists = await Teacher.findOne({ email });

        if (teacherExists) return res.status(400).json({ message: 'Teacher already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const createTeacher = new Teacher({
            name,
            email,
            password: hashedPassword,
        });
        const teacherCreated = await createTeacher.save();
        res.status(201).json({ message: 'New Teacher Added', teacherCreated });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const updateTeaher = asyncHandler(async (req, res) => {
    try {
        const { name, email } = req.body;
        const findTeacher = await Teacher.findById(req.params.id);

        if (!findTeacher) return res.status(400).json({ message: 'Teacher not found' });

        findTeacher.name = name;
        findTeacher.email = email;

        const updatedTeacher = await findTeacher.save();
        res.status(201).json({ message: 'Teacher Updated', updatedTeacher });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const updateTeacherPassword = asyncHandler(async (req, res) => {

    try {
        const { oldPassword, newPassword } = req.body;
        const findTeacher = await Teacher.findById(req.params.id);
        if (!findTeacher) return res.status(400).json({ message: 'Teacher not found' });

        const isMatch = await bcrypt.compare(oldPassword, findTeacher.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid Password' });

        if (oldPassword === newPassword) return res.status(400).json({ message: 'New Password cannot be the same as old password' });
        if (newPassword.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        findTeacher.password = hashedPassword;
        const updatedTeacher = await findTeacher.save();
        res.status(201).json({ message: 'Password Updated', updatedTeacher });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


const deleteTeacher = asyncHandler(async (req, res) => {
    const findTeacher = await Teacher.findById(req.params.id);
    if (!findTeacher) return res.status(400).json({ message: 'Teacher not found' });

    const teacherDeleted = await findTeacher.deleteOne();
    res.json(teacherDeleted);
});


const getAllTeachers = asyncHandler(async (req, res) => {
    const teachers = await Teacher.find({}).sort({ priority: 1 });
    res.json(teachers);
});


const getTeacherById = asyncHandler(async (req, res) => {
    const findTeacher = await Teacher.findById(req.params.id);
    if (!findTeacher) return res.status(400).json({ message: 'Teacher not found' });
    res.json(findTeacher);
});

module.exports = { addNewTeacher, updateTeaher, deleteTeacher, getAllTeachers, getTeacherById };
