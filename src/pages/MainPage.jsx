import React from 'react';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';
import { filterValues } from '../functions/filterValues';
import { createCountryCardItems } from '../components/createCountryCardItems';

import Search from '../components/Search';
import Filter from '../components/Filter';
import CountryCard from '../components/CountryCard';
import SkeletonCard from '../components/SkeletonCard';
import { Pagination, checkMobileScroll } from '../components/Pagination';
import NoCountriesElementsError from '../components/NoCountriesElements';

const SearchAndFilterContext = React.createContext();
const ThemeContext = React.createContext();

export default function Main() {
  const [countriesData, setCountriesData] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [currentSortChoise, setCurrentSortChoise] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [cardsPerPage] = React.useState(8);
  const [currentViewWidth, setCurrentViewWidth] = React.useState(window.innerWidth);

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

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      setCurrentViewWidth(window.innerWidth);
    });
  }, []);

  // Pagination
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCardsSlice = countriesData.slice(indexOfFirstCard, indexOfLastCard);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    checkMobileScroll(currentViewWidth);
  };

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
    : currentCardsSlice.map((item) => {
        return createCountryCardItems(item);
      });

  const skeletons = [...Array(12)].map(() => <SkeletonCard key={nanoid()} />);
  return (
    <>
      <SearchAndFilterContext.Provider
        value={{ searchValue, currentSortChoise, setSearchValue, setCurrentSortChoise }}
      >
        <div className="search-filter">
          <Search />
          {currentViewWidth > 1065 && (
            <Pagination
              cardsPerPage={cardsPerPage}
              totalCards={countriesData.length}
              paginate={paginate}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              currentViewWidth={currentViewWidth}
            />
          )}
          <Filter setCurrentPage={setCurrentPage} />
        </div>
      </SearchAndFilterContext.Provider>
      <section className="countries">
        {currentCardsSlice.length > 0 ? countriesElements : skeletons}
      </section>
      {countriesData && countriesElements.length === 0 && <NoCountriesElementsError />}
      {countriesElements.length > 0 && currentViewWidth < 1065 && (
        <Pagination
          cardsPerPage={cardsPerPage}
          totalCards={countriesData.length}
          paginate={paginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          currentViewWidth={currentViewWidth}
        />
      )}
    </>
  );
}

export { SearchAndFilterContext, filterValues, ThemeContext };
