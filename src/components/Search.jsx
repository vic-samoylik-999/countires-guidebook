import React from 'react';
import searchIcon from '../assets/search-icon.svg';
import closeIcon from '../assets/close-icon.svg';

function Search() {
  const [searchValue, setSearchValue] = React.useState('');
  return (
    <section className="search">
      <input
        className="search__input"
        name="search-input"
        placeholder="Search for country..."
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
      <img className="search__loupe" src={searchIcon} alt="Loupe icon" />
      {searchValue && (
        <img
          className="search__close"
          onClick={() => setSearchValue('')}
          src={closeIcon}
          alt="Close icon"
        />
      )}
    </section>
  );
}

export default Search;
