import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <Header />
      <div className="not-found">
        <h2 className="not-found__emoji">😥</h2>
        <p className="not-found__text">It seems like there is no such page...</p>
        <Link to="/">Go back to Main Page 🔙</Link>
      </div>
    </>
  );
}

export default NotFound;
