import { gapi } from "gapi-script";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import {
  APP_LOADED,
  UPDATE_USER_INFO,
  USER_SIGNED_IN,
  USER_SIGNED_OUT,
} from "./constants";
import { authorizeApi } from "../api";
import { UserAction, UserContextType, UserState } from "./types";
import Login from "../components/auth/Login";
import TaskWelcome from "../components/TaskWelcome";
import { CLIENT_ID } from "../config";

const initialState = {
  isSignedIn: false,
  isLoading: true,
  userInfo: undefined,
};

let auth2;
const UserContext = createContext<UserContextType | undefined>(undefined);

const UserReducer = (state: UserState, action: UserAction) => {
  switch (action.type) {
    case APP_LOADED:
      return { ...state, isLoading: false };
    case USER_SIGNED_IN:
      return { ...state, isSignedIn: true };
    case USER_SIGNED_OUT:
      return { ...state, isSignedIn: false };
    case UPDATE_USER_INFO:
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const signinChanged = (val: any) => {
    if (val) {
      dispatch({ type: USER_SIGNED_IN });
    } else {
      dispatch({ type: USER_SIGNED_OUT });
    }
    dispatch({ type: APP_LOADED });
  };

  useEffect(() => {
    gapi.load("client:auth2", () => {
      authorizeApi({ immediate: true })
        .then(() => {
          auth2 = gapi.auth2?.init({ client_id: CLIENT_ID });
          auth2.isSignedIn.listen(signinChanged);
        })
        .catch((err) => {
          dispatch({ type: APP_LOADED });
          dispatch({ type: USER_SIGNED_OUT });
        });
    });
  }, []);

  if (state.isLoading) {
    return <TaskWelcome />;
  } else {
    return !state.isSignedIn ? (
      <UserContext.Provider value={[state, dispatch]}>
        <Login />
      </UserContext.Provider>
    ) : (
      <UserContext.Provider value={[state, dispatch]}>
        {children}
      </UserContext.Provider>
    );
  }
};

export const useUserSession = () => {
  const context = useContext(UserContext);

  if (!context)
    throw new Error("useUser should be used within <UserProvider />");

  return context;
};
