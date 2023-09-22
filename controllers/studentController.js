const asyncHandler = require("express-async-handler");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
// const bcrypt = require("bcryptjs");

const registerStudent = asyncHandler(async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      gender,
      grade,
      section,
      rollNo,
      dob,
      phone,
      address,
      email,
      password,
    } = req.body;
    const studentExists = await Student.findOne({ email });
    if (studentExists) {
      return res.status(201).json({ message: "Student already exists" });
    }

    Student.register(
      { email, firstName, lastName, rollNo, dob, phone, address, gender, grade, section },
      password,
      (err, student) => {
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
      }
    );
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
          {
            email: student.email,
            id: student._id,
            name: student.name,
            role: "student",
          },
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

const deleteStudent = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id);

    if (!student) return res.status(400).json({ message: "Student not found" });
    res.status(200).json({ message: "Student Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const updateStudent = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Loop through the body and update the student's properties
    for (let key in req.body) {
      if (key === 'fees' && Array.isArray(req.body.fees)) {
        // If updating fees, handle it separately
        student.fees.push(...req.body.fees);
      } else {
        student[key] = req.body[key];
      }
    }

    await student.save();

    res.status(200).json({ message: "Student Updated", student });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});


const getAllStudents = asyncHandler(async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).json({ students });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
};
