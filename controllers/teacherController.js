const asyncHandler = require("express-async-handler");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Teacher = require("../models/Teacher");

const registerTeacher = asyncHandler(async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, address, education } =
      req.body;
    const teacherExists = await Teacher.findOne({ email });
    if (teacherExists) {
      return res.status(201).json({ message: "Teacher already exists" });
    }

    Teacher.register(
      { email, firstName, lastName, phone, dob, address, education },
      password,
      (err, teacher) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: err.message });
        }
        passport.authenticate(
          "teacher",
          { session: false },
          (err, teacher, info) => {
            if (err) {
              return res.status(500).json({ message: err.message });
            }
            res.status(200).json({ message: "Teacher Registered", teacher });
          }
        )(req, res);
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getAllTeachers = asyncHandler(async (req, res) => {
  try {
    const teachers = await Teacher.find({});
    res.status(200).json({ teachers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = { registerTeacher, getAllTeachers };
