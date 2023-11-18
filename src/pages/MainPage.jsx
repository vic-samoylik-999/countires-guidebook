import React from 'react';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import Search from '../components/Search';
import Filter from '../components/Filter';
import CountryCard from '../components/CountryCard';
import SkeletonCard from '../components/SkeletonCard';

const SearchAndFilterContext = React.createContext();
const filterValues = ['All', 'Africa', 'America', 'Asia', 'Europe', 'Oceania'];

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

export default function Main() {
  const [countriesData, setCountriesData] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [currentSortChoise, setCurrentSortChoise] = React.useState(0);

  const baseUrl = 'https://restcountries.com/v3.1/';
  let url =
    currentSortChoise > 0
      ? baseUrl + `region/${filterValues[currentSortChoise].toLowerCase()}`
      : baseUrl +
        'all?fields=name,flags,cca3,population,region,subregion,capital,tld,currencies,languages,borders';
  React.useEffect(() => {
    async function getCountries(url) {
      const responce = await fetch(url);
      const data = await responce.json();
      setCountriesData(data);
    }
    getCountries(url);
  }, [currentSortChoise]);

  const countriesElements = searchValue
    ? countriesData
        .filter(
          (item) =>
            item.name.official.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.name.common.toLowerCase().includes(searchValue.toLowerCase()),
        )
        .map((item) => {
          return createCountryCardItems(item);
        })
    : countriesData.map((item) => {
        return createCountryCardItems(item);
      });

  const skeletons = [...Array(12)].map(() => <SkeletonCard key={nanoid()} />);

  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          <SearchAndFilterContext.Provider
            value={{ searchValue, currentSortChoise, setSearchValue, setCurrentSortChoise }}
          >
            <div className="search-filter">
              <Search />
              <Filter />
            </div>
            <div className="countries">
              {countriesData.length > 0 ? countriesElements : skeletons}
            </div>
          </SearchAndFilterContext.Provider>
        </div>
      </main>
    </>
  );
}

export { SearchAndFilterContext, filterValues };
