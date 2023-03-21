import React, { Children, createContext, useEffect } from "react";

export const ThemeContext = createContext();
const ThemeProvider = ({ children }) => {
  const defaultTheme = "light";
  const darkTheme = "dark";
  const ToggleTheme = () => {
    const Oldtheme = getTheme();
    const newTheme = Oldtheme === defaultTheme ? darkTheme : defaultTheme;
    UpdateTheme(newTheme, Oldtheme);
  };
  useEffect(() => {
    const theme = getTheme();
    if (!theme) UpdateTheme(defaultTheme);
    else UpdateTheme(theme);
  }, []);
  return (
    <ThemeContext.Provider value={{ ToggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

const getTheme = () => localStorage.getItem("theme");
const UpdateTheme = (theme, removeTheme) => {
  if (removeTheme) document.documentElement.classList.remove(removeTheme);
  document.documentElement.classList.add(theme);
  localStorage.setItem("theme", theme);
};
