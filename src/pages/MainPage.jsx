import React from 'react';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';
import { filterValues } from '../functions/filterValues';

import Header from '../components/Header';
import Search from '../components/Search';
import Filter from '../components/Filter';
import CountryCard from '../components/CountryCard';
import SkeletonCard from '../components/SkeletonCard';
import { Pagination, checkMobileScroll } from '../components/Pagination';
import NoCountriesElementsError from '../components/NoCountriesElements';

const SearchAndFilterContext = React.createContext();
const ThemeContext = React.createContext();

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
  const [currentPage, setCurrentPage] = React.useState(1);
  const [cardsPerPage] = React.useState(8);
  const [currentViewWidth, setCurrentViewWidth] = React.useState(window.innerWidth);
  const [theme, setTheme] = useLocalStorage('theme' ? 'dark' : 'light');
  // Potential Color Theme Toggle
  const rootElement = document.querySelector('body');
  rootElement.dataset.theme = theme;
  const changeTheme = () => {
    setTheme(() => (theme === 'light' ? 'dark' : 'light'));
  };

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
      <div className="wrapper">
        <Header />
        <main className="main">
          <div className="container">
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
            <div className="countries">
              {currentCardsSlice.length > 0 ? countriesElements : skeletons}
            </div>
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
          </div>
        </main>
      </div>
  );
}

export { SearchAndFilterContext, filterValues, ThemeContext };
