/* eslint-disable react/prop-types */
import React from "react";
import { useDrag } from "react-dnd";

const Task = ({ task }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-4 m-2 bg-white rounded shadow ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {task.text}
    </div>
  );
};

export default Task;
