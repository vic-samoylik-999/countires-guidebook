import React from 'react';
import { nanoid } from 'nanoid';

import Header from '../components/Header';
import Search from '../components/Search';
import Filter from '../components/Filter';
import CountryCard from '../components/CountryCard';

import data from '../assets/data.json';

function Main() {
  // Temporary data to style countrycard component
  const slicedData = data.slice(0, 12);
  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          <div className="search-filter">
            <Search />
            <Filter />
          </div>
          <div className="countries">
            {slicedData.map((item) => {
              return (
                <CountryCard
                  key={nanoid()}
                  countryCode={item.alpha3Code}
                  title={item.name}
                  flag={item.flag}
                  population={item.population}
                  region={item.region}
                  capital={item.capital}
                />
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}

export default Main;
