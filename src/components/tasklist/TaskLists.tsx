import { KeyboardEventHandler, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { useTaskList } from "../../store/TaskList.store";
import { FETCH_TASKLISTS, SELECT_TASKLIST } from "../../store/constants";
import TextField from "@mui/material/TextField";
import { addTaskListApi, getTaskListsApi } from "../../api";
import TaskListItem from "./TaskListItem";

const drawerWidth = "15vw";

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
      getTaskListsApi().then((res: any) => {
        dispatch({ type: FETCH_TASKLISTS, payload: res.items });
        if (!state.selected) {
          dispatch({ type: SELECT_TASKLIST, payload: res.items[0] });
        }
      });
    } catch (err) {
      console.error("Failed to fetch tasklists!!", err);
    }
  };

  const createTaskList = () => {
    try {
      addTaskListApi(text).then((res: any) => {
        dispatch({ type: SELECT_TASKLIST, payload: res });
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
        {/* <Divider /> */}
        <List style={{ paddingTop: 0 }}>
          {state.items.map((tasklist) => (
            <TaskListItem key={tasklist.id} tasklist={tasklist} />
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
