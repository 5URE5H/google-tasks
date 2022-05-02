import { useMemo } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import TasksCompleted from "./TasksCompleted";
import Typography from "@mui/material/Typography";
import { useTask } from "../../store/Task.store";
import { TaskStatus } from "../../store/types";

const drawerWidth = "30vw";

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
