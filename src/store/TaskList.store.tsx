import { createContext, ReactNode, useContext, useReducer } from "react";
import {
  CREATE_TASKLIST,
  DELETE_TASKLIST,
  FETCH_TASKLISTS,
  SELECT_TASKLIST,
  UPDATE_TASKLIST,
} from "./constants";
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
    case CREATE_TASKLIST:
      return { ...state, items: [...state.items, action.payload] };
    case UPDATE_TASKLIST:
      return {
        ...state,
        items: state.items.map((tasklist) =>
          tasklist.id === action.payload.id ? action.payload : tasklist
        ),
      };
    case DELETE_TASKLIST:
      return {
        ...state,
        items: state.items.filter(
          (tasklist) => tasklist.id !== action.payload.id
        ),
      };
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
