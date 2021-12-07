import React, { useState } from 'react';
import { useCustomDispatch, useCustomSelector } from '../../hooks/hooks';
import { OnClose } from '../../models/models';
import classes from './AddCrypto.module.css';
import { stateActions } from '../../store/redux';
import Button from '../UI/Button';
import CryptoList from './CryptoList';

const AddCrypto: React.FC<OnClose> = ({ onClose }) => {
  const dispatch = useCustomDispatch();
  const cryptocurrencies = useCustomSelector(
    statePara => statePara.state.cryptocurrencies
  );
  const [pagination, setPagination] = useState<number>(1);
  // picked cryptos
  const [checkedCryptos, setCheckedCryptos] =
    useState<string[]>(cryptocurrencies);

  const addCryptoHandler = () => {
    dispatch(stateActions.changeCrypto(checkedCryptos));
    onClose();
  };

  const scrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
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
            personalized tab.
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
