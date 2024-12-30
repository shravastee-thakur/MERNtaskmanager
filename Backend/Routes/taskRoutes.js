const express = require("express");
const { createTask, getAllTasks, updateTask, deleteTask } = require("../Controller/taskControllers");

const route = express.Router();

// get all tasks
route.get("/get-tasks", getAllTasks);

// create a task
route.post("/create-task", createTask);

// update a task
route.put("/update-task/:id", updateTask);

// delete a task
route.delete("/delete-task/:id", deleteTask);

module.exports = route;
