const express = require("express");
const router = express.Router();

const {
    registerAdmin,
    loginAdmin,
} = require("../controllers/adminController");

router.post("/login", loginAdmin);
router.post("/register", registerAdmin);

module.exports = router;