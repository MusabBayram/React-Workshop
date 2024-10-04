import React from "react";
import TaskList from "./TaskList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskDetail from "./TaskDetail";
import { TaskProvider } from "./TaskContext";

function App() {
  return (
   <div>
    <TaskProvider>
    <Router>
      <Routes>
        <Route path="/" element={<TaskList/>}></Route>
        <Route path="/task/:taskId" element={<TaskDetail/>}></Route>
      </Routes>
    </Router>
    </TaskProvider>
   </div>
  );
}

export default App;
