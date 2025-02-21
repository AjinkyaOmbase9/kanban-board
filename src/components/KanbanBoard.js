import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || {
      "to-do": [],
      "in-progress": [],
      done: [],
    }
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      updatedTasks["to-do"].push(task);
      return updatedTasks;
    });
  };

  const deleteTask = (taskId, column) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[column] = updatedTasks[column].filter(
        (task) => task.id !== taskId
      );
      return updatedTasks;
    });
  };

  const editTask = (taskId, column, updatedTask) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      const taskIndex = updatedTasks[column].findIndex(
        (task) => task.id === taskId
      );
      updatedTasks[column][taskIndex] = updatedTask;
      return updatedTasks;
    });
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    const sourceColumn = source.droppableId;
    const destColumn = destination.droppableId;

    const task = tasks[sourceColumn][source.index];
    if (sourceColumn === destColumn && source.index === destination.index)
      return;

    // Remove task from the source column
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[sourceColumn].splice(source.index, 1);

      // Add task to the destination column
      updatedTasks[destColumn].splice(destination.index, 0, task);
      return updatedTasks;
    });
  };

  return (
    <div className="kanban-board">
      <TaskForm addTask={addTask} />
      <DragDropContext onDragEnd={onDragEnd}>
        {["to-do", "in-progress", "done"].map((column) => (
          <Droppable key={column} droppableId={column}>
            {(provided) => (
              <div
                className="column"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h2>{column.replace("-", " ").toUpperCase()}</h2>
                {tasks[column].map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <TaskCard
                        task={task}
                        deleteTask={deleteTask}
                        editTask={editTask}
                        column={column}
                        innerRef={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
