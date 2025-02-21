import React, { useState } from "react";

const TaskCard = ({
  task,
  deleteTask,
  editTask,
  column,
  innerRef,
  ...props
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editTask(task.id, column, updatedTask);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask({ ...updatedTask, [name]: value });
  };

  return (
    <div ref={innerRef} {...props} className="task-card">
      {isEditing ? (
        <div>
          <input
            type="text"
            name="title"
            value={updatedTask.title}
            onChange={handleChange}
          />
          <textarea
            name="description"
            value={updatedTask.description}
            onChange={handleChange}
          />
          <input
            type="date"
            name="dueDate"
            value={updatedTask.dueDate}
            onChange={handleChange}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <p>Due: {task.dueDate}</p>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={() => deleteTask(task.id, column)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
