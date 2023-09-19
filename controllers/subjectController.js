const asyncHandler = require("express-async-handler");
const Subject = require("../models/Subject");

const createSubject = asyncHandler(async (req, res) => {
  try {
    const { name, code } = req.body;
    const subjectExists = await Subject.findOne({ name });
    if (subjectExists) {
      return res.status(400).json({ message: "Subject already exists" });
    }
    const subject = await Subject.create({ name, code });
    res.status(201).json({ message: "Subject Created", subject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getAllSubjects = asyncHandler(async (req, res) => {
  try {
    const subjects = await Subject.find({});
    res.status(200).json({ subjects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getSubjectById = asyncHandler(async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    res.status(200).json({ subject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const updateSubject = asyncHandler(async (req, res) => {
  try {
    const { name, code } = req.body;
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    subject.name = name || subject.name;
    subject.code = code || subject.code;
    await subject.save();
    res.status(200).json({ message: "Subject Updated", subject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const deleteSubject = asyncHandler(async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    await subject.remove();
    res.status(200).json({ message: "Subject Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
};
