import React from 'react';
import { Link } from 'react-router-dom';

import moonIcon from '../assets/moon-icon.svg';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header__row">
          <Link to="/" className="header__logo">
            Vic's Guidebook of Countries
          </Link>
          <button className="header__light-toggle light-toggle">
            <img className="light-toggle__icon" src={moonIcon} alt="Moon Icon" />
            <p className="light-toggle__text">Dark Mode</p>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
