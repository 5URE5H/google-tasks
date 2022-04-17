import { gapi } from "gapi-script";
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { CLIENT_ID } from "../config";
import { USER_SIGNED_IN, USER_SIGNED_OUT } from "./types";
import Login from "../components/login/Login";
import { authorize, listTaskLists } from "../api";

interface UserState {
  userId: string | undefined;
  isSignedIn: boolean;
}

interface UserAction {
  type: string;
  payload?: any;
}

const initialState = {
  userId: undefined,
  isSignedIn: false,
};

type UserContextType = [UserState, Dispatch<UserAction>];

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserReducer = (state: UserState, action: UserAction) => {
  switch (action.type) {
    case USER_SIGNED_IN:
      return { ...state, isSignedIn: true, userId: action.payload.userId };
    case USER_SIGNED_OUT:
      return { ...state, isSignedIn: false, userId: undefined };
    default:
      return state;
  }
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  useEffect(() => {
    function start() {
      gapi.client
        .init({
          clientId: CLIENT_ID,
          scope: "https://www.googleapis.com/auth/tasks",
        })
        .then(() => {
          console.log("auth...");
          authorize({ immediate: false }).then((res) => {
            console.log("auth", listTaskLists());
          });

          const isUserSignedIn = gapi.auth2
            .getAuthInstance()
            .isSignedIn.get() as boolean;

          if (isUserSignedIn)
            dispatch({ type: USER_SIGNED_IN, payload: { userId: "test" } });
          else dispatch({ type: USER_SIGNED_OUT });
        })
        .catch(() => {
          dispatch({ type: USER_SIGNED_OUT });
        });
    }

    gapi.load("client:auth2", start);
    // console.log("auth...");
    // authorize({ immediate: false }).then((res) => {
    //   console.log("auth", res);
    // });
  }, []);

  return !state.isSignedIn ? (
    <Login />
  ) : (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserSession = () => {
  const context = useContext(UserContext);

  if (!context)
    throw new Error("useUser should be used within <UserProvider />");

  return context;
};
