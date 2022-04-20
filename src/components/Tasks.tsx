import { useEffect } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import { useTask } from "../store/Task.store";
import { useTaskList } from "../store/TaskList.store";
import { addTask, getTasks } from "../api";
import { FETCH_TASKS } from "../store/constants";
import Button from "@mui/material/Button";
import { AddTask } from "@mui/icons-material";

export default function Tasks() {
  const [taskListState, taskListDispatch] = useTaskList();
  const [taskState, taskDispatch] = useTask();

  useEffect(() => {
    if (taskListState.selected) {
      (async () => {
        const response = (await getTasks(taskListState.selected?.id)) as any;
        console.log(response);
        taskDispatch({ type: FETCH_TASKS, payload: response.items });
      })();
    }
  }, [taskDispatch, taskListState]);

  const handleAddTask = () => {
    addTask({ taskListId: taskListState.selected?.id }).then(() => {
      (async () => {
        const response = (await getTasks(taskListState.selected?.id)) as any;
        console.log(response);
        taskDispatch({ type: FETCH_TASKS, payload: response.items });
      })();
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
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
          {taskState.items.map((task) => (
            <FormControlLabel
              key={task.id}
              value={task}
              control={<Radio />}
              label={task.title}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
