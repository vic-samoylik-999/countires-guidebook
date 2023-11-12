import React from 'react';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';

import backIcon from '../assets/back-icon.svg';

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

function CountryDescribtion() {
  return (
    <main className="country">
      <Link to="/" className="country__backBtn">
        <img src={backIcon} alt="Back icon" />
        Back
      </Link>
      <div className="country__row">
        <div className="country__flag">
          <img src={fakeData.flag} alt={`${fakeData.name} flag`} />
        </div>
        <div className="country__info info">
          <h2 className="info__title">{fakeData.name}</h2>
          <div className="info__misc">
            <div className="info__column">
              <p className="info__text">
                <span>Native Name: </span>
                {fakeData.nativeName}
              </p>
              <p className="info__text">
                <span>Population: </span>
                {fakeData.population}
              </p>
              <p className="info__text">
                <span>Region: </span>
                {fakeData.region}
              </p>
              <p className="info__text">
                <span>Sub Region: </span>
                {fakeData.subRegion}
              </p>
              <p className="info__text">
                <span>Capital: </span>
                {fakeData.capital}
              </p>
            </div>
            <div className="info__column">
              <p className="info__text">
                <span>Top Level Domain: </span>
                {fakeData.topLevelDomain}
              </p>
              <p className="info__text">
                <span>Currencies: </span>
                {fakeData.currencies}
              </p>
              <p className="info__text">
                <span>Languages: </span>
                {fakeData.languages}
              </p>
            </div>
          </div>
          <div className="info__borders">
            <span>Border Countries:</span>
            <div className="info__links">
              {fakeData.borderCountries.map((item) => {
                return (
                  <Link className="info__link" to={`/country/${item}`} key={nanoid()}>
                    {item}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CountryDescribtion;
