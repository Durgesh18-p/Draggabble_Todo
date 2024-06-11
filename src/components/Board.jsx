/* eslint-disable react/prop-types */
import React from "react";
import { useDrop } from "react-dnd";
import Task from "./Task";

const Board = ({ name, tasks, onDrop, onAddTask }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item) => onDrop(item.id, name),
    collect: (monitor) => ({
      isOver: !monitor.isOver(),
    }),
  });

  const handleAddTask = (e) => {
    if (e.key === "Enter") {
      onAddTask(name, e.target.value);
      e.target.value = "";
    }
  };

  return (
    <div
      ref={drop}
      className={`p-4 w-full  md:w-1/3 m-2 bg-gray-100 rounded shadow ${
        isOver ? "bg-gray-300" : ""
      }`}
    >
      <h2 className="text-xl font-bold mb-4 p">{name}</h2>
      {tasks?.map((task) => (
        <Task key={task.id} task={task} />
      ))}
      <input
        type="text"
        placeholder="Add a new task"
        onKeyDown={handleAddTask}
        className="p-2 mt-4 border rounded w-full"
      />
    </div>
  );
};

export default Board;
