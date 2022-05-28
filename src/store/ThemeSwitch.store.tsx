import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { SWITCH_COLOR_MODE } from "./constants";
import {
  ThemeSwitchState,
  ThemeSwitchContextType,
  ThemeSwitchAction,
} from "./types";

const THEME_KEY = "tasks.ui.mode";

const initialState: ThemeSwitchState = {
  isDarkMode: false,
};

const ThemeSwitchContext = createContext<ThemeSwitchContextType | undefined>(
  undefined
);

const storeThemePreferences = (mode: boolean) => {
  localStorage.setItem(THEME_KEY, mode ? "dark" : "light");
};

const ThemeSwitchReducer = (
  state: ThemeSwitchState,
  action: ThemeSwitchAction
) => {
  switch (action.type) {
    case SWITCH_COLOR_MODE:
      storeThemePreferences(action.payload);
      return { ...state, isDarkMode: action.payload };
    default:
      return state;
  }
};

export const ThemeSwitchProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(ThemeSwitchReducer, initialState);

  const light: any = {
    palette: {
      mode: "light",
    },
  };

  const dark: any = {
    palette: {
      mode: "dark",
    },
  };

  useEffect(() => {
    const existingPreference = localStorage.getItem(THEME_KEY);
    if (existingPreference) {
      dispatch({
        type: SWITCH_COLOR_MODE,
        payload: existingPreference === "dark",
      });
    } else {
      dispatch({
        type: SWITCH_COLOR_MODE,
        payload: false,
      });
      localStorage.setItem(THEME_KEY, "light");
    }
  }, []);

  return (
    <ThemeSwitchContext.Provider value={[state, dispatch]}>
      <ThemeProvider
        theme={state.isDarkMode ? createTheme(dark) : createTheme(light)}
      >
        {children}
      </ThemeProvider>
    </ThemeSwitchContext.Provider>
  );
};

export const useThemeSwitch = () => {
  const context = useContext(ThemeSwitchContext);

  if (!context)
    throw new Error(
      "useThemeSwitch should be used within <ThemeSwitchProvider />"
    );

  return context;
};
