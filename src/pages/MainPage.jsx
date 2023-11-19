import React from 'react';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import Search from '../components/Search';
import Filter from '../components/Filter';
import CountryCard from '../components/CountryCard';
import SkeletonCard from '../components/SkeletonCard';
import { Pagination, checkMobileScroll } from '../components/Pagination';

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
          {currentViewWidth < 1065 && (
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
    </>
  );
}

export { SearchAndFilterContext, filterValues };
