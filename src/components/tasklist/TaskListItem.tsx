import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useTaskList } from "../../store/TaskList.store";
import { TaskList } from "../../store/types";
import { SELECT_TASKLIST } from "../../store/constants";

export default function TaskListItem({ tasklist }: { tasklist: TaskList }) {
  const [state, dispatch] = useTaskList();

  const onTaskListSelect = (tasklist: TaskList) => {
    dispatch({ type: SELECT_TASKLIST, payload: tasklist });
  };

  return (
    <ListItem
      button
      className={state.selected?.id === tasklist.id ? "active" : ""}
      onClick={() => onTaskListSelect(tasklist)}
    >
      <ListItemText primary={tasklist.title} />
    </ListItem>
  );
}
