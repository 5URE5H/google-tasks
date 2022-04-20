import { gapi } from "gapi-script";
import { CLIENT_ID, SCOPES } from "../config";

export const authorize = (params: { immediate: any }) => {
  return new Promise<void>((resolve, reject) => {
    //eslint-disable-next-line
    gapi.auth.authorize(
      {
        client_id: CLIENT_ID,
        scope: SCOPES,
        immediate: params.immediate,
        cookie_policy: "single_host_origin",
      },
      (authResult: { error: any }) => {
        if (authResult.error) {
          return reject(authResult.error);
        }
        // eslint-disable-next-line
        return gapi.client.load("tasks", "v1", () =>
          gapi.client.load("plus", "v1", () => resolve())
        );
      }
    );
  });
};

export const logout = () => {
  return new Promise<void>((resolve, reject) => {
    //eslint-disable-next-line
    const token = gapi.auth.getToken();

    if (token) {
      //eslint-disable-next-line
      const accessToken = gapi.auth.getToken().access_token;

      fetch(
        `https://accounts.google.com/o/oauth2/revoke?token=${accessToken}`,
        {
          mode: "no-cors",
        }
      )
        .then((res) => {
          //eslint-disable-next-line
          gapi.auth.signOut();
          resolve();
        })
        .catch((error) => reject(error));
    }
  });
};

export const getTaskLists = () => {
  const request = gapi.client.tasks.tasklists.list();

  return makeRequest(request);
};

export const getTaskList = (taskListId: any) => {
  const request = gapi.client.tasks.tasklists.get({
    tasklist: taskListId,
  });

  return makeRequest(request);
};

export const addTaskList = (title: any) => {
  const request = gapi.client.tasks.tasklists.insert({
    title,
  });

  return makeRequest(request);
};

export const updateTaskList = ({ taskListId, title }: any) => {
  const request = gapi.client.tasks.tasklists.update({
    tasklist: taskListId,
    id: taskListId,
    title,
  });

  return makeRequest(request);
};

export const deleteTaskList = ({ taskListId }: any) => {
  const request = gapi.client.tasks.tasklists.delete({
    tasklist: taskListId,
  });

  return makeRequest(request);
};

export const getTasks = (taskListId: any) => {
  const request = gapi.client.tasks.tasks.list({
    tasklist: taskListId,
  });

  return makeRequest(request);
};

export const addTask = ({ taskListId, ...params }: any) => {
  const request = gapi.client.tasks.tasks.insert({
    tasklist: taskListId,
    ...params,
  });

  return makeRequest(request);
};

export const updateTask = ({ taskListId, taskId, ...params }: any) => {
  const request = gapi.client.tasks.tasks.update({
    tasklist: taskListId,
    task: taskId,
    id: taskId,
    ...params,
  });

  return makeRequest(request);
};

export const deleteTask = ({ taskListId, taskId }: any) => {
  const request = gapi.client.tasks.tasks.delete({
    tasklist: taskListId,
    task: taskId,
    id: taskId,
  });

  return makeRequest(request);
};

export const makeRequest = (requestObj: {
  execute: (arg0: (resp: any) => void) => void;
}) => {
  return new Promise((resolve, reject) => {
    requestObj.execute((resp) =>
      resp.error ? reject(resp.error) : resolve(resp.result)
    );
  });
};
