import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useTaskList } from "../../store/TaskList.store";
import { TaskList } from "../../store/types";
import { SELECT_TASKLIST } from "../../store/constants";
import { useThemeSwitch } from "../../store/ThemeSwitch.store";

export default function TaskListItem({ tasklist }: { tasklist: TaskList }) {
  const [state, dispatch] = useTaskList();
  const [themeState] = useThemeSwitch();

  const onTaskListSelect = (tasklist: TaskList) => {
    dispatch({ type: SELECT_TASKLIST, payload: tasklist });
  };

  return (
    <ListItem
      button
      className={`${
        themeState.isDarkMode ? "tasklist-list-item-dark" : "tasklist-list-item"
      } ${state.selected?.id === tasklist.id ? "active" : ""}`}
      // style={{
      //   color: state.selected?.id === tasklist.id ? "#1976d2" : "inherit",
      // }}
      onClick={() => onTaskListSelect(tasklist)}
    >
      <ListItemText primary={tasklist.title} />
    </ListItem>
  );
}
