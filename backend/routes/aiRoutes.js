const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const { generateTasks } = require("../controllers/aiController");

router.post("/generate-tasks", authMiddleware, generateTasks);

module.exports = router;