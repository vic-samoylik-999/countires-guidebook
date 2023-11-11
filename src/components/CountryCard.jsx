import React from 'react';
import { Link } from 'react-router-dom';

function CountryCard({ title, flag, population, region, capital }) {
  const slug = title.toLowerCase().split(' ').join('-');
  return (
    <Link to={`/${slug}`} className="country-card">
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
    </Link>
  );
}

export default CountryCard;
