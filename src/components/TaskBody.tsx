import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { listTaskLists } from "../api";
import { useUserSession } from "../store/User.store";
import TaskContainer from "./TaskContainer";
import TaskDrawer from "./TaskDrawer";
import TaskHeader from "./TaskHeader";

export default function TaskBody() {
  const [state, dispatch] = useUserSession();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TaskHeader></TaskHeader>
      <TaskDrawer></TaskDrawer>
      <TaskContainer></TaskContainer>
    </Box>
  );
}
