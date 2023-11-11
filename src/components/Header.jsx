import React from 'react';

function Header() {
  return (
    <header className="header">
      <div className="header__row">
        <h1 className="header__logo">Vic's Guidebook of Countries</h1>
        <button className="header__icon">Dark Mode</button>
      </div>
    </header>
  );
}

export default Header;
