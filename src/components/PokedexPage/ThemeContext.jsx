import React, { createContext, useReducer, useContext, useEffect } from "react";

const initialState = {
  darkMode: localStorage.getItem("darkMode") === "true" || false,
};

const themeReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_DARK_MODE":
      return { ...state, darkMode: !state.darkMode };
    case "SET_DARK_MODE":
      return { ...state, darkMode: action.payload };
    default:
      return state;
  }
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      state.darkMode ? "dark" : "light"
    );
    localStorage.setItem("darkMode", state.darkMode);
  }, [state.darkMode]);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
