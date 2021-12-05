import React, { useState } from 'react';
import { useCustomDispatch, useCustomSelector } from './hooks/hooks';

import classes from './App.module.css';
import Modal from './components/UI/Modal';
import CryptoItem from './components/CryptoItem/CryptoItem';
import Button from './components/UI/Button';
import { stateActions } from './store/redux';

const SUPPORTED_CURRENCIES = ['usd', 'eur', 'gbp', 'rub'];

const App = () => {
  const state = useCustomSelector(statePara => statePara.state);
  const dispatch = useCustomDispatch();
  const { cryptocurrencies } = state;

  const [modalIsShown, setModalIsShown] = useState(
    cryptocurrencies.length === 0 ? true : false
  );

  const currencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(stateActions.updateCurrency(event.currentTarget.value));
  };

  const showModalHandler = () => {
    setModalIsShown(true);
  };

  const hideModalHandler = () => {
    setModalIsShown(false);
  };

  return (
    <>
      {modalIsShown && <Modal onClose={hideModalHandler} />}
      <div className={classes.toolbar}>
        <p>My cryptocurrencies({cryptocurrencies.length})</p>
        <div className={classes.utility}>
          <label>
            Currency Preference
            <select onChange={currencyChange}>
              {SUPPORTED_CURRENCIES.map(item => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <Button onClick={showModalHandler} cssClass={null}>
            Add+
          </Button>
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
