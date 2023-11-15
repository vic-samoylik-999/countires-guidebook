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

export default function Main() {
  const [countriesData, setCountriesData] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [currentSortChoise, setCurrentSortChoise] = React.useState(0);

  // Decide to except this part - searching with api /name/{name} is too slow, got to use ternary and .filter.map solution
  // const url = searchValue
  //   ? `https://restcountries.com/v3.1/name/${searchValue}`
  //   : 'https://restcountries.com/v3.1/all?fields=name,flags,cca3,population,region,capital';

  const baseUrl = 'https://restcountries.com/v3.1/';
  let url =
    currentSortChoise > 0
      ? baseUrl + `region/${filterValues[currentSortChoise].toLowerCase()}`
      : baseUrl + 'all?fields=name,flags,cca3,population,region,capital';
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
        const slug = item.name.official.toLowerCase().split(' ').join('-');
        return (
          <Link to={`/${slug}`} className="country-card">
            <CountryCard
              key={nanoid()}
              countryCode={item.cca3}
              title={item.name.official}
              flag={item.flags.svg}
              population={item.population}
              region={item.region}
              capital={item.capital}
            />
          </Link>
        );
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
