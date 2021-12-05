import React, { useEffect, useState } from 'react';
import { useCustomDispatch } from '../../hooks/hooks';
import Crypto from './Crypto';
import { AvailableCryptos, OnClose } from '../../models/models';

import classes from './AddCrypto.module.css';
import { stateActions } from '../../store/redux';
import ErrorUI from '../UI/ErrorUI';
import useHttp from '../../hooks/use-http';
import Loader from '../UI/Loader';
import Button from '../UI/Button';

const AddCrypto: React.FC<OnClose> = ({ onClose }) => {
  const dispatch = useCustomDispatch();

  // picked cryptos
  const [checkedCryptos, setCheckedCryptos] = useState<string[]>([]);
  // list of all cryptos from api
  const [availableCryptos, setAvailableCryptos] = useState<AvailableCryptos[]>(
    []
  );
  const [pagination, setPagination] = useState<number>(1);
  const { isLoading, error, fetchData } = useHttp();

  const addCrypto = () => {
    dispatch(stateActions.changeCrypto(checkedCryptos));
    onClose();
  };

  const changeHandler = (id: string) => {
    setCheckedCryptos(prevState => {
      if (!prevState.includes(id)) return [id, ...prevState];
      return prevState.filter(item => item !== id);
    });
  };

  const scrollHandler = (e: React.UIEvent<HTMLUListElement>) => {
    const target = e.currentTarget;
    if (target.scrollHeight - target.scrollTop === target.clientHeight)
      setPagination(prev => prev + 1);
  };

  useEffect(() => {
    const filterData = (data: any) => {
      const filteredData: AvailableCryptos[] = [];
      for (const item of data) {
        const { id, image, name } = item;
        filteredData.push({ id, image, name });
      }
      setAvailableCryptos(prev => [...prev, ...filteredData]);
    };

    fetchData(
      {
        url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=${pagination}&sparkline=false`,
      },
      filterData
    );
  }, [pagination, fetchData]);

  if (error) return <ErrorUI message={error} />;

  return (
    <>
      <button className={classes.close} onClick={onClose}></button>
      <div className={classes.header}>
        <h2>Add a cryptocurrency</h2>
        <p>
          Add a cryptocurrencies you would like to track. We'll add it to your
          personalized tab.
        </p>
      </div>
      <ul className={classes.list} onScroll={scrollHandler}>
        {availableCryptos.map(item => (
          <Crypto
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            onChange={changeHandler}
          />
        ))}
      </ul>
      {isLoading && <Loader />}
      <Button onClick={addCrypto} cssClass={null}>
        Add a Cryptocurrency
      </Button>
    </>
  );
};

export default AddCrypto;
