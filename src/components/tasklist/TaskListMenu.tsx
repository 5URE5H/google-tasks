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
import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { deleteTaskListApi, updateTaskListApi } from "../../api";
import { useTaskList } from "../../store/TaskList.store";
import {
  DELETE_TASKLIST,
  SELECT_TASKLIST,
  UPDATE_TASKLIST,
} from "../../store/constants";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";

// const style = {
//   position: "absolute" as "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   borderRadius: 2,
//   p: 3,
// };

export default function TaskListMenu() {
  const [tasklistState, tasklistDispatch] = useTaskList();

  const [taskListTitle, setTaskListTitle] = useState(
    tasklistState.selected?.title
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    setTaskListTitle(tasklistState.selected?.title);
  }, [tasklistState.selected?.title]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteList = () => {
    deleteTaskListApi({ taskListId: tasklistState.selected?.id }).then(() => {
      tasklistDispatch({
        type: SELECT_TASKLIST,
        payload: tasklistState.items[0],
      });
      tasklistDispatch({
        type: DELETE_TASKLIST,
        payload: tasklistState.selected,
      });
    });
    handleCloseDeleteModal();
    handleClose();
  };

  const handleTasklistChange = (title: string) => {
    setTaskListTitle(title);
  };

  const handleTasklistDone = () => {
    if (!taskListTitle) {
      return;
    }
    updateTaskListApi({
      taskListId: tasklistState.selected?.id,
      title: taskListTitle,
    }).then((response) => {
      tasklistDispatch({ type: UPDATE_TASKLIST, payload: response });
      tasklistDispatch({ type: SELECT_TASKLIST, payload: response });
    });
    handleCloseModal();
    handleClose();
  };

  const handleTasklistCancel = () => {
    setTaskListTitle(tasklistState.selected?.title);
    handleCloseModal();
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
          <MenuItem>
            <ListItemText inset>My order</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Check />
            </ListItemIcon>
            Date
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemText onClick={handleOpenModal}>Rename list</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemText onClick={handleOpenDeleteModal}>
              Delete list
            </ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemText>Delete all completed tasks</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemText>Keyboard shortcuts</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>

      <Dialog
        fullWidth={true}
        maxWidth={"xs"}
        open={openModal}
        onClose={handleCloseModal}
      >
        <DialogTitle>Rename list</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="email"
            fullWidth
            variant="standard"
            placeholder="Enter name"
            error={!taskListTitle}
            value={taskListTitle}
            onChange={(e) => handleTasklistChange(e.target.value)}
          />
          {!taskListTitle && (
            <FormHelperText id="name" style={{ color: "#d32f2f" }}>
              Task list name cannot be empty.
            </FormHelperText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTasklistCancel}>Cancel</Button>
          <Button onClick={handleTasklistDone} disabled={!taskListTitle}>
            Done
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth={true}
        maxWidth={"xs"}
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
      >
        <DialogTitle>Delete this list?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            All tasks in this list will be permanently deleted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal}>Cancel</Button>
          <Button onClick={handleDeleteList}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
