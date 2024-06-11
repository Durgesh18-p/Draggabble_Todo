/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Board from "./Board";

const CustomBoard = ({ boards, addBoard, tasks, onDrop, onAddTask }) => {
  const [boardName, setBoardName] = useState("");

  const handleAddBoard = () => {
    addBoard(boardName);
    setBoardName("");
  };

  return (
    <div className="flex flex-wrap">
      {boards.map((board) => (
        <Board
          key={board}
          name={board}
          tasks={tasks[board]}
          onDrop={onDrop}
          onAddTask={onAddTask}
        />
      ))}
      <div className="p-4 w-full md:w-1/3 m-2 bg-white rounded shadow">
        <input
          type="text"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          placeholder="New Board Name"
          className="p-2 border rounded w-full"
        />
        <button
          onClick={handleAddBoard}
          className="mt-2 p-2 bg-blue-500 text-white rounded w-full"
        >
          Add Board
        </button>
      </div>
    </div>
  );
};

export default CustomBoard;
