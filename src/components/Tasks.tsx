import { useEffect } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import { useTask } from "../store/Task.store";
import { useTaskList } from "../store/TaskList.store";
import { addTaskApi, getTasksApi } from "../api";
import { CREATE_TASK, FETCH_TASKS } from "../store/constants";
import Button from "@mui/material/Button";
import { AddTask } from "@mui/icons-material";
import TaskItem from "./TaskItem";

export default function Tasks() {
  const [taskListState, taskListDispatch] = useTaskList();
  const [taskState, taskDispatch] = useTask();

  useEffect(() => {
    if (taskListState.selected) {
      getTasks();
    }
  }, [taskDispatch, taskListState]);

  const getTasks = async () => {
    const response = (await getTasksApi(taskListState.selected?.id)) as any;
    console.log(response);
    taskDispatch({ type: FETCH_TASKS, payload: response.items });
  };

  const handleAddTask = () => {
    addTaskApi({ taskListId: taskListState.selected?.id }).then((response) => {
      console.log("handleAddTask", response);
      taskDispatch({ type: CREATE_TASK, payload: response });
      getTasks();
    });
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Button
        className="custom-button"
        variant="text"
        startIcon={<AddTask />}
        onClick={handleAddTask}
      >
        Add a task
      </Button>
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
