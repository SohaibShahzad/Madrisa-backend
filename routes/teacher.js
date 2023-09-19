const express = require("express");
const router = express.Router();

const {
    registerTeacher,
    getAllTeachers,
} = require("../controllers/teacherController");

router.post("/register", registerTeacher);
router.get("/getAll", getAllTeachers);

module.exports = router;