import React from 'react';

import Header from '../components/Header';
import CountryDescription from '../components/CountryDescribtion';

function CountryPage() {
  return (
    <>
      <Header />
      <div className="container">
        <CountryDescription />
      </div>
    </>
  );
}

export default CountryPage;
