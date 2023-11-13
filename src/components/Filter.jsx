import React from 'react';

function Filter() {
  const [countriesFilter, setCountriesFilter] = React.useState('');
  console.log(countriesFilter);
  return (
    <section className="filter">
      <select
        value={countriesFilter}
        onChange={(event) => setCountriesFilter(event.target.value)}
        name="countries-filter"
      >
        <option value="" disabled selected>
          Filter by Region
        </option>
        <option value="all">All</option>
        <option value="africa">Africa</option>
        <option value="america">America</option>
        <option value="asia">Asia</option>
        <option value="europe">Europe</option>
        <option value="oceania">Oceania</option>
      </select>
    </section>
  );
}

export default Filter;
