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
} from "../../store/constants";
import Button from "@mui/material/Button";
import { AddTask } from "@mui/icons-material";
import TaskItem from "./TaskItem";
import TaskListMenu from "../tasklist/TaskListMenu";
import TaskDrawer from "./TaskDrawer";
import { Task, TaskStatus } from "../../store/types";

export default function Tasks({ parent }: { parent?: string }) {
  const [taskListState, taskListDispatch] = useTaskList();
  const [taskState, taskDispatch] = useTask();

  useEffect(() => {
    const getTasks = async () => {
      const response = (await getTasksApi(taskListState.selected?.id!)) as any;
      const filteredTasks: Task[] = response.items.filter(
        (task: Task) => task.status === TaskStatus.needsAction && !task.parent
      );
      taskDispatch({ type: FETCH_ALL_TASKS, payload: response.items });
      taskDispatch({ type: FETCH_TASKS, payload: undefined });
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
    <Box component="main" sx={{ flexGrow: 1, mt: 3 }}>
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
    </Box>
  );
}
