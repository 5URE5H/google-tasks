import { createContext, ReactNode, useContext, useReducer } from "react";
import { FETCH_TASKS } from "./constants";
import { TaskAction, TaskContextType, TaskState } from "./types";

const initialState: TaskState = {
  items: [],
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const taskReducer = (state: TaskState, action: TaskAction) => {
  switch (action.type) {
    case FETCH_TASKS:
      return { ...state, items: action.payload };
    default:
      return state;
  }
};

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={[state, dispatch]}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTask should be used within <TaskProvider>");
  }

  return context;
};
