import React from 'react';
import { nanoid } from 'nanoid';

import Header from '../components/Header';
import Search from '../components/Search';
import Filter from '../components/Filter';
import CountryCard from '../components/CountryCard';
import SkeletonCard from '../components/SkeletonCard';

function Main() {
  const [countriesData, setCountriesData] = React.useState([]);

  React.useEffect(() => {
    async function getCountries(url) {
      const responce = await fetch(url);
      const data = await responce.json();
      setCountriesData(data);
    }
    getCountries('https://restcountries.com/v3.1/all');
    console.log(countriesData);
  }, []);

  const countriesElements = countriesData.map((item) => {
    return (
      <CountryCard
        key={nanoid()}
        countryCode={item.cca3}
        title={item.name.official}
        flag={item.flags.svg}
        population={item.population}
        region={item.region}
        capital={item.capital}
      />
    );
  });

  const skeletons = [...Array(12)].map(() => <SkeletonCard />);

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
            {countriesData.length > 0 ? countriesElements : skeletons}
          </div>
        </div>
      </main>
    </>
  );
}

export default Main;
