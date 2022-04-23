import FormControlLabel from "@mui/material/FormControlLabel";
import Input from "@mui/material/Input";
import Radio from "@mui/material/Radio";
import { useEffect, useState } from "react";
import { updateTaskApi } from "../../api";
import { useDebounce } from "../../hooks/useDebounce";
import { UPDATE_TASK } from "../../store/constants";
import { useTask } from "../../store/Task.store";
import { Task, TaskList, TaskStatus } from "../../store/types";
import NotesIcon from "@mui/icons-material/Notes";
import EventIcon from "@mui/icons-material/Event";
import TaskMenu from "./TaskMenu";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useFocus } from "../../hooks/useFocus";
import Tasks from "./Tasks";
import TaskChildren from "./TaskChildren";

export default function TaskItem({
  task,
  tasklist,
}: {
  task: Task;
  tasklist: TaskList;
}) {
  const [taskState, taskDispatch] = useTask();
  const [ref, isFocused] = useFocus();
  const [notesRef, isNotesFocused] = useFocus();

  const [title, setTitle] = useState(task.title);
  const [notes, setNotes] = useState(task.notes);
  const [status, setStatus] = useState(task.status);

  const titleDebounce = useDebounce(title, 1000);
  const notesDebounce = useDebounce(notes, 1000);

  const updateTask = () => {
    console.log("updated called");
    updateTaskApi({
      taskListId: tasklist.id,
      taskId: task.id,
      title: titleDebounce,
      notes: notesDebounce,
      status: status,
    }).then((response) => {
      console.log(response);
      taskDispatch({ type: UPDATE_TASK, payload: response });
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

  const handleStatusChange = () => {
    setStatus(TaskStatus.completed);
    updateTask();
  };

  return (
    <div>
      <div
        className={`custom-task-container ${
          isFocused || isNotesFocused ? "custom-task-focused" : ""
        }`}
      >
        <div className="custom-task">
          <Radio
            checked={status === "completed"}
            onChange={handleStatusChange}
            value={task}
            name="radio-buttons"
          />
          <div className="custom-task-textarea">
            <TextareaAutosize
              ref={ref}
              minRows={1}
              placeholder={isFocused ? "Title" : ""}
              defaultValue={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              style={{
                width: "100%",
                resize: "none",
                border: "none",
                outline: "none",
                background: "inherit",
                overflow: "hidden",
                fontSize: "16px",
                fontFamily: "inherit",
                color: "inherit",
                lineHeight: "1",
              }}
            />
            {
              <div className="custom-notes-container">
                {isFocused && !notes && <NotesIcon />}
                <TextareaAutosize
                  ref={notesRef}
                  minRows={1}
                  placeholder="Notes"
                  defaultValue={notes}
                  onChange={(e) => handleNotesChange(e.target.value)}
                  style={{
                    width: "100%",
                    resize: "none",
                    border: "none",
                    outline: "none",
                    background: "inherit",
                    overflow: "hidden",
                    fontSize: "14px",
                    fontFamily: "inherit",
                    lineHeight: "1",
                    visibility:
                      isNotesFocused || isFocused || notes
                        ? "visible"
                        : "hidden",
                  }}
                />
              </div>
            }
          </div>
          <TaskMenu task={task} tasklist={tasklist} />
        </div>
      </div>
      <TaskChildren parent={task.id} />
    </div>
  );
}
