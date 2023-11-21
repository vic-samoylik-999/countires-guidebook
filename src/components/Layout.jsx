import React from 'react';
import { Outlet } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';

import Header from './Header';

const ThemeContext = React.createContext();

export default function Layout() {
  const [theme, setTheme] = useLocalStorage('theme' ? 'dark' : 'ligh');
  const changeTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  return (
    <ThemeContext.Provider value={{ theme, setTheme, changeTheme }}>
      <div className="wrapper">
        <Header />
        <main className="main">
          <div className="container">
            <Outlet />
          </div>
        </main>
      </div>
    </ThemeContext.Provider>
  );
}

export { ThemeContext };
