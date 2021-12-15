import { useState } from 'react';
import { useCustomSelector, useCustomDispatch } from '../../hooks/hooks';
import Button from '../UI/Button';
import CryptoList from './CryptoList';
import { cryptoActions } from '../../store/cryptocurrencies';
import { modalActions } from '../../store/modal';
import classes from './AddCrypto.module.css';

const AddCrypto: React.FC = () => {
  const dispatch = useCustomDispatch();
  const cryptocurrencies = useCustomSelector(
    state => state.crypto.cryptocurrencies
  );
  const [pagination, setPagination] = useState<number>(1);
  // picked cryptos
  const [checkedCryptos, setCheckedCryptos] = useState<string[]>(
    cryptocurrencies.map(item => item.id)
  );

  const addCryptoHandler = () => {
    dispatch(
      cryptoActions.updateCrypto(
        checkedCryptos.map(crypto => ({
          id: crypto,
          historyChart: {
            options: {
              interval: '14',
              type: 'line',
            },
          },
          ohlcChart: {
            options: {
              interval: '14',
            },
          },
        }))
      )
    );
    dispatch(modalActions.toggleAddModal());
  };

  const scrollHandler = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    if (target.scrollHeight - target.scrollTop === target.clientHeight)
      setPagination(prev => prev + 1);
  };

  //  <div className={classes.close}>
  //   <a href="#" className={classes['close-button']} onClick={onClose}></a>
  // </div>
  return (
    <>
      <div className={classes.container} onScroll={scrollHandler}>
        <div className={classes.header}>
          <h2>Add a cryptocurrency</h2>
          <p>
            Add a cryptocurrencies you would like to track. We'll add it to your
            personalized tab. You can always sort them as you like with drag and
            drop.
          </p>
        </div>
        <CryptoList
          pagination={pagination}
          onCheckedCryptos={setCheckedCryptos}
        />
      </div>
      <Button onClick={addCryptoHandler} cssClass={classes.button}>
        Add a Cryptocurrency
      </Button>
    </>
  );
};

export default AddCrypto;
