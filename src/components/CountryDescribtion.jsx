import React from 'react';
import { nanoid } from 'nanoid';
import { Link, useLocation } from 'react-router-dom';

import backIcon from '../assets/back-icon.svg';

function CountryDescription() {
  const location = useLocation();
  const [data, setData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setData(location.state);
    setIsLoading(false);
  }, []);

  return (
    <main className="country">
      <Link to="/" className="country__backBtn">
        <img src={backIcon} alt="Back icon" />
        Back
      </Link>
      <div className="country__row">
        <div className="country__flag">
          <img src={data.flag} alt={`${data.name} flag`} />
        </div>
        <div className="country__info info">
          <h2 className="info__title">{data.name}</h2>
          <div className="info__misc">
            <div className="info__column">
              <p className="info__text">
                <span>Native Name: </span>
                {data.nativeName}
              </p>
              <p className="info__text">
                <span>Population: </span>
                {data.population}
              </p>
              <p className="info__text">
                <span>Region: </span>
                {data.region}
              </p>
              <p className="info__text">
                <span>Sub Region: </span>
                {data.subregion}
              </p>
              <p className="info__text">
                <span>Capital: </span>
                {data.capital}
              </p>
            </div>
            <div className="info__column">
              <p className="info__text">
                <span>Top Level Domain: </span>
                {!isLoading && data.topLevelDomains.length > 0
                  ? data.topLevelDomains.map((item, index) => {
                      return index === data.topLevelDomains.length - 1 ? item : `${item}, `;
                    })
                  : 'Have no border countries'}
              </p>
              <p className="info__text">
                <span>Currencies: </span>
                {!isLoading &&
                  Object.values(data.currencies).map((item, index) => {
                    return index === Object.values(data.currencies).length - 1
                      ? `${item.name}: ${item.symbol}`
                      : `${item.name}: ${item.symbol}, `;
                  })}
              </p>
              <p className="info__text">
                <span>Languages: </span>
                {!isLoading &&
                  Object.values(data.languages).map((item, index) => {
                    return index === Object.values(data.languages).length - 1 ? item : `${item}, `;
                  })}
              </p>
            </div>
          </div>
          <div className="info__borders">
            <span>Border Countries:</span>
            <div className="info__links">
              {!isLoading && data.borders && data.borders.length > 0
                ? data.borders.map((item) => {
                    return (
                      <p className="info__border" key={nanoid()}>
                        {item}
                      </p>
                    );
                  })
                : 'Have no border countries'}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CountryDescription;
