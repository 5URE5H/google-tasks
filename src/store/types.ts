import { Dispatch } from "react";

///////////////////////////////////// Task /////////////////////////////////////

export interface TaskState {
  items: Task[];
}

export interface TaskAction {
  type: string;
  payload: any;
}

export interface Task {
  etag: string;
  id: string;
  kind: string;
  links?: any[];
  position: string;
  selfLink: string;
  status: string;
  title: string;
  updated: string;
  parent?: string;
  notes?: string;
  due?: string;
}

export type TaskContextType = [TaskState, Dispatch<TaskAction>];

///////////////////////////////////// TaskList /////////////////////////////////////

export interface TaskList {
  etag: string;
  id: string;
  kind: string;
  selfLink: string;
  title: string;
  updated: string;
}

export interface TaskListState {
  items: TaskList[];
  selected?: TaskList | undefined;
}

export interface TaskListAction {
  type: string;
  payload?: any;
}

export type TaskListContextType = [TaskListState, Dispatch<TaskListAction>];

///////////////////////////////////// Session /////////////////////////////////////

export interface UserState {
  isSignedIn: boolean;
}

export interface UserAction {
  type: string;
  payload?: any;
}

export type UserContextType = [UserState, Dispatch<UserAction>];
