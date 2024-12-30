import React, { useEffect, useState } from "react";
import {
  FaCheck,
  FaPencilAlt,
  FaPlus,
  FaSearch,
  FaTrash,
} from "react-icons/fa";
import axios from "axios";

const TaskManager = () => {
  const [input, setInput] = useState(""); // For the input field
  const [tasks, setTasks] = useState([]); // For the task list

  const handleAddTask = async () => {
    const obj = {
      taskname: input,
      isDone: false,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/tasks/create-task",
        obj,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        alert(res.data.message);
        setTasks([...tasks, res.data.data]); // Add new task to the list
        setInput(""); // Clear the input field
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTasks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/tasks/get-tasks",
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setTasks(res.data.data || []); // Set tasks from API response
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const handleDeleteTask = async (id) => {
    try {
      const res = await axios.delete(
        ` http://localhost:5000/api/v1/tasks/delete-task/${id}`
      );

      if (res.data.success) {
        setTasks(tasks.filter((task) => task._id !== id));
        // setTasks([...tasks, res.data.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center w-50 m-auto mt-5">
      <h4>Task Manager</h4>

      {/* Input and search box */}
      <div className="d-flex justify-content-between mb-3 w-100 align-items-center">
        <div className="input-group flex-grow-1 me-3">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Add Task"
            className="form-control me-1"
          />
          <button
            onClick={handleAddTask}
            className="btn btn-success text-white"
          >
            <FaPlus className="me-1" />
          </button>
        </div>

        <div className="input-group flex-grow-1">
          <span className="input-group-text">
            <FaSearch />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search Task"
          />
        </div>
      </div>

      {/* Task list */}
      {tasks.length > 0 ? (
        tasks.map((item, id) => (
          <div key={id} className="w-100 d-flex flex-column">
            <div className="m-2 p-2 border bg-light w-100 d-flex justify-content-between align-items-center rounded-2">
              <span
                className={item.isDone ? "text-decoration-line-through" : ""}
              >
                {item.taskname}
              </span>

              <div>
                <button
                  type="button"
                  className="btn btn-success btn-sm me-2"
                  onClick={() => console.log("Mark task as done")}
                >
                  <FaCheck />
                </button>
                <button
                  type="button"
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => console.log("Edit task")}
                >
                  <FaPencilAlt />
                </button>
                <button
                  onClick={() => handleDeleteTask(item._id)}
                  type="button"
                  className="btn btn-danger btn-sm me-2"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No tasks available.</p>
      )}
    </div>
  );
};

export default TaskManager;
