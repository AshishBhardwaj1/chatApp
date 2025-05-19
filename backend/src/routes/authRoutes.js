
const User = require("../models/User");

const protect = require("../middlewares/authMiddleware");

const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

module.exports = router;


router.get("/users", protect, async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user } }).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});