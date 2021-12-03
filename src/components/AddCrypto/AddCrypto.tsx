import { useEffect, useState } from 'react';
import { useCustomDispatch } from '../../hooks/hooks';
import Crypto from './Crypto';
import { State } from '../../models/models';

import classes from './AddCrypto.module.css';
import { stateActions } from '../../store/redux';

const AddCrypto = () => {
  // redux
  const dispatch = useCustomDispatch();
  // const realState = useCustomSelector(statePara => statePara.state);

  // const [checkedCryptos, setCheckedCryptos] = useState<any[]>([]);
  const [state, setState] = useState<State[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();

  const changeHandler = (id: string) => {
    dispatch(stateActions.changeCrypto(id));
  };

  // const changeHandler = (id: string) => {
  //   setCheckedCryptos(prevState => {
  //     if (!prevState.includes(id)) return [id, ...prevState];
  //     return prevState.filter(item => item !== id);
  //   });
  // };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false'
      );

      if (!response.ok) throw new Error('Something went wrong!');

      const data = await response.json();

      const filteredData = [];
      for (const item of data) {
        const { id, image, name } = item;
        filteredData.push({ id, image, name });
      }
      setState(filteredData);
      setIsLoading(false);
    };
    fetchData().catch(error => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  if (isLoading)
    return (
      <section>
        <p>Loading...</p>
      </section>
    );

  if (error)
    return (
      <section>
        <p>{error}</p>
      </section>
    );

  return (
    <>
      <div className={classes.header}>
        <h2>Add a cryptocurrency</h2>
      </div>
      <ul className={classes.data}>
        {state.map(item => (
          <Crypto
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            onChange={changeHandler}
          />
        ))}
      </ul>
      <button>Add a cryptocurrency</button>
    </>
  );
};

export default AddCrypto;
