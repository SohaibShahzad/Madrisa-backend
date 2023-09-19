const asyncHandler = require("express-async-handler");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

const registerAdmin = asyncHandler(async (req, res) => {
  try {
    const { name, username, password } = req.body;
    const adminExists = await Admin.findOne({ username });
    if (adminExists) {
      return res.status(201).json({ message: "Admin already exists" });
    }

    Admin.register({ username, name }, password, (err, admin) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
      }
      passport.authenticate("admin", { session: false }, (err, admin, info) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
        res.status(200).json({ message: "Admin Registered", admin });
      })(req, res);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const loginAdmin = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;
    Admin.authenticate()(username, password, (err, admin, info) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
      }
      if (!admin) {
        console.log(admin, info);
        return res.status(201).json({ message: "Invalid Credentials" });
      }
      req.login(admin, { session: false }, (err) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
        const token = jwt.sign(
          { username: admin.username, id: admin._id, name: admin.name, role: "admin" },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        return res.status(200).json({ message: "Login Successful", token });
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = { registerAdmin, loginAdmin };
