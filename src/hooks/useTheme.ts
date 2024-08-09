import { useState, useEffect } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme") || "light"
  );

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, toggleTheme };
};

export default useTheme;
