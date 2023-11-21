import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from './Layout';
import { checkTheme } from '../functions/checktheme';

import logoLight from '../assets/logo-light-theme.svg';
import logoDark from '../assets/logo-dark-theme.svg';
import moonIcon from '../assets/moon-icon.svg';
import sunIcon from '../assets/sun-icon.svg';

function Header() {
  const { theme, changeTheme } = React.useContext(ThemeContext);
  return (
    <header className="header">
      <div className="container">
        <div className="header__row">
          <Link to="/" className="header__logo">
            <img
              src={checkTheme(theme, logoDark, logoLight)}
              alt="Vic's Guidebook of Countries logo"
            />
          </Link>
          <button className="header__light-toggle light-toggle" onClick={() => changeTheme()}>
            <img
              className="light-toggle__icon"
              src={checkTheme(theme, sunIcon, moonIcon)}
              alt="Moon Icon"
            />
            <p className="light-toggle__text">{checkTheme(theme, 'Light Theme', 'Dark Theme')}</p>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
