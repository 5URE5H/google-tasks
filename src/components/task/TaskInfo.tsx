import { KeyboardEventHandler, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { useTaskList } from "../../store/TaskList.store";
import { FETCH_TASKLISTS, SELECT_TASKLIST } from "../../store/constants";
import TextField from "@mui/material/TextField";
import { addTaskListApi, getTaskListsApi } from "../../api";
import TaskListItem from "../tasklist/TaskListItem";
import TasksCompleted from "./TasksCompleted";
import Typography from "@mui/material/Typography";
import { useTask } from "../../store/Task.store";
import { TaskStatus } from "../../store/types";

const drawerWidth = "35vw";

export default function TaskInfo() {
  const [taskState, taskDispatch] = useTask();

  const completedItems = useMemo(() => {
    return taskState.allItems.filter(
      (task) => task.status === TaskStatus.completed
    );
  }, [taskState.allItems]);

  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        {/* <div>Task Info</div> */}
        <Divider />
        <Box component="main" sx={{ ml: 3, mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom component="div">
            Completed ({completedItems.length})
          </Typography>
        </Box>
        <TasksCompleted />
      </Box>
    </Drawer>
  );
}
