import React from 'react';
import { SearchAndFilterContext } from '../pages/MainPage';
import { ThemeContext } from './Layout';
import { checkTheme } from '../functions/checktheme';

import searchIcon from '../assets/search-icon.svg';
import searchIconDark from '../assets/search-icon-dark.svg';
import closeIcon from '../assets/close-icon.svg';
import closeIconDark from '../assets/close-icon-dark.svg';

function Search() {
  const { searchValue, setSearchValue } = React.useContext(SearchAndFilterContext);
  const { theme } = React.useContext(ThemeContext);
  return (
    <section className="search">
      <input
        className="search__input"
        name="search-input"
        placeholder="Search for country..."
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
      <img
        className="search__loupe"
        src={checkTheme(theme, searchIconDark, searchIcon)}
        alt="Loupe icon"
      />
      {searchValue && (
        <img
          className="search__close"
          onClick={() => setSearchValue('')}
          src={checkTheme(theme, closeIconDark, closeIcon)}
          alt="Close icon"
        />
      )}
    </section>
  );
}

export default Search;
