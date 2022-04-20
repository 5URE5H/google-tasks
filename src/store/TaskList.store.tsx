import { createContext, ReactNode, useContext, useReducer } from "react";
import { FETCH_TASKLISTS, SELECT_TASKLIST } from "./constants";
import { TaskListAction, TaskListContextType, TaskListState } from "./types";

const initialState: TaskListState = {
  items: [],
  selected: undefined,
};

const TaskListContext = createContext<TaskListContextType | undefined>(
  undefined
);

const taskListReducer = (state: TaskListState, action: TaskListAction) => {
  switch (action.type) {
    case FETCH_TASKLISTS:
      return { ...state, items: action.payload };
    case SELECT_TASKLIST:
      return { ...state, selected: action.payload };
    default:
      return state;
  }
};

export const TaskListProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(taskListReducer, initialState);

  return (
    <TaskListContext.Provider value={[state, dispatch]}>
      {children}
    </TaskListContext.Provider>
  );
};

export const useTaskList = () => {
  const context = useContext(TaskListContext);

  if (!context)
    throw new Error("useTaskList should be used within <TaskListProvider />");

  return context;
};
