import React from 'react';
import { checkTheme } from '../functions/checktheme';

import Header from '../components/Header';
import CountryDescription from '../components/CountryDescription';


function CountryPage() {
  return (
    <div className="wrapper">
      <Header />
      <div className="container">
        <main className="country">
          <CountryDescription />
        </main>
      </div>
    </div>
  );
}

export default CountryPage;
