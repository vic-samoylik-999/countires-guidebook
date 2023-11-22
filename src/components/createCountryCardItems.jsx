import React from 'react';
import { Link } from 'react-router-dom';
import CountryCard from './CountryCard';
import { nanoid } from 'nanoid';

const createCountryCardItems = (item) => {
  const slug = item.name.official.toLowerCase().split(' ').join('-');
  return (
    <Link to={`/${slug}`} state={item.cca3} key={nanoid()} className="country-card">
      <CountryCard
        key={nanoid()}
        title={item.name.official}
        flag={item.flags.svg}
        population={item.population}
        region={item.region}
        capital={item.capital}
      />
    </Link>
  );
};

export { createCountryCardItems };
