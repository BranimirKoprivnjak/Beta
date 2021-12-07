import React, { useState } from 'react';
import { useCustomDispatch, useCustomSelector } from './hooks/hooks';

import classes from './App.module.css';
import Modal from './components/UI/Modal';
import CryptoItem from './components/CryptoItem/CryptoItem';
import { stateActions } from './store/redux';
import { SUPPORTED_CURRENCIES } from './config/config';

const App = () => {
  const cryptocurrencies = useCustomSelector(s => s.state.cryptocurrencies);
  const dispatch = useCustomDispatch();

  const isEmpty = cryptocurrencies.length ? false : true;
  const [modalIsShown, setModalIsShown] = useState(isEmpty);

  const currencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(stateActions.updateCurrency(event.currentTarget.value));
  };

  const toggleModalHandler = () => {
    setModalIsShown(prev => !prev);
  };

  return (
    <>
      {modalIsShown && <Modal onClose={toggleModalHandler} />}
      <div className={classes.toolbar}>
        <p>My cryptocurrencies({cryptocurrencies.length})</p>
        <div className={classes.utility}>
          <label>
            <select onChange={currencyChange} className={classes.dropdown}>
              {SUPPORTED_CURRENCIES.map(item => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <a className={classes.button} onClick={toggleModalHandler}>
            +Add a cryptocurrency
          </a>
        </div>
      </div>
      <div className={classes.cryptos}>
        {cryptocurrencies.map(id => (
          <CryptoItem id={id} key={id} />
        ))}
      </div>
    </>
  );
};

export default App;
