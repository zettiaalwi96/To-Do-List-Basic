import React, { useState} from "react";
export const AppContext = React.createContext();

export const DarkModeProvider = (props) => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    let values = {
        toggleDarkMode,
        darkMode
    }

  return (
    <AppContext.Provider value={values}>{props.children}</AppContext.Provider>
  );
}