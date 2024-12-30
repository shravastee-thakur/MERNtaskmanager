const taskModel = require("../Models/taskModel");

// get all tasks
const getAllTasks = async (_, res) => {
  try {
    const tasks = await taskModel.find({});
    return res.status(200).json({
      success: true,
      data: tasks,
      message: "Tasks fetched successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// create a task
const createTask = async (req, res) => {
  const data = req.body;
  try {
    const newTask = new taskModel(data);
    await newTask.save();
    return res.status(201).json({
      success: true,
      data: newTask,
      message: "Task created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// update a task
const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const data = req.body;

    const updatedTask = await taskModel.findByIdAndUpdate(
      { _id: taskId },
      { ...data },
      { new: true }
    );
    updatedTask.save();
    return res.status(200).json({
      success: true,
      data: updatedTask,
      message: "Task updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const data = req.body;

    const deletedTask = await taskModel.findByIdAndDelete(
      { _id: taskId },
      { ...data },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      data: deletedTask,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createTask, getAllTasks, updateTask, deleteTask };
