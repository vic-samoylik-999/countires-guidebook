import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

import backIcon from '../assets/back-icon.svg';

function NotFound() {
  return (
    <div className="wrapper">
      {/* <Header /> */}
      <div className="not-found">
        <h2 className="not-found__emoji">😥</h2>
        <p className="not-found__text">It seems like there is no such page...</p>
        <Link to="/">
          <p>Go back to Main Page</p>
          <p>↩️</p>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
