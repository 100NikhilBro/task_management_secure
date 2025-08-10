const express = require("express");
const { authMiddleware } = require("../middlewares/auth");
const { isUser } = require("../middlewares/role");
const { createTask, getAllTasks, getTaskByStatus, deleteTask, updateTask } = require("../controllers/taskControllers");

const router = express.Router();

router.post("/createtask", authMiddleware, isUser, createTask);
router.get("/getTask", authMiddleware, isUser, getAllTasks);
router.get("/getTask/:status", authMiddleware, isUser, getTaskByStatus);
router.delete("/deletetask/:id", authMiddleware, isUser, deleteTask);
router.put("/updatetask/:id", authMiddleware, isUser, updateTask);

module.exports = router;