import React from 'react';

import Header from '../components/Header';
import Search from '../components/Search';
import Filter from '../components/Filter';

function Main() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="search-filter">
          <div className="search-filter__row">
            <Search />
            <Filter />
          </div>
          <div className="countries"></div>
        </div>
      </div>
    </>
  );
}

export default Main;
