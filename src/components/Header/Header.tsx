import useTheme from "../../hooks/useTheme";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

import "./Header.scss";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header>
      <h1>Star Wars Characters</h1>
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
    </header>
  );
};

export default Header;
