const express = require("express");
const router = express.Router();

const {
  addNewSalary,
  updateSalary,
  deleteSalary,
  getAllSalaries,
  getSalaryById,
} = require("../controllers/salariesController");

router.get("/getAll", getAllSalaries);
router.post("/add", addNewSalary);
router.delete("/delete/:id", deleteSalary);


module.exports = router;
