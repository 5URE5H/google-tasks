import { useEffect, useState } from "react";
import { useTask } from "../../store/Task.store";
import { useTaskList } from "../../store/TaskList.store";
import TaskItem from "./TaskItem";
import { Task, TaskStatus } from "../../store/types";

export default function TaskChildren({ parent }: { parent?: string }) {
  const [taskListState, taskListDispatch] = useTaskList();
  const [taskState, taskDispatch] = useTask();

  const [children, setChildren] = useState<Task[]>([]);

  useEffect(() => {
    if (parent) {
      const childrenTasks = taskState.allItems.filter(
        (task) =>
          task.status === TaskStatus.needsAction && task.parent === parent
      );
      setChildren(childrenTasks);
    }
  }, [parent, taskDispatch, taskListState.selected?.id, taskState]);

  return (
    <div className="custom-child-tasks">
      {!!taskListState.selected &&
        parent &&
        children.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            tasklist={taskListState.selected!}
          />
        ))}
    </div>
  );
}
