import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { ThreeCircles } from 'react-loader-spinner';
import { goBack } from '../functions/goBack';
import { ThemeContext } from './Layout';
import { checkTheme } from '../functions/checktheme';

import backIcon from '../assets/back-icon.svg';
import backIconDark from '../assets/back-icon-dark.svg';

const client = axios.create({
  baseURL: 'https://restcountries.com/v3.1/',
});

function CountryDescription() {
  const location = useLocation();
  const cca3 = useLocation().state;
  const [info, setInfo] = React.useState(null);
  const [slugsLinks, setSlugsLinks] = React.useState([]);
  const [isLoadingSlugs, setIsLoadingSlugs] = React.useState(true);
  const navigate = useNavigate();
  const { theme } = React.useContext(ThemeContext);

  React.useEffect(() => {
    async function getInfo() {
      const responce = await client.get(`alpha/${cca3}`).catch(function (error) {
        if (error.response) navigate('not-found');
      });

      setInfo(responce.data[0]);
      const links = [];
      if (responce.data[0].borders) {
        for (let i = 0; i < responce.data[0].borders.length; i++) {
          const country = await client.get(`alpha/${responce.data[0].borders[i]}`);
          links.push({
            official: country.data[0].name.official,
            common: country.data[0].name.common,
            cca3: country.data[0].cca3,
          });
        }
      }
      setSlugsLinks(links);
      setIsLoadingSlugs(false);
    }
    getInfo();
  }, [location]);

  const spinner = (
    <ThreeCircles
      height="100"
      width="100"
      color="#c5c5c5"
      visible={true}
      ariaLabel="three-circles-rotating"
    />
  );

  const littleSpinner = (
    <ThreeCircles
      height="32"
      width="302"
      color="#c5c5c5"
      visible={true}
      ariaLabel="three-circles-rotating"
    />
  );

  if (!info) {
    return (
      <main className="loader">
        <div className="loader__wrapper">{spinner}</div>
      </main>
    );
  }

  return (
    <>
      <button onClick={() => goBack()} className="country__backBtn">
        <img src={checkTheme(theme, backIconDark, backIcon)} alt="Back icon" />
        Back
      </button>
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
                {Object.values(info.name.nativeName)[0].official}
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
                {info.subregion ? info.subregion : 'none'}
              </p>
              <p className="info__text">
                <span>Capital: </span>
                {info.capital ? info.capital : 'none'}
              </p>
            </div>
            <div className="info__column">
              <p className="info__text">
                <span>Top Level Domain: </span>
                {info.tld
                  ? info.tld.map((item, index) => {
                      return index === info.tld.length - 1 ? item : `${item}, `;
                    })
                  : 'none'}
              </p>
              <p className="info__text">
                <span>Currencies: </span>
                {info.currencies
                  ? Object.values(info.currencies).map((item, index) => {
                      return index === Object.values(info.currencies).length - 1
                        ? `${item.name}: ${item.symbol}`
                        : `${item.name}: ${item.symbol}, `;
                    })
                  : 'none'}
              </p>
              <p className="info__text">
                <span>Languages: </span>
                {info.languages
                  ? Object.values(info.languages).map((item, index) => {
                      return index === Object.values(info.languages).length - 1
                        ? item
                        : `${item}, `;
                    })
                  : 'none'}
              </p>
            </div>
          </div>
          <div className="info__borders">
            <span>Border Countries:</span>
            <div className="info__links">
              <div className="info__little-spinner">{isLoadingSlugs && littleSpinner}</div>
              {!isLoadingSlugs &&
                slugsLinks.length !== 0 &&
                slugsLinks.map((item) => {
                  const linkSlug = item.official.toLowerCase().split(' ').join('-');
                  return (
                    <Link
                      to={`/${linkSlug}`}
                      state={item.cca3}
                      className="info__border"
                      key={nanoid()}
                    >
                      {item.common}
                    </Link>
                  );
                })}
              {!isLoadingSlugs && slugsLinks.length === 0 && <p>Have no border countries</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CountryDescription;
