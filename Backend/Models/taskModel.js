const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    taskname: {
      type: String,
      required: true,
    },
    isDone: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const taskModel = mongoose.model("task", taskSchema);

module.exports = taskModel;
