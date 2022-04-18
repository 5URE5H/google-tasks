import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { getTaskLists } from "../api";
import { FETCH_TASKLIST } from "./types";

interface TaskListState {
  items: any[];
}

interface TaskListAction {
  type: string;
  payload?: any;
}

type TaskListContextType = [TaskListState, Dispatch<TaskListAction>];

const initialState = {
  items: [],
};

const TaskListContext = createContext<TaskListContextType | undefined>(
  undefined
);

const taskListReducer = (state: TaskListState, action: TaskListAction) => {
  switch (action.type) {
    case FETCH_TASKLIST:
      return { ...state, items: action.payload.items };
    default:
      return state;
  }
};

export const TaskListProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(taskListReducer, initialState);

  useEffect(() => {
    getTaskLists().then((res) => {
      dispatch({ type: FETCH_TASKLIST, payload: res });
    });
  }, []);

  return (
    <TaskListContext.Provider value={[state, dispatch]}>
      {children}
    </TaskListContext.Provider>
  );
};

export const useTaskList = () => {
  const context = useContext(TaskListContext);

  if (!context)
    throw new Error("useUser should be used within <UserProvider />");

  return context;
};
