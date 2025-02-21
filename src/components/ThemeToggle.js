import React from "react";

function ThemeToggle({ setTheme }) {
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <button onClick={toggleTheme} className="theme-toggle">
      Toggle Theme
    </button>
  );
}

export default ThemeToggle;
