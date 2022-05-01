import { Dispatch } from "react";

///////////////////////////////////// Task /////////////////////////////////////

export interface TaskState {
  allItems: Task[];
  items: Task[];
  children: Task[];
  isLoading: boolean;
  selectedItem?: Task | undefined;
}

export interface TaskAction {
  type: string;
  payload: any;
}

export interface Task {
  kind: string;
  id: string;
  etag: string;
  title: string;
  updated: string;
  selfLink: string;
  parent: string;
  position: string;
  notes: string;
  status: TaskStatus;
  due: string;
  completed: string;
  deleted: boolean;
  hidden: boolean;
  links: [
    {
      type: string;
      description: string;
      link: string;
    }
  ];
}

export enum TaskStatus {
  needsAction = "needsAction",
  completed = "completed",
}

export type TaskContextType = [TaskState, Dispatch<TaskAction>];

///////////////////////////////////// TaskList /////////////////////////////////////

export interface TaskList {
  kind: string;
  id: string;
  etag: string;
  title: string;
  updated: string;
  selfLink: string;
}

export interface TaskListState {
  items: TaskList[];
  selected?: TaskList | undefined;
  sortBy: TasksSortBy;
}

export interface TaskListAction {
  type: string;
  payload?: any;
}

export enum TasksSortBy {
  myorder = "myorder",
  date = "date",
}

export type TaskListContextType = [TaskListState, Dispatch<TaskListAction>];

///////////////////////////////////// Session /////////////////////////////////////

export interface UserState {
  isSignedIn: boolean;
  isLoading: boolean;
  userInfo: any;
}

export interface UserAction {
  type: string;
  payload?: any;
}

export type UserContextType = [UserState, Dispatch<UserAction>];
