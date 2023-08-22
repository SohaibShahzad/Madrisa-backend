const express = require('express');
const router = express.Router();

const { addNewStudent, updateStudent, deleteStudent, getAllStudents, getStudentById, forgotPassword } = require('../controllers/teacherController');

router.get('/', getAllStudents).post('/', addNewStudent);
router.get('/:id', getStudentById).put('/:id', updateStudent).delete('/:id', deleteStudent);
router.put('/forgotpassword/:id', forgotPassword);


module.exports = router;
