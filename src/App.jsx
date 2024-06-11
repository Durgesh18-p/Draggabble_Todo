import React from "react";
import Board from "./components/Board";
import CustomeBoard from "./components/CustomeBoard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import usePersistentState from "./hooks/usePersistentState";

const App = () => {
  const [tasks, setTasks] = usePersistentState(
    {
      "To Do": [
        { id: 1, text: "Task 1" },
        { id: 2, text: "Task 2" },
      ],
      Doing: [],
      Done: [],
    },
    "tasks"
  );

  const [boards, setBoards] = usePersistentState(
    ["To Do", "Doing", "Done"],
    "boards"
  );

  const handleDrop = (taskId, boardName) => {
    const updatedTasks = { ...tasks };
    const task = Object.values(updatedTasks)
      .flat()
      .find((task) => task.id === taskId);
    Object.keys(updatedTasks).forEach((board) => {
      updatedTasks[board] = updatedTasks[board].filter(
        (task) => task.id !== taskId
      );
    });
    updatedTasks[boardName].push(task);
    setTasks(updatedTasks);
  };

  const addBoard = (name) => {
    setBoards([...boards, name]);
    setTasks({ ...tasks, [name]: [] });
  };

  const addTask = (boardName, taskText) => {
    const newTask = { id: Date.now(), text: taskText };
    setTasks({ ...tasks, [boardName]: [...tasks[boardName], newTask] });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app p-4 ">
        <div className="flex flex-wrap">
          {boards.map((board) => (
            <Board
              key={board}
              name={board}
              tasks={tasks[board]}
              onDrop={handleDrop}
              onAddTask={addTask}
            />
          ))}
          <CustomeBoard
            boards={boards.filter(
              (board) => !["To Do", "Doing", "Done"].includes(board)
            )}
            addBoard={addBoard}
            tasks={tasks}
            onDrop={handleDrop}
            onAddTask={addTask}
          />
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
