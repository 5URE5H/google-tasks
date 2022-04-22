import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Input from "@mui/material/Input";
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
    console.log(state)
  }, [state])

  // useEffect(() => {
  //   const updateTask = () => {
  //     console.log("updated called")
  //     updateTaskApi({
  //       taskListId: tasklist.id,
  //       taskId: task.id,
  //       title,
  //       notes,
  //     }).then((response) => {
  //       console.log(response)
  //       dispatch({ type: UPDATE_TASK, payload: response });
  //     });
  //   };

  //   updateTask();
  // }, [title, notes, tasklist.id, task.id, dispatch]);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    updateTaskApi({
      taskListId: tasklist.id,
      taskId: task.id,
      title: value,
      notes,
    }).then((response) => {
      console.log(response);
      dispatch({ type: UPDATE_TASK, payload: response });
    });
  };

  const handleNotesChange = (value: string) => {
    setNotes(value);
    updateTaskApi({
      taskListId: tasklist.id,
      taskId: task.id,
      title,
      notes: value,
    }).then((response) => {
      console.log(response);
      dispatch({ type: UPDATE_TASK, payload: response });
    });
  };

  return (
    <div className="custom-task-container">
      <div className="custom-task">
        <FormControlLabel value="other" control={<Radio />} label="" />
        <div className="custom-task-textarea">
          <Input
            fullWidth
            id="standard-multiline-static"
            multiline
            rows={1}
            disableUnderline
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
          />
          {notes && (
            <Input
              fullWidth
              id="standard-multiline-static"
              multiline
              rows={1}
              disableUnderline
              value={notes}
              onChange={(e) => handleNotesChange(e.target.value)}
              size="small"
            />
          )}
        </div>
      </div>
    </div>
  );
}
