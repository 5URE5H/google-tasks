import { useEffect } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useTask } from "../../store/Task.store";
import { useTaskList } from "../../store/TaskList.store";
import { addTaskApi, getTasksApi } from "../../api";
import {
  CREATE_TASK,
  FETCH_ALL_TASKS,
  FETCH_TASKS,
  LOADING_TASKS,
} from "../../store/constants";
import Button from "@mui/material/Button";
import { AddTask } from "@mui/icons-material";
import TaskItem from "./TaskItem";
import TaskListMenu from "../tasklist/TaskListMenu";
import Typography from "@mui/material/Typography";
import Zero from "../../assets/svg/zero-state.svg";
import Empty from "../../assets/svg/empty-state.svg";
import CircularProgress from "@mui/material/CircularProgress";
import { useThemeSwitch } from "../../store/ThemeSwitch.store";

export default function Tasks({ parent }: { parent?: string }) {
  const [taskListState, taskListDispatch] = useTaskList();
  const [taskState, taskDispatch] = useTask();
  const [themeState, themeDispatch] = useThemeSwitch();

  useEffect(() => {
    taskDispatch({ type: LOADING_TASKS, payload: true });
    const getTasks = async () => {
      const response = (await getTasksApi(taskListState.selected?.id!)) as any;
      taskDispatch({ type: FETCH_ALL_TASKS, payload: response.items });
      taskDispatch({ type: FETCH_TASKS, payload: undefined });
      taskDispatch({ type: LOADING_TASKS, payload: false });
    };

    if (taskListState.selected?.id) {
      getTasks();
    }
  }, [taskDispatch, taskListState.selected?.id]);

  const handleAddTask = () => {
    addTaskApi({ taskListId: taskListState.selected?.id }).then((response) => {
      taskDispatch({ type: CREATE_TASK, payload: response });
    });
  };

  return (
    <Box component="main" sx={{ mt: 2, width: "50vw", height: "95vh" }}>
      <Toolbar />
      <div className="custom-button-container">
        <Button
          className="custom-button"
          variant="text"
          startIcon={<AddTask />}
          onClick={handleAddTask}
        >
          Add a task
        </Button>
        <TaskListMenu />
      </div>

      {taskState.isLoading ? (
        <div className="circular-loader">
          <CircularProgress />
        </div>
      ) : (
        <div>
          <div>
            {!!taskListState.selected &&
              taskState.items.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  tasklist={taskListState.selected!}
                />
              ))}
          </div>
          {!taskState.allItems.length && (
            <div className="custom-zero-tasks">
              <img
                src={Zero}
                alt="Add new tasks"
                width={"50%"}
                style={{
                  marginBottom: "3rem",
                  minWidth: "300px",
                  filter: themeState.isDarkMode ? "invert(0.25)" : "invert(0)",
                }}
              />
              <Typography variant="h4" gutterBottom component="div">
                A fresh start
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                component="div"
                style={{ color: "gray" }}
              >
                Anything to add?
              </Typography>
            </div>
          )}
          {!!taskState.allItems.length && !taskState.items.length && (
            <div className="custom-zero-tasks">
              <img
                src={Empty}
                alt="Add new tasks"
                width={"50%"}
                style={{
                  marginBottom: "3rem",
                  minWidth: "300px",
                  filter: themeState.isDarkMode ? "invert(0.25)" : "invert(0)",
                }}
              />
              <Typography variant="h4" gutterBottom component="div">
                Nicely done!
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                component="div"
                style={{ color: "gray" }}
              >
                You've finished all your tasks. Take a second to recharge.
              </Typography>
            </div>
          )}
        </div>
      )}
    </Box>
  );
}
