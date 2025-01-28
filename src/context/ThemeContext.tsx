import React, { createContext, useState, useEffect} from "react";
import { ThemeContextType, ThemeProviderProps } from "../utils/types";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isNightMode, setIsNightMode] = useState<boolean>(false);

  const toggleTheme = () => {
    setIsNightMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    if (isNightMode) {
      document.body.classList.add("night");
      document.body.classList.remove("day");
    } else {
      document.body.classList.add("day");
      document.body.classList.remove("night");
    }
  }, [isNightMode]);

  return (
    <ThemeContext.Provider value={{ isNightMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
