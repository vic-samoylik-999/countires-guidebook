import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { ThreeCircles } from 'react-loader-spinner';

import backIcon from '../assets/back-icon.svg';

const client = axios.create({
  baseURL: 'https://restcountries.com/v3.1/',
});

function CountryDescription() {
  const location = useLocation();
  const [info, setInfo] = React.useState(null);
  // const [currentCCA3, setCurrentCCA3] = React.useState('');
  const modifiedSlug = location.pathname.slice(1).split('-').join('%20');

  React.useEffect(() => {
    async function getInfo() {
      const responce = await client.get(`name/${modifiedSlug}`);
      setInfo(responce.data[0]);
    }
    getInfo();
  }, []);

  const Loader = (
    <ThreeCircles
      height="100"
      width="100"
      color="#c5c5c5"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="three-circles-rotating"
      outerCircleColor=""
      innerCircleColor=""
      middleCircleColor=""
    />
  );

  // React.useEffect(() => {
  //   const getSlugFromCCA3 = async (cca3) => {
  //     const responce = await client.get(`alpha/${cca3}`);
  //     const officialName = responce.data[0].name.official;
  //     const slug = officialName.toLowerCase().split(' ').join('-');
  //     setCurrentCCA3(slug);
  //   };
  // }, [setCurrentCCA3]);

  if (!info)
    return (
      <main className="loader">
        <div className="loader__wrapper">{Loader}</div>
      </main>
    );

  return (
    <main className="country">
      <Link to="/" className="country__backBtn">
        <img src={backIcon} alt="Back icon" />
        Back
      </Link>
      <div className="country__row">
        <div className="country__flag">
          <img src={info.flags.svg} alt={`${info.name.official} flag`} />
        </div>
        <div className="country__info info">
          <h2 className="info__title">{info.name.official}</h2>
          <div className="info__misc">
            <div className="info__column">
              <p className="info__text">
                <span>Native Name: </span>
                {info.name.common}
              </p>
              <p className="info__text">
                <span>Population: </span>
                {info.population.toLocaleString()}
              </p>
              <p className="info__text">
                <span>Region: </span>
                {info.region}
              </p>
              <p className="info__text">
                <span>Sub Region: </span>
                {info.subregion}
              </p>
              <p className="info__text">
                <span>Capital: </span>
                {info.capital}
              </p>
            </div>
            <div className="info__column">
              <p className="info__text">
                <span>Top Level Domain: </span>
                {info.tld.map((item, index) => {
                  return index === info.tld.length - 1 ? item : `${item}, `;
                })}
              </p>
              <p className="info__text">
                <span>Currencies: </span>
                {Object.values(info.currencies).map((item, index) => {
                  return index === Object.values(info.currencies).length - 1
                    ? `${item.name}: ${item.symbol}`
                    : `${item.name}: ${item.symbol}, `;
                })}
              </p>
              <p className="info__text">
                <span>Languages: </span>
                {Object.values(info.languages).map((item, index) => {
                  return index === Object.values(info.languages).length - 1 ? item : `${item}, `;
                })}
              </p>
            </div>
          </div>
          <div className="info__borders">
            <span>Border Countries:</span>
            <div className="info__links">
              {info.borders ? (
                info.borders.map((item) => {
                  return (
                    <Link to="/" className="info__border" key={nanoid()}>
                      {item}
                    </Link>
                  );
                })
              ) : (
                <p>Have no border countries</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CountryDescription;
