import { gapi } from "gapi-script";
import { CLIENT_ID, SCOPES } from "../config";

export const authorizeApi = (params: { immediate: any }) => {
  return new Promise<void>((resolve, reject) => {
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
        return gapi.client.load("tasks", "v1", () =>
          gapi.client.load("plus", "v1", () => resolve())
        );
      }
    );
  });
};

export const logoutApi = () => {
  return new Promise<void>((resolve, reject) => {
    const token = gapi.auth.getToken();

    if (token) {
      const accessToken = gapi.auth.getToken().access_token;

      fetch(
        `https://accounts.google.com/o/oauth2/revoke?token=${accessToken}`,
        {
          mode: "no-cors",
        }
      )
        .then((res) => {
          gapi.auth.signOut();
          resolve();
        })
        .catch((error) => reject(error));
    }
  });
};

export const getTaskListsApi = () => {
  const request = gapi.client.tasks.tasklists.list();

  return makeRequest(request);
};

export const getTaskListApi = (taskListId: any) => {
  const request = gapi.client.tasks.tasklists.get({
    tasklist: taskListId,
  });

  return makeRequest(request);
};

export const addTaskListApi = (title: any) => {
  const request = gapi.client.tasks.tasklists.insert({
    title,
  });

  return makeRequest(request);
};

export const updateTaskListApi = ({ taskListId, title }: any) => {
  const request = gapi.client.tasks.tasklists.update({
    tasklist: taskListId,
    id: taskListId,
    title,
  });

  return makeRequest(request);
};

export const deleteTaskListApi = ({ taskListId }: any) => {
  const request = gapi.client.tasks.tasklists.delete({
    tasklist: taskListId,
  });

  return makeRequest(request);
};

export const getTasksApi = (taskListId: any) => {
  const request = gapi.client.tasks.tasks.list({
    tasklist: taskListId,
  });

  return makeRequest(request);
};

export const addTaskApi = ({ taskListId, ...params }: any) => {
  const request = gapi.client.tasks.tasks.insert({
    tasklist: taskListId,
    ...params,
  });

  return makeRequest(request);
};

export const updateTaskApi = ({ taskListId, taskId, ...params }: any) => {
  const request = gapi.client.tasks.tasks.update({
    tasklist: taskListId,
    task: taskId,
    id: taskId,
    ...params,
  });

  return makeRequest(request);
};

export const deleteTaskApi = ({ taskListId, taskId }: any) => {
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
