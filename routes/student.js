const express = require("express");
const router = express.Router();

const {
  registerStudent,
  loginStudent,
  updateStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  forgotPassword,
} = require("../controllers/studentController");

router.get("/", getAllStudents)
router.post("/login", loginStudent);
router.post("/register", registerStudent);
router
  .get("/:id", getStudentById)
  .put("/:id", updateStudent)
  .delete("/:id", deleteStudent);
router.put("/forgotpassword/:id", forgotPassword);

module.exports = router;
