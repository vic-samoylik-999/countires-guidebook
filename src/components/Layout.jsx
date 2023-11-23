import React from 'react';
import { Outlet } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';

import Header from './Header';
import Footer from './Footer';

const ThemeContext = React.createContext();

export default function Layout() {
  const [theme, setTheme] = useLocalStorage('theme' ? 'dark' : 'ligh');
  const changeTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const rootElement = document.querySelector('body');
  rootElement.dataset.theme = theme;
  return (
    <ThemeContext.Provider value={{ theme, setTheme, changeTheme }}>
      <div className="wrapper">
        <Header />
        <main className="main">
          <div className="container">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}

export { ThemeContext };
