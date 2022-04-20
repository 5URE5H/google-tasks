import { gapi } from "gapi-script";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { USER_SIGNED_IN, USER_SIGNED_OUT } from "./constants";
import Login from "../components/login/Login";
import { authorize } from "../api";
import { UserAction, UserContextType, UserState } from "./types";

const initialState = {
  isSignedIn: false,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserReducer = (state: UserState, action: UserAction) => {
  switch (action.type) {
    case USER_SIGNED_IN:
      return { ...state, isSignedIn: true };
    case USER_SIGNED_OUT:
      return { ...state, isSignedIn: false };
    default:
      return state;
  }
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  useEffect(() => {
    gapi.load("client:auth2", () => {
      authorize({ immediate: false }).then(() => {
        const isUserSignedIn = gapi.auth2
          ?.getAuthInstance()
          .isSignedIn.get() as boolean;

        if (isUserSignedIn) {
          dispatch({ type: USER_SIGNED_IN });
        } else {
          dispatch({ type: USER_SIGNED_OUT });
        }
      });
    });
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
