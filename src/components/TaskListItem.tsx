import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useTaskList } from "../store/TaskList.store";
import { TaskList } from "../store/types";
import { SELECT_TASKLIST } from "../store/constants";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import { Check } from "@mui/icons-material";

const ITEM_HEIGHT = 48;

export default function TaskListItem({ tasklist }: { tasklist: TaskList }) {
  const [state, dispatch] = useTaskList();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onTaskListSelect = (tasklist: TaskList) => {
    dispatch({ type: SELECT_TASKLIST, payload: tasklist });
  };

  return (
    <ListItem button onClick={() => onTaskListSelect(tasklist)}>
      <ListItemText primary={tasklist.title} />
    </ListItem>
  );
}
