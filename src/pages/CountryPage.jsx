import React from 'react';
import { checkTheme } from '../functions/checktheme';

import Header from '../components/Header';
import CountryDescription from '../components/CountryDescription';

import backIcon from '../assets/back-icon.svg';
import backIconDark from '../assets/back-icon-dark.svg';

const goBack = () => {
  const history = window.history;
  history.back();
};

function CountryPage() {
  return (
    <div className="wrapper">
      {/* <Header /> */}
      <div className="container">
        <main className="country">
          <button onClick={() => goBack()} className="country__backBtn">
            <img src={backIcon} alt="Back icon" />
            Back
          </button>
          <CountryDescription />
        </main>
      </div>
    </div>
  );
}

export default CountryPage;
