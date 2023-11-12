import React from 'react';

import Header from '../components/Header';
import CountryDescribtion from '../components/CountryDescribtion';

function CountryPage() {
  return (
    <>
      <Header />
      <div className="container">
        <CountryDescribtion />
      </div>
    </>
  );
}

export default CountryPage;
