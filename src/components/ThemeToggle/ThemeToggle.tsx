import React from "react";
import "./ThemeToggle.scss";

import Moon from "../../assets/moon.svg";
import Sun from "../../assets/sun.svg";

interface ThemeToggleProps {
  theme: string;
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  return (
    <div className="theme-toggle">
      <input
        type="checkbox"
        id="darkmode-toggle"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <label htmlFor="darkmode-toggle">
        <img src={Sun} alt="Sun" className="sun" />
        <img src={Moon} alt="Moon" className="moon" />
      </label>
      <div className="background"></div>
    </div>
  );
};

export default ThemeToggle;
