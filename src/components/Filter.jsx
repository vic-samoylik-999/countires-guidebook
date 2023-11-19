import React from 'react';
import { nanoid } from 'nanoid';
import { SearchAndFilterContext, filterValues } from '../pages/MainPage';

import dropdownIcon from '../assets/dropdownArrow.svg';

function Filter({ setCurrentPage }) {
  const [isSelecting, setIsSelecting] = React.useState(false);
  const { currentSortChoise, setCurrentSortChoise } = React.useContext(SearchAndFilterContext);
  const changeFilter = (event) => {
    setCurrentSortChoise(event.target.id);
    setIsSelecting(false);
    setCurrentPage(1);
  };

  return (
    <section className="filter">
      <div className="filter__holder" onClick={() => setIsSelecting((prev) => !prev)}>
        <p className="filter__holder-text">
          {currentSortChoise > 0 ? filterValues[currentSortChoise] : 'Filter by Region'}
        </p>
        <img
          className={isSelecting ? 'filter__holder-icon active' : 'filter__holder-icon'}
          src={dropdownIcon}
          alt="Dropdown Icon"
        />
      </div>
      {isSelecting && (
        <ul className="filter__list">
          {filterValues.map((item, index) => {
            return (
              <li
                className="filter__list-item"
                id={index}
                onClick={(event) => changeFilter(event)}
                key={nanoid()}
              >
                {item}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default Filter;
