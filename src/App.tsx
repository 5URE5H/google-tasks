import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import { UserProvider } from "./store/User.store";
import { TaskProvider } from "./store/Task.store";
import Tasks from "./components/task/Tasks";
import { TaskListProvider } from "./store/TaskList.store";
import TaskLists from "./components/tasklist/TaskLists";
import TaskHeader from "./components/TaskHeader";
import "./App.css";
import TaskInfo from "./components/task/TaskInfo";
import { ThemeSwitchProvider } from "./store/ThemeSwitch.store";

function App() {
  return (
    <ThemeSwitchProvider>
      <div className="App">
        <UserProvider>
          <Box sx={{ display: "flex" }}>
            <TaskListProvider>
              <CssBaseline />
              <TaskHeader />
              <TaskLists />
              <TaskProvider>
                <Tasks />
                <TaskInfo />
              </TaskProvider>
            </TaskListProvider>
          </Box>
        </UserProvider>
      </div>
    </ThemeSwitchProvider>
  );
}

export default App;
