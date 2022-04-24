import Radio from "@mui/material/Radio";
import { useCallback, useMemo, useState } from "react";
import { deleteTaskApi, updateTaskApi } from "../../api";
import { DELETE_TASK, FETCH_TASKS, UPDATE_TASK } from "../../store/constants";
import { useTask } from "../../store/Task.store";
import { Task, TaskList, TaskStatus } from "../../store/types";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import * as _ from "lodash";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function TaskItemCompleted({
  task,
  tasklist,
}: {
  task: Task;
  tasklist: TaskList;
}) {
  const [taskState, taskDispatch] = useTask();
  const [isCompleted, setIsCompleted] = useState(false);

  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState(task.status);

  const handleStatusChange = () => {
    setStatus(TaskStatus.needsAction);
    updateTaskApi({
      taskListId: tasklist.id,
      taskId: task.id,
      title: task.title,
      notes: task.notes,
      status: TaskStatus.needsAction,
    }).then((response: any) => {
      taskDispatch({ type: UPDATE_TASK, payload: response });
      if (response.status === TaskStatus.needsAction) {
        taskDispatch({ type: FETCH_TASKS, payload: undefined });
      }
    });
  };

  const handleDeleteTask = () => {
    deleteTaskApi({ taskListId: tasklist.id, taskId: task.id }).then(() => {
      taskDispatch({ type: DELETE_TASK, payload: task });
    });
  };

  return (
    <div>
      <div className="custom-task-container">
        <div className="custom-task">
          <div className="custom-checkbox-container">
            <Tooltip
              title="Mark uncompleted"
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
          </div>

          <div className="custom-task-textarea">
            <TextareaAutosize
              minRows={1}
              defaultValue={title}
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
                textDecoration: "line-through",
              }}
            />
          </div>
          <div className="custom-delete-icon">
            <Tooltip
              title="Mark uncompleted"
              disableInteractive
              enterDelay={1000}
            >
              <IconButton
                aria-label="upload picture"
                component="span"
                onClick={handleDeleteTask}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
