const express = require("express");
const router = express.Router();

const {
    registerTeacher,
    getAllTeachers,
    deleteTeacher,
    updateTeacher,
} = require("../controllers/teacherController");

router.post("/register", registerTeacher);
router.get("/getAll", getAllTeachers);
router.delete("/delete/:id", deleteTeacher);
router.post("/update/:id", updateTeacher);

module.exports = router;