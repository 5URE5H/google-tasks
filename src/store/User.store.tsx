import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

interface UserState {
  isSignedIn: boolean;
  userId: string | undefined;
}

interface UserAction {
  type: UserActionType;
  payload?: any;
}

enum UserActionType {
  SignedIn = "SIGNED_IN",
  SignedOut = "SIGNED_OUT",
}

const initialState = { isSignedIn: false, userId: undefined };

type UserContextType = [UserState, Dispatch<UserAction>];

const UserContext = createContext<UserContextType | undefined>(undefined);

function userReducer(state: UserState, action: UserAction) {
  switch (action.type) {
    case UserActionType.SignedIn:
      return { ...state };
    case UserActionType.SignedOut:
      return { ...state };
    default:
      return state;
  }
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [auth, setAuth] = useState("");

  useEffect(() => {
    (window as any).gapi.load("client:auth2", () => {
      (window as any).gapi.client
        .init({
          clientId:
            "319564862813-vf3urpmn294m54rc5hdvl2qn6dmo80i5.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          setAuth((window as any).gapi.auth2.getAuthInstance());
          console.log(auth);
          // this.onAuthChange(this.auth.isSignedIn.get());
          // this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }, []);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);

  if (!context)
    throw new Error("useUser should be used within <UserProvider />");

  return context;
};
