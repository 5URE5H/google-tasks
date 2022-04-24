import { createContext, ReactNode, useContext, useReducer } from "react";
import {
  CREATE_SUB_TASK,
  CREATE_TASK,
  DELETE_TASK,
  FETCH_ALL_TASKS,
  FETCH_CHILDREN,
  FETCH_TASKS,
  UPDATE_TASK,
} from "./constants";
import { TaskAction, TaskContextType, TaskState, TaskStatus } from "./types";

const initialState: TaskState = {
  allItems: [],
  items: [],
  children: [],
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const taskReducer = (state: TaskState, action: TaskAction) => {
  switch (action.type) {
    case FETCH_ALL_TASKS:
      return { ...state, allItems: action.payload };
    case FETCH_TASKS:
      return {
        ...state,
        items: state.allItems.filter(
          (task) => task.status === TaskStatus.needsAction && !task.parent
        ),
      };
    case FETCH_CHILDREN:
      return {
        ...state,
        children: state.allItems.filter(
          (task) =>
            task.status === TaskStatus.needsAction &&
            task.parent === action.payload
        ),
      };
    case CREATE_TASK:
      return {
        ...state,
        items: [action.payload, ...state.items],
        allItems: [action.payload, ...state.items],
      };
    case CREATE_SUB_TASK:
      return { ...state, allItems: [action.payload, ...state.allItems] };
    case UPDATE_TASK:
      return {
        ...state,
        items: state.items.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
        allItems: state.allItems.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case DELETE_TASK:
      return {
        ...state,
        items: state.items.filter((task) => task.id !== action.payload.id),
      };
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
