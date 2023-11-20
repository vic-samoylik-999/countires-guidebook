import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';

function Layout() {
  return (
    <div wrapper>
      <Header />
      <main className="main">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
