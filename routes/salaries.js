const express = require('express');
const router = express.Router();

const { addNewSalary, updateSalary, deleteSalary, getAllSalaries, getSalaryById, } = require('../controllers/salariesController');

router.route('/').post(addNewSalary).get(getAllSalaries);
router.route('/:id').put(updateSalary).delete(deleteSalary).get(getSalaryById);


module.exports = router;
