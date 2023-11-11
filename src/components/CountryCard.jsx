import React from 'react';

function CountryCard({ title, flag, population, region, capital }) {
  return (
    <div className="country-card">
      <div className="country-card__flag">
        <img src={flag} alt={`${title} flag`} />
      </div>
      <div className="country-card__info">
        <h2 className="country-card__title">{title}</h2>
        <p className="country-card__text">
          <span>Population:</span> {population}
        </p>
        <p className="country-card__text">
          <span>Region:</span> {region}
        </p>
        <p className="country-card__text">
          <span>Capital:</span> {capital}
        </p>
      </div>
    </div>
  );
}

export default CountryCard;
