import FormControlLabel from "@mui/material/FormControlLabel";
import Input from "@mui/material/Input";
import Radio from "@mui/material/Radio";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { deleteTaskApi, updateTaskApi } from "../../api";
import { useDebounce } from "../../hooks/useDebounce";
import { DELETE_TASK, FETCH_TASKS, UPDATE_TASK } from "../../store/constants";
import { useTask } from "../../store/Task.store";
import { Task, TaskList, TaskStatus } from "../../store/types";
import NotesIcon from "@mui/icons-material/Notes";
import EventIcon from "@mui/icons-material/Event";
import TaskMenu from "./TaskMenu";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useFocus } from "../../hooks/useFocus";
import Tasks from "./Tasks";
import TaskChildren from "./TaskChildren";
import * as _ from "lodash";
import { useHover } from "../../hooks/useHover";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import { useThemeSwitch } from "../../store/ThemeSwitch.store";

export default function TaskItem({
  task,
  tasklist,
}: {
  task: Task;
  tasklist: TaskList;
}) {
  const [taskState, taskDispatch] = useTask();
  const [updateTaskRef, isFocused, taskRef] = useFocus();
  const [updateNotesRef, isNotesFocused] = useFocus();
  const [isCompleted, setIsCompleted] = useState(false);
  const [themeState] = useThemeSwitch();

  const [title, setTitle] = useState(task.title);
  const [notes, setNotes] = useState(task.notes);
  const [status, setStatus] = useState(task.status);

  useEffect(() => {
    if (task.id === taskState.selectedItem?.id) {
      taskRef?.current?.focus();
    }
  }, [taskState]);

  const updateTask = useCallback(
    ({ taskListId, taskId, title, notes, status }: any) => {
      console.log("updated called");

      updateTaskApi({
        taskListId,
        taskId,
        title,
        notes,
        status,
      }).then((response: any) => {
        taskDispatch({ type: UPDATE_TASK, payload: response });
        if (response.status === TaskStatus.completed) {
          taskDispatch({ type: FETCH_TASKS, payload: undefined });
        }
      });
    },
    [taskDispatch]
  );

  const debouncedUpdateTask = useMemo(
    () => _.debounce(updateTask, 1000),
    [updateTask]
  );

  const handleTitleChange = (value: string) => {
    setTitle(value);
    debouncedUpdateTask({
      taskListId: tasklist.id,
      taskId: task.id,
      title: value,
      notes,
      status,
    });
  };

  const handleNotesChange = (value: string) => {
    setNotes(value);
    debouncedUpdateTask({
      taskListId: tasklist.id,
      taskId: task.id,
      title,
      notes: value,
      status,
    });
  };

  const handleStatusChange = () => {
    setIsCompleted(true);
    if (task.title === "") {
      deleteTaskApi({ taskListId: tasklist.id, taskId: task.id }).then(() => {
        taskDispatch({ type: DELETE_TASK, payload: task });
      });
    } else {
      setStatus(TaskStatus.completed);
      debouncedUpdateTask({
        taskListId: tasklist.id,
        taskId: task.id,
        title,
        notes,
        status: TaskStatus.completed,
      });
    }
  };

  return (
    <div>
      <div
        className={`${
          themeState.isDarkMode
            ? "custom-task-container-dark"
            : "custom-task-container"
        } ${
          isFocused || isNotesFocused
            ? themeState.isDarkMode
              ? "custom-task-focused-dark"
              : "custom-task-focused"
            : ""
        }`}
      >
        <div className="custom-task">
          <div className="custom-radio-container">
            {<Radio name="radio-buttons" tabIndex={-1} />}

            {
              <Tooltip
                title="Mark completed"
                disableInteractive
                enterDelay={1000}
              >
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  onClick={handleStatusChange}
                >
                  <CheckIcon />
                </IconButton>
              </Tooltip>
            }
          </div>

          <div className="custom-task-textarea">
            <TextareaAutosize
              ref={updateTaskRef}
              minRows={1}
              placeholder={isFocused || isNotesFocused ? "Title" : ""}
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
                textDecoration: isCompleted ? "line-through" : "none",
              }}
            />
            {
              <div
                className={`custom-notes-container ${
                  isFocused || isNotesFocused || notes
                    ? "custom-notes-focused"
                    : ""
                }`}
              >
                {isFocused && !notes && (
                  <NotesIcon className="custom-notes-icon" />
                )}
                <TextareaAutosize
                  ref={updateNotesRef}
                  minRows={1}
                  placeholder="Details"
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
                    opacity: isNotesFocused || isFocused || notes ? 1 : 0,
                  }}
                />
              </div>
            }
          </div>
          <div
            className={`task-menu-btn ${
              isFocused || isNotesFocused ? "active" : ""
            }`}
          >
            <TaskMenu task={task} tasklist={tasklist} />
          </div>
        </div>
      </div>
      <TaskChildren parent={task.id} />
    </div>
  );
}
