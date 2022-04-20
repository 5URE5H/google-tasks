import "./App.css";
import { UserProvider } from "./store/User.store";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import { TaskProvider } from "./store/Task.store";
import Tasks from "./components/Tasks";
import { TaskListProvider } from "./store/TaskList.store";
import TaskLists from "./components/TaskLists";
import TaskHeader from "./components/TaskHeader";
import CssBaseline from "@mui/material/CssBaseline";

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
          </TaskListProvider>
        </Box>
      </UserProvider>
    </div>
  );
}

export default App;
