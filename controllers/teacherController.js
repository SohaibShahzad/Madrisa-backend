const asyncHandler = require("express-async-handler");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Teacher = require("../models/Teacher");
const Subject = require("../models/Subject");

const registerTeacher = asyncHandler(async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      dob,
      address,
      education,
      subjects,
    } = req.body;
    const teacherExists = await Teacher.findOne({ email });
    if (teacherExists) {
      return res.status(201).json({ message: "Teacher already exists" });
    }

    const subjectsReferences = [];
    for (const subjectId of subjects) {
      const subjectDoc = await Subject.findById(subjectId);
      if (subjectDoc) {
        subjectsReferences.push({ id: subjectId, name: subjectDoc.name });
      }
    }

    Teacher.register(
      {
        email,
        firstName,
        lastName,
        phone,
        dob,
        address,
        education,
        subjects: subjectsReferences,
      },
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
const updateTeacher = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    for (let key in req.body) {
      if (key === "salary" && Array.isArray(req.body.salary)) {
        teacher.salary.push(...req.body.salary);
      } else if (key === "subjects" && Array.isArray(req.body.subjects)) {
        // Build the subjectsReferences array
        const subjects = req.body.subjects;
        const subjectsReferences = [];
        for (const subjectId of subjects) {
          const subjectDoc = await Subject.findById(subjectId);
          if (subjectDoc) {
            subjectsReferences.push({ id: subjectId, name: subjectDoc.name });
          }
        }
        teacher.subjects = subjectsReferences;
      } else if (
        key === "education" &&
        typeof req.body.education === "object"
      ) {
        teacher.education = req.body.education;
      } else {
        teacher[key] = req.body[key];
      }
    }

    await teacher.save();
    res.status(200).json({ message: "Teacher Updated", teacher });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const deleteTeacher = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await Teacher.findByIdAndDelete(id);

    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  registerTeacher,
  getAllTeachers,
  deleteTeacher,
  updateTeacher,
};
