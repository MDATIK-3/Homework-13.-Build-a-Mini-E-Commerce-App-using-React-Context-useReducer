import { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import { ThemeState, Theme } from "../types";
import { themeReducer } from "../reducers/themeReducer";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getInitialTheme = (): Theme => {
  const saved = localStorage.getItem("theme");
  return saved === "dark" ? "dark" : "light";
};

const initialState: ThemeState = { theme: getInitialTheme() };

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  const toggleTheme = () => dispatch({ type: "TOGGLE_THEME" });

  useEffect(() => {
    const root = document.documentElement;
    if (state.theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [state.theme]);

  return (
    <ThemeContext.Provider value={{ theme: state.theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
