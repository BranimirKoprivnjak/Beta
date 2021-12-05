import { useState } from 'react';
import { useCustomSelector } from './hooks/hooks';

import classes from './App.module.css';
import Modal from './components/UI/Modal';
import CryptoItem from './components/CryptoItem/CryptoItem';

const App = () => {
  const state = useCustomSelector(statePara => statePara.state);
  const [modalIsShown, setModalIsShown] = useState(
    state.cryptocurrencies.length === 0 ? true : false
  );

  const showModalHandler = () => {
    setModalIsShown(true);
  };

  const hideModalHandler = () => {
    setModalIsShown(false);
  };

  return (
    <>
      {modalIsShown && <Modal onClose={hideModalHandler} />}
      <div className={classes.wrapper}>
        <h1 className={classes.heading}>Beta</h1>
        <h2 className={classes.heading}>
          You're personalized cryptocurrency tracker!
        </h2>
      </div>
      <div className={classes.container}>
        <div className={classes.crypto}>
          My cryptocurrencies (2)
          <button className={classes.button} onClick={showModalHandler}>
            Add+
          </button>
        </div>
        <div className={classes.currency}>
          Currency Preference
          <select className={classes.dropdown}>
            <option>usd</option>
            <option>eur</option>
          </select>
        </div>
      </div>
      <div className={classes.cryptos}>
        {state.cryptocurrencies.map(id => (
          <CryptoItem id={id} key={id} />
        ))}
      </div>
    </>
  );
};

export default App;
