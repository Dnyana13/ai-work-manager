const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getTasksByProject,   
  createTask,
  deleteTask,
  updateTaskStatus,
  updateTask
} = require("../controllers/taskController");

router.post("/", authMiddleware, createTask);

router.get("/project/:projectId", authMiddleware, getTasksByProject);

router.put("/:id", authMiddleware, updateTask);

router.put("/:id/status", authMiddleware, updateTaskStatus); //added this to update task 

router.put("/:taskId", updateTask);

router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;