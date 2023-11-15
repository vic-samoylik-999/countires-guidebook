import React from 'react';
import { nanoid } from 'nanoid';
import { Link, useLocation } from 'react-router-dom';

import backIcon from '../assets/back-icon.svg';

function CountryDescribtion() {
  const location = useLocation();
  const [data, setData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setData(location.state);
    setIsLoading(false);
  }, []);

  // const topLevelDomainItems =
  //   data.topLevelDomains && data.topLevelDomains.length ? (
  //     data.topLevelDomains.map((item, index) => {
  //       return <>{index === data.topLevelDomains.length - 1 ? item : `${item}, `}</>;
  //     })
  //   ) : (
  //     <p>Have no domains yet</p>
  //   );
  // let currenciesItems;
  // if (data.currencies) {
  //   for (let currency in data.currencies) {
  //     for (let item in currency) {
  //       currenciesItems += `${item.name}: ${currency}, ${item.symbol}`;
  //     }
  //   }
  // } else {
  //   currenciesItems = 'Have no currencies';
  // }
  // const borderItems =
  //   data.borders && data.borders.length ? (
  //     data.borders.map((item) => {
  //       return (
  //         <a href="/" className="info__link" key={nanoid()}>
  //           {item}
  //         </a>
  //       );
  //     })
  //   ) : (
  //     <p>Have no border countries</p>
  //   );

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
                {/* {topLevelDomainItems} */}
              </p>
              <p className="info__text">
                <span>Currencies: </span>
                {/* {currenciesItems} */}
              </p>
              <p className="info__text">
                <span>Languages: </span>
                {/* {data.languages} */}
              </p>
            </div>
          </div>
          <div className="info__borders">
            <span>Border Countries:</span>
            <div className="info__links">
              {!isLoading && data.borders.length > 0
                ? data.borders.map((item) => {
                    return (
                      <a href="/" className="info__link" key={nanoid()}>
                        {item}
                      </a>
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

export default CountryDescribtion;
