import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { getTasksApi, updateTaskApi } from "../api";
import { FETCH_TASKS, UPDATE_TASK } from "../store/constants";
import { useTask } from "../store/Task.store";
import { Task, TaskList } from "../store/types";

export default function TaskItem({
  task,
  tasklist,
}: {
  task: Task;
  tasklist: TaskList;
}) {
  const [state, dispatch] = useTask();

  const [title, setTitle] = useState(task.title);
  const [notes, setNotes] = useState(task.notes);

  useEffect(() => {
    console.log(state);
  }, [state]);

  const updateTask = () => {
    updateTaskApi({
      taskListId: tasklist.id,
      taskId: task.id,
      title,
      notes,
    }).then((response) => {
      dispatch({ type: UPDATE_TASK, payload: response });
      const getTasks = async () => {
        const response = (await getTasksApi(tasklist.id)) as any;
        console.log(response);
        dispatch({ type: FETCH_TASKS, payload: response.items });
      };

      getTasks();
    });
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    updateTask();
  };

  const handleNotesChange = (value: string) => {
    setNotes(value);
    updateTask();
  };

  return (
    <div>
      <FormControl className="custom-task" fullWidth sx={{ m: 1 }}>
        <FormControlLabel value="other" control={<Radio />} label="" />
        <div className="custom-task-textarea">
          <TextField
            fullWidth
            id="standard-multiline-static"
            multiline
            rows={1}
            variant="standard"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
          />
          <TextField
            fullWidth
            id="standard-multiline-static"
            multiline
            rows={1}
            variant="standard"
            value={notes}
            onChange={(e) => handleNotesChange(e.target.value)}
            size="small"
          />
        </div>
      </FormControl>
    </div>
  );
}
