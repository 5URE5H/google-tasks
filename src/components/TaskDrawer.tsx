import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useTaskList } from "../store/TaskList.store";

const drawerWidth = 300;

export default function TaskDrawer() {
  const [state, dispatch] = useTaskList();

  return (
    <Drawer
      variant="permanent"
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
        <List>
          {state.items.map((tasklist, index) => (
            <ListItem button key={tasklist.id}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={tasklist.title} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {state.items.map((tasklist, index) => (
            <ListItem button key={tasklist.id}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={tasklist.title} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
