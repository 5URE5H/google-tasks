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

const initialState = {
  isSignedIn: false,
  isLoading: true,
  userInfo: undefined,
};

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

  useEffect(() => {
    gapi.load("client:auth2", () => {
      authorizeApi({ immediate: true }).then(() => {
        let isUserSignedIn = false;

        if (gapi.auth2?.getAuthInstance()) {
          isUserSignedIn = gapi.auth2
            ?.getAuthInstance()
            .isSignedIn.get() as boolean;
        }

        if (isUserSignedIn) {
          dispatch({ type: USER_SIGNED_IN });
        } else {
          dispatch({ type: USER_SIGNED_OUT });
        }
        dispatch({ type: APP_LOADED });
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
