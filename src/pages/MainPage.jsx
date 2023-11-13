import React from 'react';
import { nanoid } from 'nanoid';

import Header from '../components/Header';
import Search from '../components/Search';
import Filter from '../components/Filter';
import CountryCard from '../components/CountryCard';
import SkeletonCard from '../components/SkeletonCard';

const SearchContext = React.createContext();

export default function Main() {
  const [countriesData, setCountriesData] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  // Decide to except this part - searching with api /name/{name} is too slow, got to use ternary and .filter.map solution
  // const url = searchValue
  //   ? `https://restcountries.com/v3.1/name/${searchValue}`
  //   : 'https://restcountries.com/v3.1/all?fields=name,flags,cca3,population,region,capital';
  const url = 'https://restcountries.com/v3.1/all?fields=name,flags,cca3,population,region,capital';
  React.useEffect(() => {
    async function getCountries(url) {
      const responce = await fetch(url);
      const data = await responce.json();
      setCountriesData(data);
    }
    getCountries(url);
  }, []);

  const countriesElements = searchValue
    ? countriesData
        .filter(
          (item) =>
            item.name.official.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.name.common.toLowerCase().includes(searchValue.toLowerCase()),
        )
        .map((item) => {
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
        })
    : countriesData.map((item) => {
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
          <SearchContext.Provider value={{ searchValue, setSearchValue }}>
            <div className="search-filter">
              <Search />
              <Filter />
            </div>
            <div className="countries">
              {countriesData.length > 0 ? countriesElements : skeletons}
            </div>
          </SearchContext.Provider>
        </div>
      </main>
    </>
  );
}

export { SearchContext };
