import { useEffect, useState } from 'react';
import { useCustomSelector } from '../../hooks/hooks';
import useHttp from '../../hooks/use-http';
import { CryptoBasic } from '../../models/components/components-models';
import CryptoListItem from './CryptoListItem';
import Loader from '../UI/Loader';
import ErrorUI from '../UI/ErrorUI';
import classes from './CryptoList.module.css';

const CryptoList: React.FC<{
  pagination: number;
  onCheckedCryptos: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ pagination, onCheckedCryptos }) => {
  const cryptocurrencies = useCustomSelector(
    state => state.crypto.cryptocurrencies
  );
  // list of all cryptos from api
  const [availableCryptos, setAvailableCryptos] = useState<CryptoBasic[]>([]);
  const { isLoading, error, fetchData } = useHttp();

  const changeHandler = (id: string) => {
    onCheckedCryptos(prevState => {
      if (!prevState.includes(id)) return [...prevState, id];
      return prevState.filter(item => item !== id);
    });
  };

  useEffect(() => {
    const filterData = (data: any) => {
      const filteredData = data.map(({ id, name, image }: CryptoBasic) => ({
        id,
        name,
        image,
      }));
      setAvailableCryptos(prev => prev.concat(filteredData));
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
    <ul className={classes.list}>
      {availableCryptos.map(item => (
        <CryptoListItem
          key={item.id}
          id={item.id}
          name={item.name}
          image={item.image}
          isChecked={cryptocurrencies.map(item => item.id).includes(item.id)}
          onChange={changeHandler}
        />
      ))}
      {isLoading && <Loader />}
    </ul>
  );
};

export default CryptoList;
