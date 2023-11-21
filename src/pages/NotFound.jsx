import React from 'react';
import { Link } from 'react-router-dom';

import backIcon from '../assets/back-icon.svg';

function NotFound() {
  return (
    <section className="not-found">
      <h2 className="not-found__emoji">😥</h2>
      <p className="not-found__text">It seems like there is no such page...</p>
      <Link to="/">
        <p>Go back to Main Page</p>
        <p>↩️</p>
      </Link>
    </section>
  );
}

export default NotFound;
