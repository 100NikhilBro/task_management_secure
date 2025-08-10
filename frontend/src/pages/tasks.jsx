import React from "react";
import TaskList from "../components/TaskList";
import CreateTaskForm from "../components/createTaskForm";

const Tasks = () => {
  return (
    <div
      className="flex flex-col md:flex-row min-h-screen p-8 gap-8
                 bg-gradient-to-br from-gray-900 via-purple-900 to-black
                 text-gray-200"
    >
      <div
        className="w-full md:w-2/5 
                   bg-gradient-to-tr from-purple-900 to-gray-800
                   p-8 rounded-xl shadow-xl
                   backdrop-blur-sm border border-purple-700"
      >
        <CreateTaskForm />
      </div>

      <div
        className="w-full md:w-3/5
                   bg-gradient-to-tr from-gray-800 to-gray-900
                   p-8 rounded-xl shadow-xl
                   overflow-auto max-h-screen
                   border border-gray-700"
      >
        <TaskList />
      </div>
    </div>
  );
};

export default Tasks;
