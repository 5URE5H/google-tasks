import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListItemText from "@mui/material/ListItemText";
import MenuList from "@mui/material/MenuList";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Check } from "@mui/icons-material";
import { useState } from "react";
import { useTaskList } from "../../store/TaskList.store";
import { Task, TaskList } from "../../store/types";
import { addTaskApi, deleteTaskApi } from "../../api";
import { CREATE_SUB_TASK, DELETE_TASK } from "../../store/constants";
import { useTask } from "../../store/Task.store";

export default function TaskMenu({
  task,
  tasklist,
}: {
  task: Task;
  tasklist: TaskList;
}) {
  const [tasklistState, tasklistDispatch] = useTaskList();
  const [taskState, taskDispatch] = useTask();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    deleteTaskApi({ taskListId: tasklist.id, taskId: task.id }).then(() => {
      taskDispatch({ type: DELETE_TASK, payload: task });
    });
    handleClose();
  };

  const handleAddSubTask = () => {
    addTaskApi({ taskListId: tasklist.id, parent: task.id }).then(
      (response) => {
        taskDispatch({ type: CREATE_SUB_TASK, payload: response });
      }
    );
    handleClose();
  };

  const handleMoveTask = (list: TaskList) => {
    addTaskApi({
      taskListId: list.id,
      title: task.title,
      notes: task.notes,
      due: task.due,
    }).then(() => {
      deleteTaskApi({ taskListId: tasklist.id, taskId: task.id }).then(() => {
        taskDispatch({ type: DELETE_TASK, payload: task });
      });
    });
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        tabIndex={-1}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuList dense>
          {!task.parent ? (
            <MenuItem>
              <ListItemText onClick={handleAddSubTask}>
                Add sub task
              </ListItemText>
            </MenuItem>
          ) : null}
          <MenuItem color="error">
            <ListItemText onClick={handleDelete}>Delete</ListItemText>
          </MenuItem>
          <Divider />
          {tasklistState.items.map((list) => {
            if (list.id === tasklistState.selected?.id!) {
              return (
                <MenuItem key={list.id}>
                  <ListItemIcon>
                    <Check />
                  </ListItemIcon>
                  {list.title}
                </MenuItem>
              );
            }
            return (
              <MenuItem key={list.id} onClick={() => handleMoveTask(list)}>
                <ListItemText inset>{list.title}</ListItemText>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </div>
  );
}
