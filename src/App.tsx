import React, { useEffect, useState } from 'react';
import './App.scss';
import { getStatistic } from './api/api';
import { CovidLogo } from './photos/Covid';
import { SearchLogo } from './photos/Search';
import { Country } from './types/Country';
import { CountriesList } from './components/CountriesList';
import { ConfirmedLogo } from './photos/Confirmed';
import { DeathsLogo } from './photos/Deaths';
import { RecoveredLogo } from './photos/Recovered';


const App = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [query, setQuery] = useState('');
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState('');
  const [confirmed, setConfirmed] = useState(0);
  const [lethal, setLethal] = useState(0);
  const [recovered, setRecovered] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    setLoading(false);
    getStatistic()
      .then(data => setCountries(data.Countries))
      .then(() => setLoading(true))
      .catch(() => setLoadingError(true));
  }, [])

  const filteredCountries = countries.filter(country => country.Country.toLowerCase().includes(query.toLowerCase()))

  const sorting = (sortBy: string) => {
    const sortedCountries = [...countries];

    switch (sortBy) {
      case 'name':
        sortedCountries.sort((countryOne, countryTwo) => countryOne.Country.localeCompare(countryTwo.Country));
        break;

      case 'accidents':
        sortedCountries.sort((countryOne, countryTwo) => countryTwo.TotalConfirmed - countryOne.TotalConfirmed);
        break;

      default:
        break;
    }

    setCountries(sortedCountries);
  };

  return (
    <div className="app">
      {modal && (
        <div className='app__details details'>
          <section className='details__window'>
            <p className='details__window-name'>{selected}</p>
            <div className='details__window-results results'>
              <div className='results__things'>
                <div className='results__things-desc desc'>
                  <ConfirmedLogo />
                  <h2 className='desc__title'>Total Confirmed</h2>
                </div>
                <span className='results__things-sum'>{confirmed}</span>
              </div>
              <div className='results__things'>
                <div className='results__things-desc desc'>
                  <DeathsLogo />
                  <h2 className='desc__title'>Total Deaths</h2>
                </div>
                <span className='results__things-sum'>{lethal}</span>
              </div>
              <div className='results__things'>
                <div className='results__things-desc desc'>
                  <RecoveredLogo />
                  <h2 className='desc__title'>Total Recovered</h2>
                </div>
                <span className='results__things-sum'>{recovered}</span>
              </div>
            </div>
            <button
              className='details__window-btn'
              onClick={() => setModal(false)}
            >OK</button>
          </section>
        </div>
      )}
      <header className='app__heading heading'>
        <div className='heading__title'>
          <CovidLogo />
          <p className='heading__title-text'>STATISTIC</p>
        </div>
        <div className='heading__search'>
          <input
            id="searching"
            type="text"
            className='heading__search-inpt'
            placeholder="Search..."
            onChange={event => setQuery(event.currentTarget.value)}
          />
          <label htmlFor="searching" className='heading__search-logo'>
            <SearchLogo />
          </label>
        </div>
      </header>
      <main className='content'>
        {!loading && (
          <div className="content__loading">
            <img
              src={require("./photos/loading.gif")}
              alt="loading"
            />
          </div>
        )}

        {(loadingError && loading) && (
          <div className="content__loading">
            <p>Failed loading data</p>
          </div>
        )}
        {(loading && !loadingError) && (
          <CountriesList
            countries={filteredCountries}
            sorting={sorting}
            setModal={setModal}
            setSelected={setSelected}
            setConfirmed={setConfirmed}
            setLethal={setLethal}
            setRecovered={setRecovered}
          />
        )}
      </main>
    </div>
  );
}

export default App;
