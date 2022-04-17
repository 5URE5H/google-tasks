import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { useUser } from "../store/User.store";
import TaskContainer from "./TaskContainer";
import TaskDrawer from "./TaskDrawer";
import TaskHeader from "./TaskHeader";

export default function TaskBody() {
  const [state, dispatch] = useUser();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TaskHeader></TaskHeader>
      <TaskDrawer></TaskDrawer>
      <TaskContainer></TaskContainer>
    </Box>
  );
}
