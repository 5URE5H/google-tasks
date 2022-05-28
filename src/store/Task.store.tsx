import { createContext, ReactNode, useContext, useReducer } from "react";
import {
  ADD_SUB_TASK,
  ADD_TASK,
  CREATE_SUB_TASK,
  CREATE_TASK,
  DELETE_TASK,
  FETCH_ALL_TASKS,
  FETCH_CHILDREN,
  FETCH_TASKS,
  LOADING_TASKS,
  SELECT_TASK,
  UPDATE_TASK,
} from "./constants";
import {
  Task,
  TaskAction,
  TaskContextType,
  TaskState,
  TaskStatus,
} from "./types";

const initialState: TaskState = {
  allItems: [],
  items: [],
  children: [],
  isLoading: false,
  selectedItem: undefined,
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const insertTask = (items: Task[], item: Task, selected: Task): Task[] => {
  const previousIndex = items.findIndex((task) => task.id === selected.id);
  if (previousIndex === -1) {
    return [item, ...items];
  }

  const result: Task[] = [];
  items.forEach((task) => {
    result.push(task);
    if (selected.id === task.id) {
      result.push(item);
    }
  });
  return result;
};

const taskReducer = (state: TaskState, action: TaskAction) => {
  switch (action.type) {
    case LOADING_TASKS:
      return { ...state, isLoading: action.payload };
    case SELECT_TASK:
      return { ...state, selectedItem: action.payload };
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
        allItems: [action.payload, ...state.allItems],
        selectedItem: action.payload,
      };
    case ADD_TASK:
      return {
        ...state,
        items: insertTask(
          state.items,
          action.payload.task,
          action.payload.previousTask
        ),
        allItems: [action.payload.task, ...state.allItems],
        selectedItem: action.payload.task,
      };
    case CREATE_SUB_TASK:
      return {
        ...state,
        allItems: [action.payload, ...state.allItems],
        selectedItem: action.payload,
      };
    case ADD_SUB_TASK:
      return {
        ...state,
        allItems: [...state.allItems, action.payload],
        selectedItem: action.payload,
      };
    case UPDATE_TASK:
      return {
        ...state,
        items: state.items.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
        allItems: state.allItems.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
        selectedItem: undefined,
      };
    case DELETE_TASK:
      return {
        ...state,
        allItems: state.allItems.filter(
          (task) => task.id !== action.payload.id
        ),
        items: state.items.filter((task) => task.id !== action.payload.id),
        selectedItem: undefined,
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
