import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TaskDrawer from "./TaskDrawer";
import TaskContainer from "./TaskContainer";

export default function TaskHeader() {
  return (
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Google Tasks
          </Typography>
        </Toolbar>
      </AppBar>
  );
}
