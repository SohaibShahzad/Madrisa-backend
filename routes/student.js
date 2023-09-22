const express = require("express");
const router = express.Router();

const {
  registerStudent,
  loginStudent,
  updateStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
} = require("../controllers/studentController");

router.get("/getAll", getAllStudents)
router.post("/login", loginStudent);
router.post("/register", registerStudent);
router.delete("/delete/:id", deleteStudent);
router.post("/update/:id", updateStudent);

module.exports = router;
