import FormControlLabel from "@mui/material/FormControlLabel";
import Input from "@mui/material/Input";
import Radio from "@mui/material/Radio";
import { useEffect, useState } from "react";
import { updateTaskApi } from "../../api";
import { useDebounce } from "../../hooks/useDebounce";
import { UPDATE_TASK } from "../../store/constants";
import { useTask } from "../../store/Task.store";
import { Task, TaskList } from "../../store/types";
import TaskMenu from "./TaskMenu";

export default function TaskItem({
  task,
  tasklist,
}: {
  task: Task;
  tasklist: TaskList;
}) {
  const [taskState, taskDispatch] = useTask();

  const [title, setTitle] = useState(task.title);
  const [notes, setNotes] = useState(task.notes);

  const titleDebounce = useDebounce(title, 1000);
  const notesDebounce = useDebounce(notes, 1000);

  useEffect(() => {
    console.log(taskState);
  }, [taskState]);

  useEffect(() => {
    const updateTask = () => {
      console.log("updated called");
      updateTaskApi({
        taskListId: tasklist.id,
        taskId: task.id,
        title: titleDebounce,
        notes: notesDebounce,
      }).then((response) => {
        console.log(response);
        taskDispatch({ type: UPDATE_TASK, payload: response });
      });
    };

    updateTask();
  }, [titleDebounce, notesDebounce, tasklist.id, task.id, taskDispatch]);

  const handleTitleChange = (value: string) => {
    setTitle(value);
  };

  const handleNotesChange = (value: string) => {
    setNotes(value);
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
              placeholder="Details"
            />
          )}
        </div>
        <TaskMenu task={task} tasklist={tasklist} />
      </div>
    </div>
  );
}
