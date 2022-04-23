import { useEffect } from "react";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import { UserProvider } from "./store/User.store";
import { TaskProvider } from "./store/Task.store";
import Tasks from "./components/task/Tasks";
import { TaskListProvider } from "./store/TaskList.store";
import TaskLists from "./components/tasklist/TaskLists";
import TaskHeader from "./components/TaskHeader";
import "./App.css";
import Container from "@mui/material/Container";
import TaskInfo from "./components/task/TaskInfo";

function App() {
  useEffect(() => {}, []);

  return (
    <div className="App">
      <UserProvider>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <TaskHeader></TaskHeader>
          <TaskListProvider>
            <TaskLists />
            <TaskProvider>
              <Tasks />
            </TaskProvider>
            <TaskInfo />
          </TaskListProvider>
        </Box>
      </UserProvider>
    </div>
  );
}

export default App;
