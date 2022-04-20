import { KeyboardEventHandler, useEffect, useState } from "react";
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
import { TaskList } from "../store/types";
import {
  CREATE_TASKLIST,
  FETCH_TASKLISTS,
  SELECT_TASKLIST,
} from "../store/constants";
import TextField from "@mui/material/TextField";
import { addTaskList, getTaskLists } from "../api";
import TaskListItem from "./TaskListItem";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

const drawerWidth = 300;

export default function TaskLists() {
  const [text, setText] = useState("");
  const [state, dispatch] = useTaskList();

  useEffect(() => {
    loadTaskLists();
  }, []);

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Enter" && text) {
      createTaskList();
    }
  };

  const loadTaskLists = () => {
    try {
      getTaskLists().then((res: any) => {
        dispatch({ type: FETCH_TASKLISTS, payload: res.items });
      });
    } catch (err) {
      console.error("Failed to fetch tasklists!!", err);
    }
  };

  const createTaskList = () => {
    try {
      addTaskList(text).then((res: any) => {
        console.log(res);
        loadTaskLists();
      });
    } catch (err) {
      console.error("Failed to create tasklist!!", err);
    } finally {
      setText("");
    }
  };

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
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "calc(100% - 16px)" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={
            ((event) =>
              event.preventDefault()) as React.FormEventHandler<HTMLFormElement>
          }
        >
          <TextField
            id="filled-basic"
            label="Create new list"
            placeholder="Type and press enter"
            variant="filled"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </Box>
        <Divider />
        <List>
          {state.items.map((tasklist) => (
            <TaskListItem key={tasklist.id} tasklist={tasklist} />
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
