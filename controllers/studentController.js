const asyncHandler = require("express-async-handler");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const bcrypt = require("bcryptjs");

const registerStudent = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const studentExists = await Student.findOne({ email });
    if (studentExists) {
      return res.status(201).json({ message: "Student already exists" });
    }

    Student.register({ email, name }, password, (err, student) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
      }
      passport.authenticate(
        "student",
        { session: false },
        (err, student, info) => {
          if (err) {
            return res.status(500).json({ message: err.message });
          }
          res.status(200).json({ message: "Student Registered", student });
        }
      )(req, res);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const loginStudent = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    Student.authenticate()(email, password, (err, student, info) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
      }
      if (!student) {
        console.log(student, info);
        return res.status(201).json({ message: "Invalid Credentials" });
      }
      req.login(student, { session: false }, (err) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
        const token = jwt.sign(
          { email: student.email, id: student._id, name: student.name, role: "student" },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        return res.status(200).json({ message: "Login Successful", token });
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const updateStudent = asyncHandler(async (req, res) => {
  try {
    const { name, email } = req.body;
    const findStudent = await Student.findById(req.params.id);

    if (!findStudent)
      return res.status(400).json({ message: "Student not found" });

    findStudent.name = name;
    findStudent.email = email;

    const updatedStudent = await findStudent.save();
    res.status(201).json({ message: "Student Updated", updatedStudent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const forgotPassword = asyncHandler(async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const findStudent = await Student.findById(req.params.id);
    if (!findStudent)
      return res.status(400).json({ message: "Student not found" });

    const isMatch = await bcrypt.compare(oldPassword, findStudent.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Password" });

    if (oldPassword === newPassword)
      return res
        .status(400)
        .json({ message: "New Password cannot be the same as old password" });
    if (newPassword.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    findStudent.password = hashedPassword;
    const updatedStudent = await findStudent.save();
    res.status(201).json({ message: "Password Updated", updatedStudent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const deleteStudent = asyncHandler(async (req, res) => {
  const findStudent = await Student.findById(req.params.id);
  if (!findStudent)
    return res.status(400).json({ message: "Student not found" });

  const studentDeleted = await findStudent.deleteOne();
  res.json(studentDeleted);
});

const getAllStudents = asyncHandler(async (req, res) => {
  const students = await Student.find({}).sort({ priority: 1 });
  res.json(students);
});

const getStudentById = asyncHandler(async (req, res) => {
  const findStudent = await Student.findById(req.params.id);
  if (!findStudent)
    return res.status(400).json({ message: "Student not found" });
  res.json(findStudent);
});

module.exports = {
  registerStudent,
  loginStudent,
  updateStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  forgotPassword,
};
