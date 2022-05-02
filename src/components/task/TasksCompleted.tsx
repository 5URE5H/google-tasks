import { useMemo } from "react";
import Box from "@mui/material/Box";
import { useTask } from "../../store/Task.store";
import { useTaskList } from "../../store/TaskList.store";
import { TaskStatus } from "../../store/types";
import TaskItemCompleted from "./TaskItemCompleted";

export default function TasksCompleted() {
  const [taskListState, taskListDispatch] = useTaskList();
  const [taskState, taskDispatch] = useTask();

  const completedItems = useMemo(() => {
    return taskState.allItems.filter(
      (task) => task.status === TaskStatus.completed
    );
  }, [taskState.allItems]);

  return (
    <Box component="main" sx={{ mt: 2 }}>
      <div>
        {!!taskListState.selected &&
          completedItems.map((task) => (
            <TaskItemCompleted
              key={task.id}
              task={task}
              tasklist={taskListState.selected!}
            />
          ))}
      </div>
    </Box>
  );
}
