import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const TaskForm = ({ addTask }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.title || !newTask.description) return;

    const taskWithId = { ...newTask, id: uuidv4() };
    addTask(taskWithId);

    setNewTask({ title: "", description: "", dueDate: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        name="title"
        value={newTask.title}
        onChange={handleChange}
        placeholder="Task Title"
        required
      />
      <textarea
        name="description"
        value={newTask.description}
        onChange={handleChange}
        placeholder="Task Description"
        required
      />
      <input
        type="date"
        name="dueDate"
        value={newTask.dueDate}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
