import React from 'react';
import { Link } from 'react-router-dom';

import backIcon from '../assets/back-icon.svg';

function CountryDescribtion() {
  const fakeData = {
    flag: 'https://flagcdn.com/ax.svg',
    name: 'Åland Islands',
    nativeName: 'Åland',
    population: 28875,
    region: 'Europe',
    subRegion: 'Northern Europe',
    capital: 'Mariehamn',
    topLevelDomain: ['.ax'],
    currencies: 'Euro',
    languages: 'Swedish',
    borderCountries: ['IRN', 'PAK', 'TKM', 'UZB', 'TJK', 'CHN'],
  };
  return (
    <main className="country">
      <button className="country__backBtn">
        <img src={backIcon} alt="Back icon" />
        Back
      </button>
      <div className="country__row">
        <div className="country__flag">
          <img src={fakeData.flag} alt={`${fakeData.name} flag`} />
        </div>
        <div className="country__info info">
          <h2 className="info__title">{fakeData.name}</h2>
          {/* <div className="info__misc">
              <p className="info__text">
                <span></span>
                {fakeData}
              </p>
              <p className="info__text">
                <span></span>
                {fakeData}
              </p>
              <p className="info__text">
                <span></span>
                {fakeData}
              </p>
              <p className="info__text">
                <span></span>
                {fakeData}
              </p>
              <p className="info__text">
                <span></span>
                {fakeData}
              </p>
              <p className="info__text">
                <span></span>
                {fakeData}
              </p>
              <p className="info__text">
                <span></span>
                {fakeData}
              </p>
              <p className="info__text">
                <span></span>
                {fakeData}
              </p>
            </div> */}
          <div className="info__borders">
            <p className="info__text">
              <span>Border Countries</span>
              {fakeData.borderCountries.map((item) => {
                return <Link to={`/country/${item}`}>{item}</Link>;
              })}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CountryDescribtion;
