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

// export const getTasksApi = (taskListId: string) => {
//   return fetch(
//     `https://tasks.googleapis.com/tasks/v1/lists/${taskListId}/tasks`,
//     {
//       method: "get",
//       headers: new Headers({
//         Authorization:
//           "Bearer ya29.A0ARrdaM9B7hGl3XTxZOL0lu8rDC-nsFx5lQeqQVVyZmJSe8L9cXWQKQcDqWUn_TKzxM-UMYNgSCnpOMTtamyNok0W9i3hKTh6EdhEYFivHS1RM_LflABcLVg1vH4sd4rLC8sviiv0YtkvMipi6fjEhGAfS1aA0rGOWv8-aEcJ",
//         "Cache-Control": "no-cache" 
//       }),
//     }
//   ).then((res) => res.json());
// };

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

// export const updateTaskApi = ({ taskListId, taskId, ...params }: any) => {
//   return fetch(
//     `https://tasks.googleapis.com/tasks/v1/lists$/${taskListId}/tasks/${taskId}`,
//     {
//       method: "put",
//       headers: new Headers({
//         Authorization:
//           "Bearer ya29.A0ARrdaM_LLQDPWmfuIrzq_-QBl49CFj7HBnLI3NmOP2VZzqEAq8a0jLc9DvruIMw77LE_px629aHVWCpTyyEv1VVR3qOWwXI7p6o8o2PZjlIFyP4SUQv1Xh8omkNPqjxS_kCtTw1hg2SzDRqsAvPPhWgaF3Me9YvQ4OHcANGf",
//       }),
//       body: JSON.stringify({ ...params }),
//     }
//   ).then((res) => res.json());
// };

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
