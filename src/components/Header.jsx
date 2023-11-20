import React from 'react';
import { Link } from 'react-router-dom';

import logoLight from '../assets/logo-light-theme.svg';
import logoDark from '../assets/logo-dark-theme.svg';
import moonIcon from '../assets/moon-icon.svg';
import sunIcon from '../assets/sun-icon.svg';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header__row">
          <Link to="/" className="header__logo">
            <img src={logoLight} alt="Vic's Guidebook of Countries logo" />
          </Link>
          <button className="header__light-toggle light-toggle">
            <img className="light-toggle__icon" src={moonIcon} alt="Moon Icon" />
            <p className="light-toggle__text">{'Dark Theme'}</p>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
