const asyncHandler = require("express-async-handler");
const Salaries = require("../models/Salaries");

const addNewSalary = asyncHandler(async (req, res) => {
  try {
    const { amount, month, teacherID } = req.body;
    const createSalary = new Salaries({
      amount,
      month,
      teacherID,
    });
    const salaryCreated = await createSalary.save();
    res.status(201).json({ message: "New Salary Added", salaryCreated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const updateSalary = asyncHandler(async (req, res) => {
  try {
    const { amount, month, teacherID } = req.body;
    const findSalary = await Salaries.findById(req.params.id);

    if (!findSalary)
      return res.status(400).json({ message: "Salary not found" });

    findSalary.amount = amount;
    findSalary.month = month;
    findSalary.teacherID = teacherID;

    const updatedSalary = await findSalary.save();
    res.status(201).json({ message: "Salary Updated", updatedSalary });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const deleteSalary = asyncHandler(async (req, res) => {
  try {
    const findSalary = await Salaries.findById(req.params.id);

    if (!findSalary)
      return res.status(400).json({ message: "Salary not found" });

    await findSalary.deleteOne();
    res.status(201).json({ message: "Salary Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getAllSalaries = asyncHandler(async (req, res) => {
  try {
    const salaries = await Salaries.find().populate(
      "teacherID",
      "firstName lastName"
    );
    res.status(200).json({ salaries });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const getSalaryById = asyncHandler(async (req, res) => {
  try {
    const findSalary = await Salaries.findById(req.params.id);

    if (!findSalary)
      return res.status(400).json({ message: "Salary not found" });

    res.status(201).json({ findSalary });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  addNewSalary,
  updateSalary,
  deleteSalary,
  getAllSalaries,
  getSalaryById,
};
